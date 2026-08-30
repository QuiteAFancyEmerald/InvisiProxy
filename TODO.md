This will be our nonexhaustive todo list for InvisiProxy LTS v6.x.x and above. Release for production will be v8.x.x and above.

## Priority

- [ ] Make InvisiProxy work on Firefox (requires downloading malware to test :()
- [ ] Fix abnormal search handling
- [ ] Class managling and DOM masquerading functionality to Scramjet (or stealth window) 
- [ ] Font obfuscation middleware
- [ ] Implement multi-lang support!
- [ ] Include default NGINX configuration for Docker Compose (will become the recommended method of hosting)
- [ ] SolidJS rewrite

#### Known Regressions
- Bing will leak out of the respective stealth frame
- Clean epoxy errors if unreleated to ProxyTransports

## Proxy/Site Functionality
- [ ] Improve mobile support (epoxy should be the default; fix UI bugs)
- [ ] Implement sandboxing techniques to prevent new tab leaks
- [ ] Improve onboarding expierence 
- [ ] Add bookmarks menu (source wise already present pretty much)
- [ ] Add Chii + ensuring users can access devtools while browsing; or utilize Scramjet playground instead - partial
- [ ] Allow for custom SOCK5 proxy layering (HTTP and SOCKS4 scheme as well)
- [ ] Add selector for default proxy; behavior is upon clicking on logo in omnibox it will direct back to the selected proxy in Settings
- [x] Update to Scramjet v2.0.67-alpha.2 fixing several regressions - done
- [x] Omnibox should state what the current site the user is on like a proper URL bar 
- [x] Improve adblocking functions on site using Workerware + a pre-bundled uBlock Origin
- [x] Implement advanced data URI system
- [x] Allow custom Wisp urls from the settings menu (not config side)
- [x] Setting to open multiple stealth frames; basically about:blank but using our system. Pops out in another tab
- [x] Update to Scramjet v2.0.67-alpha - done
- [x] Update to use scramjetFrame instead of our own window handling (or whatever 2.0.67-alpha requires) - done
- [x] Swap to pnpm and node 26 - done
- [x] Swap to mrrowisp over wisp-js for security and performance - done
- [x] Hide local browser history on launch - done
- [x] Setting to open about:blank and blob frames - done
- [x] Transport Options Swapping on Frame (Settings Menu doesn't swap) - done
- [x] Update respective site branding - done
- [x] Fix GeForce Now support - done
- [x] Swap to wisp-js over wisp-server-node for security and performance - done
- [x] Fix keyword/descriptor randomisation - done
- [x] Adapt Wisp protocol replacing bare which is very unsecure - done
- [x] Improved error handling for proxy errors - done
- [x] Ensure Ultraviolet is updated to support bare-mux and wisp - done
- [x] Ensure Scramjet is added and works together with UV's implementation - done
- [x] Adapt Scramjet as main proxy for the project - done
- [x] Refactor register-sw.js - done
- [x] Add Rammerhead support - done
- [x] Fix slow Ultraviolet speeds despite being local; something on the backend?? - done
- [x] Fix Ultraviolet on Firefox - (partial/needs work)
- [x] Adapt Applications page to use Scramjet (for Reddit, YouTube, Discord) - done
- [x] Added libcurl transport and epoxy transport to meet standards of SJ + Wisp - done
- [x] SOCKS5/Tor routing option that can be configured as a settings menu option - done
- [x] SOCKS5 regional proxy implementation - done
- [x] Update Applications page to reflect modern fast links (use examples from the modern web proxy base) - done. can be expanded later
- [x] Update settings menu again to make more room for more features - done
- [x] Update csel.js (after Setting menu redesign) to support custom transports, icon swap, routing - done
- [x] Flesh out and rework the UV / Scramjet / bare client error page - done
- [x] Update sw.js to support workerware (https://github.com/MercuryWorkshop/workerware)-- This is not done however we have our own middleware system implemented for adblocking, etc.
- [x] Omnibox autoupdate script (for the Google/Bing style auto suggest feature) - done
- [x] Omnibar functionality (back and forward navigation, settings menu and create new stealth page with URL) - done
- [x] Games library will feature new games - done
- [x] Servers now utilise NextDNS w/ ads and malware blocked; anycast + low latency - done
- [x] Revamp the Stealth Frame with a slight animation (ease in and then the wheeling loading with a gradient fading away once its loaded or shows the error page LOL), a loading wheel/page and lastly a omnibox widget. It will have like nav buttons, some of the settings from the settings menu, a home button, a button that brings up the Setting menu and be in a designed position. Intent is to reduce the back/forth nature that users have to do currently making it more tedious to use the site. - partial. needs functionality.

## Code Cleanup

- [x] Optimize the JS. This time it won't be in one line and will be somewhat thoroughly commented.
- [x] Ensure all the original submodules get added back to HU-Archive
- [x] SEO overhaul adapted from the v3 SEO Guide format - partial
- [x] Optimize the stylesheets and the HTML layout. Add more proper commenting and redivide the code so that it's less hard on the eyes.
- [x] Remove all current obfuscation in the source code. It needs to be dynamically obfuscated if anything, or not obfuscated at all. This option will be a config option on the server side before rendering with Fastify for a performance focus. Meta elements will have an additonal attribute indicating if they should be moved. This is to ensure a SEO source can be served by config or a source focused on pure censorship evasion.
- [x] Restructure navigation scripts to ensure updated proxy functionality is sanitized and effective - done
- [x] Particles.js automatically adjusting per display size - done
- [x] Fix routes.mjs throwing with incorrect paths - done
- [x] Create CI testing script - done
- [x] XSS and fingerprinting protection (may need updates) - done
- [x] Greatly improved native source rewrites and routing - done
- [x] Update games navigation JS and page/change to JSON object system - done
- [x] Mobile support - (partial)
- [x] Fastify routes modified to ensure perfect SEO. This means absolute paths such as /example instead of ?z - done
- [x] Randomize the \_\_uv$config global, and optionally randomize the UV prefix and URL encoding via cookies

## Site Redesign

- [x] Documentation on-site + Getting Started information updated (Tor, etc.) - partial; good enough
- [x] Update colors + add themes - done
- [x] Landing Cards - done
- [x] Change fonts to cleaner look
- [x] Add more AOS interactions on scroll or hover
- [x] Add subtle noise to background elements
- [x] Toggle elements
- [x] Other card options
- [x] Radial blur elements
- [x] Code standard examples - in source
- [x] Horizontal/general movement on scroll with AOS
- [x] Showcase dev dependencies
- [x] Update branding and icons
- [x] Landing Page 
- [x] Settings Menu - partial I want to fix some colours
- [x] More Dropdown Menu
- [x] Web Proxies page
- [x] Application page
- [x] Games Library page
- [x] Emulators Library page
- [x] Emu Library page
- [x] Web Games page
- [x] Flash Games page
- [x] FAQ page
- [x] Credits page
- [x] TOS page
- [x] Footer Design
- [x] Header Design

## Community Requests

- [x] Add [Quake WASM](https://github.com/GMH-Code/Quake-WASM)
- [x] Celeste WASM

## Changelog (Old; too lazy to type it all out now)

- Added wisp support
- Fixed AD config setting being opt-out; ads are not implemented in the project however
- Added Rammerhead support (locally)
- Drastically updated visuals across the service and refactored stylesheets
- Bumped games page functionality
- Updated randomization scripts to ES6 syntax and implemented the alternative to RegEx string replacement
- Helmet for express implemented into backend
- Improved component handling via templates.mjs along with deletion of obsolete files that previously handled this standard in a poor format
- Fixed oddly slow speeds with Ultraviolet (as well as a general version bump to support epoxy-tls and bare-mux)
- Implemented testing scripts for an improved GitHub actions workflow by doing a quick test on proxy + site functionality
- Greatly optimized client-side scripts across the site with a new standard, and generally reworked to no longer leave global variables
- Changes to server.mjs with path logic and error handling
- Updated standards for common scripts
- libcurl and bare-as-module support added
- Deleted 5 JS scripts and moved lots of data into JSON files. Big reorganization. Games menu core scripts now nested inside of common.js utilizing a JSON system
- Massive updates to the Settings menu visually and functionality wise; added Bare-Mux support for swapping transports to work with Ultraviolet, default icons and selective adblocking + Tor on any proxy instances
- CSS Has been partially restructured for mobile support, and is now properly arranged into clearly labeled sections (for the most part)
- Incorporated makeshift domain blacklisting functionality into Ultraviolet, currently used for blocking ads if ads are disabled in settings
- Fleshed out the SEO with more descriptions and better labeling
- Switched to Fastify for serving content from the backend; a separate Express backend file is kept in case it's still needed
- Rammerhead is now locally built into the InvisiLTS repository
- Simplified the InvisiLTS setup process and added more default npm commands
