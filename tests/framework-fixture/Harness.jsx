'use client';
import {useCallback,useEffect,useRef,useState} from 'react';

export default function Harness({registry}){
 const [selected,setSelected]=useState('like'),[shown,setShown]=useState(true),[version,setVersion]=useState(1),[options,setOptions]=useState({confirmationMs:8000}),[resetKey,setResetKey]=useState(0),ref=useRef(null),events=useRef([]),operation=useRef(null),ready=useRef(0);
 const onSave=useCallback(({signal})=>new Promise((resolve,reject)=>{events.current.push({type:'save',version});operation.current={resolve,reject,signal};signal.addEventListener('abort',()=>reject(new DOMException('Canceled','AbortError')),{once:true});}),[version]);
 const onCommit=useCallback(values=>events.current.push({type:'commit',version,values}),[version]);
 const onReady=useCallback(()=>{ready.current++;},[]),onError=useCallback(error=>events.current.push({type:'error',message:error.message}),[]);
 useEffect(()=>{window.__frameworkPilot={get controller(){return ref.current?.controller;},get events(){return events.current;},get ready(){return ready.current;},get operation(){return operation.current;},reset:()=>ref.current?.reset(),select:setSelected,show:setShown,callbackVersion:setVersion,options:setOptions,remount:()=>setResetKey(n=>n+1)};return()=>{delete window.__frameworkPilot;};},[]);
 const Component=registry[selected],callbacks=selected==='pair'?{onSave,onCancel:()=>events.current.push({type:'cancel'})}:selected==='confirm-overlay'?{onCommit}:{};
 return <main>
  <h1>Source-preserving framework verification</h1>
  <p>Local test harness. No operation changes server data.</p>
  <nav aria-label="Test variants">{Object.keys(registry).map(name=><button key={name} type="button" onClick={()=>{events.current=[];setSelected(name);setShown(true);}}>{name}</button>)}</nav>
  <button type="button" onClick={()=>setShown(v=>!v)}>Toggle instance</button>
  <button type="button" onClick={()=>setVersion(v=>v+1)}>Replace callback</button>
  <button type="button" onClick={()=>operation.current?.resolve()}>Resolve test action</button>
  <button type="button" onClick={()=>operation.current?.reject(new Error('Rejected'))}>Reject test action</button>
  <section aria-label="Test component" style={{marginTop:24,width:'min(100%,320px)'}}>
   {shown&&<Component key={selected} ref={ref} callbacks={callbacks} initialOptions={options} resetKey={resetKey} onReady={onReady} onError={onError}/>}
  </section>
  <p>Callback version: {version}</p>
 </main>;
}
