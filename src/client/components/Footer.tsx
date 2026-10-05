import { route } from '../document-helpers.tsx';

export default function Footer() {
	return (
		<>
			<div class={'footerflex'}>
				<div class={'footerbrand'}>
					<h3>
						<a href={'/'} title={'InvisiProxy Homepage'}>
							InvisiProxy
						</a>
					</h3>
					<p>Global Web Proxy Innovation, Done Right.</p>
					<div class={'logo-potato'}></div>
				</div>
				<div class={'footerlist'}>
					<h3>{'Dependencies'}</h3>
					<ul>
						<li>
							<a
								target={'_blank'}
								rel={'noopener noreferrer'}
								href={route('/github/fastify')}
								title={
									'Fastify - Fast and low overhead web framework, for Node.js.'
								}
							>
								Fastify
							</a>
						</li>
						<li>
							<a
								target={'_blank'}
								rel={'noopener noreferrer'}
								href={route('/github/nord-theme')}
								title={
									'Nord Theme - An arctic, north-bluish color palette.'
								}
							>
								{'Nord Theme'}
							</a>
						</li>
						<li>
							<a
								target={'_blank'}
								rel={'noopener noreferrer'}
								href={route('/github/aos')}
								title={'AOS - Animate on scroll library.'}
							>
								AOS
							</a>
						</li>
						<li>
							<a
								target={'_blank'}
								rel={'noopener noreferrer'}
								href={route('/github/font-awesome')}
								title={
									'Font Awesome  - The iconic SVG, font, and CSS toolkit.'
								}
							>
								Font Awesome
								{'\n        '}
							</a>
						</li>
						<li>
							<a
								target={'_blank'}
								rel={'noopener noreferrer'}
								href={route('/wispurr')}
								title={
									'High-Performance and Feature Focused Wisp v1/v2 Server implementation in Golang.'
								}
							>
								Wispurr
								{'\n        '}
							</a>
						</li>
					</ul>
				</div>
				<div class={'footerlist'}>
					<h3>Transports</h3>
					<ul>
						<li>
							<a
								target={'_blank'}
								rel={'noopener noreferrer'}
								href={route('/github/libcurl-js')}
								title={
									'A port of libcurl to WebAssembly, for proxying HTTPS requests from the browser with full TLS encryption.'
								}
							>
								Libcurl
							</a>
						</li>
					</ul>
				</div>
				<div class={'footerlist'}>
					<h3>{'Services'}</h3>
					<ul>
						<li>
							<a
								target={'_blank'}
								rel={'noopener noreferrer'}
								href={route('/github/scramjet')}
								title={'Scramjet - Browse with Scramjet.'}
							>
								Scramjet
							</a>
						</li>
						<li>
							<a
								target={'_blank'}
								rel={'noopener noreferrer'}
								href={route('/github/wisp')}
								title={
									'Wisp - Wisp is a low-overhead, easy to implement protocol for proxying multiple TCP/UDP sockets over a single websocket.'
								}
							>
								Wisp Protocol
							</a>
						</li>
						<li>
							<a
								target={'_blank'}
								rel={'noopener noreferrer'}
								href={route('/github/proxy-transports')}
								title={
									'Proxy Transports - The transport interface used by Scramjet.'
								}
							>
								Proxy Transports
							</a>
						</li>
					</ul>
				</div>
				<div class={'footerlist'}>
					<h3>{'About'}</h3>
					<ul>
						<li>
							<a
								target={'_blank'}
								rel={'noopener noreferrer'}
								href={route('/status')}
								title={'TitaniumNetwork Status Page'}
							>
								Status
							</a>
						</li>
						<li>
							<a
								target={'_blank'}
								rel={'noopener noreferrer'}
								href={route('/github')}
								title={'InvisiProxy GitHub Repository'}
							>
								GitHub
							</a>
						</li>
						<li>
							<a
								target={'_blank'}
								rel={'noopener noreferrer'}
								href={route('/patreon')}
								title={`Follow ${'InvisiProxy on Patreon'}`}
							>
								Patreon
							</a>
						</li>
						<li>
							<a
								href={route('/terms')}
								title={'Privacy Policy and Terms of Service'}
							>
								{'Privacy and Terms of Service'}
							</a>
						</li>
						<li>
							<a
								href={route('/credits')}
								title={'Credits and Acknowledgements'}
							>
								{'Credits'}
							</a>
						</li>
					</ul>
				</div>
				<div class={'footerlist'}>
					<a href={'#header'} title={'Back to Top'}>
						<span class="sr-only">{'Back to Top'}</span>
						<i
							class={'fas fa-angle-double-up'}
							aria-hidden={'true'}
						></i>
					</a>
				</div>
			</div>
			<div class={'footersocials'}>
				<a
					target={'_blank'}
					rel={'noopener noreferrer'}
					href={route('/github')}
					title={`Follow ${'InvisiProxy on GitHub'}`}
				>
					<span class="sr-only">{`Follow ${'InvisiProxy on GitHub'}`}</span>
					<i class={'fab fa-github'} aria-hidden={'true'}></i>
				</a>
				<a
					target={'_blank'}
					rel={'noopener noreferrer'}
					href={route('/patreon')}
					title={`Follow ${'InvisiProxy on Patreon'}`}
				>
					<span class="sr-only">{`Follow ${'InvisiProxy on Patreon'}`}</span>
					<i class={'fab fa-patreon'} aria-hidden={'true'}></i>
				</a>
				<a
					target={'_blank'}
					rel={'noopener noreferrer'}
					href={route('/kofi')}
					title={`Follow ${'Developer on Ko-fi'}`}
				>
					<span class="sr-only">{`Follow ${'Developer on Ko-fi'}`}</span>
					<i class={'fas fa-coffee'} aria-hidden={'true'}></i>
				</a>
				<a
					target={'_blank'}
					rel={'noopener noreferrer'}
					href={route('/titaniumnetwork-documentation')}
					title={'View Documentation on TitaniumNetwork'}
				>
					<span class="sr-only">
						{'View Documentation on TitaniumNetwork'}
					</span>
					<i class={'fas fa-file-code'} aria-hidden={'true'}></i>
				</a>
			</div>
			<p class={'copyright'}>InvisiProxy LTS &amp;copy; 2020-2026</p>
		</>
	);
}
