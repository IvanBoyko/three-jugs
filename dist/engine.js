(function(root){
'use strict';
function pour(cap,state,from,to){
 if(from===to || ![from,to].every(i=>Number.isInteger(i)&&i>=0&&i<3)) return null;
 const amount=Math.min(state[from],cap[to]-state[to]);
 if(amount<=0)return null;
 const next=state.slice();next[from]-=amount;next[to]+=amount;return {state:next,amount,from,to};
}
function search(cap,start){
 const key=s=>s.join(',');const nodes=new Map();const first={state:start.slice(),depth:0,parent:null,move:null};nodes.set(key(start),first);const queue=[first];const goals=new Map();
 for(let i=0;i<queue.length;i++){
  const node=queue[i];if(!goals.has(node.state[0]))goals.set(node.state[0],node);
  for(let a=0;a<3;a++)for(let b=0;b<3;b++){
   const move=pour(cap,node.state,a,b);if(!move||nodes.has(key(move.state)))continue;
   const child={state:move.state,depth:node.depth+1,parent:node,move};nodes.set(key(move.state),child);queue.push(child);
  }
 }
 return goals;
}
function path(node){if(!node)return null;const moves=[];while(node.parent){moves.push(node.move);node=node.parent;}return moves.reverse();}
function solve(cap,start,target){return path(search(cap,start).get(target));}
function generate(previous=null,random=Math.random){
 const pick=(lo,hi)=>lo+Math.floor(random()*(hi-lo+1));
 for(let i=0;i<600;i++){
  const a=pick(10,30),b=pick(Math.ceil(a/2),a-1),c=pick(2,b-1);const cap=[a,b,c],start=[a,0,0];
  const goals=[...search(cap,start)].filter(([target,node])=>target>0&&target<a&&node.depth>=5&&node.depth<=15&&(!previous||previous.cap.join()!==cap.join()));
  if(goals.length){const [target,node]=goals[pick(0,goals.length-1)];return {cap,start,target,minimum:node.depth};}
 }
 // Deterministic fallback still computed and validated by BFS.
 for(let a=10;a<=30;a++)for(let b=Math.ceil(a/2);b<a;b++)for(let c=2;c<b;c++){
  const cap=[a,b,c],start=[a,0,0];if(previous&&previous.cap.join()===cap.join())continue;
  for(const [target,node] of search(cap,start))if(target>0&&target<a&&node.depth>=5&&node.depth<=15)return {cap,start,target,minimum:node.depth};
 }
 throw Error('No puzzle found');
}
const api={pour,search,solve,generate};if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.Jugs=api;
})(globalThis);
