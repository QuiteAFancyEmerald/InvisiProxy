import {
	Cooking,
	Splash,
	Inline,
	route,
	values,
} from '../document-helpers.tsx';
import AntiExfil from '../components/AntiExfil.tsx';
import Header from '../components/Header.tsx';
import Footer from '../components/Footer.tsx';

export default function Home() {
	return (
		<>
			<Cooking />
			<AntiExfil />
			<nav
				id={'header'}
				class={'fullwidth'}
				aria-label={'Main navigation'}
			>
				<Header />
			</nav>
			{values.showSplash && (
				<div id={'banner'} class={'fullwidth'}>
					<p class={'text-center'}>
						<Splash />
					</p>
				</div>
			)}
			<div id={'mainbody'} class={'fullwidth'}>
				<div id={'background'} class={'fullwidth'}></div>
				<section
					class={'home-grid-container'}
					aria-label={'Home Grid Container'}
				>
					<div class={'home-text'}>
						<h1>
							<span>End Internet Censorship.</span>
						</h1>
						<h1>Privacy right at your fingertips.</h1>
						<a
							class={'homebutton'}
							href={'/browsing'}
							aria-label={'Bypass now'}
						>
							Browse Now
						</a>
						<a
							class={'homebutton mobile'}
							href={'#scrollfix'}
							aria-label={'Browse now'}
						>
							Browse Now
						</a>
					</div>
					<Cooking />
					<section
						class={'mac-window'}
						aria-label={'Command Line Instructions'}
					>
						<div class={'mac-title-bar'}>
							<div class={'mac-buttons'}>
								<span class={'mac-close'}></span>
								<span class={'mac-minimize'}></span>
								<span class={'mac-maximize'}></span>
							</div>
						</div>
						<div class={'mac-content'}>
							<p>
								<span class={'cmd'}>
									{'git clone --recurse-submodules'}
									<span class={'url'}>
										{'\n                  '}
										https://github.com/QuiteAFancyEmerald/InvisiProxy.git
									</span>
								</span>
								<br />
								<span class={'cmd'}>
									{'cd '}
									InvisiProxy
									{'\r'}
								</span>
								<br />
								<span class={'comment'}>
									{
										'For first-time setup on a production branch...'
									}
								</span>
								<br />
								<span class={'cmd'}>
									{'pnpm run fresh-start\r'}
								</span>
								<br />
								<span class={'comment'}>
									{'Or typical uses...'}
								</span>
								<br />
								<span class={'cmd'}>{'pnpm start\r'}</span>
								<br />
								<span class={'comment'}>
									{'For development...'}
								</span>
								<br />
								<span class={'cmd'}>{'pnpm dev\r'}</span>
								<br />
								<br />
								<span class={'comment'}>
									InvisiProxy LTS
									{` v${values.version} // master`}
								</span>
								<br />
								<span class={'comment'}>{'Node.js v26.x'}</span>
								<br />
								<span class={'comment'}>
									{'Fastify v5.8.5'}
								</span>
								<br />
								<br />
								<span class={'downarrowgroup'}>
									<i class={'fas fa-level-down-alt'}></i>
									<i class={'fas fa-level-down-alt'}></i>
									<i class={'fas fa-level-down-alt'}></i>
								</span>
							</p>
						</div>
					</section>
				</section>
				<Cooking />
				<div id={'scrollfix'}>{'­'}</div>
				<div data-aos={'fade-right'} class={'hero-grid-container'}>
					<div class={'box-hero'}>
						<div class={'hero-content'}>
							<div class={'hero-text-wrap'}>
								<div class={'brand-logo-container'}>
									<i
										class={'far fa-window-restore palered'}
									></i>
									<h2 class={'hero-content-header'}>
										{'\n                  '}
										InvisiProxy is free.
										{'\n                '}
									</h2>
								</div>
								<p>
									{'\n                '} Being open source,
									you can easily fork this repository and self
									host for maximum privacy control. In
									contrast to numerous other web proxy
									services, InvisiProxy stands out with
									end-to-end encryption, hidden history,
									Tor/Onion routing in Chromium, complete
									transparency and privacy control. We collect
									no user data on our official instances.{' '}
									{'\n              '}
								</p>
								<div class={'brand-logo-container'}>
									<i
										class={'far fa-window-restore palered'}
									></i>
									<h2 class={'hero-content-header'}>
										{'\n                  '}
										InvisiProxy is fast and highly advanced.
										{'\n                '}
									</h2>
								</div>
								<p>
									{'\n                '} InvisiProxy delivers
									exceptional web proxy performance. It boasts
									a robust feature set including
									reCAPTCHA/Botguard support, Tor networking,
									SOCKS5 proxychaining, customizable blacklist
									settings, leak prevention, hidden history
									settings, and extensive site compatibility
									support via Scramjet + Wisp (Paired with
									Libcurl Transport). Other popular services
									like CroxyProxy or Proxium often only do
									half the job of rewriting assets leaking
									requests while being a privacy concern.{' '}
									{'\n              '}
								</p>
								<div class={'brand-logo-container'}>
									<i
										class={'far fa-window-restore palered'}
									></i>
									<h2 class={'hero-content-header'}>
										{'\n                  '}
										InvisiProxy is practical.
										{'\n                '}
									</h2>
								</div>
								<p>
									{'\n                '} Leveraging our source
									randomization and projects like Proxy
									Transports, Wisp, and Scramjet, this project
									delivers a seamless experience that
									circumvents web, government and network
									filters. This is achieved entirely within
									your browser as a website and our backend
									(or your own if self-hosting), enabling
									users to bypass even the most invasive
									censorship blocks. No need to download
									anything simply type in the domain for
									InvisiProxy, join the discord to obtain
									mirrors if blocked and browse anonymously.{' '}
									{'\n              '}
								</p>
							</div>
						</div>
						<div class={'image-container-hero'}>
							<img
								class={'hero'}
								src={route('/assets/img/logo-light.webp')}
								alt={'InvisiProxy Logo Hero'}
							/>
							<h1>InvisiProxy LTS</h1>
							<h2>{'Free and transparent for use'}</h2>
							<a
								class={'fancybutton glowbutton'}
								href={route('/browsing')}
							>
								{'Browse Now'}
							</a>
							<a
								class={'fancybutton glowbutton'}
								href={route('/patreon')}
							>
								{'Donate'}
							</a>
						</div>
					</div>
				</div>
				<Cooking />
				<div data-aos={'fade-right'} class={'carousel-container'}>
					<div class={'carousel-wrapper'}>
						<div class={'carousel'}>
							<div class={'carousel-inner'}>
								<div class={'dependencylogo'}>
									<img
										loading={'lazy'}
										src={route('/assets/img/fastify.webp')}
										alt={'Fastify'}
									/>
								</div>
								<div class={'dependencylogo'}>
									<img
										loading={'lazy'}
										src={route(
											'/assets/img/nordtheme.webp'
										)}
										alt={'Nord Theme'}
									/>
								</div>
								<div class={'dependencylogo'}>
									<img
										loading={'lazy'}
										src={route('/assets/img/nodejs.webp')}
										alt={'Nodejs'}
									/>
								</div>
								<div class={'dependencylogo'}>
									<img
										loading={'lazy'}
										src={route(
											'/assets/img/fontawesome.webp'
										)}
										alt={'Font Awesome'}
									/>
								</div>
								<div class={'dependencylogo'}>
									<img
										loading={'lazy'}
										src={route('/assets/img/webretro.webp')}
										alt={'Webretro'}
									/>
								</div>
								<div class={'dependencylogo'}>
									<img
										loading={'lazy'}
										src={route('/assets/img/ruffle.webp')}
										alt={'Ruffle'}
									/>
								</div>
								<div class={'dependencylogo'}>
									<img
										loading={'lazy'}
										src={route('/assets/img/scramjet.webp')}
										alt={'Scramjet'}
									/>
								</div>
								<div class={'dependencylogo'}>
									<img
										loading={'lazy'}
										src={route('/assets/img/fastify.webp')}
										alt={'Fastify'}
									/>
								</div>
								<div class={'dependencylogo'}>
									<img
										loading={'lazy'}
										src={route(
											'/assets/img/nordtheme.webp'
										)}
										alt={'Nord Theme'}
									/>
								</div>
								<div class={'dependencylogo'}>
									<img
										loading={'lazy'}
										src={route('/assets/img/nodejs.webp')}
										alt={'Nodejs'}
									/>
								</div>
								<div class={'dependencylogo'}>
									<img
										loading={'lazy'}
										src={route(
											'/assets/img/fontawesome.webp'
										)}
										alt={'Font Awesome'}
									/>
								</div>
								<div class={'dependencylogo'}>
									<img
										loading={'lazy'}
										src={route('/assets/img/webretro.webp')}
										alt={'Webretro'}
									/>
								</div>
								<div class={'dependencylogo'}>
									<img
										loading={'lazy'}
										src={route('/assets/img/ruffle.webp')}
										alt={'Ruffle'}
									/>
								</div>
								<div class={'dependencylogo'}>
									<img
										loading={'lazy'}
										src={route('/assets/img/scramjet.webp')}
										alt={'Scramjet'}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
				<Cooking />
				<div class={'text-center'}>
					<div class={'splashstroke'}>
						<div>
							<h1 class={'splashstrokeheader'}>
								{'\n              Designed with focus'}
								<span class={'underline-svg'}></span>
								{'.\n            '}
							</h1>
						</div>
						<svg
							aria-hidden="true"
							class={'underline-svg'}
							viewBox={'0 0 390 55'}
							fill={'none'}
						>
							<defs>
								<linearGradient
									gradientUnits={'userSpaceOnUse'}
									x1={'192.539'}
									y1={'1.537'}
									x2={'192.539'}
									y2={'51.098'}
									id={'gradient-0'}
									gradientTransform={
										'matrix(-0.001215, 0.999999, -7.795296, -0.009463, 402.484802, -163.600372)'
									}
								>
									<stop
										offset={'0'}
										attr:style={
											'stop-color: rgba(135, 149, 221, 1)'
										}
									></stop>
									<stop
										offset={'1'}
										attr:style={
											'stop-color: rgba(56, 80, 198, 1)'
										}
									></stop>
								</linearGradient>
							</defs>
							<path
								attr:style={
									'\n                stroke: url(#gradient-0);\n                stroke-width: 2px;\n                stroke-linecap: round;\n              '
								}
								d={
									'M 3 8.997 C 3 8.997 386.2758229569146 -1.5119911685214125 386.872 5.292 C 387.1840859001393 8.853743500517725 283.1432491171007 17.09919545317559 283.106 22.586 C 283.07461319934777 27.209283823450303 356.0628379238926 30.04524568361604 356.607 35.864 C 357.0292218177662 40.3788405823717 314.606 51.924 314.606 51.924'
								}
							></path>
						</svg>
					</div>
				</div>
				<Cooking />
				<div class={'grid-container'}>
					<div data-aos={'fade-right'} id={'info'} class={'box-card'}>
						<div class={'content'}>
							<div class={'text-wrap'}>
								<h1>{'Overview'}</h1>
								<p>
									{'\n                '} InvisiProxy LTS, an
									experimental web proxy service, can bypass
									web filters or 'blockers' regardless of
									whether the method of censorship is
									client-side or network-based. This includes
									the ability to bypass content blockers
									overseas put in place by governments, chrome
									extensions, localized client firewalls, and
									network-related filters.{' '}
									{'\n              '}
								</p>
								<p>
									{'\n                '} Please consider
									donating to this project so we can keep
									things free! We offer more domains per
									month, beta access, personal domains and
									priority feature requests. <br />
									{'\n                You can donate '}
									<a href={route('/patreon')}>{'here'}</a>
									{'.\n              '}
								</p>
							</div>
						</div>
						<div class={'image-container'}>
							<img
								class={'hero'}
								src={route('/assets/img/server.webp')}
								alt={'Server Icon'}
							/>
						</div>
					</div>
					<div data-aos={'fade-left'} class={'box-card'}>
						<div class={'content'}>
							<div class={'text-wrap'}>
								<h1>{'Intent'}</h1>
								<p>
									{'\n                '} This project serves
									mostly as a proof of concept for the ideal
									clientless solution to bypassing censorship.
									Being a secure web proxy service, it
									supports numerous sites while being updated
									frequently and concentrating on detail with
									design, mechanics, and features.{' '}
									{'\n              '}
								</p>
								<p>
									{
										"\n                This project's palette is built using\n                "
									}
									<a href={'https://nordtheme.com'}>
										{'Nord Theme'}
									</a>
									{
										' for its optimal\n                design color palette and prioritization of readable code syntax\n                and UI components.\n              '
									}
								</p>
							</div>
						</div>
						<div class={'image-container'}>
							<img
								class={'hero'}
								src={route('/assets/img/filecode.webp')}
								alt={'File Code Icon'}
							/>
						</div>
					</div>
					<div data-aos={'fade-right'} class={'box-card'}>
						<div class={'content'}>
							<div class={'text-wrap'}>
								<h1>{'Usage'}</h1>
								<p>
									{
										'\n                Head to the\n                '
									}
									<a href={route('/browsing')}>Browse</a>
									{'\n                '}
									page and select one of the proxies featured!
									Afterwards, type out the site you wish to
									access in the search box. Each web proxy has
									its own level of effectiveness, speed and
									security. It is recommended to use Scramjet.
									<br />
									<br />
									Example Website To Unblock:
									{'\n                '}
									<code>{'https://youtube.com'}</code>
								</p>
							</div>
						</div>
						<div class={'image-container'}>
							<img
								class={'hero'}
								src={route('/assets/img/shield.webp')}
								alt={'Shield Icon'}
							/>
						</div>
					</div>
					<div data-aos={'fade-left'} class={'box-card'}>
						<div class={'content'}>
							<div class={'text-wrap'}>
								<h1>Apps</h1>
								<p>
									{'\n                '} InvisiProxy features
									a collection of pre-linked applications,
									including YouTube, Spotify,{' '}
									{'\n              '}
								</p>
							</div>
						</div>
						<div class={'image-container'}>
							<img
								class={'hero'}
								src={route('/assets/img/apps.webp')}
								alt={'Application Icon'}
							/>
						</div>
					</div>
					<div data-aos={'fade-right'} class={'box-card'}>
						<div class={'content'}>
							<div class={'text-wrap'}>
								<h1>Hosting and Deployment</h1>
								<p>
									<strong>InvisiProxy LTS</strong> is an
									open-source solution designed with
									modularity, ease of use, and easy deployment
									in mind. Key features include ad-blocking,
									flexible source code generation, and
									advanced proxy navigation.
									<br />
									<br />
									{'\n                '}
									For comprehensive setup instructions, visit
									our official
									{'\n                '}
									<a
										href={route('/github')}
										title={`${'InvisiProxy LTS'} GitHub Repository`}
										target={'_blank'}
										rel={'noopener noreferrer'}
									>
										{'GitHub repository'}
									</a>
									{', the\n                '}
									<a
										href={route(
											'/titaniumnetwork-documentation'
										)}
										title={'TitaniumNetwork Documentation'}
										target={'_blank'}
										rel={'noopener noreferrer'}
									>
										TitaniumNetwork Docs
									</a>
									{', or\n                '}
									<a
										href={route('/documentation')}
										title={'Additional Hosting Information'}
									>
										the built-in documentation provided here
									</a>
									{'.\n              '}
								</p>
							</div>
						</div>
						<div class={'image-container'}>
							<img
								class={'hero'}
								src={route('/assets/img/hosting.webp')}
								alt={'Hosting and Deployment Icon'}
								title={
									'Hosting and Deployment for InvisiProxy LTS'
								}
							/>
						</div>
					</div>
					<div data-aos={'fade-left'} class={'box-card'}>
						<div class={'content'}>
							<div class={'text-wrap'}>
								<h1>{'Contributing'}</h1>
								<p>
									<strong>InvisiProxy LTS</strong>
									{'\n                '}
									thrives due to the dedicated efforts of our
									amazing contributors. As an open-source
									project,
									{'\n                '}
									<strong>InvisiLTS</strong> relies on the
									collective skills and passion of its
									community to drive continuous improvement
									and deliver the best experience for all
									users.
									{'\n              '}
								</p>
								<p>
									{
										'\n                To start contributing, visit our\n                '
									}
									<a
										href={route('/github')}
										title={
											'InvisiProxy LTS GitHub Repository'
										}
										target={'_blank'}
										rel={'noopener noreferrer'}
									>
										{'GitHub repository'}
									</a>
									{', and join our\n                '}
									<a
										href={route('/titaniumnetwork-discord')}
										title={'InvisiProxy LTS Discord Server'}
										target={'_blank'}
										rel={'noopener noreferrer'}
									>
										Discord server
									</a>
									{
										'\n                for real-time discussions and updates. Suggestions and feedback\n                are also welcome.\n              '
									}
								</p>
							</div>
						</div>
						<div class={'image-container'}>
							<img
								class={'hero'}
								src={route('/assets/img/git.webp')}
								alt={'Contributing GitHub Icon'}
								title={
									'Contribute to InvisiProxy LTS on GitHub'
								}
							/>
						</div>
					</div>
				</div>
				<div data-aos={'fade-left'} class={'hero-grid-container'}>
					<div class={'box-hero'}>
						<div class={'hero-content'}>
							<div class={'hero-text-wrap'}>
								<div class={'brand-logo-container'}>
									<i
										class={'far fa-window-restore palered'}
									></i>
									<h2 class={'hero-content-header'}>
										{'\n                  '}
										Bypass Censorship and Filters.
										{'\n                '}
									</h2>
								</div>
								<p>
									{'\n                '}
									Great Firewall of China? Censorship? No
									problem. InvisiProxy LTS is an open-source
									{'\n                '}
									<strong>public web proxy</strong>. Enjoy
									unrestricted access to online content and
									secure browsing with our advanced
									{'\n                '}
									<strong>web proxy unblocking</strong>
									{'\n                '}
									features. This project grants you the
									ability to host it anywhere and bypass
									regional blocks.
									{'\n              '}
								</p>
								<div class={'brand-logo-container'}>
									<i
										class={'far fa-window-restore palered'}
									></i>
									<h2 class={'hero-content-header'}>
										{'\n                  '}
										100% Free Web Proxy Browsing.
										{'\n                '}
									</h2>
								</div>
								<p>
									{'\n                '}
									Benefit from our
									{'\n                '}
									<strong>free web proxy service</strong>
									{' that helps\n                you '}
									<strong>unblock websites</strong> and access
									restricted content. Perfect for bypassing
									educational and/or workplace filters this
									project is made to unblock it all.
									{'\n              '}
								</p>
								<div class={'brand-logo-container'}>
									<i
										class={'far fa-window-restore palered'}
									></i>
									<h2 class={'hero-content-header'}>
										{'\n                  '}
										Utilize Tor Inside Chromium Browsers
										&amp; Firefox.
										{'\n                '}
									</h2>
								</div>
								<p>
									{'\n                '} Using InvisiProxy
									LTS, you can access the Tor network directly
									within your Chromium-based/Firefox-based
									browser. This allows you to browse the web
									anonymously, bypassing any regional
									restrictions. This project also supports
									setting custom SOCKS5 proxies to proxychain.{' '}
									{'\n              '}
								</p>
							</div>
						</div>
						<Cooking />
						<div class={'image-container-hero'}>
							<h1>{'Long Term Support FOSS Project'}</h1>
							<a
								class={'fancybutton glowbutton'}
								href={route('/browsing')}
							>
								Bypass Now
							</a>
						</div>
					</div>
				</div>
				<div class={'box-home text-center splashend'}>
					<h1>It's time to browse the internet freely.</h1>
					<a class={'homebutton'} href={'#scrollfix'}>
						Try InvisiProxy For Free
					</a>
					<a class={'homebutton mobile'} href={route('/browsing')}>
						Try InvisiProxy For Free
					</a>
				</div>
			</div>
			<div id={'footer'} class={'fullwidth'}>
				<Footer />
			</div>
			<Cooking />
			<Inline>
				<script src={route('assets/js/card.js', 'inline')} />
			</Inline>
		</>
	);
}
