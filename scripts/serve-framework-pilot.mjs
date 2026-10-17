import {createServer} from 'node:http';
import {readFile} from 'node:fs/promises';
import {resolve,relative,extname,isAbsolute} from 'node:path';
const [folder,port='4355']=process.argv.slice(2);if(!isAbsolute(folder||''))throw new TypeError('Absolute test browser folder required');
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.woff2':'font/woff2'};
createServer(async(req,res)=>{try{if(!['127.0.0.1:'+port,'localhost:'+port].includes(req.headers.host)||!['GET','HEAD'].includes(req.method))return res.writeHead(403).end();const name=decodeURIComponent(new URL(req.url,'http://127.0.0.1').pathname).slice(1)||'index.html',file=resolve(folder,name),offset=relative(folder,file);if(offset.startsWith('..')||isAbsolute(offset)||!types[extname(file)])return res.writeHead(403).end();const body=await readFile(file);res.writeHead(200,{'Content-Type':types[extname(file)],'Cache-Control':'no-store'});res.end(req.method==='HEAD'?undefined:body);}catch{res.writeHead(404).end();}}).listen(Number(port),'127.0.0.1',()=>console.log('Framework pilot http://127.0.0.1:'+port));
