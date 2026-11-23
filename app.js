const GENERAL='general';
const sample=(id,name,history=[],pins=[])=>({id,name,turns:history.map(([id,prompt,answer,report])=>({id,prompt,answer,report})),pins});
const sampleProjects=()=>[
  sample('medical','Medical necessity',[
    ['m1','Analyze project and test llm_rpa','Start with two synthetic cases. Use one complete documentation package and one with a missing item so the expected outcomes differ.'],
    ['m2','What should the test capture?','Record each input, the expected outcome, the observed result, and anything that requires manual review.'],
    ['m3','Which clinical sources should we compare?','Use the payer policy, diagnosis and staging evidence, treatment history, pathology, labs, and the submitted clinical note.'],
    ['m4','Create the first synthetic case','Case A has metastatic disease, a supported biomarker, a guideline-aligned regimen, and every required document. Expected result: criteria met.'],
    ['m5','Create a deliberately incomplete case','Case B has a qualifying diagnosis but no recent pathology report and an unresolved prior-therapy requirement. Expected result: manual review.'],
    ['m6','How should conflicting evidence be handled?','Show both sources, their dates, and the exact conflict. Never silently prefer the newer value when clinical context could explain the difference.'],
    ['m7','Draft the reviewer summary','The model correctly separated the complete and incomplete cases. One policy citation needs page-level evidence before sign-off.'],
    ['m8','What belongs in the final checklist?','Include identity checks, policy version, matched criteria, missing evidence, expected result, observed result, and a named owner for each unresolved issue.']
  ],['m1','m3','m6','m8']),
  sample('clinical-trials','Clinical trial matching',[
    ['ct1','Screen candidates for solid-tumor trials','Compare diagnosis, stage, biomarkers, prior therapies, performance status, and recruiting location.'],
    ['ct2','Review the top three trial matches','Show which inclusion criteria match, which criteria are unresolved, and what source supports each field.'],
    ['ct3','Start with the lung cancer cohort','I found two recruiting studies within the preferred radius. Both require confirmed EGFR status and one excludes prior osimertinib.'],
    ['ct4','Why was the immunotherapy study ranked lower?','The disease and location match, but the current record does not confirm PD-L1 level or the required washout period.'],
    ['ct5','Check travel feasibility','One site is 18 miles away and the other is 74 miles away. The closer site has weekly visits during cycle one.'],
    ['ct6','Separate facts from open questions','Confirmed: diagnosis, stage, age, ECOG, and location. Unresolved: latest CBC, prior radiation end date, and archival tissue availability.'],
    ['ct7','Prepare a patient-friendly explanation','There are two possible studies, but eligibility is not confirmed. The coordinator needs three clinical details before discussing enrollment.'],
    ['ct8','Prepare coordinator follow-up','Ask for the latest labs, complete pathology, treatment dates, tissue status, and confirmation that the study is still recruiting.']
  ],['ct1','ct2','ct6','ct8']),
  sample('prior-auth','Prior authorization operations',[
    ['pa1','Review authorizations expiring this month','Group by drug, payer, site, and scheduled date of service.'],
    ['pa2','Verify administration dates','Compare the intended authorization date with the medication administration record and flag mismatches.'],
    ['pa3','Prepare payer follow-up queue','Prioritize cases by upcoming treatment date, missing documentation, and submission status.'],
    ['pa4','Which cases are most urgent?','Seven treatments are scheduled within five business days. Two lack a valid authorization span and one has an unresolved payer change.'],
    ['pa5','Check the rescheduled treatments','Three intended dates changed. Two remain inside the authorization window; one needs a date extension before administration.'],
    ['pa6','What documentation is missing?','One case needs updated progression evidence and two need the most recent office note attached to the payer submission.'],
    ['pa7','Draft the payer call notes','Confirm receipt, reference number, clinical review status, missing items, expected decision date, and the next escalation channel.'],
    ['pa8','Summarize authorization risks','Separate clinical gaps, payer routing, eligibility changes, date-span problems, and cases that are ready with no remaining action.']
  ],['pa1','pa3','pa5','pa8']),
  sample('pharmacy','Oncology pharmacy workflows',[
    ['rx1','Map oral-oncology intake','Trace prescription receipt, benefits investigation, prior authorization, financial assistance, and dispense.'],
    ['rx2','Find prescriptions waiting on coverage','Identify cases blocked by eligibility, authorization, copay, or pharmacy-network requirements.'],
    ['rx3','Review the restricted-network cases','Four prescriptions must route to a payer-mandated specialty pharmacy. Two transfers are complete and two still need confirmation.'],
    ['rx4','Which patients need financial assistance?','Three have unaffordable estimated cost sharing. One may qualify for a manufacturer program and two need foundation screening.'],
    ['rx5','Check clinical readiness','All prescriptions have a documented indication. Two require baseline labs and one needs a dose clarification before release.'],
    ['rx6','Create the outreach queue','Prioritize by treatment start date, then separate benefit questions, missing signatures, financial assistance, and delivery coordination.'],
    ['rx7','What should the dispensing checkpoint include?','Confirm prescription accuracy, authorization, pharmacy routing, counseling, monitoring plan, delivery date, and patient contact.'],
    ['rx8','Prepare pharmacist handoff','Summarize drug, dose, indication, baseline monitoring, coverage status, affordability work, delivery plan, and the next owner.']
  ],['rx1','rx2','rx6','rx8']),
  sample('denials','Authorization denial management',[
    ['dn1','Triage authorization denials','Separate no-authorization, invalid authorization, medical-necessity, and administrative denials.'],
    ['dn2','Build the appeal packet','Collect the authorization record, clinical notes, treatment plan, claim detail, and payer rationale.'],
    ['dn3','Find the highest-value recoverable cases','Prioritize valid clinical care with fixable authorization evidence, recent timely-filing windows, and complete claim detail.'],
    ['dn4','Separate claim corrections from appeals','Use a corrected claim when the authorization number or administrative field is wrong. Appeal when the payer disputes coverage or medical necessity.'],
    ['dn5','Draft the appeal argument','Lead with the denial reason, then connect the authorization record, policy criteria, clinical evidence, and requested remedy.'],
    ['dn6','Check submission readiness','Nine packets are complete, three need signed notes, and two need the payer call reference added before submission.'],
    ['dn7','Plan follow-up cadence','Confirm receipt within two business days, track the statutory response window, and escalate when the promised date passes.'],
    ['dn8','Track recovery work','Record corrections, appeals, payer contacts, decisions, payment postings, recovered amount, and the reason for any final write-off.']
  ],['dn1','dn3','dn5','dn8']),
  sample('benefits','Eligibility and benefits',[
    ['ev1','Check treatment-day coverage','Verify active coverage, plan type, network, deductible, coinsurance, and authorization requirements.'],
    ['ev2','Resolve coordination of benefits','Identify the likely primary and secondary order and flag what requires payer confirmation.'],
    ['ev3','Review the coverage effective dates','Coverage is active for the planned treatment date. The portal shows a January renewal date that should be rechecked before the next cycle.'],
    ['ev4','Confirm the provider network','The organization is in network, but the benefit response does not conclusively confirm the rendering clinician.'],
    ['ev5','Explain the coordination uncertainty','The response suggests employer coverage is primary and Medicare secondary, but the payer must confirm the order before billing.'],
    ['ev6','Check drug benefit routing','The infused drug appears under medical benefits. Supportive oral medication routes through the pharmacy benefit manager.'],
    ['ev7','What cannot the public response tell us?','It cannot guarantee payment, confirm final claim adjudication, or replace payer confirmation of authorization and COB.'],
    ['ev8','Prepare patient estimate inputs','Summarize deductible, remaining out-of-pocket maximum, coinsurance, network status, secondary coverage, and every value needing manual verification.']
  ],['ev1','ev2','ev5','ev8'])
];
const initial=()=>({
  projects:true, confirmed:false, invites:[], installed:false,
  vaultLogins:[
    {id:'pioneer',title:'PioneerRx (Citrix)',sub:'astera\\aamer.syed · login.cloud.com'},
    {id:'flatiron2',title:'login-2@accounts.flatiron.com',sub:'abheet@risa.health · accounts.flatiron.com'},
    {id:'secure15',title:'login@secure15.oncoemr.com',sub:'abheet@risa.health · secure15.oncoemr.com'},
    {id:'apis',title:'apis-dev.risalabs.ai',sub:'coverage-service · apis-dev.risalabs.ai'},
    {id:'secure2',title:'https://secure2.oncoemr.com',sub:'gg@risalabs.ai · secure2.oncoemr.com'}
  ],
  community:{
    people:[
      {email:'kulraj@risalabs.ai',name:'Kulraj',agent:'optimist',online:true,via:'RISA Labs Inc',accepted:true,last:'6 min ago'},
      {email:'angad@risalabs.ai',name:'Angad',agent:'optimist',online:true,via:'RISA Labs Inc',accepted:true,last:'13 min ago'},
      {email:'dhruv@risalabs.ai',name:'Dhruv',agent:'optimist',online:false,via:'RISA Labs Inc',accepted:true,last:'7 h ago'}
    ],
    outgoing:[{email:'clinical.ops@example.com',sent:'Today',accepted:false}],
    incoming:[{email:'priya@risalabs.ai',name:'Priya',agent:'optimist'}]
  },
  chats:[
    sample(GENERAL,'Optimist Agent',[
      ['g1','Give me yesterday’s order count by site.','Here’s the breakdown from Omnisight.',true],
      ['g2','Which site had the highest volume?','North Clinic led with 1,284 of the 2,841 sample orders.'],
      ['g3','Keep the report handy for tomorrow.','You can pin the report exchange to jump back to it from this chat.']
    ]),
    ...sampleProjects()
  ]
});
function addProject(state,name,id){
  const clean=name.trim();
  if(!state.projects||!clean)return null;
  const project=sample(id,clean);
  state.chats.push(project);
  return project;
}
function pinTurn(chat,id){
  if(!chat.turns.some(turn=>turn.id===id))return false;
  if(chat.pins.includes(id)){chat.pins=chat.pins.filter(pin=>pin!==id);return false;}
  chat.pins.push(id);
  return true;
}
function threads(chat){
  return [{id:'start',title:'Conversation'},...chat.turns.filter(turn=>chat.pins.includes(turn.id)).map(turn=>({id:turn.id,title:turn.prompt}))];
}
const key='optimist-standalone-demo-v1';
let state=initial();
try{
  const saved=JSON.parse(localStorage.getItem(key));
  if(saved?.chats?.[0]?.id===GENERAL)state=saved;
}catch{}
state.community??=initial().community;
state.community.people??=[];
state.community.outgoing??=[];
state.community.incoming??=[];
state.vaultLogins??=initial().vaultLogins;
for(const project of sampleProjects()){
  const existing=state.chats.find(chat=>chat.id===project.id);
  if(!existing)state.chats.push(project);
  else{
    for(const turn of project.turns)if(!existing.turns.some(item=>item.id===turn.id))existing.turns.push(turn);
    if(!existing.pins?.length)existing.pins=project.pins.filter(id=>existing.turns.some(turn=>turn.id===id));
  }
}
function save(){try{localStorage.setItem(key,JSON.stringify(state));}catch{}}

const get=id=>document.getElementById(id);
const root=get('opt-demo'),nav=get('op-nav'),timeline=get('op-timeline'),messages=get('op-messages');
const panel=get('op-panel'),modal=get('op-dialog'),draft=get('op-draft');
const escapeHtml=value=>String(value).replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[char]);
const newId=()=>globalThis.crypto?.randomUUID?.()||'msg-'+Date.now().toString(36)+Math.random().toString(36).slice(2);
const button=(label,action,style='quiet',data='')=>'<button type="button" class="cursor-interaction '+style+'" data-action="'+action+'" '+data+'>'+escapeHtml(label)+'</button>';
const tag=(label,style='')=>'<span class="tag '+style+'">'+escapeHtml(label)+'</span>';
const tile=(title,description,tail='',actions='')=>'<section class="tile"><div class="row between"><h3>'+escapeHtml(title)+'</h3>'+tail+'</div><p class="dim small">'+escapeHtml(description)+'</p>'+(actions?'<div class="actions">'+actions+'</div>':'')+'</section>';
const linkTile=(title,description,action)=>'<button type="button" class="click-tile cursor-interaction" data-action="'+action+'"><strong>'+escapeHtml(title)+'</strong><p class="small dim">'+escapeHtml(description)+'</p></button>';
const heading=(title,description='')=>'<h2>'+escapeHtml(title)+'</h2>'+(description?'<p class="dim small">'+escapeHtml(description)+'</p>':'');
const section=label=>'<div class="section-label">'+escapeHtml(label)+'</div>';
const back=(label,action)=>button(label,action);
const tabs=(entries,active)=>'<div class="tabs local">'+entries.map(([key,label,action])=>button(label,action,key===active?'selected':'quiet','aria-pressed="'+(key===active)+'"')).join('')+'</div>';
let active=GENERAL,anchor='',panelOpen=false,tab='activity',detail='',skillsView='installed',peopleView='connections',openMessage='',vaultMenu='',vaultRename='';
const drafts=new Map();
const chat=()=>state.chats.find(item=>item.id===active);
const short=text=>text.length>45?text.slice(0,44)+'…':text;
function announce(text){get('op-announce').textContent=text;}
function paintNav(){
  const item=entry=>{
    const selected=active===entry.id;
    const id=escapeHtml(entry.id);
    const title='<button type="button" class="nav-item '+(selected?'selected':'quiet')+'" data-action="chat" data-chat="'+id+'" '+(selected?'aria-current="page"':'')+'><span class="trim">'+escapeHtml(entry.name)+'</span></button>';
    if(entry.id!==GENERAL&&!selected)return title;
    return title+'<div class="thread-list">'+threads(entry).map(thread=>button(short(thread.title),'thread',selected&&anchor===thread.id?'selected':'quiet','data-chat="'+id+'" data-target="'+escapeHtml(thread.id)+'" data-tooltip="'+escapeHtml(thread.title)+'" '+(selected&&anchor===thread.id?'aria-current="location"':''))).join('')+'</div>';
  };
  const general=state.chats[0], projects=state.chats.slice(1);
  nav.innerHTML=(state.projects?button('＋','new','new-project','aria-label="Create new project" title="Create new project"'):'')+item(general)+(projects.length?'<div class="project-list">'+projects.map(item).join('')+'</div>':'');
}
function report(){
  const rows=[['North Clinic','1,284',100],['West Clinic','932',73],['City Clinic','625',49]];
  return '<div class="report"><div class="row between"><h3>Orders by site</h3>'+tag('Sample')+'</div><p class="small dim">2,841 orders · 3 sites</p>'+
    rows.map(([name,count,width])=>'<div class="stat-row"><span>'+name+'</span><span class="bar" style="width:'+width+'%" aria-hidden="true"></span><strong>'+count+'</strong></div>').join('')+
    button('View report','files')+'</div>';
}
const dots=(turn,side)=>'<button type="button" class="message-dots" data-action="message-menu" data-turn="'+escapeHtml(turn)+'" data-side="'+side+'" aria-label="Message options" aria-expanded="'+(openMessage===turn+':'+side)+'"><span aria-hidden="true">•••</span></button>';
function messageTools(turn,side,pinned){
  if(openMessage!==turn+':'+side)return '';
  const tool=(label,glyph,action='react')=>'<button type="button" class="message-tool" data-action="'+action+'" data-turn="'+escapeHtml(turn)+'" data-side="'+side+'" data-reaction="'+escapeHtml(label)+'" title="'+escapeHtml(label)+'" aria-label="'+escapeHtml(label)+'">'+glyph+'</button>';
  return '<div class="message-tools" role="toolbar" aria-label="Message actions">'+
    tool('Love','♥')+tool('Helpful','👍')+tool('Not helpful','👎')+tool('Funny','ᴴᴬ')+tool('Important','‼')+tool('Question','?')+tool('Add reaction','☺')+
    '<span class="tool-separator" aria-hidden="true"></span>'+tool('Reply','↩','reply-message')+tool('Copy','▣','copy-message')+
    '<button type="button" class="message-tool save-thread" data-action="pin" data-turn="'+escapeHtml(turn)+'" aria-pressed="'+pinned+'">'+(pinned?'Remove thread':'Save as thread')+'</button></div>';
}
function paintChat(){
  get("op-project-title").textContent=chat().name;
  get("op-project-title").title=chat().name;
  const selected=chat();
  draft.placeholder='Ask Optimist';
  messages.innerHTML='<div id="op-start" aria-hidden="true"></div>'+
    (selected.turns.length?selected.turns.map(turn=>{
      const pinned=selected.pins.includes(turn.id);
      return '<article class="exchange" id="op-turn-'+escapeHtml(turn.id)+'">'+
        '<div class="message-block user-message">'+messageTools(turn.id,'user',pinned)+'<div class="message-line user-line"><p class="prompt">'+escapeHtml(turn.prompt)+'</p>'+dots(turn.id,'user')+'</div></div>'+
        '<div class="message-block assistant-message">'+messageTools(turn.id,'assistant',pinned)+'<div class="row answer"><div class="stretch answer-copy"><div class="message-line"><div class="answer-bubble"><p>'+escapeHtml(turn.answer)+'</p></div>'+dots(turn.id,'assistant')+'</div>'+
        (turn.report?report():'')+'</div></div></div></article>';
    }).join(''):'');
}
function openChat(id,moveToBottom=true){
  if(!state.chats.some(item=>item.id===id))return;
  drafts.set(active,draft.value);
  active=id;
  anchor='';
  openMessage='';
  draft.value=drafts.get(id)||'';
  paintChat();
  paintNav();
  if(panelOpen && tab==='shared')paintPanel();
  if(moveToBottom)timeline.scrollTop=timeline.scrollHeight;
  else timeline.scrollTop=0;
}
function jump(chatId,id){
  if(chatId!==active)openChat(chatId,false);
  const target=get(id==='start'?'op-start':'op-turn-'+id);
  if(!target)return false;
  anchor=id;
  messages.querySelector('.highlight')?.classList.remove('highlight');
  if(id!=='start')target.classList.add('highlight');
  const top=timeline.scrollTop+target.getBoundingClientRect().top-timeline.getBoundingClientRect().top-8;
  timeline.scrollTo({top:Math.max(0,top),behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
  paintNav();
  return true;
}
function mobileNav(){return root.clientWidth<=655;}
function setNav(on){
  nav.classList.toggle('open',on);
  root.classList.toggle('nav-collapsed',!on);
  const control=root.querySelector('[data-action="nav"]');
  control.setAttribute('aria-expanded',String(on));
  control.setAttribute('aria-label',on?'Collapse sidebar':'Expand sidebar');
  control.title=on?'Collapse sidebar':'Expand sidebar';
  root.querySelector('[data-action="projects"]').setAttribute('aria-expanded',String(on));
}
function closeMobileNav(){if(mobileNav())setNav(false);}
function useSkill(){
  const prompt='Check eligibility for demo patient DEMO-104 at North Clinic.';
  if(!draft.value.includes(prompt))draft.value+=(draft.value.trim()?'\n\n':'')+prompt;
  closePanel();
  draft.focus();
  draft.setSelectionRange(draft.value.length-prompt.length,draft.value.length);
  announce('Eligibility example added to the draft');
}
function closePanel(){
  panelOpen=false;
  panel.hidden=true;
  root.classList.remove('panel-open');
  const control=root.querySelector('[data-action="panel"]');
  control.setAttribute('aria-expanded','false');
  control.setAttribute('aria-label','Open Optimist panel');
  control.title='Open Optimist panel';
}
function openPanel(next,drill){
  closeMobileNav();
  if(openMessage){openMessage='';paintChat();}
  if(next){tab=next;detail=drill||'';}
  panelOpen=true;
  panel.hidden=false;
  root.classList.add('panel-open');
  const control=root.querySelector('[data-action="panel"]');
  control.setAttribute('aria-expanded','true');
  control.setAttribute('aria-label','Close Optimist panel');
  control.title='Close Optimist panel';
  paintPanel();
  if(next)panel.scrollTop=0;
}
const panelSvg=name=>({
  search:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.8-3.8"/></svg>',
  monitor:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="4" width="18" height="14" rx="2"/><circle cx="12" cy="11" r="4"/><path d="M8 22h8M12 18v4"/></svg>',
  key:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="8" cy="15" r="4"/><path d="m11 12 8-8m-4 4 3 3m-6 0 2 2"/></svg>',
  chevron:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="m9 18 6-6-6-6"/></svg>',
  person:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="9" cy="8" r="4"/><path d="M2 21a7 7 0 0 1 14 0M18 8v6M21 11h-6"/></svg>'
})[name]||'';
const panelHead=(title,intro='')=>'<h3 class="agent-title">'+escapeHtml(title)+'</h3>'+(intro?'<p class="set-intro">'+escapeHtml(intro)+'</p>':'');
const avatar=(p,agent=false)=>'<span class="connections-avatar'+(agent?' is-agent':'')+'">'+escapeHtml(agent?'◎':String(p.name||p.email||p).split('@')[0].split(/[ ._-]/).map(x=>x[0]).join('').slice(0,2).toUpperCase())+'<i class="connections-presence'+(p.online?' is-on':'')+'"></i></span>';
const compactRow=(title,sub,lead='',tail='')=>'<div class="set-row">'+lead+'<span class="set-row-main"><span class="set-row-title">'+escapeHtml(title)+'</span><span class="set-row-sub">'+escapeHtml(sub)+'</span></span>'+tail+'</div>';
function shared(){
  const current=chat();
  const projectName=current?.name||'Optimist Agent';
  const projectDocs=current?.id===GENERAL?
    [['Orders by site — yesterday','Image · v1 · 19:12'],['Daily order summary','CSV · v1 · 19:10'],['Tomorrow follow-up notes','Markdown · v2 · 19:08']]:
    [[projectName+' working brief','Markdown · v3 · Today'],['Evidence and source map','PDF · v2 · Today'],['Review queue','CSV · v4 · Today']];
  const allDocs=[
    ['PHI masking flow in Optimist','Optimist Agent · HTML · v1'],
    ['Verify PA DOS using FHIR','Prior authorization operations · Markdown · v3'],
    ['Clinical trial match evidence','Clinical trial matching · PDF · v2'],
    ['Oncology pharmacy queue','Oncology pharmacy workflows · CSV · v4'],
    ['Authorization denial appeal packet','Authorization denial management · PDF · v2']
  ];
  const files=(docs,global=false)=>'<div class="artifact-list">'+docs.map(([name,meta])=>compactRow(name,meta,'<span class="artifact-icon">'+(meta.includes('CSV')?'CSV':meta.includes('Image')?'IMG':'DOC')+'</span>',global?'<span class="project-scope">All</span>':'')).join('')+'</div>';
  return '<div class="shared-pane">'+panelHead('Shared','Files and artifacts Optimist created or used.')+
    '<section class="shared-section shared-scope"><div class="shared-head"><div><h3 class="shared-title">Current Project <span class="shared-count">'+projectDocs.length+'</span></h3><p class="shared-project-name">'+escapeHtml(projectName)+'</p></div><button class="shared-all">See all</button></div>'+files(projectDocs)+'</section>'+
    '<section class="shared-section shared-scope"><div class="shared-head"><div><h3 class="shared-title">All Projects <span class="shared-count">18</span></h3><p class="shared-project-name">Everything shared with Optimist</p></div><button class="shared-all">See all</button></div>'+files(allDocs,true)+'</section></div>';
}
function activity(){
  if(detail==='task')return '<button class="note-back" data-action="activity">‹ Activity</button>'+panelHead('Review report scope','Tomorrow’s order report')+tile(state.confirmed?'Scope confirmed':'Include all three sample clinics?',state.confirmed?'Tomorrow’s demo report will include North, West, and City Clinic.':'North Clinic, West Clinic, and City Clinic.',state.confirmed?tag('Confirmed','good'):tag('Needs input','attn'),state.confirmed?'':button('Confirm scope','confirm','primary'));
  const job=(title,summary,time,duration)=>'<button class="activity-row" data-action="task"><span class="status-check">✓</span><span class="activity-copy"><strong>'+escapeHtml(title)+'</strong><small>'+escapeHtml(summary)+'</small></span><span class="activity-time">'+time+'<small>'+duration+'</small></span><span class="activity-chevron">›</span></button>';
  return '<div class="activity-pane"><p class="activity-note">♢ Every tool the agent used here. Passwords, keys and card details are hidden.</p><h4 class="set-group-label">BACKGROUND JOBS <span>last 3 hours</span></h4>'+job('Publish the local skill `oncoemr-optimist` to the marketplace','Done · submitted for review; listing visibility unconfirmed.','17:52','40 s')+job('Sign in to MBPCC OncoEMR for the owner','Done · signed in and location state confirmed.','17:50','1 min')+job('Replace the existing OncoEMR Read-Only Extraction skill','Done · installed the new skill and verified companion files.','17:47','1 min')+'<button class="show-all">See all 4</button></div>';
}
function vault(){
  const row=item=>{
    if(vaultRename===item.id)return '<div class="vault-row vault-row-edit set-row">'+panelSvg('key')+'<span class="set-row-main"><span class="set-row-title">'+escapeHtml(item.title)+'</span><span class="set-row-sub">'+escapeHtml(item.sub)+'</span><label class="rename-label" for="vault-name-'+item.id+'">New name</label><span class="rename-controls"><input id="vault-name-'+item.id+'" class="vault-name-input" value="'+escapeHtml(item.title)+'" maxlength="80"><button class="btn btn-primary btn-small" data-action="vault-rename-save" data-id="'+item.id+'">Save</button><button class="btn btn-quiet btn-small" data-action="vault-rename-cancel">Cancel</button></span></span><button class="row-menu" data-action="vault-menu" data-id="'+item.id+'" aria-label="More options">•••</button></div>';
    return '<div class="vault-row set-row">'+panelSvg('key')+'<span class="set-row-main"><span class="set-row-title">'+escapeHtml(item.title)+'</span><span class="set-row-sub">'+escapeHtml(item.sub)+'</span></span><button class="row-menu" data-action="vault-menu" data-id="'+item.id+'" aria-expanded="'+(vaultMenu===item.id)+'" aria-label="More options for '+escapeHtml(item.title)+'">•••</button>'+(vaultMenu===item.id?'<div class="vault-popover" role="menu"><button data-action="vault-share" data-id="'+item.id+'">Share</button><button data-action="vault-rename" data-id="'+item.id+'">Rename</button><button data-action="vault-replace" data-id="'+item.id+'">Replace</button><button class="danger" data-action="vault-delete" data-id="'+item.id+'">Delete</button></div>':'')+'</div>';
  };
  return '<div class="set-section vault">'+panelHead('Vault','Saved logins, cards, addresses and keys. Add opens a secure page; values stay hidden here.')+'<button class="btn btn-primary add-vault">＋ Add</button><div class="vault-tabs"><button class="is-on">All 18</button><button>Logins '+state.vaultLogins.length+'</button><button>Cards 0</button><button>Keys &amp; tokens 3</button></div><div class="set-group"><div class="set-group-heading"><h4 class="set-group-label">LOGINS</h4><button class="vault-add-login">＋ Add login</button></div><div class="set-list">'+state.vaultLogins.map(row).join('')+'</div></div></div>';
}
function vaultItem(id){return state.vaultLogins.find(item=>item.id===id);}
function shareVault(id){
  const item=vaultItem(id);if(!item)return;
  vaultMenu='';
  showModal('Share','<div class="share-vault"><p class="share-login-name">'+escapeHtml(item.title)+'</p><div class="share-users-pill">Users</div><label for="op-share-user">Search users by email</label><input id="op-share-user" type="search" placeholder="Search users by email…"><div class="share-owner">'+panelSvg('person')+'<span>rohan.pande@risalabs.ai</span></div><div class="modal-actions"><button type="button" class="wide-outline" data-action="dismiss">Done</button></div></div>');
}
function connectors(){
  const items=[['Google Workspace','Gmail, Calendar, Drive, Docs, Sheets and Slides','Connected','rohan.pande@risalabs.ai'],['GitHub','Repositories, issues and pull requests','Connected','rohanpande001'],['Notion','Pages, databases and workspace search','Not connected',''],['Linear','Issues, projects and roadmaps','Not connected',''],['Granola','Meeting notes and transcripts','Connected','rohan.pande@risalabs.ai'],['Slack','RISA workspace','Connected','RISA (rohan.pande)'],['One RISA','The agent can sign you in without asking for your code','Linked','']];
  return '<div class="set-section connectors">'+panelHead('Connectors','Accounts Optimist can use when you ask.')+'<div class="set-list connector-list">'+items.map(([name,note,status,account])=>'<div class="set-row connector-row"><span class="connector-logo">'+escapeHtml(name[0])+'</span><span class="set-row-main"><span class="set-row-title">'+escapeHtml(name)+'</span><span class="set-row-sub">'+escapeHtml(note)+'</span><span class="connector-status '+(status==='Connected'||status==='Linked'?'is-on':'')+'">'+escapeHtml(status)+'</span>'+(account?'<span class="set-row-sub">'+escapeHtml(account)+'</span>':'')+'</span><button class="btn btn-secondary btn-small">'+(status==='Not connected'?'Connect':status==='Linked'?'Manage':'Add account')+'</button></div>').join('')+'</div><button class="wide-outline">Add custom MCP server</button><h4 class="set-group-label">MARKETPLACE</h4><button class="wide-outline">Browse marketplace connectors</button></div>';
}
const skillCatalog=[
  {id:'eligibility',name:'Eligibility & benefits check',summary:'Check patient insurance eligibility, coverage, COB and chemotherapy benefits.',tasks:'insurance coverage active plan eligibility benefits copay coinsurance deductible network coordination of benefits cob patient treatment day',status:'Ready',owner:'Rohan',use:'When someone asks whether a patient is covered, what benefits apply, or which payer is primary.',steps:['Identify the patient and clinic.','Check active coverage for the requested date.','Return evidence, gaps and the next verification step.'],tools:'Coverage Service · OncoEMR · payer portals'},
  {id:'oncoemr',name:'OncoEMR — fast, verified extraction',summary:'Read authorized OncoEMR data with identity and freshness checks.',tasks:'patient chart medical record diagnosis pathology labs medications appointments demographics insurance oncoemr portal lookup',status:'Live v1',owner:'Rohan',use:'When work requires facts from an authorized OncoEMR chart.',steps:['Confirm patient identity and current organization.','Select Recent facility, then All Locations.','Extract only requested fields and verify freshness.'],tools:'BOSS browser · Vault · OncoEMR'},
  {id:'omnisight',name:'Omnisight Ask API',summary:'Answer questions about RISA prior-authorization orders and operational queues.',tasks:'orders prior authorization queue site volume status analytics report dashboard omnisight',status:'Installed',owner:'RISA Labs',use:'When someone asks about authorization orders, site volumes, queue status or operational trends.',steps:['Translate the request into supported measures.','Query Omnisight with the required scope.','Return the result with assumptions and evidence.'],tools:'Omnisight API'},
  {id:'documents',name:'Work with PDF, Word and Excel files',summary:'Read, create and edit office files and verify the output.',tasks:'pdf word docx excel xlsx spreadsheet csv document create edit analyze report',status:'Install',owner:'BOSS Team',use:'When the task involves reading, transforming or producing business documents.',steps:['Inspect the source and intended output.','Apply the requested edits or analysis.','Validate the generated file before sharing.'],tools:'Files · document tools'},
  {id:'slack',name:'Slack messages with the Optimist signature',summary:'Draft and send concise Slack messages with the approved Optimist footer.',tasks:'slack message dm channel thread reply send communication update announcement',status:'Live',owner:'Rohan',use:'When someone asks Optimist to write or send a Slack message.',steps:['Resolve recipient and channel.','Draft the message in the user’s tone.','Confirm sensitive or consequential sends.'],tools:'Slack connector'},
  {id:'brainstorm',name:'Brainstorm before building',summary:'Clarify goals, users, constraints and what done looks like.',tasks:'brainstorm plan product prd feature design ux architecture build idea scope requirements',status:'Installed',owner:'BOSS Team',use:'Before building a non-trivial product, workflow or technical system.',steps:['Define the user and job to be done.','Surface constraints and risky assumptions.','Choose a direction and a testable definition of done.'],tools:'None required'}
];
function skills(){
  const selected=detail&&skillCatalog.find(item=>item.id===detail);
  if(selected)return '<div class="skill-reader"><button class="note-back" data-action="skills-back">‹ Skills</button>'+panelHead(selected.name,selected.summary)+'<div class="skill-reader-meta"><span class="skills-status is-on">'+escapeHtml(selected.status)+'</span><span>by '+escapeHtml(selected.owner)+'</span></div><section><h4>When Optimist uses it</h4><p>'+escapeHtml(selected.use)+'</p></section><section><h4>Instructions</h4><ol>'+selected.steps.map(step=>'<li>'+escapeHtml(step)+'</li>').join('')+'</ol></section><section><h4>Connected tools</h4><p>'+escapeHtml(selected.tools)+'</p></section><button class="btn btn-primary" data-action="use-skill" data-id="'+selected.id+'">Use in chat</button></div>';
  const installed=skillsView==='installed';
  const rows=installed?skillCatalog.filter(item=>item.status!=='Install'):skillCatalog;
  return '<div class="set-section skills">'+panelHead('Skills','Describe the work you need. Optimist matches the task to relevant skills, even when the skill name is different.')+'<div class="skills-seg"><button class="'+(installed?'is-on':'')+'" data-action="installed">Installed</button><button class="'+(!installed?'is-on':'')+'" data-action="marketplace">Browse</button></div><label class="panel-search">'+panelSvg('search')+'<input class="skills-search-input" placeholder="Describe a task…" autocomplete="off"></label><p class="skills-search-hint">Try “check whether this patient has active coverage”</p><div class="set-list skills-list">'+rows.map((item,i)=>'<div class="set-row skills-item" data-skill-search="'+escapeHtml((item.name+' '+item.summary+' '+item.tasks).toLowerCase())+'"><button class="skills-open" data-action="skill-detail" data-id="'+item.id+'"><span class="set-row-main"><span class="set-row-title">'+escapeHtml(item.name)+'</span><span class="set-row-sub skills-wrap">'+escapeHtml(item.summary)+'</span><span class="set-row-sub">by '+escapeHtml(item.owner)+' · v1 · '+(9+i*3)+' installs</span></span>'+panelSvg('chevron')+'</button><span class="skills-status '+(item.status==='Install'?'':'is-on')+'">'+escapeHtml(item.status)+'</span></div>').join('')+'</div><p class="skills-empty" hidden>No relevant skill found. Try describing the outcome you need.</p></div>';
}
function people(){
  const c=state.community;
  if(detail){const p=c.people.find(x=>x.email===detail);if(p)return '<div class="connections-detail"><button class="note-back" data-action="community-back">‹ My Community</button><div class="connections-hero">'+avatar(p)+'<span class="connections-hero-text"><h3 class="agent-title">'+escapeHtml(p.name)+'</h3><span class="set-row-sub">'+escapeHtml(p.email)+'</span></span></div><div class="set-list">'+compactRow('Connection','Accepted · Your agents can now talk','<span class="connections-dot is-on"></span>')+compactRow('Agent address','@'+p.email+'/'+p.agent,panelSvg('person'))+compactRow('Access','Read-only answers; Optimist checks before anything sensitive')+'</div><div class="connections-chat-log"><div class="connections-chat-line is-them"><span class="connections-bubble">'+escapeHtml(p.name)+'’s Optimist can answer with the context '+escapeHtml(p.name)+' has approved.</span></div></div><button class="btn btn-primary" data-action="mention-agent" data-email="'+escapeHtml(p.email)+'" data-agent="'+escapeHtml(p.agent)+'">Mention @'+escapeHtml(p.email)+'/'+escapeHtml(p.agent)+' in chat</button><button class="btn btn-quiet btn-quiet-danger">Disconnect</button></div>';}
  const personRow=p=>'<li class="set-row connections-item"><button class="connections-row" data-action="community-detail" data-email="'+escapeHtml(p.email)+'">'+avatar(p)+'<span class="set-row-main"><span class="set-row-title">'+escapeHtml(p.email)+'</span><span class="set-row-sub">Colleague via '+escapeHtml(p.via)+' · '+escapeHtml(p.agent)+' · '+escapeHtml(p.last)+'</span></span>'+panelSvg('chevron')+'</button></li>';
  const requests=c.incoming.map(r=>'<li class="set-row connections-request">'+avatar(r)+'<span class="set-row-main"><span class="set-row-title">'+escapeHtml(r.email)+'</span><span class="set-row-sub">Wants to connect agents</span></span><span class="connections-actions">'+button('Decline','decline-community','quiet','data-email="'+escapeHtml(r.email)+'"')+button('Accept','accept-community','primary','data-email="'+escapeHtml(r.email)+'"')+'</span></li>').join('');
  const outgoing=c.outgoing.map(r=>'<li class="set-row">'+avatar(r)+'<span class="set-row-main"><span class="set-row-title">'+escapeHtml(r.email)+'</span><span class="set-row-sub">Waiting for them to accept · '+escapeHtml(r.sent)+'</span></span><button class="btn btn-quiet btn-quiet-danger" data-action="cancel-invite" data-email="'+escapeHtml(r.email)+'">Cancel</button></li>').join('');
  return '<div class="set-section connections">'+panelHead('My Community','People and agents Optimist can talk to. Every connection has the same access: Optimist answers them for you and checks with you on anything sensitive. Colleagues your organisation connects get read-only answers.')+'<form class="connections-invite" id="op-community-form"><label class="panel-search connections-field">'+panelSvg('person')+'<input id="op-community-email" type="email" placeholder="Invite someone by email" required></label><button class="btn btn-secondary btn-small" type="submit">Invite</button></form><label class="panel-search connections-filter">'+panelSvg('search')+'<input placeholder="Search connections"></label><div class="connections-body">'+(requests?'<section class="set-group"><h4 class="set-group-label">REQUESTS <span class="connections-group-count">'+c.incoming.length+'</span></h4><ul class="set-list">'+requests+'</ul></section>':'')+'<section class="set-group"><h4 class="set-group-label">PEOPLE</h4><ul class="set-list">'+c.people.map(personRow).join('')+'</ul><button class="show-all">Show all ('+c.people.length+')</button></section>'+(outgoing?'<section class="set-group"><h4 class="set-group-label">INVITES SENT</h4><ul class="set-list">'+outgoing+'</ul></section>':'')+'<section class="set-group"><h4 class="set-group-label">ORGANISATIONS</h4>'+compactRow('RISA Labs Inc','Connects 55 colleagues’ agents automatically','<span class="connections-avatar is-org">RL</span>','<span class="connections-status is-org">Connected</span>')+'</section></div></div>';
}
function memory(){return '<div class="set-section notes">'+panelHead('Memory & Soul')+'<label class="panel-search">'+panelSvg('search')+'<input placeholder="Search memory and soul"></label><ul class="note-grid"><li class="note-card"><strong class="note-kind">Soul</strong><p class="note-peek">Who is speaking — You are Optimist, a calm, precise colleague for people who work in healthcare. Evidence-first, warm, brief. Fast without seeming hurried.</p><span class="note-date">14/10/2026</span></li><li class="note-card"><strong class="note-kind">Memory</strong><p class="note-peek">For the BTP podcast invite draw, keep the organizer in the pool and always exclude Rohan, Nilesh and Shivan.</p><span class="note-date">22/11/2026</span></li><li class="note-card"><strong class="note-kind">Memory</strong><p class="note-peek">Daily order reports should group counts by site and call out changes from the previous day.</p><span class="note-date">23/11/2026</span></li></ul><p class="activity-note notes-note">Secrets are redacted. Memory is what the agent keeps about you; you can edit it.</p></div>';}
function settings(){return memory();}
function computer(){
  const locations=['Astera Breast Center–Monroe','Astera Brick–Jack Martin Blvd','Astera Cancer Care New Brunswick','Astera Cancer Care–Princeton','Astera Old Bridge','Astera Parsippany','Astera Urology Denville'];
  return '<div class="computer-head"><div class="row"><span class="computer-icon small-icon" aria-hidden="true"><span></span></span><h2>My Optimist Computer</h2></div><div class="row">'+button('↙','computer-expand','computer-control','aria-label="Expand computer" title="Expand computer"')+button('×','computer-back','computer-control','aria-label="Return to panel" title="Return to panel"')+'</div></div>'+
    '<div class="computer-screen"><div class="computer-appbar"><strong><span>OP</span> Open Project</strong><span>Optimist · iMessage workspace</span><span>Run History</span></div><div class="computer-browser"><div class="browser-rail"><button type="button" aria-label="Home">⌂</button><button type="button" aria-label="Browser">F</button><span></span><button type="button" aria-label="New tab">+</button></div><div class="browser-main"><div class="address-bar">‹　›　↻　🔒 https://secure2.oncoemr.com</div><div class="onco-page"><div class="onco-brand"><i></i><strong>ONCOEMR</strong></div><h3>Choose Location</h3><div class="recent-location"><span>East Brunswick</span><small>Recent ›</small></div><div class="location-list">'+locations.map(name=>'<button type="button"><span>'+escapeHtml(name)+'</span><span>›</span></button>').join('')+'</div></div></div></div><div class="computer-footer"><button type="button" class="selected">▣ BOSS window</button><button type="button">▱ Entire screen</button><span>Match size</span><span class="scale-line"></span><span>1.5×</span><strong>✓ Connected</strong></div></div>';
}
function paintPanel(){
  const views={shared,files:shared,activity,vault,connectors,skills,people,computer};
  panel.classList.toggle('computer-view',tab==='computer');
  const navItems=[['shared','Shared'],['activity','Activity'],['vault','Vault'],['connectors','Connectors'],['skills','Skills'],['people','My Community']];
  if(tab==='computer'){panel.innerHTML=computer();return;}
  panel.innerHTML='<section class="details details-compact"><div class="details-tabs-box"><div class="details-tabs" role="tablist" aria-label="Details sections">'+navItems.map(([key,label])=>'<button class="details-tab '+(key===tab?'is-on':'')+'" data-action="'+key+'" role="tab" aria-selected="'+(key===tab)+'">'+label+(key==='people'&&state.community.incoming.length?'<span class="details-tab-badge">'+state.community.incoming.length+'</span>':'')+'</button>').join('')+'</div></div><div class="details-scroll">'+(views[tab]||views.activity)()+'</div></section>';
}
function updateTask(){
  const control=root.querySelector('.status-control');
  if(control)control.hidden=state.confirmed;
}
function showModal(title,content){
  modal.innerHTML='<h2 id="op-dialog-heading">'+escapeHtml(title)+'</h2>'+content;
  if(!modal.open)modal.showModal();
}
const dismiss=button('Cancel','dismiss');
function account(){
  showModal('Account','<div class="account-identity"><span class="rail-profile">RP</span><span><strong>Rohan Pande</strong><small>rohan.pande@risalabs.ai</small></span></div><div class="account-block"><div class="row between"><span><strong id="op-project-label">Create Projects</strong><small>Automatically create a project for new work.</small></span>'+
    button('','toggle-projects','switch','role="switch" aria-labelledby="op-project-label" aria-checked="'+state.projects+'"')+
    '</div></div><button class="account-link" data-action="account-memory"><span>'+panelSvg('person')+'</span><span><strong>Memory &amp; Soul</strong><small>Review what Optimist remembers and how it speaks.</small></span>'+panelSvg('chevron')+'</button><div class="modal-actions">'+button('Done','dismiss','primary')+'</div>');
  modal.querySelector('.switch').innerHTML='<span aria-hidden="true"></span>';
}
function accountMemory(){
  showModal('Memory & Soul','<button class="note-back" data-action="account">‹ Account</button><label class="panel-search account-memory-search">'+panelSvg('search')+'<input placeholder="Search memory and soul"></label><ul class="note-grid account-memory-grid"><li class="note-card"><strong class="note-kind">Soul</strong><p class="note-peek">You are Optimist, a calm, precise colleague for people who work in healthcare. Evidence-first, warm and brief.</p><span class="note-date">14/10/2026</span></li><li class="note-card"><strong class="note-kind">Memory</strong><p class="note-peek">Daily order reports should group counts by site and call out changes from the previous day.</p><span class="note-date">23/11/2026</span></li></ul><p class="small dim">Secrets are redacted. You can review and edit what Optimist keeps about you.</p>');
}
function newProject(){
  if(!state.projects)return;
  showModal('New project','<form id="op-project-form"><label for="op-project-name">Project name</label><input id="op-project-name" name="name" maxlength="70" required autocomplete="off" placeholder="e.g. Coverage review" autofocus><div class="modal-actions">'+dismiss+'<button type="button" class="primary" data-action="submit-project">Create project</button></div></form>');
  get('op-project-name').focus();
}
function invite(){
  showModal('Invite someone','<form id="op-invite-form"><label for="op-email">Email address</label><input id="op-email" name="email" type="email" required maxlength="120" placeholder="maya@example.com" autofocus>'+
    tile('Approval required','This person can ask Optimist questions. Optimist checks with you before sharing information from connected tools.')+
    '<div class="modal-actions">'+dismiss+'<button type="button" class="primary" data-action="submit-invite">Send demo invite</button></div></form>');
}
function searchModal(){
  showModal('Search chats','<label for="op-search">Search projects, threads, and messages</label><input id="op-search" type="search" autofocus placeholder="Search Optimist…"><div id="op-search-results"></div><div class="modal-actions">'+button('Done','dismiss')+'</div>');
  get('op-search').focus();
  showMatches('');
}
function showMatches(query){
  const term=query.trim().toLowerCase();
  const rows=state.chats.flatMap(entry=>entry.turns.filter(turn=>!term||(entry.name+' '+turn.prompt+' '+turn.answer).toLowerCase().includes(term)).map(turn=>({chat:entry,turn})));
  get('op-search-results').innerHTML=rows.length?rows.slice(0,16).map(({chat:entry,turn})=>'<button type="button" class="click-tile search-result" data-action="result" data-chat="'+escapeHtml(entry.id)+'" data-target="'+escapeHtml(turn.id)+'"><strong>'+escapeHtml(short(turn.prompt))+'</strong><span>'+escapeHtml(entry.name)+'</span></button>').join(''):'<p class="dim">No matching messages.</p>';
}
const act={
  projects:()=>{if(panelOpen&&mobileNav())closePanel();setNav(true);},
  nav:()=>{const on=!nav.classList.contains('open');if(on&&panelOpen&&mobileNav())closePanel();setNav(on);},
  chat:({chat:id})=>{if(id!==active)openChat(id);closeMobileNav();},
  thread:({chat:id,target})=>{jump(id,target);closeMobileNav();},
  pin:({turn})=>{
    const pinned=pinTurn(chat(),turn);
    if(!pinned&&anchor===turn){anchor='';get('op-turn-'+turn).classList.remove('highlight');}
    openMessage='';save();paintChat();paintNav();announce(pinned?'Thread saved in '+chat().name:'Thread removed');
  },
  'message-menu':({turn,side})=>{openMessage=openMessage===turn+':'+side?'':turn+':'+side;paintChat();get('op-turn-'+turn)?.scrollIntoView({block:'nearest'});},
  react:({reaction,turn})=>{openMessage='';paintChat();announce(reaction+' reaction added');get('op-turn-'+turn)?.scrollIntoView({block:'nearest'});},
  'reply-message':({turn,side})=>{const item=chat().turns.find(value=>value.id===turn);const quote=side==='user'?item?.prompt:item?.answer;if(quote)draft.value='Replying to: “'+short(quote)+'”\n';openMessage='';paintChat();draft.focus();announce('Reply added to the draft');},
  'copy-message':async({turn,side})=>{const item=chat().turns.find(value=>value.id===turn);const text=side==='user'?item?.prompt:item?.answer;if(text)await navigator.clipboard?.writeText(text);openMessage='';paintChat();announce('Message copied');},
  panel:()=>panelOpen?closePanel():openPanel(),
  'close-panel':()=>{closePanel();root.querySelector('[data-action="panel"]').focus();},
  activity:()=>openPanel('activity'),
  task:()=>openPanel('activity','task'),
  confirm:()=>{state.confirmed=true;save();updateTask();paintPanel();announce('Report scope confirmed');},
  shared:()=>openPanel('shared'),
  files:()=>openPanel('shared'),
  skills:()=>openPanel('skills'),
  installed:()=>{skillsView='installed';openPanel('skills');},
  marketplace:()=>{skillsView='market';openPanel('skills');},
  'skill-detail':({id})=>openPanel('skills',id),
  'skills-back':()=>openPanel('skills'),
  'use-skill':({id})=>{const item=skillCatalog.find(skill=>skill.id===id);if(item){draft.value='Use “'+item.name+'” to ';closePanel();draft.focus();announce('Skill added to the draft');}},
  install:()=>{state.installed=true;save();paintPanel();announce('Demo skill installed');},
  'try-ev':useSkill,
  people:()=>openPanel('people'),
  memory:()=>openPanel('memory'),
  connections:()=>{peopleView='connections';openPanel('people');},
  pending:()=>{peopleView='pending';openPanel('people');},
  alex:()=>openPanel('people','alex'),
  'community-detail':({email})=>openPanel('people',email),
  'community-back':()=>openPanel('people'),
  'mention-agent':({email,agent})=>{draft.value+=(draft.value?' ':'')+'@'+email+'/'+agent+' ';closePanel();draft.focus();announce('Agent mention added to the draft');},
  'accept-community':({email})=>{const request=state.community.incoming.find(x=>x.email===email);if(request){state.community.incoming=state.community.incoming.filter(x=>x.email!==email);state.community.people.unshift({...request,online:true,via:'RISA Labs Inc',accepted:true,last:'just now'});save();paintPanel();announce('Connection accepted');}},
  'decline-community':({email})=>{state.community.incoming=state.community.incoming.filter(x=>x.email!==email);save();paintPanel();announce('Connection declined');},
  'cancel-invite':({email})=>{state.community.outgoing=state.community.outgoing.filter(x=>x.email!==email);save();paintPanel();announce('Invite canceled');},
  settings:()=>openPanel('settings'),
  vault:()=>openPanel('vault'),
  'vault-menu':({id})=>{vaultMenu=vaultMenu===id?'':id;vaultRename='';paintPanel();},
  'vault-share':({id})=>shareVault(id),
  'vault-rename':({id})=>{vaultMenu='';vaultRename=id;paintPanel();requestAnimationFrame(()=>get('vault-name-'+id)?.select());},
  'vault-rename-cancel':()=>{vaultRename='';paintPanel();},
  'vault-rename-save':({id})=>{const item=vaultItem(id),field=get('vault-name-'+id);if(item&&field?.value.trim()){item.title=field.value.trim();vaultRename='';save();paintPanel();announce('Login renamed');}},
  'vault-replace':({id})=>{const item=vaultItem(id);vaultMenu='';showModal('Replace login','<p>Replace the saved credentials for <strong>'+escapeHtml(item?.title||'this login')+'</strong>. The existing value stays active until the secure replacement is saved.</p><div class="modal-actions">'+button('Cancel','dismiss')+button('Open secure replacement','dismiss','primary')+'</div>');},
  'vault-delete':({id})=>{const item=vaultItem(id);vaultMenu='';showModal('Delete login','<p>Delete <strong>'+escapeHtml(item?.title||'this login')+'</strong>? Optimist will no longer be able to use it.</p><div class="modal-actions">'+button('Cancel','dismiss')+button('Delete','vault-delete-confirm','danger','data-id="'+id+'"')+'</div>');},
  'vault-delete-confirm':({id})=>{state.vaultLogins=state.vaultLogins.filter(item=>item.id!==id);save();modal.close();openPanel('vault');announce('Login deleted');},
  connectors:()=>openPanel('connectors'),
  computer:()=>openPanel('computer'),
  'computer-back':()=>openPanel('activity'),
  'computer-expand':()=>{panel.classList.toggle('computer-expanded');announce(panel.classList.contains('computer-expanded')?'Computer expanded':'Computer restored');},
  account,
  'account-memory':accountMemory,
  attach:()=>showModal('Add to message',tile('Photos and files','Prototype attachment picker. Drag-and-drop support can be added in the production build.')+'<div class="modal-actions">'+button('Done','dismiss','primary')+'</div>'),
  emoji:()=>{draft.value+='😊';draft.focus();draft.setSelectionRange(draft.value.length,draft.value.length);},
  voice:(_data,control)=>{
    const recording=root.classList.toggle('voice-active');
    control.setAttribute('aria-label',recording?'Stop voice input':'Start voice input');
    control.title=recording?'Stop voice input':'Start voice input';
    announce(recording?'Voice input started':'Voice input stopped');
  },
  'toggle-projects':(_data,control)=>{
    state.projects=!state.projects;save();paintNav();
    control.setAttribute('aria-checked',String(state.projects));
    announce(state.projects?'Project creation enabled':'Project creation disabled');
  },
  new:newProject,invite,search:searchModal,send:submitMessage,'submit-project':submitProject,'submit-invite':submitInvite,
  result:({chat:id,target})=>{modal.close();jump(id,target);},
  dismiss:()=>modal.close()
};
root.addEventListener('click',event=>{
  const control=event.target.closest?.('button[data-action]');
  if(control&&Object.hasOwn(act,control.dataset.action))act[control.dataset.action](control.dataset,control);
});
root.addEventListener('input',event=>{
  if(event.target.id==='op-search')showMatches(event.target.value);
  if(event.target.id==='op-project-name')event.target.setCustomValidity('');
  if(event.target.classList.contains('skills-search-input')){
    const raw=event.target.value.toLowerCase().trim();
    const stop=new Set(['i','a','an','the','to','for','of','if','is','it','this','that','need','want','please','can','you','me','my','with','about','know']);
    const aliases={covered:'coverage',cover:'coverage',member:'patient',benefit:'benefits',auth:'authorization',authorize:'authorization',spreadsheet:'excel',document:'file',messages:'message'};
    const terms=[...new Set(raw.split(/[^a-z0-9]+/).filter(term=>term&&!stop.has(term)).map(term=>aliases[term]||term))];
    const threshold=Math.min(2,terms.length);
    let visible=0;
    panel.querySelectorAll('.skills-item').forEach(row=>{const corpus=row.dataset.skillSearch||'';const score=terms.filter(term=>corpus.includes(term)).length;const match=!terms.length||score>=threshold;row.hidden=!match;if(match)visible++;});
    const empty=panel.querySelector('.skills-empty');if(empty)empty.hidden=visible>0;
  }
});
function submitProject(){
  const field=get('op-project-name');
  const project=addProject(state,field.value,newId());
  if(!project){
    field.setCustomValidity('Enter a project name.');
    field.reportValidity();
    field.focus();
    return;
  }
  save();modal.close();openChat(project.id);closeMobileNav();draft.focus();
}
function submitInvite(){
  const field=get('op-email');
  if(!field.reportValidity())return;
  const email=field.value.trim().toLowerCase();
  if(!email)return;
  if(!state.community.people.some(x=>x.email===email)&&!state.community.outgoing.some(x=>x.email===email))state.community.outgoing.unshift({email,sent:'just now',accepted:false});
  save();modal.close();openPanel('people');announce('Invitation sent. The other person must accept first.');
}
function submitCommunityInvite(){
  const field=get('op-community-email');
  if(!field?.reportValidity())return;
  const email=field.value.trim().toLowerCase();
  if(!email)return;
  if(state.community.people.some(x=>x.email===email)){announce(email+' is already connected');return;}
  if(!state.community.outgoing.some(x=>x.email===email))state.community.outgoing.unshift({email,sent:'just now',accepted:false});
  save();paintPanel();announce('Invitation sent. Waiting for '+email+' to accept.');
}
function submitMessage(){
  const prompt=draft.value.trim();
  if(!prompt)return;
  const peer=state.community.people.find(p=>prompt.toLowerCase().includes(('@'+p.email+'/'+p.agent).toLowerCase()));
  const answer=peer?peer.name+'’s Optimist shared approved context: the PA workflow currently has three cases waiting on payer confirmation, and the clinical-trial queue has two unresolved biomarker checks. Sensitive details remain with '+peer.name+' until explicitly approved.':'Message added to this demo conversation. Pin this exchange to return to it from the sidebar.';
  chat().turns.push({id:newId(),prompt,answer});
  draft.value='';drafts.delete(active);anchor='';root.classList.remove('voice-active');save();paintChat();paintNav();
  timeline.scrollTop=timeline.scrollHeight;draft.focus();
}
const submissions={'op-project-form':submitProject,'op-invite-form':submitInvite,'op-community-form':submitCommunityInvite,'op-composer':submitMessage};
root.addEventListener('submit',event=>{
  event.preventDefault();
  submissions[event.target.id]?.();
});
root.addEventListener('keydown',event=>{
  if(event.key==='Enter'&&!event.shiftKey&&!event.isComposing){
    const formId={'op-project-name':'op-project-form','op-email':'op-invite-form','op-community-email':'op-community-form','op-draft':'op-composer'}[event.target.id];
    if(formId){event.preventDefault();submissions[formId]();return;}
  }
  if(event.key==='Escape'&&!modal.open){
    if(panelOpen)act['close-panel']();
    else if(nav.classList.contains('open')){setNav(false);root.querySelector('[data-action="nav"]').focus();}
  }
});
setNav(!mobileNav());
draft.value='';
paintChat();
paintNav();
updateTask();
timeline.scrollTop=timeline.scrollHeight;
