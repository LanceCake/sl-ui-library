import {readFile} from 'node:fs/promises';
import {resolve} from 'node:path';
import {createHash} from 'node:crypto';
// The tested widget is more than its extracted controller. Bind wrappers,
// font lifecycle and font bytes as well; metadata/docs are not runtime inputs.
export const frameworkRuntimeFiles=['Component.jsx','NextClient.jsx','react-controller.mjs','react-font.mjs','instrument-sans-variable.woff2'];
export async function frameworkRuntimeHash(folder){const hashes=[];for(const file of frameworkRuntimeFiles)hashes.push([file,createHash('sha256').update(await readFile(resolve(folder,file))).digest('hex')]);return createHash('sha256').update(JSON.stringify(hashes)).digest('hex');}
