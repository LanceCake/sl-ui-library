// Explicit QA-only runtime selection. Never installs browsers or changes the
// developer's personal Playwright configuration. argv --import is per process.
import {isAbsolute} from 'node:path';
import {pathToFileURL} from 'node:url';
const modulePath=process.env.SL_UI_PLAYWRIGHT_MODULE;
if(!isAbsolute(modulePath||''))throw new Error('Existing absolute Playwright runtime required');
const loaded=await import(pathToFileURL(modulePath)),chromium=loaded.chromium??loaded.default?.chromium;
const launch=chromium.launch.bind(chromium);
chromium.launch=options=>launch({channel:process.env.SL_UI_BROWSER_CHANNEL||'msedge',...options});
