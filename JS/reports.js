// ══════════════════════════════════
//  STORAGE
// ══════════════════════════════════
function loadOrders(){ try{ return JSON.parse(localStorage.getItem('dreamsOrders')||'[]'); }catch{ return []; } }

// ══════════════════════════════════
//  DARK MODE
// ══════════════════════════════════
function applyDark(on){
  document.body.classList.toggle('dark',on);
  document.getElementById('darkIcon').className=on?'fas fa-sun':'fas fa-moon';
  localStorage.setItem('theme',on?'dark':'light');
  // Redraw charts on theme change
  if(revChart){ revChart.destroy(); revChart=null; }
  if(typeChrt){ typeChrt.destroy(); typeChrt=null; }
  renderAll();
}
function toggleDark(){ applyDark(!document.body.classList.contains('dark')); }
if(localStorage.getItem('theme')==='dark') applyDark(true);

// ══════════════════════════════════
//  HELPERS
// ══════════════════════════════════
function cap(s){ return s?s.charAt(0).toUpperCase()+s.slice(1):''; }
function fmtTime(iso){ return new Date(iso).toLocaleTimeString('en-US',{hour:'2-digit',minute:'2-digit'}); }
function fmtDate(iso){ return new Date(iso).toLocaleDateString('en-US',{month:'short',day:'numeric'}); }
function iTotal(item){ return (item.basePrice+(item.sizeExtra||0)+(item.addonTotal||0))*item.qty; }

let dateRange='today';
let revChart=null, typeChrt=null;

// ══════════════════════════════════
//  DATE FILTER
// ══════════════════════════════════
function setRange(r,btn){
  dateRange=r;
  document.querySelectorAll('.dr-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  if(revChart){ revChart.destroy(); revChart=null; }
  if(typeChrt){ typeChrt.destroy(); typeChrt=null; }
  renderAll();
}

// ══════════════════════════════════
//  MAIN RENDER
// ══════════════════════════════════
function renderAll(){
  const allOrders = loadOrders();
  const active = allOrders.filter(o=>o.status!=='cancelled');

  renderKPIs(allOrders, active);
  renderCharts(allOrders);
  renderTopItems(active);
  renderTypeBreakdown(active);
  renderActivityLog(allOrders);
  renderTable(allOrders);
}

// ══════════════════════════════════
//  KPIs
// ══════════════════════════════════
function renderKPIs(all, active){
  const delivered = all.filter(o=>o.status==='delivered');
  const revenue   = delivered.reduce((s,o)=>s+(o.total||0), 0);
  const totalOrds = active.length;
  const avgVal    = delivered.length ? revenue/delivered.length : 0;
  const items     = active.reduce((s,o)=>s+(o.items||[]).reduce((ss,i)=>ss+i.qty,0),0);
  const cancelled = all.filter(o=>o.status==='cancelled').length;
  const cancRate  = all.length ? ((cancelled/all.length)*100).toFixed(0) : 0;

  // Simulated previous period for trend (±random for demo)
  const prevRev = revenue * (0.85 + Math.random()*0.3);
  const revTrend = revenue > prevRev ? 'up' : 'down';
  const revPct = Math.abs(((revenue-prevRev)/Math.max(prevRev,1))*100).toFixed(1);

  document.getElementById('kpiGrid').innerHTML=`
    <div class="kpi-card blue">
      <div class="kpi-icon"><i class="fas fa-dollar-sign"></i></div>
      <div class="kpi-val">$${revenue.toFixed(0)}</div>
      <div class="kpi-lbl">Total Revenue</div>
      <div class="kpi-trend ${revTrend}"><i class="fas fa-arrow-${revTrend}"></i> ${revPct}% vs last period</div>
    </div>
    <div class="kpi-card green">
      <div class="kpi-icon"><i class="fas fa-receipt"></i></div>
      <div class="kpi-val">${totalOrds}</div>
      <div class="kpi-lbl">Total Orders</div>
      <div class="kpi-trend up"><i class="fas fa-arrow-up"></i> ${delivered.length} delivered</div>
    </div>
    <div class="kpi-card orange">
      <div class="kpi-icon"><i class="fas fa-utensils"></i></div>
      <div class="kpi-val">${items}</div>
      <div class="kpi-lbl">Items Sold</div>
      <div class="kpi-trend up"><i class="fas fa-arrow-up"></i> Across ${totalOrds} orders</div>
    </div>
    <div class="kpi-card purple">
      <div class="kpi-icon"><i class="fas fa-chart-line"></i></div>
      <div class="kpi-val">$${avgVal.toFixed(0)}</div>
      <div class="kpi-lbl">Avg. Order Value</div>
      <div class="kpi-trend ${cancRate>10?'down':'up'}"><i class="fas fa-times-circle"></i> ${cancRate}% cancellation rate</div>
    </div>
  `;
}

// ══════════════════════════════════
//  CHARTS
// ══════════════════════════════════
function renderCharts(orders){
  const isDark = document.body.classList.contains('dark');
  const gridColor  = isDark?'rgba(255,255,255,.06)':'rgba(0,0,0,.05)';
  const textColor  = isDark?'#768390':'#7c8494';

  // Revenue line chart — group by order (simulate hourly for demo)
  const delivered = orders.filter(o=>o.status==='delivered');
  let labels, data;
  if(dateRange==='today'){
    labels=['9am','10am','11am','12pm','1pm','2pm','3pm','4pm','5pm','6pm','7pm','8pm'];
    // Distribute delivered orders across hours
    const buckets = new Array(12).fill(0);
    delivered.forEach(o=>{
      const h = new Date(o.time).getHours();
      const idx = Math.max(0,Math.min(11,h-9));
      buckets[idx]+=(o.total||0);
    });
    // Add some base demo data if empty
    data = buckets.map((v,i)=>v || [80,220,410,680,890,760,540,620,880,1040,720,310][i]*0.3*(Math.random()*.5+.75));
  } else if(dateRange==='week'){
    labels=['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
    data=[1200,1580,1340,2100,2750,3100,2420];
  } else {
    labels=['Wk 1','Wk 2','Wk 3','Wk 4'];
    data=[8200,9400,7800,11200];
  }

  if(!revChart){
    revChart=new Chart(document.getElementById('revenueChart').getContext('2d'),{
      type:'line',
      data:{
        labels,
        datasets:[{
          label:'Revenue ($)',
          data,
          borderColor:'#0066FF',
          backgroundColor:'rgba(0,102,255,.1)',
          borderWidth:2.5,fill:true,tension:.4,
          pointRadius:3,pointBackgroundColor:'#0066FF'
        }]
      },
      options:{
        responsive:true,maintainAspectRatio:false,
        plugins:{legend:{display:false},tooltip:{callbacks:{label:c=>'$'+c.parsed.y.toFixed(0)}}},
        scales:{
          x:{grid:{color:gridColor},ticks:{color:textColor,font:{size:11}}},
          y:{grid:{color:gridColor},ticks:{color:textColor,font:{size:11},callback:v=>'$'+v}}
        }
      }
    });
  }

  // Type donut
  const typeCounts={dinein:0,takeaway:0,delivery:0};
  orders.filter(o=>o.status!=='cancelled').forEach(o=>typeCounts[o.type]=(typeCounts[o.type]||0)+1);
  const typeTotal=Object.values(typeCounts).reduce((a,b)=>a+b,0)||1;

  if(!typeChrt){
    typeChrt=new Chart(document.getElementById('typeChart').getContext('2d'),{
      type:'doughnut',
      data:{
        labels:['Dine In','Take Away','Delivery'],
        datasets:[{
          data:[typeCounts.dinein,typeCounts.takeaway,typeCounts.delivery],
          backgroundColor:['#0066FF','#f97316','#22c55e'],
          borderWidth:0,hoverOffset:8
        }]
      },
      options:{
        responsive:true,maintainAspectRatio:false,cutout:'65%',
        plugins:{
          legend:{position:'bottom',labels:{color:textColor,font:{size:11},padding:12,usePointStyle:true}},
          tooltip:{callbacks:{label:c=>`${c.label}: ${c.parsed} order${c.parsed!==1?'s':''}`}}
        }
      }
    });
  }
}

// ══════════════════════════════════
//  TOP ITEMS
// ══════════════════════════════════
function renderTopItems(orders){
  const itemMap={};
  orders.forEach(o=>(o.items||[]).forEach(i=>{
    if(!itemMap[i.name]) itemMap[i.name]={name:i.name,emoji:i.emoji,qty:0,rev:0};
    itemMap[i.name].qty+=i.qty;
    itemMap[i.name].rev+=iTotal(i);
  }));
  const sorted=Object.values(itemMap).sort((a,b)=>b.rev-a.rev).slice(0,6);
  const maxRev=sorted[0]?.rev||1;
  const rankCls=['gold','silver','bronze'];

  if(!sorted.length){
    document.getElementById('topItems').innerHTML='<div style="text-align:center;padding:20px;color:var(--muted);font-size:13px">No orders yet</div>';
    return;
  }
  document.getElementById('topItems').innerHTML=sorted.map((item,i)=>`
    <div class="top-item">
      <div class="ti-rank ${rankCls[i]||''}">${i+1}</div>
      <div class="ti-emoji">${item.emoji}</div>
      <div class="ti-info">
        <div class="ti-name">${item.name}</div>
        <div class="ti-qty">${item.qty} sold</div>
        <div class="ti-bar-wrap"><div class="ti-bar" style="width:${(item.rev/maxRev*100).toFixed(0)}%"></div></div>
      </div>
      <div class="ti-rev">$${item.rev.toFixed(0)}</div>
    </div>
  `).join('');
}

// ══════════════════════════════════
//  TYPE BREAKDOWN
// ══════════════════════════════════
function renderTypeBreakdown(orders){
  const types=[
    {key:'dinein', label:'Dine In',    color:'#0066FF'},
    {key:'takeaway',label:'Take Away', color:'#f97316'},
    {key:'delivery',label:'Delivery',  color:'#22c55e'},
  ];
  const total = orders.length||1;
  const revenue= orders.reduce((s,o)=>s+(o.total||0),0)||1;

  document.getElementById('typeBreakdown').innerHTML = types.map(t=>{
    const tOrds = orders.filter(o=>o.type===t.key);
    const tRev  = tOrds.reduce((s,o)=>s+(o.total||0),0);
    const pct   = Math.round((tOrds.length/total)*100);
    return `
      <div class="type-item">
        <div class="type-dot" style="background:${t.color}"></div>
        <div style="flex:1">
          <div style="display:flex;align-items:center;justify-content:space-between;">
            <span class="type-lbl">${t.label}</span>
            <span class="type-amt">$${tRev.toFixed(0)}</span>
          </div>
          <div style="display:flex;align-items:center;justify-content:space-between;margin-top:1px;">
            <span class="type-count">${tOrds.length} order${tOrds.length!==1?'s':''} · ${pct}%</span>
          </div>
          <div class="type-bar-wrap"><div class="type-bar" style="width:${pct}%;background:${t.color}"></div></div>
        </div>
      </div>
    `;
  }).join('');

  // Payment methods
  const payMap={cash:0,card:0,wallet:0};
  orders.forEach(o=>{ if(o.payMethod) payMap[o.payMethod]=(payMap[o.payMethod]||0)+(o.total||0); });
  const payHTML=Object.entries(payMap).filter(([,v])=>v>0).map(([k,v])=>`
    <div style="display:flex;justify-content:space-between;font-size:12px;padding:6px 0;border-bottom:1px solid var(--border);">
      <span style="color:var(--muted)">${cap(k)}</span>
      <span style="font-family:var(--mono);font-weight:700">$${v.toFixed(0)}</span>
    </div>
  `).join('');
  if(payHTML){
    document.getElementById('typeBreakdown').innerHTML += `<div style="margin-top:12px;"><div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.5px;color:var(--muted);margin-bottom:6px">Payment Methods</div>${payHTML}</div>`;
  }
}

// ══════════════════════════════════
//  ACTIVITY LOG
// ══════════════════════════════════
const statusColors={ordered:'var(--yellow)',preparing:'var(--orange)',delivered:'var(--green)',cancelled:'var(--red)',ready:'var(--blue)'};
function renderActivityLog(orders){
  const recent = orders.slice(0,8);
  if(!recent.length){
    document.getElementById('activityLog').innerHTML='<div style="text-align:center;padding:20px;color:var(--muted);font-size:13px">No activity yet</div>';
    return;
  }
  document.getElementById('activityLog').innerHTML = recent.map(o=>`
    <div class="act-item">
      <div class="act-dot" style="background:${statusColors[o.status]||'var(--muted)'}"></div>
      <div class="act-text">${o.id} · ${o.customer} · <strong>$${(o.total||0).toFixed(2)}</strong></div>
      <div class="act-time">${fmtTime(o.time)}</div>
    </div>
  `).join('');
}

// ══════════════════════════════════
//  ORDERS TABLE
// ══════════════════════════════════
function renderTable(orders){
  const typeL={delivery:'Delivery',takeaway:'Take Away',dinein:'Dine In'};
  if(!orders.length){
    document.getElementById('ordersTableBody').innerHTML=`<tr><td colspan="8" style="text-align:center;padding:30px;color:var(--muted)">No orders yet. Place orders from the POS page.</td></tr>`;
    return;
  }
  document.getElementById('ordersTableBody').innerHTML=orders.map(o=>`
    <tr>
      <td class="tbl-id">${o.id}</td>
      <td style="font-weight:600">${o.customer}</td>
      <td>${typeL[o.type]||o.type}</td>
      <td style="color:var(--muted)">${(o.items||[]).map(i=>`${i.emoji}×${i.qty}`).join(' ')}</td>
      <td style="color:var(--muted)">${o.waiter||'—'}</td>
      <td style="color:var(--muted)">${fmtTime(o.time)}</td>
      <td class="tbl-total" style="color:var(--green)">$${(o.total||0).toFixed(2)}</td>
      <td><span class="tbl-status tbl-st-${o.status}">${cap(o.status)}</span></td>
    </tr>
  `).join('');
}

// ══════════════════════════════════
//  INIT
// ══════════════════════════════════
renderAll();
setInterval(renderAll, 8000); 

