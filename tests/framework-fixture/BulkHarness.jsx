'use client';
import {useCallback,useEffect,useRef,useState} from 'react';

function localCallbacks(variant,events,operations,slot){
 const record=(type,value)=>events.current.push({type,value});
 if(variant==='pair'||variant==='save')return {onSave:async()=>record('save'),onCancel:()=>record('cancel')};
 if(variant==='copy')return {getText:()=>'<b>Example 😀</b>',writeText:async text=>record('copy',text)};
 if(variant==='download')return {getFile:()=>({blob:new Blob(['Example']),filename:'example.txt'}),handoff:async()=>record('download')};
 if(variant==='delete')return {onDelete:async()=>record('delete')};
 if(variant==='share')return {getUrl:()=> 'https://example.com/article',onShare:async()=>{record('share');return {label:'Local preview'};}};
 if(variant.endsWith('-feedback'))return {onAction:(action,context)=>{
  const {signal,onProgress}=context,qa=operations.current,id=++qa.serial,mode=qa.modes[slot];
  const request={id,slot,variant,action,signal,onProgress,contextKeys:Object.keys(context).sort(),settled:false};
  qa.requests.push(request);qa.log.push({id,slot,variant,action});
  if(signal.aborted)return Promise.reject(new DOMException('Canceled','AbortError'));
  if(mode==='pending')return new Promise((resolve,reject)=>{
   request.resolve=value=>{if(request.settled)return;request.settled=true;resolve(value);};
   request.reject=(message='Synthetic QA rejection')=>{if(request.settled)return;request.settled=true;reject(new Error(message));};
  });
  request.settled=true;
  if(mode==='reject')return Promise.reject(new Error('Synthetic QA rejection'));
  onProgress?.(100);record('feedback-action',action);return Promise.resolve();
 }};
 return {};
}
export default function BulkHarness({registry}){
 const names=Object.keys(registry),[selected,setSelected]=useState(names[0]),[shown,setShown]=useState(true),[preview,setPreview]=useState(false),[second,setSecond]=useState(false),[resetKey,setResetKey]=useState(0),events=useRef([]),firstRef=useRef(null),secondRef=useRef(null),ready=useRef(0),operations=useRef({serial:0,modes:{first:'success',second:'success'},requests:[],log:[]});
 const onError=useCallback(error=>events.current.push({type:'mount-error',message:error.message}),[]),onReady=useCallback(()=>{ready.current++;},[]);
 useEffect(()=>{const clipboard=Object.getOwnPropertyDescriptor(navigator,'clipboard');Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:async text=>events.current.push({type:'clipboard-stub',value:text})}});window.__frameworkBulk={get selected(){return selected;},get events(){return events.current;},get ready(){return ready.current;},get controllers(){return [firstRef.current?.controller,secondRef.current?.controller];},select(name,localPreview=false){if(!registry[name])throw new Error('Unknown variant');events.current=[];setSelected(name);setPreview(localPreview);setShown(true);setSecond(false);setResetKey(n=>n+1);},show:setShown,second:setSecond,preview:setPreview,reset(){firstRef.current?.reset();},remount(){setResetKey(n=>n+1);}};return()=>{delete window.__frameworkBulk;if(clipboard)Object.defineProperty(navigator,'clipboard',clipboard);else delete navigator.clipboard;};},[registry,selected]);
 // Private fixture API only: held promises never perform an application/network operation.
 useEffect(()=>{const api=window.__frameworkBulk;if(!api)return;api.feedback={
  setMode(mode,slot='first'){if(!['success','pending','reject'].includes(mode)||!['first','second'].includes(slot))throw new TypeError('Invalid QA callback mode or slot');operations.current.modes[slot]=mode;},
  get requests(){return operations.current.requests;},get log(){return operations.current.log;},
 };},[registry,selected]);
 const Component=registry[selected],callbacks=localCallbacks(selected,events,operations,'first'),secondCallbacks=localCallbacks(selected,events,operations,'second');
 return <main><h1>Full framework matrix</h1><p>Isolated local QA. Clipboard and application operations are stubs.</p><label>Variant <select style={{maxWidth:'100%',width:320}} value={selected} onChange={event=>window.__frameworkBulk.select(event.target.value)}>{names.map(name=><option key={name}>{name}</option>)}</select></label><section data-bulk-slot="first" style={{marginTop:24,width:'min(100%,320px)'}}>{shown&&<Component key={selected} ref={firstRef} callbacks={callbacks} preview={preview} resetKey={resetKey} onReady={onReady} onError={onError}/>}</section>{second&&<section data-bulk-slot="second" style={{marginTop:24,width:'min(100%,320px)'}}><Component key={selected} ref={secondRef} callbacks={secondCallbacks} preview={preview} onReady={onReady} onError={onError}/></section>}</main>;
}
