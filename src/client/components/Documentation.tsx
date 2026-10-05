import { route, SEO } from '../document-helpers.tsx';

export default function Documentation() {
	return (
		<>
			<h1>InvisiProxy LTS</h1>
			<SEO>
				<p>
					<img
						src="https://github.com/QuiteAFancyEmerald/InvisiProxy/workflows/CI-Production/badge.svg"
						alt="GitHub Actions Status"
					/>
					<img
						src="https://github.com/QuiteAFancyEmerald/InvisiProxy/workflows/CI-Win/badge.svg"
						alt="GitHub Actions Status"
					/>
				</p>
			</SEO>
			<br />
			<p>
				{'\n  '}
				Read below for information if the official site is blocked or
				for obtaining more links. Can't deploy using any of the free
				options below? Check out Railway or look into cheap, paid VPS
				hosting solutions.
				{'\n'}
			</p>
			<p>
				<strong>
					Be sure to join TitaniumNetwork's Discord for more official
					site links:
				</strong>
				<a href={route('/titaniumnetwork-discord')}>
					https://discord.gg/unblock
				</a>
			</p>
			<br />
			<h3>GitHub Codespaces</h3>
			<details>
				<summary>Setup Instructions</summary>
				{'\n\n  - '}
				Fork (and star!) this repository to your GitHub account
				<br />
				{'\n  - '}
				Head to the official
				{'\n  '}
				<a href={route('/codespaces')}>{'Codespaces'}</a>
				{' website (ensure you\n  have a GitHub account already made)'}
				<br />
				{'\n  - Select '}
				<strong>{'New Codespaces'}</strong>
				{' and look for\n  '}
				<em>[USERNAME]/InvisiProxy</em>
				{' on your account'}
				<br />
				{'\n  - Ensure the branch is set to '}
				<code>{'master'}</code>
				{' and the dev container\n  configuration is set to '}
				<strong>InvisiProxy LTS</strong>
				<br />
				{'\n  - Select '}
				<strong>{'Create Codespace'}</strong>
				{' and allow the container to setup'}
				<br />
				{'\n  - Type '}
				<code>{'pnpm run fresh-install'}</code>
				{' and '}
				<code>{'pnpm start'}</code>
				{' in the terminal'}
				<br />
				{
					'\n  - Click "Make public" on the application popup, then access the deployed\n  website via the ports tab.'
				}
				<br />
			</details>
			<br />
			<h2>{'How to Setup'}</h2>
			<h4>
				{'\n  '}
				It is highly recommended you switch branches via your IDE to a
				production released branch. Often the master branch contains
				unstable or WIP changes.
				{'\n'}
			</h4>
			<h4>
				{'\n  '}
				Example: v6.x_production instead of master
				{'\n'}
			</h4>
			<h3>{'Terminal'}</h3>
			<p>
				{'\n  '}
				Either use the button above to deploy to the deployment options
				above or type the commands below on a dedicated server:
				{'\n'}
			</p>
			<pre>
				<code>{`pnpm run fresh-install
pnpm start

# Stop with Ctrl+C, then run pnpm start again to restart

# Build or develop
pnpm build
pnpm dev`}</code>
			</pre>
			<p>
				{'\n  '}
				This website is hosted locally with Scramjet, Wisp, Proxy
				Transports, and LibcurlTransport built-in.
				{'\n'}
			</p>
			<h3>{'Configuration'}</h3>
			<h4>{'Server Configuration Setup'}</h4>
			<p>
				{'\n  '}
				The default place for the proxy when its started is
				{'\n  '}
				<code>{'http://localhost:8080'}</code>
				{', but you can change it if needed in\n  '}
				<code>{'./config.json'}</code>
				{'. You can also modify the other\n  configuration values at '}
				<code>{'./config.json'}</code>
				{'. '}
				Set the port in configuration or override it with the PORT
				environment variable. Other settings are in{' '}
				<code>{'./config.json'}</code>
				{'.\n  '}
				Localized changes for source randomization, auto-minify, etc.
				are located in
				{'\n  '}
				<code>{'./config.json'}</code>
				{'.\n'}
			</p>
			<br />
			<h4>Tor/Onion Routing Setup</h4>
			<p>
				{'\n  '}
				Simply host Tor using this guide:
				{'\n  '}
				<a href={route('/tr')}>
					https://tb-manual.torproject.org/installation/
				</a>
			</p>
			<p>
				{'\n  '}
				If you are hosting InvisiProxy LTS on a VPS utilizing Ubuntu
				consider attaching Tor to systemctl for easier production
				management. Once Tor is up and running on either Linux or
				Windows it will work automatically with InvisiProxy LTS when
				enabled by the user via the Settings menu.
				{'\n'}
			</p>
			<br />
			<h4>Proxy Configuration</h4>
			<p>
				{'\n  '}
				The primary location for tweaking any web proxy related settings
				assigned via the Settings menu is{' '}
				<code>{'./views/assets/js/register-sw.js'}</code>
				{'.'} Here you can modify the provided transport options set
				locally via localStorage, swap out SOCKS5 proxies, change Onion
				routing ports, specify a blacklist, and more.
				{'\n'}
			</p>
			<table class="documentation-table">
				<thead>
					<tr>
						<th scope="col">{'Option'}</th>
						<th scope="col">{'Description'}</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>
							<code>{'getSWRoute'}</code>
						</td>
						<td>
							{
								'Selects the Scramjet service worker based on adblocking.'
							}
						</td>
					</tr>
					<tr>
						<td>
							<code>{'proxyUrl'}</code>
						</td>
						<td>
							{
								'Specifies a SOCKS5 protocol URL defaulting to the default Tor proxy port.'
							}
						</td>
					</tr>
					<tr>
						<td>
							<code>{'transportUrl'}</code>
						</td>
						<td>
							{
								'The Libcurl module implementing Proxy Transports for use with Wisp.'
							}
						</td>
					</tr>
					<tr>
						<td>
							<code>{'wispUrl'}</code>
						</td>
						<td>
							{'Modify the pathname or url handling for Wisp.'}
						</td>
					</tr>
					<tr>
						<td>
							<code>{'getTransportOptions'}</code>
						</td>
						<td>
							{
								'Configures Wisp and the optional SOCKS5 proxy for Libcurl.'
							}
						</td>
					</tr>
					<tr>
						<td>
							<code>{'Controller'}</code>
						</td>
						<td>
							{
								'This constructor allows you to swap out the prefix used for Scramjet dynamically and specify file locations.'
							}
						</td>
					</tr>
				</tbody>
			</table>
		</>
	);
}
