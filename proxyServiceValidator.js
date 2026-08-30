// This file is solely used for the automatically run GitHub job, which checks to
// see if all InvisiProxy code is working properly (at least on an Ubuntu machine).

const axios = require('axios');
const { chromium } = require('playwright');

const testEndpoint = async (url) => {
  try {
    const response = await axios.get(url);
    return response.status === 200;
  } catch (error) {
    console.error(`Error ${error.code} while testing ${url}:`, error.message);
    return false;
  }
};

const generateUrl = async ({ omniboxId, urlPath, errorPrefix = 'failure' }) => {
  // Wait for the document to load before getting the omnibox.
  await new Promise((resolve) => {
    const waitLonger = () => setTimeout(resolve, 5000);
    if (document.readyState === 'complete') waitLonger();
    else window.addEventListener('load', waitLonger);
  });

  let omnibox = document.getElementById(omniboxId);
  omnibox = omnibox && omnibox.querySelector('input[type=text]');

  if (omnibox) {
    try {
      // Send an artificial input to the omnibox. The omnibox will create
      // a proxy URL and leave it as the input value in response.
      omnibox.value = urlPath;
      const generateInput = async () => {
        await omnibox.dispatchEvent(
          new KeyboardEvent('keydown', { code: 'Validator Test' })
        );
      };
      /* Keep trying to send an input signal every second until it works.
       * Implemented to account for a condition where the document has
       * finished loading, but the event handler for DOMContentLoaded has
       * not finished executing its script to listen for artificial inputs.
       */
      await generateInput();
      const inputInterval = setInterval(generateInput, 1000),
        resolveHandler = (resolve) => () => {
          clearInterval(inputInterval);
          resolve(omnibox.value);
        },
        // Wait up to 40 seconds for the omnibox to finish updating.
        loadUrl = new Promise((resolve) => {
          if (omnibox.value !== urlPath) resolveHandler(resolve)();
          else omnibox.addEventListener('change', resolveHandler(resolve));
        }),
        timeout = new Promise((resolve) => {
          setTimeout(resolveHandler(resolve), 40000);
        }),
        // Return the proxy URL that the omnibox left here.
        generatedUrl = await Promise.race([loadUrl, timeout]);
      return generatedUrl !== urlPath ? generatedUrl : errorPrefix;
    } catch (e) {
      return errorPrefix + ': ' + e.message;
    }
  } else {
    return errorPrefix + ': omnibox not defined';
  }
};

const testGeneratedUrl = async (url, headers) => {
  try {
    console.log('Testing generated URL:', url);

    const response = await axios.get(url, { headers });
    console.log(`Response status for ${url}:`, response.status);
    return response.status === 200;
  } catch (error) {
    console.error(`Error while testing generated URL ${url}:`, error.message);
    return false;
  }
};

const testServerResponse = async () => {
  const endpoints = [
    'http://localhost:8080/',
    'http://localhost:8080/test-404',
    'http://localhost:8080/browsing',
    'http://localhost:8080/physics', 
    'http://localhost:8080/networking', 
    'http://localhost:8080/documentation',
    'http://localhost:8080/questions',
    'http://localhost:8080/s',
    'http://localhost:8080/credits',
    'http://localhost:8080/privacy',
    'http://localhost:8080/interface', 
    'http://localhost:8080/wiki', 
    'http://localhost:8080/software', 
    'http://localhost:8080/assets/js/card.js',
    'http://localhost:8080/assets/js/common-1778310233.js',
    'http://localhost:8080/assets/js/csel.js',
    'http://localhost:8080/assets/js/register-sw.js',
    'http://localhost:8080/assets/txt/blacklist.txt',
    'http://localhost:8080/assets/json/links.json',
    'http://localhost:8080/gmt/index.js',
    'http://localhost:8080/gmt/worker.js',
    'http://localhost:8080/epoch/index.mjs',
    'http://localhost:8080/worker/working.js',
    'http://localhost:8080/worker/working-ctrl.api.js',
    'http://localhost:8080/worker/working-ctrl.sw.js',
    'http://localhost:8080/worker/working-ctrl.inject.js',
    'http://localhost:8080/network/networking.bundle.js',
    'http://localhost:8080/network/networking.sw.js',
    'http://localhost:8080/network/networking.config.js',
    'http://localhost:8080/network/networking.client.js',
    'http://localhost:8080/network/networking.handler.js',
  ];


  const results = await Promise.all(endpoints.map(testEndpoint));
  const allPassed = results.every((result) => result);

  if (allPassed) {
    console.log('All endpoints responded with status code 200. Test passed.');
    await testCommonJSOnPage();
  } else {
    console.error(
      'One or more endpoints failed to respond with status code 200. Test failed.'
    );
    process.exitCode = 1;
  }
};

const testCommonJSOnPage = async () => {
  const browser = await chromium.launch({
    args: [
      '--enable-features=NetworkService',
      '--enable-features=ServiceWorker',
      '--enable-features=InsecureOrigins',
    ],
    headless: true,
  });
  const context = await browser.newContext({
    ignoreHTTPSErrors: true,
  });
  await context.addInitScript(() => {
    try {
      window.localStorage.setItem('net-time-loader-key', navigator.userAgent);
    } catch (e) {
    }
  });
  const page = await context.newPage();
  page.on('pageerror', (err) => console.error('[page error]', err.message));

  try {
    const getHeaders = async () => {
      const headers = {};

      headers['User-Agent'] = await page.evaluate(() => navigator.userAgent);
      headers['Referer'] = await page.evaluate(() => window.location.href);

      return headers;
    };

    /*

                                                     xx   
  xx                                            xx    
   xxx                                        xx      
     xxx                                     xx       
       xxx                                  xx        
         xxx                              xx          
            xx                           xx           
             xx                         xx            
                                       xx             
                                      xx              
                                                      
                                                      
                                                      
                                                      
               x                    x                 
                                                      
                                                      
                                                      
                                                      
                                                      
                                                      
                        xxxxxxxxxxxxxxx               
             xxxxxxxxxxxx              xxxxx          
          xxxx                              xxx       
       xxx                                    xxx     
     xxx                                        xx    
    xx                                           xx   
   xx                                             xx  
 xxx                                               x  
 xx                                                 x 
xx                                                  xx

*/

    const testUltraviolet = async () => {
      const omniboxId = 'pr-uv',
        errorPrefix = 'failure',
        // For the hacky URL test further below, use the URL page's EXACT title.
        website = Object.freeze({
          path: 'example.com',
          title: 'Example Domain',
        });
      await page.goto('http://localhost:8080/networking', {
        waitUntil: 'load',
      });
      await page.evaluate(
        () =>
          new Promise((resolve) => {
            const ready = () => resolve();
            if (window.$invisiScramjet?.ready) return ready();
            window.addEventListener('s-ready', ready, { once: true });
            setTimeout(ready, 30000);
          })
      );
      const generatedUrl = await page.evaluate(generateUrl, {
        omniboxId,
        urlPath: website.path,
        errorPrefix,
      });

      const testResults = await page.evaluate(
        async ({ generatedUrl, pageTitle, errorPrefix }) => {
          const results = [{}, {}];
          results[0].ultraviolet = generatedUrl;

          if (
            !generatedUrl ||
            generatedUrl === errorPrefix ||
            generatedUrl.startsWith(errorPrefix + ':')
          ) {
            results[1].uvTestPassed = false;
            return results;
          }

          try {
            if (navigator.serviceWorker) {
              await navigator.serviceWorker.ready;
              if (!navigator.serviceWorker.controller) {
                await new Promise((resolve) => {
                  const onChange = () => {
                    navigator.serviceWorker.removeEventListener(
                      'controllerchange',
                      onChange
                    );
                    resolve();
                  };
                  navigator.serviceWorker.addEventListener(
                    'controllerchange',
                    onChange,
                    { once: true }
                  );
                  setTimeout(resolve, 5000);
                });
              }
            }

            // Test to see if the document title for example.com has loaded,
            // by appending an IFrame to the document and grabbing its content.
            const testGeneratedUrlHacky = async (url) => {
              const exampleIFrame = document.createElement('iframe');
              exampleIFrame.style.cssText =
                'position:fixed;width:0;height:0;border:0;visibility:hidden;pointer-events:none;';
              const readTitle = () => {
                try {
                  return exampleIFrame.contentWindow?.document?.title || '';
                } catch (e) {
                  return '<cross-origin: ' + e.message + '>';
                }
              };
              const readUvError = () => {
                try {
                  const doc = exampleIFrame.contentWindow?.document;
                  if (!doc) return null;
                  const trace = doc.getElementById('errorTrace');
                  const fetched = doc.getElementById('fetchedURL');
                  if (!trace && !fetched) return null;
                  return {
                    trace: trace?.value || trace?.textContent || '',
                    fetched: fetched?.textContent || '',
                  };
                } catch (e) {
                  return { trace: '<cross-origin>', fetched: '' };
                }
              };
              const settled = new Promise((resolve) => {
                exampleIFrame.addEventListener('load', () => {
                  setTimeout(() => {
                    if (readTitle() === pageTitle) resolve(true);
                  }, 250);
                });
              });

              const timeout = new Promise((resolve) => {
                setTimeout(() => resolve(readTitle() === pageTitle), 30000);
              });

              document.documentElement.appendChild(exampleIFrame);
              exampleIFrame.src = url;
              const passed = await Promise.race([settled, timeout]);
              if (!passed) {
                const uvError = readUvError();
                if (uvError) results[0].uvError = uvError;
              }
              return passed;
            };

            results[1].uvTestPassed = await testGeneratedUrlHacky(generatedUrl);
          } catch (e) {
            results[0].ultraviolet = errorPrefix + ': ' + e.message;
            results[1].uvTestPassed = false;
          }

          return results;
        },
        { generatedUrl, pageTitle: website.title, errorPrefix }
      );

      console.log(
        'Ultraviolet test results:',
        JSON.stringify(testResults[0], null, 2)
      );
      const uvTestPassed =
        testResults[0].ultraviolet &&
        testResults[0].ultraviolet !== 'failure' &&
        !testResults[0].ultraviolet.startsWith('failure:') &&
        testResults[1].uvTestPassed;
      console.log(
        'Ultraviolet test result:',
        uvTestPassed ? 'success' : 'failure'
      );
      return uvTestPassed;
    };

    const testScramjet = async () => {
      const omniboxId = 'pr-sj',
        errorPrefix = 'failure',
        // For the hacky URL test further below, use the URL page's EXACT title.
        website = Object.freeze({
          path: 'example.com',
          title: 'Example Domain',
        });
      await page.goto('http://localhost:8080/working', { waitUntil: 'load' });
      await page.evaluate(
        () =>
          new Promise((resolve) => {
            const ready = () => resolve();
            if (window.$invisiScramjet?.ready) return ready();
            window.addEventListener('s-ready', ready, { once: true });
            setTimeout(ready, 30000);
          })
      );
      const generatedUrl = await page.evaluate(generateUrl, {
        omniboxId,
        urlPath: website.path,
        errorPrefix,
      });

      const testResults = await page.evaluate(
        async ({ rawUrl, pageTitle, generatedUrl, errorPrefix }) => {
          const results = [{}, {}];
          results[0].scramjet = generatedUrl;

          try {
            if (navigator.serviceWorker) {
              await navigator.serviceWorker.ready;
              if (!navigator.serviceWorker.controller) {
                await new Promise((resolve) => {
                  const onChange = () => {
                    navigator.serviceWorker.removeEventListener(
                      'controllerchange',
                      onChange
                    );
                    resolve();
                  };
                  navigator.serviceWorker.addEventListener(
                    'controllerchange',
                    onChange,
                    { once: true }
                  );
                  setTimeout(resolve, 5000);
                });
              }
            }

            const sj = window.$invisiScramjet;
            if (!sj?.frame || typeof sj.frame.go !== 'function') {
              results[1].sjTestPassed = false;
              results[0].scramjet =
                errorPrefix + ': scramjet controller frame is not ready';
              return results;
            }

            const frame = sj.frame;
            const iframe = frame.element;

            const readTitle = () => {
              try {
                return iframe.contentWindow?.document?.title || '';
              } catch (e) {
                return '';
              }
            };

            const settled = new Promise((resolve) => {
              iframe.addEventListener('load', () => {
                setTimeout(() => {
                  if (readTitle() === pageTitle) resolve(true);
                }, 250);
              });
            });
            const timeout = new Promise((resolve) => {
              setTimeout(() => resolve(readTitle() === pageTitle), 30000);
            });

            const beforeSrc = iframe.src;
            frame.go(rawUrl);
            results[0].scramjet =
              iframe.src && iframe.src !== beforeSrc
                ? iframe.src
                : results[0].scramjet;

            results[1].sjTestPassed = await Promise.race([settled, timeout]);
          } catch (e) {
            results[0].scramjet = errorPrefix + ': ' + e.message;
            results[1].sjTestPassed = false;
          }

          return results;
        },
        {
          rawUrl: 'http://' + website.path + '/',
          pageTitle: website.title,
          generatedUrl,
          errorPrefix,
        }
      );

      console.log('Scramjet test results:', testResults[0]);
      const sjTestPassed = !!testResults[1].sjTestPassed;
      console.log(
        'Scramjet test result:',
        sjTestPassed ? 'success' : 'failure'
      );
      return sjTestPassed;
    };

    // Run tests for Ultraviolet and Scramjet.
    await page.goto('http://localhost:8080/');
    const ultravioletPassed = await testUltraviolet();
    const scramjetPassed = await testScramjet();

    if (ultravioletPassed && scramjetPassed) {
      console.log('Tests passed.');
      process.exitCode = 0;
    } else {
      console.error('Tests failed.');
      process.exitCode = 1;
    }
  } catch (error) {
    console.error('Error in testCommonJSOnPage:', error.message);
    process.exitCode = 1;
  } finally {
    await browser.close();
  }
};

testServerResponse();
