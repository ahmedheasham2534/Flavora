// ══════════════════════════════════
//  STORAGE
// ══════════════════════════════════
function loadOrders(){ try{ return JSON.parse(localStorage.getItem('dreamsOrders')||'[]'); }catch{ return []; } }
function saveOrders(arr){ localStorage.setItem('dreamsOrders', JSON.stringify(arr)); }

// ══════════════════════════════════
//  DARK MODE
// ══════════════════════════════════
function applyDark(on){
  document.body.classList.toggle('dark',on);
  document.getElementById('darkIcon').className = on?'fas fa-sun':'fas fa-moon';
  localStorage.setItem('theme', on?'dark':'light');
}
function toggleDark(){ applyDark(!document.body.classList.contains('dark')); }
if(localStorage.getItem('theme')==='dark') applyDark(true);

// ══════════════════════════════════
//  STATE
// ══════════════════════════════════
let typeFilter = 'all';
let knownIds   = new Set(); // for new-order detection
let detailId   = null;

// ══════════════════════════════════
//  HELPERS
// ══════════════════════════════════
function cap(s){ return s?s.charAt(0).toUpperCase()+s.slice(1):''; }
function iTotal(item){ return (item.basePrice + (item.sizeExtra||0) + (item.addonTotal||0)) * item.qty; }
function fmtTime(iso){ return new Date(iso).toLocaleTimeString('en-US',{hour:'2-digit',minute:'2-digit'}); }
function minsAgo(iso){ return Math.floor((Date.now()-new Date(iso))/60000); }
function timerClass(m){ return m>20?'late':m>10?'warn':'ok'; }
function urgencyClass(status, mins){
  if(status==='ordered'&&mins>20) return 'urgent';
  if(status==='ordered'&&mins>10) return 'warning';
  if(status==='preparing'&&mins>30) return 'urgent';
  if(status==='preparing'&&mins>20) return 'warning';
  return '';
}

// ══════════════════════════════════
//  STATS
// ══════════════════════════════════
function renderStats(orders){
  const all = orders.filter(o=>o.status!=='cancelled');
  const counts = {ordered:0,preparing:0,delivered:0,cancelled:0};
  let revenue = 0;
  orders.forEach(o=>{
    counts[o.status] = (counts[o.status]||0)+1;
    if(o.status==='delivered') revenue += o.total||0;
  });
  document.getElementById('statsRow').innerHTML = `
    <div class="stat-card">
      <div class="stat-icon" style="background:var(--blue-lt);color:var(--blue)"><i class="fas fa-receipt"></i></div>
      <div class="stat-info"><div class="stat-val">${all.length}</div><div class="stat-lbl">Total Orders</div></div>
    </div>
    <div class="stat-card">
      <div class="stat-icon" style="background:var(--yellow-lt);color:var(--yellow)"><i class="fas fa-clock"></i></div>
      <div class="stat-info"><div class="stat-val">${counts.ordered||0}</div><div class="stat-lbl">Waiting</div></div>
    </div>
    <div class="stat-card">
      <div class="stat-icon" style="background:var(--orange-lt);color:var(--orange)"><i class="fas fa-fire"></i></div>
      <div class="stat-info"><div class="stat-val">${counts.preparing||0}</div><div class="stat-lbl">Preparing</div></div>
    </div>
    <div class="stat-card">
      <div class="stat-icon" style="background:var(--green-lt);color:var(--green)"><i class="fas fa-check-circle"></i></div>
      <div class="stat-info"><div class="stat-val">${counts.delivered||0}</div><div class="stat-lbl">Delivered</div></div>
    </div>
    <div class="stat-card">
      <div class="stat-icon" style="background:var(--purple-lt);color:var(--purple)"><i class="fas fa-dollar-sign"></i></div>
      <div class="stat-info"><div class="stat-val">$${revenue.toFixed(0)}</div><div class="stat-lbl">Revenue</div></div>
    </div>
  `;
}

// ══════════════════════════════════
//  ORDER CARD HTML
// ══════════════════════════════════
function cardHTML(o){
  const mins = minsAgo(o.time);
  const tClass = timerClass(mins);
  const uClass  = urgencyClass(o.status, mins);
  const typeMap = {delivery:'tt-delivery',takeaway:'tt-takeaway',dinein:'tt-dinein'};
  const typeL   = {delivery:'Delivery',takeaway:'Take Away',dinein:'Dine In'};
  const items   = (o.items||[]).slice(0,3);
  const more    = (o.items||[]).length - 3;

  let actionBtns = '';
  if(o.status === 'ordered'){
    actionBtns = `
      <button class="oc-btn btn-advance" onclick="advance('${o.id}','preparing')"><i class="fas fa-fire"></i> Prepare</button>
      <button class="oc-btn btn-cancel"  onclick="advance('${o.id}','cancelled')"><i class="fas fa-times"></i></button>
    `;
  } else if(o.status === 'preparing'){
    actionBtns = `
      <button class="oc-btn btn-back"    onclick="advance('${o.id}','ordered')"><i class="fas fa-arrow-left"></i></button>
      <button class="oc-btn btn-done"    onclick="advance('${o.id}','delivered')"><i class="fas fa-check"></i> Deliver</button>
    `;
  } else if(o.status === 'delivered'){
    actionBtns = `<button class="oc-btn btn-advance" onclick="openDetail('${o.id}')"><i class="fas fa-eye"></i> View</button>`;
  }

  return `
    <div class="ord-card ${uClass}" id="card-${o.id}" onclick="openDetail('${o.id}')">
      <div class="oc-hdr">
        <div>
          <div class="oc-id">${o.id}</div>
          <div class="oc-name">${o.customer}</div>
        </div>
        <div class="oc-right">
          <span class="type-tag ${typeMap[o.type]||''}">${typeL[o.type]||o.type}</span>
          <span class="oc-timer ${tClass}"><i class="fas fa-clock"></i> ${mins}m</span>
        </div>
      </div>
      <div class="oc-body">
        <div class="oc-items">
          ${items.map(i=>`
            <div class="oc-item">
              <span class="oc-item-emoji">${i.emoji}</span>
              <span class="oc-item-name">${i.name}</span>
              <span class="oc-item-qty">×${i.qty}</span>
              <span class="oc-item-price">$${iTotal(i).toFixed(0)}</span>
            </div>
          `).join('')}
          ${more>0?`<div style="font-size:11px;color:var(--muted);padding:4px 0">+${more} more item${more>1?'s':''}</div>`:''}
        </div>
        <div class="oc-meta">
          <span><i class="fas fa-clock"></i>${fmtTime(o.time)}</span>
          ${o.waiter&&o.waiter!=='—'?`<span><i class="fas fa-user"></i>${o.waiter}</span>`:''}
          ${o.table&&o.table!=='—'?`<span><i class="fas fa-chair"></i>${o.table}</span>`:''}
        </div>
        <div class="oc-foot" onclick="event.stopPropagation()">
          <div class="oc-total">$${(o.total||0).toFixed(2)}</div>
          <div class="oc-actions">${actionBtns}</div>
        </div>
      </div>
    </div>
  `;
}

// ══════════════════════════════════
//  RENDER COLUMNS
// ══════════════════════════════════
function renderAll(){
  const q = (document.getElementById('searchInput').value||'').toLowerCase();
  let orders = loadOrders();

  // detect new orders
  orders.forEach(o=>{ if(!knownIds.has(o.id)){ knownIds.add(o.id); } });

  // filter
  if(typeFilter!=='all') orders = orders.filter(o=>o.type===typeFilter);
  if(q) orders = orders.filter(o=>
    o.id.toLowerCase().includes(q) ||
    o.customer.toLowerCase().includes(q) ||
    (o.items||[]).some(i=>i.name.toLowerCase().includes(q))
  );

  renderStats(loadOrders()); // stats always use full list

  const cols = {ordered:[],preparing:[],delivered:[]};
  orders.forEach(o=>{ if(cols[o.status]!==undefined) cols[o.status].push(o); });

  renderCol('Ordered',  'ticketsOrdered',  'badgeOrdered',  cols.ordered);
  renderCol('Preparing','ticketsPreparing','badgePreparing', cols.preparing);
  renderCol('Delivered','ticketsDelivered','badgeDelivered', cols.delivered);
}

function renderCol(label, containerId, badgeId, orders){
  document.getElementById(badgeId).textContent = orders.length;
  const el = document.getElementById(containerId);
  if(!orders.length){
    el.innerHTML = `<div class="k-empty"><i class="fas fa-inbox"></i><p>No ${label.toLowerCase()} orders</p></div>`;
    return;
  }
  el.innerHTML = orders.map(o=>cardHTML(o)).join('');
}

// ══════════════════════════════════
//  ADVANCE STATUS
// ══════════════════════════════════
function advance(id, newStatus){
  event.stopPropagation();
  const orders = loadOrders();
  const o = orders.find(x=>x.id===id);
  if(!o) return;
  o.status = newStatus;
  // sync kitchen status
  const kitMap={ordered:'new',preparing:'preparing',delivered:'served',cancelled:'cancelled'};
  o.kitStatus = kitMap[newStatus]||o.kitStatus;
  saveOrders(orders);
  renderAll();
  const labels={ordered:'Moved back to Ordered',preparing:'Now Preparing',delivered:'Marked Delivered ✓',cancelled:'Order Cancelled'};
  toast(labels[newStatus]||newStatus, newStatus==='delivered'?'success':newStatus==='cancelled'?'error':'info');
  if(detailId===id) openDetail(id); 
}

// ══════════════════════════════════
//  TYPE FILTER
// ══════════════════════════════════
function setType(t, btn){
  typeFilter=t;
  document.querySelectorAll('.flt-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  renderAll();
}

// ══════════════════════════════════
//  DETAIL MODAL
// ══════════════════════════════════
function openDetail(id){
  detailId = id;
  const orders = loadOrders();
  const o = orders.find(x=>x.id===id);
  if(!o) return;
  const typeL={delivery:'Delivery',takeaway:'Take Away',dinein:'Dine In'};
  document.getElementById('dmTitle').textContent = `Order ${o.id}`;
  document.getElementById('dmItems').innerHTML = (o.items||[]).map(item=>`
    <div class="modal-item-row">
      <div class="mi-emoji">${item.emoji}</div>
      <div class="mi-info">
        <div class="mi-name">${item.name} ×${item.qty}</div>
        <div class="mi-sub">${item.size||''}${item.addons&&item.addons.length?' · '+item.addons.join(', '):''}${item.note?' · '+item.note:''}</div>
      </div>
      <div class="mi-price">$${iTotal(item).toFixed(2)}</div>
    </div>
  `).join('');
  document.getElementById('dmMeta').innerHTML = `
    <div class="meta-cell"><div class="meta-lbl">Type</div><div class="meta-val">${typeL[o.type]||o.type}</div></div>
    <div class="meta-cell"><div class="meta-lbl">Table</div><div class="meta-val">${o.table||'—'}</div></div>
    <div class="meta-cell"><div class="meta-lbl">Waiter</div><div class="meta-val">${o.waiter||'—'}</div></div>
    <div class="meta-cell"><div class="meta-lbl">Time</div><div class="meta-val">${fmtTime(o.time)}</div></div>
    <div class="meta-cell"><div class="meta-lbl">Subtotal</div><div class="meta-val" style="font-family:var(--mono)">$${(o.subtotal||0).toFixed(2)}</div></div>
    <div class="meta-cell"><div class="meta-lbl">Total</div><div class="meta-val" style="color:var(--green);font-family:var(--mono)">$${(o.total||0).toFixed(2)}</div></div>
  `;
  const statuses=['ordered','preparing','delivered','cancelled'];
  document.getElementById('dmStatuses').innerHTML = statuses.map(s=>`
    <button class="status-pill ${o.status===s?'active':''}" onclick="advance('${o.id}','${s}')">${cap(s)}</button>
  `).join('');
  document.getElementById('detailOverlay').classList.add('show');
}
function closeDetail(){ document.getElementById('detailOverlay').classList.remove('show'); detailId=null; }

// ══════════════════════════════════
//  TOAST
// ══════════════════════════════════
function toast(msg, type){
  const c=document.getElementById('toastWrap');
  const t=document.createElement('div');
  t.className=`toast ${type}`;
  t.innerHTML=`<i class="fas ${type==='success'?'fa-check-circle':type==='error'?'fa-exclamation-circle':'fa-info-circle'}"></i> ${msg}`;
  c.appendChild(t);
  requestAnimationFrame(()=>requestAnimationFrame(()=>t.classList.add('in')));
  setTimeout(()=>{t.classList.remove('in');setTimeout(()=>t.remove(),300);},3000);
}

// ══════════════════════════════════
//  AUTO REFRESH + INIT
// ══════════════════════════════════
renderAll();
setInterval(renderAll, 4000); 

