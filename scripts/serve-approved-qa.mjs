import {createServer} from 'node:http';
import {readFile,realpath,stat} from 'node:fs/promises';
import {isAbsolute,resolve,sep,extname} from 'node:path';

const [directory,portText='4357']=process.argv.slice(2),port=Number(portText);
if(!isAbsolute(directory||'')||!Number.isInteger(port)||port<1024||port>65535)throw new TypeError('Absolute QA public directory and valid port required');
const root=await realpath(directory),prefix=root+sep;
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.mjs':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.woff2':'font/woff2','.txt':'text/plain; charset=utf-8','.png':'image/png','.svg':'image/svg+xml'};
createServer(async(req,res)=>{
 if(!['127.0.0.1:'+port,'localhost:'+port].includes(req.headers.host)){res.writeHead(403).end();return;}
 if(!['GET','HEAD'].includes(req.method)){res.writeHead(405).end();return;}
 try{
  const name=decodeURIComponent(new URL(req.url,'http://127.0.0.1:'+port).pathname).slice(1);
  if(!/^packages\/[a-z0-9-]+\/[a-zA-Z0-9._-]+$/.test(name)||!types[extname(name)]){res.writeHead(404).end();return;}
  const file=await realpath(resolve(root,name));if(!file.startsWith(prefix)||!(await stat(file)).isFile()){res.writeHead(403).end();return;}
  const data=await readFile(file);res.writeHead(200,{'Content-Type':types[extname(file)],'Cache-Control':'no-store','X-Content-Type-Options':'nosniff','Content-Length':data.length});res.end(req.method==='HEAD'?undefined:data);
 }catch{res.writeHead(404).end();}
}).listen(port,'127.0.0.1',()=>console.log('Approved-source QA only: http://127.0.0.1:'+port));
