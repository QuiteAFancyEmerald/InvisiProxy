import Fastify from 'fastify';
import { createServer } from 'node:http';
import { wispurr } from "wispurr";
import fastifyHelmet from '@fastify/helmet';
import fastifyStatic from '@fastify/static';
import {
  config,
  serverUrl,
  pages,
  externalPages,
  flatAltPaths,
  getAltPrefix,
} from './routes.mjs';
import { tryReadFile, preloaded404 } from './templates.mjs';
import { fileURLToPath } from 'node:url';
import { existsSync, unlinkSync } from 'node:fs';

/* Record the server's location as a URL object, including its host and port.
 * The host can be modified at /src/config.json, whereas the ports can be modified
 * at /ecosystem.config.js.
 */
console.log(serverUrl);

// Wisp Configuration: Refer to the documentation at https://www.npmjs.com/package/wispurr

const wisp = new wispurr({
  port: 6001,
  logLevel: 'none',

  allowTCP: true,
  allowUDP: false,
  enableV2: true,
  enableTwisp: false,
  websocketPermessageDeflate: false,

  allowDirectIP: true,
  allowPrivateIPs: false,
  allowLoopbackIPs: true,

  parseRealIP: true,
  trustedHeaders: ['CF-Connecting-IP', 'X-Forwarded-For'],

  whitelist: {
    ports: [
      80,
      443,
      9050,
      7000,
      7001
    ],
  },
	tcpBufferSize: 1048576,
	socketBufferSize: 33554432,
	pendingQueueSize: 268435456,
	bufferRemainingLength: 32768,
	tcpNoDelay: true,
	handshakeTimeoutSeconds: 10,
	passwordAuth: false,
	passwordAuthRequired: false,
	passwordUsers: {},
	trustedProxies: ["127.0.0.1"],
	nonWSResponse: "wispurr high-throughput relay",
	maxMessageSize: 1048581,
	staticDir: "",
	bandwidthLimitKbps: 0,
	connectionsLimitPerIP: 0,
	connectionWindowSeconds: 0,
	floodProtection: {
		enabled: false,
		maxConnectsPerSourceIPPerSecond: 0,
		maxConnectsPerDestPerSecond: 0,
		maxConnectsPerDestPerMinute: 0,
		maxInFlightSyns: 0,
		maxConcurrentStreamsPerConnection: 0,
		maxConcurrentConnections: 0,
		synFloodSignature: {
			enabled: false,
			windowMs: 2000,
			minSamples: 32,
			failedHandshakeRatio: 0.75
		},
		wsCloseAfterViolations: 0,
		logBlockedDials: false
	},
	reputation: {
		enabled: false,
		storePath: "./data/wispurr-reputation.json",
		saveIntervalSeconds: 30,
		scoreDecayPerHour: 1,
		evictAfterDays: 7,
		thresholds: { "warn": 21, "throttle": 51, "strict": 81 },
		weights: {},
		destinationWeights: {}
	}
});

// Modify for parallel instances
wisp.start(1);

// The server will check for the existence of this file when a shutdown is requested.
// The shutdown script in run-command.js will temporarily produce this file.
const shutdown = fileURLToPath(new URL('./.shutdown', import.meta.url));

// Create a server factory for Wisp
const serverFactory = (handler) => {
  return createServer()
    .on('request', (req, res) => {
      handler(req, res);
    })
    .on('upgrade', (req, socket, head) => {
      if (req.url.endsWith(getAltPrefix('wisp', serverUrl.pathname)))
        wisp.route(req, socket, head);
    });
};

// Set logger to true for logs.
const app = Fastify({
  routerOptions: {
    ignoreDuplicateSlashes: true,
    ignoreTrailingSlash: true,
  },
  logger: false,
  serverFactory: serverFactory,
});

// Apply Helmet middleware for security.
app.register(fastifyHelmet, {
  contentSecurityPolicy: false, // Disable CSP
  xPoweredBy: false,
});

// Assign server file paths to different paths, for serving content on the website.
app.register(fastifyStatic, {
  root: fileURLToPath(new URL('../views/dist/pages', import.meta.url)),
  prefix: serverUrl.pathname,
  decorateReply: false,
});

// All entries in the dist folder are created with source rewrites.
// Minified scripts are also served here, if minification is enabled.
[
  'assets',
  'uv',
  'scram',
  'epoxy',
  'libcurl',
  'baremux',
].forEach((prefix) => {
  app.register(fastifyStatic, {
    root: fileURLToPath(new URL('../views/dist/' + prefix, import.meta.url)),
    prefix: getAltPrefix(prefix, serverUrl.pathname),
    decorateReply: false,
  });
});

['sw.js', 'sw-blacklist.js'].forEach((swFile) => {
  const distName = flatAltPaths['files/' + swFile] || swFile;
  app.get(serverUrl.pathname + distName, (req, reply) => {
    reply
      .type('application/javascript')
      .header('Service-Worker-Allowed', serverUrl.pathname)
      .send(tryReadFile('../views/dist/' + distName, import.meta.url));
  });
});

/* If you are trying to add pages or assets in the root folder and
 * NOT entire folders, check ./src/routes.mjs and add it manually.
 *
 * All website files are stored in the /views directory.
 * This takes one of those files and displays it for a site visitor.
 * Paths like /browsing are converted into paths like /views/dist/pages/surf.html
 * back here. Which path converts to what is defined in routes.mjs.
 */

const supportedTypes = {
    default: config.disguiseFiles ? 'image/vnd.microsoft.icon' : 'text/html',
    html: 'text/html',
    txt: 'text/plain',
    xml: 'application/xml',
    ico: 'image/vnd.microsoft.icon',
  },
  disguise = 'ico';

if (config.disguiseFiles) {
  const getActualPath = (path) =>
      path.slice(0, path.length - 1 - disguise.length),
    shouldNotHandle = new RegExp(`\\.(?!html$|${disguise}$)[\\w-]+$`, 'i'),
    loaderFile = tryReadFile(
      '../views/dist/pages/misc/deobf/loader.html',
      import.meta.url,
      false
    );
  let exemptDirs = [
      'assets',
      'uv',
      'scram',
      'epoxy',
      'libcurl',
      'baremux',
      'wisp',
    ].map((dir) => getAltPrefix(dir, serverUrl.pathname).slice(1, -1)),
    exemptPages = ['login', 'test-shutdown', 'favicon.ico'];
  for (const [key, value] of Object.entries(externalPages))
    if ('string' === typeof value) exemptPages.push(key);
    else exemptDirs.push(key);
  exemptPages = exemptPages.concat(exemptDirs);
  if (pages.default === 'login') exemptPages.push('');

  app.addHook('preHandler', (req, reply, done) => {
    if (req.params.modified) return done();
    const reqPath = new URL(req.url, serverUrl).pathname.slice(
      serverUrl.pathname.length
    );
    if (
      shouldNotHandle.test(reqPath) ||
      exemptDirs.some((dir) => reqPath.indexOf(dir + '/') === 0) ||
      exemptPages.includes(reqPath)
    )
      return done();

    if (!reqPath.endsWith('.' + disguise)) {
      reply.type(supportedTypes.html).send(loaderFile);
      reply.hijack();
      return done();
    } else if (!(reqPath in pages) && !reqPath.endsWith('favicon.ico')) {
      req.params.modified = true;
      req.raw.url = getActualPath(req.raw.url);
      if (req.params.path) req.params.path = getActualPath(req.params.path);
      if (req.params['*']) req.params['*'] = getActualPath(req.params['*']);
      reply.type(supportedTypes[disguise]);
      reply.header('Access-Control-Allow-Origin', 'null');
    }
    return done();
  });
}

app.get(serverUrl.pathname + ':path', (req, reply) => {
  // Testing for future features that need cookies to deliver alternate source files.
  /*
  if (req.raw.rawHeaders.includes('Cookie'))
    console.log(
      'cookie:',
      req.raw.rawHeaders[req.raw.rawHeaders.indexOf('Cookie') + 1]
    );
  */

  const reqPath = req.params.path;

  // Ignore browsers' automatic requests to favicon.ico, since it does not exist.
  // This approach is needed for certain pages to not have an icon.
  if (reqPath === 'favicon.ico') {
    reply.send();
    return reply.hijack();
  }

  if (reqPath in externalPages) {
    if (req.params.modified)
      return reply.code(404).type(supportedTypes.html).send(preloaded404);
    let externalRoute = externalPages[reqPath];
    if (typeof externalRoute !== 'string')
      externalRoute = externalRoute.default;
    return reply.redirect(externalRoute);
  }

  // If a GET request is sent to /test-shutdown and a script-generated shutdown file
  // is present, gracefully shut the server down.
  if (reqPath === 'test-shutdown' && existsSync(shutdown)) {
    console.log('InvisiProxy is shutting down.');
    wisp.stop();
    app.close();
    unlinkSync(shutdown);
    process.exitCode = 0;
  }

  // Return the error page if the query is not found in routes.mjs.
  if (reqPath && !(reqPath in pages))
    return reply.code(404).type(supportedTypes.default).send(preloaded404);

  // Serve the default page if the path is the default path.
  const fileName = reqPath ? pages[reqPath] : pages[pages.default],
    type =
      supportedTypes[fileName.slice(fileName.lastIndexOf('.') + 1)] ||
      supportedTypes.default;

  if (req.params.modified) reply.type(supportedTypes[disguise]);
  else reply.type(type);
  reply.send(tryReadFile('../views/dist/' + fileName, import.meta.url));
});

app.get(serverUrl.pathname + 'github/:redirect', (req, reply) => {
  if (req.params.redirect in externalPages.github)
    reply.redirect(externalPages.github[req.params.redirect]);
  else reply.code(404).type(supportedTypes.default).send(preloaded404);
});

if (serverUrl.pathname === '/')
  // Set an error page for invalid paths outside the query string system.
  // If the server URL has a prefix, then avoid doing this for stealth reasons.
  app.setNotFoundHandler((req, reply) => {
    reply.code(404).type(supportedTypes.default).send(preloaded404);
  });
else {
  // Apply the following patch(es) if the server URL has a prefix.

  // Patch to fix serving index.html.
  app.get(serverUrl.pathname, (req, reply) => {
    reply
      .type(supportedTypes.default)
      .send(tryReadFile('../views/dist/' + pages.index, import.meta.url));
  });
}

app.addHook('onSend', (request, reply, payload, done) => {
  const cookieHeader = request.headers['cookie'] || '';
  const historyHide = cookieHeader
    .split('; ')
    .find(c => c.startsWith('HistoryHide='))
    ?.split('=')[1];

  if (historyHide === 'true' && request.headers['sec-fetch-dest'] === 'document') {
    reply.code(404);
  }
  done(null, payload);
});

app.listen({ port: serverUrl.port, host: serverUrl.hostname });
console.log(`InvisiProxy is listening on port ${serverUrl.port}.`);
console.log(`When hosting with a reverse proxy please ensure you are using NGINX only.\nCaddy and Apache have security risks due to wispurr and loopbacks. Please configure them correctly.\nNGINX is recommended and used for production. Ports are whitelisted and security is maintained with NGINX only.`);
if (config.disguiseFiles)
  console.log(
    'disguiseFiles is enabled. Visit src/routes.mjs to see the entry point, listed within the pages variable.'
  );
