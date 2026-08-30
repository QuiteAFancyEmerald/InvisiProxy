import {
  writeFileSync,
  unlinkSync,
  mkdirSync,
  readdirSync,
  lstatSync,
  copyFileSync,
  rmSync,
  renameSync,
  existsSync,
} from 'node:fs';
import { dirname, join } from 'node:path';
import { exec, fork } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';
import {
  config,
  serverUrl,
  flatAltPaths,
  splashRandom,
} from './src/routes.mjs';
import { baremuxPath } from '@mercuryworkshop/bare-mux/node';
import { uvPath } from '@titaniumnetwork-dev/ultraviolet';
import { scramjetPath } from '@mercuryworkshop/scramjet/path';
import paintSource from './src/source-rewrites.mjs';
import { loadTemplates, tryReadFile } from './src/templates.mjs';

const modPath = (subpath) =>
  join(
    dirname(fileURLToPath(import.meta.url)),
    'node_modules',
    ...subpath.split('/')
  );

const epoxyPath = modPath('@mercuryworkshop/epoxy-transport/dist');
const libcurlPath = modPath('@mercuryworkshop/libcurl-transport/dist');
const scramjetControllerPath = modPath(
  '@mercuryworkshop/scramjet-controller/dist'
);
const scramjetUtilsPath = modPath(
  '@mercuryworkshop/scramjet-utils/dist'
);

// This constant is copied over from /src/server.mjs.
const shutdown = fileURLToPath(new URL('./src/.shutdown', import.meta.url));

// Run each command line argument passed after node run-command.mjs.
// Commands are defined in the switch case statement below.
commands: for (let i = 2; i < process.argv.length; i++)
  switch (process.argv[i]) {
    // Commmand to boot up the server. Use PM2 to run if production is true in the
    // config file.
    case 'start':
      if (config.production)
        exec(
          'npx pm2 start ecosystem.config.js --env production',
          (error, stdout) => {
            if (error) throw error;
            console.log('[Start]', stdout);
          }
        );
      // Handle setup on Windows differently from platforms with POSIX-compliant
      // shells. This should run the server as a background process.
      else if (process.platform === 'win32')
        exec('START /MIN "" node backend.js', (error, stdout) => {
          if (error) {
            console.error('[Start Error]', error);
            process.exitCode = 1;
          }
          console.log('[Start]', stdout);
        });
      // The following approach (and similar approaches) will not work on Windows,
      // because exiting this program will also terminate backend.js on Windows.
      else {
        const server = fork(
          fileURLToPath(new URL('./backend.js', import.meta.url)),
          { cwd: process.cwd(), detached: true }
        );
        server.unref();
        server.disconnect();
      }
      break;

    // Stop the server. Make a temporary file that the server will check for if told
    // to shut down. This is done by sending a GET request to the server.
    case 'stop': {
      writeFileSync(shutdown, '');
      let timeoutId,
        hasErrored = false;
      try {
        /* Give the server 5 seconds to respond, otherwise cancel this and throw an
         * error to the console. The fetch request will also throw an error
         * immediately if checking the server on localhost and the port is unused.
         */
        const response = await Promise.race([
          fetch(new URL(serverUrl.pathname + 'test-shutdown', serverUrl)),
          new Promise((resolve) => {
            timeoutId = setTimeout(() => {
              resolve('Error');
            }, 5000);
          }),
        ]);
        clearTimeout(timeoutId);
        if (response === 'Error') throw new Error('Server is unresponsive.');
      } catch (e) {
        // Remove the temporary shutdown file since the server didn't remove it.
        unlinkSync(shutdown);
        // Check if this is the error thrown by the fetch request for an unused port.
        // Don't print the unused port error, since nothing has actually broken.
        if (e instanceof TypeError) clearTimeout(timeoutId);
        else {
          console.error('[Stop Error]', e);
          // Stop here unless Node will be killed later.
          if (!process.argv.slice(i + 1).includes('kill')) hasErrored = true;
        }
      }
      // Do not run this if Node will be killed later in this script. It will fail.
      if (config.production && !process.argv.slice(i + 1).includes('kill'))
        exec('npx pm2 stop ecosystem.config.js', (error, stdout) => {
          if (error) {
            console.error('[Stop Error]', error);
            hasErrored = true;
          }
          console.log('[Stop]', stdout);
        });
      // Do not continue executing commands since the server was unable to be stopped.
      // Mostly implemented to prevent duplicating Node instances with pnpm restart.
      if (hasErrored) {
        process.exitCode = 1;
        break commands;
      }
      break;
    }

    case 'build': {
      const distFinal = fileURLToPath(new URL('./views/dist', import.meta.url));
      const dist = fileURLToPath(new URL('./views/dist-new', import.meta.url));
      rmSync(dist, { force: true, recursive: true });
      rmSync(distFinal, { force: true, recursive: true });
      mkdirSync(dist);

      /* The archive directory is excluded from this process, since source
       * rewrites are not intended to be used by any of those files.
       * Assets are compiled separately, before the rest of the files.
       */
      const ignoredDirectories = ['dist', 'dist-new', 'assets', 'uv', 'scram'];
      const ignoredFileTypes = /\.map$/;

      const compile = (
        dir,
        base = '',
        outDir = '',
        initialDir = dir,
        applyRewrites = initialDir === './views'
      ) =>
        readdirSync(base + dir).forEach((file) => {
          let oldLocation = new URL(
            file,
            new URL(base + dir + '/', import.meta.url)
          );
          if (
            (ignoredDirectories.includes(file) && applyRewrites) ||
            ignoredFileTypes.test(file)
          )
            return;
          const fileStats = lstatSync(oldLocation),
            targetPath = fileURLToPath(
              new URL(
                './views/dist-new/' +
                  outDir +
                  (base + dir + '/').slice(initialDir.length + 1) +
                  ((!config.usingSEO && flatAltPaths['files/' + file]) || file),
                import.meta.url
              )
            );
          if (fileStats.isFile() && !existsSync(targetPath))
            if (/\.(?:html|js|css|json|txt|xml)$/.test(file) && applyRewrites)
              writeFileSync(
                targetPath,
                paintSource(
                  loadTemplates(
                    tryReadFile(base + dir + '/' + file, import.meta.url, false)
                  )
                )
              );
            else copyFileSync(base + dir + '/' + file, targetPath);
          else if (fileStats.isDirectory()) {
            if (!existsSync(targetPath)) mkdirSync(targetPath);
            compile(file, base + dir + '/', outDir, initialDir, applyRewrites);
          }
        });

      const localAssetDirs = ['assets', 'uv'];
      for (const path of localAssetDirs) {
        mkdirSync('./views/dist-new/' + path);
        compile('./views/' + path, '', path + '/', './views/' + path, true);
      }

      // Combine scripts from the corresponding node modules into the same
      // dist-generated directories for compiling, and avoid overwriting files.
      const compilePaths = [
        ['epoxy', epoxyPath],
        ['libcurl', libcurlPath],
        ['baremux', baremuxPath],
        ['uv', uvPath],
        ['scram', scramjetPath],
        ['scram', scramjetControllerPath],
        ['scram', scramjetUtilsPath],
      ];
      for (const [prefixName, srcPath] of compilePaths) {
        const relSrc = srcPath.slice(srcPath.indexOf('node_modules'));
        if (!existsSync(relSrc)) {
          console.warn(`[Build] Skipping "${prefixName}": ${relSrc} not found.`);
          continue;
        }

        const prefix = prefixName + '/',
          prefixUrl = new URL('./views/dist-new/' + prefix, import.meta.url);
        if (!existsSync(prefixUrl)) mkdirSync(prefixUrl);

        compile(relSrc, '', prefix);
      }

      // Minify the scripts and stylesheets upon compiling, if enabled in config.
      if (config.minifyScripts)
        await build({
          entryPoints: [
            './views/dist-new/uv/**/*.js',
            './views/dist-new/assets/js/**/*.js',
            './views/dist-new/assets/css/**/*.css',
          ],
          platform: 'browser',
          sourcemap: true,
          bundle: true,
          minify: true,
          external: ['*.png', '*.jpg', '*.jpeg', '*.webp', '*.svg'],
          outdir: dist,
          allowOverwrite: true,
        });

      compile('./views');

      const createFile = (location, text) => {
        writeFileSync(
          fileURLToPath(new URL('./views/dist-new/' + location, import.meta.url)),
          paintSource(loadTemplates(text))
        );
      };

      createFile('assets/json/splash.json', JSON.stringify(splashRandom));

      if (config.disguiseFiles) {
        const compress = async (dir, recursive = false) => {
          for (const file of readdirSync(dir)) {
            const fileLocation = dir + '/' + file;
            if (file.endsWith('.html'))
              writeFileSync(
                fileLocation,
                Buffer.from(
                  await new Response(
                    new Blob([
                      tryReadFile(fileLocation, import.meta.url, false),
                    ])
                      .stream()
                      .pipeThrough(new CompressionStream('gzip'))
                  ).arrayBuffer()
                )
              );
            else if (
              recursive &&
              lstatSync(fileLocation).isDirectory() &&
              file !== 'deobf'
            )
              await compress(fileLocation, true);
          }
        };
        await compress('./views/dist-new');
        await compress('./views/dist-new/pages', true);
      }

      rmSync(distFinal, { force: true, recursive: true });
      renameSync(dist, distFinal);

      break;
    }

    case 'format': {
      exec('npx prettier --write .', (error, stdout) => {
        if (error) {
          console.error('[Clean Error]', error);
        }
        console.log('[Clean]', stdout);
      });
      break;
    }

    /* Kill all node processes and fully reset PM2. To be used for debugging.
     * Using npx pm2 monit, or npx pm2 list in the terminal will also bring up
     * more PM2 debugging tools.
     */
    case 'kill':
      if (process.platform === 'win32')
        exec(
          '( npx pm2 delete ecosystem.config.js ) ; taskkill /F /IM node*',
          (error, stdout) => {
            console.log('[Kill]', stdout);
          }
        );
      else
        exec(
          'npx pm2 delete ecosystem.config.js; pkill node',
          (error, stdout) => {
            console.log('[Kill]', stdout);
          }
        );
      break;

    /* Make a temporary server solely to test startup errors. The server will
     * stop the command if there is an error, and restart itself otherwise.
     * This uses the same command for both Windows and other platforms, but
     * consequently forces the server to stay completely silent after startup.
     */
    case 'workflow': {
      const tempServer = fork(
        fileURLToPath(new URL('./backend.js', import.meta.url)),
        {
          cwd: process.cwd(),
          stdio: ['inherit', 'pipe', 'pipe', 'ipc'],
          detached: true,
        }
      );
      tempServer.stderr.on('data', (stderr) => {
        // The temporary server will print startup errors that aren't deprecation
        // warnings; stop the process and return an error exit code upon doing so.
        if (stderr.toString().indexOf('DeprecationWarning') >= 0)
          return console.log(stderr.toString());
        console.error(stderr.toString());
        tempServer.kill();
        process.exitCode = 1;
      });
      tempServer.stdout.on('data', () => {
        // There are no startup errors by this point, so kill the server and start
        // over. The restart alters stdio to prevent the workflow check from hanging.
        tempServer.kill();
        const server = fork(
          fileURLToPath(new URL('./backend.js', import.meta.url)),
          // The stdio: 'ignore' makes the server completely silent, yet it is also
          // why this works for Windows when the start command's version does not.
          { cwd: process.cwd(), stdio: 'ignore', detached: true }
        );
        server.unref();
        server.disconnect();
      });
      tempServer.unref();
      tempServer.disconnect();
      break;
    }

    // No default case.
  }

process.exitCode = process.exitCode || 0;
