import {readFile} from 'node:fs/promises';
import {resolve} from 'node:path';
import {pathToFileURL} from 'node:url';

/** Dev-only source archive is outside public/ and is never a deployed page. */
export async function reviewedSourceRoot(repository){
 const base=repository instanceof URL?repository:pathToFileURL(resolve(repository)+'/');
 try{const marker=JSON.parse(await readFile(new URL('review-sources/approved-source-map.json',base),'utf8'));if(marker.schemaVersion!==1||marker.approvedCount!==91)throw new Error('Unexpected reviewed source archive');return new URL('review-sources/',base);}
 catch(error){if(error.code!=='ENOENT')throw error;return base;}
}
