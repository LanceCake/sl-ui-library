'use client';
import {Suspense,startTransition,useCallback,useEffect,useRef,useState} from 'react';

// This later sibling deliberately suspends after React has rendered Component.
function LaterSibling({record,observed}){
 if(record.gate&&!record.gate.resolved){observed.current=record.id;throw record.gate.promise;}
 return <p data-committed-record>{record.id}</p>;
}

export default function Harness({registry}){
 const [selected,setSelected]=useState('like'),[shown,setShown]=useState(true),[version,setVersion]=useState(1),[options,setOptions]=useState({confirmationMs:8000}),[resetKey,setResetKey]=useState(0),[record,setRecord]=useState({id:'A'}),ref=useRef(null),events=useRef([]),operation=useRef(null),ready=useRef(0),observed=useRef(null),gates=useRef(new Map());
 const onSave=useCallback(({signal})=>new Promise((resolve,reject)=>{events.current.push({type:'save',version,record:record.id});operation.current={resolve,reject,signal};signal.addEventListener('abort',()=>reject(new DOMException('Canceled','AbortError')),{once:true});}),[version,record.id]);
 const onCommit=useCallback(values=>events.current.push({type:'commit',version,values}),[version]);
 const onReady=useCallback(()=>{ready.current++;},[]),onError=useCallback(error=>events.current.push({type:'error',message:error.message}),[]);
 useEffect(()=>{
  window.__frameworkPilot={get controller(){return ref.current?.controller;},get events(){return events.current;},get ready(){return ready.current;},get operation(){return operation.current;},get suspended(){return observed.current;},reset:()=>ref.current?.reset(),select:setSelected,show:setShown,callbackVersion:setVersion,options:setOptions,remount:()=>setResetKey(n=>n+1),
   begin(id){let resolve;const gate={resolved:false,promise:new Promise(done=>{resolve=done;})};gate.resolve=()=>{gate.resolved=true;resolve();};gates.current.set(id,gate);observed.current=null;startTransition(()=>setRecord({id,gate}));},
   resolveRecord(id){gates.current.get(id)?.resolve();},abandon(id){setRecord({id});},
  };return()=>{delete window.__frameworkPilot;};
 },[]);
 const Component=registry[selected],callbacks=selected==='pair'?{onSave,onCancel:()=>events.current.push({type:'cancel'})}:selected==='confirm-overlay'?{onCommit}:{};
 return <main>
  <h1>Source-preserving framework verification</h1><p>Local test harness. No operation changes server data.</p>
  <nav aria-label="Test variants">{Object.keys(registry).map(name=><button key={name} type="button" onClick={()=>{events.current=[];setSelected(name);setShown(true);}}>{name}</button>)}</nav>
  <button type="button" onClick={()=>setShown(v=>!v)}>Toggle instance</button>
  <button type="button" onClick={()=>setVersion(v=>v+1)}>Replace callback</button>
  <button type="button" onClick={()=>operation.current?.resolve()}>Resolve test action</button>
  <button type="button" onClick={()=>operation.current?.reject(new Error('Rejected'))}>Reject test action</button>
  <section aria-label="Test component" style={{marginTop:24,width:'min(100%,320px)'}}>
   <Suspense fallback={<p>Suspended test record</p>}>
    {shown&&<Component key={selected} ref={ref} callbacks={callbacks} initialOptions={options} resetKey={resetKey} onReady={onReady} onError={onError}/>}
    <LaterSibling record={record} observed={observed}/>
   </Suspense>
  </section><p>Callback version: {version}</p>
 </main>;
}

export function ExampleHarness({registry}){
 const [selected,setSelected]=useState('pair'),[shown,setShown]=useState(true),[two,setTwo]=useState(false),[revision,setRevision]=useState(0),Example=registry[selected];
 return <main><h1>Copied local examples</h1><nav aria-label="Example variants">{Object.keys(registry).map(name=><button type="button" key={name} onClick={()=>{setSelected(name);setShown(true);setTwo(false);}}>{name}</button>)}</nav>
  <button type="button" onClick={()=>setShown(value=>!value)}>Toggle example</button><button type="button" onClick={()=>setTwo(value=>!value)}>Toggle second example</button><button type="button" onClick={()=>setRevision(value=>value+1)}>Remount example</button>
  {shown&&<section data-example="first"><Example key={selected+revision}/></section>}{shown&&two&&<section data-example="second"><Example key={selected+revision}/></section>}
 </main>;
}
