// ══════════════════════════════════
//  MENU (same data as POS)
// ══════════════════════════════════
const MENU=[
    {id:1,  name:"Grilled Salmon Steak",  cat:"Seafood",  price:80, emoji:"🐟"},
    {id:2,  name:"Cheese Burst Pizza",    cat:"Pizza",    price:66, emoji:"🍕"},
    {id:3,  name:"Garlic Butter Shrimp",  cat:"Seafood",  price:55, emoji:"🦐"},
    {id:4,  name:"Chicken Taco",          cat:"Fast Food", price:28, emoji:"🌮"},
    {id:5,  name:"Mushroom Risotto",      cat:"Pasta",    price:45, emoji:"🍄"},
    {id:6,  name:"Beef Burger Deluxe",    cat:"Fast Food", price:72, emoji:"🍔"},
    {id:7,  name:"Caesar Salad",          cat:"Salads",   price:35, emoji:"🥗"},
    {id:8,  name:"Chocolate Lava Cake",   cat:"Desserts", price:32, emoji:"🍫"},
    {id:9,  name:"Tom Yum Soup",          cat:"Soups",    price:38, emoji:"🍜"},
    {id:10, name:"Margherita Flatbread",  cat:"Pizza",    price:42, emoji:"🫓"},
    {id:11, name:"Tiramisu",              cat:"Desserts", price:28, emoji:"☕"},
    {id:12, name:"Lobster Bisque",        cat:"Soups",    price:65, emoji:"🦞"},
  ];
  
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
    document.getElementById('darkIcon').className=on?'fas fa-sun':'fas fa-moon';
    localStorage.setItem('theme',on?'dark':'light');
  }
  function toggleDark(){ applyDark(!document.body.classList.contains('dark')); }
  if(localStorage.getItem('theme')==='dark') applyDark(true);
  
  // ══════════════════════════════════
  //  CLOCK
  // ══════════════════════════════════
  function updateClock(){
    const el=document.getElementById('kitClock');
    if(el) el.textContent=new Date().toLocaleTimeString('en-US',{hour:'2-digit',minute:'2-digit',second:'2-digit'});
  }
  setInterval(updateClock,1000); updateClock();
  
  // ══════════════════════════════════
  //  HELPERS
  // ══════════════════════════════════
  function minsAgo(iso){ return Math.floor((Date.now()-new Date(iso))/60000); }
  function timerCls(m){ return m>20?'late':m>10?'warn':'ok'; }
  function urgCls(mins){ return mins>25?'urgent':mins>15?'warning':''; }
  function iTotal(item){ return (item.basePrice+(item.sizeExtra||0)+(item.addonTotal||0))*item.qty; }
  
  let prevNewCount = 0;
  
  // ══════════════════════════════════
  //  TICKET HTML
  // ══════════════════════════════════
  function ticketHTML(o){
    const mins = minsAgo(o.time);
    const tCls = timerCls(mins);
    const uCls = urgCls(mins);
    const typeMap={delivery:'tt-delivery',takeaway:'tt-takeaway',dinein:'tt-dinein'};
    const typeL={delivery:'Delivery',takeaway:'Take Away',dinein:'Dine In'};
    const items = o.items||[];
    const doneCount = items.filter(i=>i.done).length;
    const totalCount = items.length;
    const allDone = doneCount === totalCount && totalCount > 0;
    const pct = totalCount ? Math.round((doneCount/totalCount)*100) : 0;
  
    let footBtn = '';
    if(o.kitStatus==='new'){
      footBtn=`<button class="t-action-btn btn-start" onclick="kitAdvance('${o.id}','preparing')"><i class="fas fa-fire"></i> Start Cooking</button>`;
    } else if(o.kitStatus==='preparing'){
      footBtn=`<button class="t-action-btn ${allDone?'btn-ready':'btn-start'}" onclick="${allDone?`kitAdvance('${o.id}','ready')`:''}">
        ${allDone?'<i class="fas fa-bell"></i> Mark Ready':'<i class="fas fa-spinner fa-spin"></i> Cooking…'}
      </button>`;
    } else if(o.kitStatus==='ready'){
      footBtn=`<button class="t-action-btn btn-served" onclick="kitAdvance('${o.id}','served')"><i class="fas fa-check"></i> Served</button>`;
    }
  
    return `
      <div class="ticket ${uCls} ${allDone&&o.kitStatus==='preparing'?'all-done':''}" id="ticket-${o.id}">
        <div class="t-hdr">
          <div>
            <div class="t-id">${o.id}</div>
            <div class="t-customer">${o.customer}</div>
            ${o.table&&o.table!=='—'?`<div style="font-size:11px;color:var(--muted);margin-top:2px"><i class="fas fa-chair" style="margin-right:3px"></i>${o.table} · ${o.waiter||''}</div>`:''}
          </div>
          <div class="t-hdr-right">
            <span class="t-type ${typeMap[o.type]||''}">${typeL[o.type]||o.type}</span>
            <span class="t-timer ${tCls}"><i class="fas fa-clock"></i> ${mins}m</span>
          </div>
        </div>
        <div class="t-body">
          ${items.map((item,idx)=>`
            <div class="t-item ${item.done?'done':''}" id="titem-${o.id}-${idx}">
              <div class="t-check ${item.done?'checked':''}" onclick="toggleItem('${o.id}',${idx})"></div>
              <div class="t-item-content">
                <div class="t-item-row">
                  <span class="t-item-emoji">${item.emoji}</span>
                  <span class="t-item-name">${item.name}</span>
                  <span class="t-item-qty">×${item.qty}</span>
                </div>
                <div class="t-item-sub">
                  ${item.size?`<span class="t-sub-tag">${item.size}</span>`:''}
                  ${(item.addons||[]).map(a=>`<span class="t-sub-tag t-sub-addon">${a}</span>`).join('')}
                </div>
                ${item.note?`<div class="t-note"><i class="fas fa-sticky-note"></i>${item.note}</div>`:''}
              </div>
            </div>
          `).join('')}
        </div>
        <div class="t-foot">
          <div style="display:flex;align-items:center;gap:8px;flex:1;">
            <div class="t-progress"><div class="t-progress-fill ${allDone?'complete':''}" style="width:${pct}%"></div></div>
            <span class="t-prog-text">${doneCount}/${totalCount}</span>
          </div>
          ${footBtn}
        </div>
      </div>
    `;
  }
  
  // ══════════════════════════════════
  //  TOGGLE ITEM CHECKBOX
  // ══════════════════════════════════
  function toggleItem(orderId, itemIdx){
    const orders = loadOrders();
    const o = orders.find(x=>x.id===orderId);
    if(!o||!o.items[itemIdx]) return;
    o.items[itemIdx].done = !o.items[itemIdx].done;
    // Auto-advance to preparing when first item is checked
    if(o.items[itemIdx].done && o.kitStatus==='new'){
      o.kitStatus='preparing';
      o.status='preparing';
    }
    saveOrders(orders);
    renderKitchen(); // re-render to update progress + button
  }
  
  // ══════════════════════════════════
  //  ADVANCE KITCHEN STATUS
  // ══════════════════════════════════
  function kitAdvance(orderId, newKitStatus){
    const orders = loadOrders();
    const o = orders.find(x=>x.id===orderId);
    if(!o) return;
    o.kitStatus = newKitStatus;
    // Sync back to order status (reflected on POS + Orders page)
    const statusMap={new:'ordered', preparing:'preparing', ready:'ready', served:'delivered'};
    o.status = statusMap[newKitStatus] || o.status;
    // Auto-check all items when ready
    if(newKitStatus==='ready'||newKitStatus==='served'){
      (o.items||[]).forEach(i=>i.done=true);
    }
    saveOrders(orders);
    renderKitchen();
    const msgs={preparing:'Cooking started! 🔥', ready:'Order ready to serve! 🔔', served:'Order served ✓'};
    toast(msgs[newKitStatus]||newKitStatus, newKitStatus==='ready'||newKitStatus==='served'?'success':'info');
  }
  
  // ══════════════════════════════════
  //  QUICK ADD ITEM FROM MENU
  // ══════════════════════════════════
  function renderMenuAdd(){
    document.getElementById('menuAddList').innerHTML = MENU.map(m=>`
      <div class="ma-item" onclick="quickAddKitchenItem(${m.id})">
        <div class="ma-emoji">${m.emoji}</div>
        <div class="ma-info">
          <div class="ma-name">${m.name}</div>
          <div class="ma-cat">${m.cat}</div>
        </div>
        <div class="ma-price">$${m.price}</div>
      </div>
    `).join('');
  }
  
  function quickAddKitchenItem(menuId){
    const m = MENU.find(x=>x.id===menuId);
    if(!m){ toast('Item not found','error'); return; }
    const orders = loadOrders();
    // Find the most recent active order (ordered/preparing) to add to
    const activeOrder = orders.find(o=>o.status==='ordered'||o.status==='preparing');
    if(!activeOrder){
      // Create a new kitchen-only order
      const counter = parseInt(localStorage.getItem('dreamsOrderCounter')||'0') + 1;
      localStorage.setItem('dreamsOrderCounter', String(counter));
      const newOrder = {
        id:`#${String(counter).padStart(4,'0')}`,
        customer:'Kitchen Order',
        type:'dinein',
        status:'ordered',
        kitStatus:'new',
        waiter:'Kitchen',
        table:'—',
        time:new Date().toISOString(),
        items:[{id:m.id,name:m.name,emoji:m.emoji,qty:1,size:'Regular',sizeExtra:0,addons:[],addonTotal:0,basePrice:m.price,note:'',done:false}],
        subtotal:m.price,discount:0,tax:m.price*0.1,total:m.price*1.1,payMethod:'cash'
      };
      orders.unshift(newOrder);
      saveOrders(orders);
      toast(`New ticket created: ${m.emoji} ${m.name}`,'success');
    } else {
      // Add item to existing active order
      if(!activeOrder.items) activeOrder.items=[];
      const existItem = activeOrder.items.find(i=>i.id===m.id&&i.size==='Regular');
      if(existItem){ existItem.qty++; }
      else {
        activeOrder.items.push({id:m.id,name:m.name,emoji:m.emoji,qty:1,size:'Regular',sizeExtra:0,addons:[],addonTotal:0,basePrice:m.price,note:'',done:false});
      }
      activeOrder.subtotal = (activeOrder.items||[]).reduce((s,i)=>s+iTotal(i),0);
      activeOrder.tax = activeOrder.subtotal*0.1;
      activeOrder.total = activeOrder.subtotal+activeOrder.tax;
      saveOrders(orders);
      toast(`${m.emoji} ${m.name} added to ${activeOrder.id}`,'success');
    }
    renderKitchen();
  }
  
  // ══════════════════════════════════
  //  RENDER KITCHEN
  // ══════════════════════════════════
  function renderKitchen(){
    const orders = loadOrders();
    const newOrds      = orders.filter(o=>o.kitStatus==='new'||o.status==='ordered'&&!o.kitStatus);
    const prepOrds     = orders.filter(o=>o.kitStatus==='preparing');
    const readyOrds    = orders.filter(o=>o.kitStatus==='ready');
  
    // Check for new orders → bell notification
    const currNew = newOrds.length;
    if(currNew > prevNewCount){
      const bell = document.getElementById('bellBtn');
      bell.classList.add('bell-shake');
      setTimeout(()=>bell.classList.remove('bell-shake'),600);
      document.getElementById('bellDot').style.display = currNew>0?'block':'none';
      if(currNew > prevNewCount) toast(`${currNew-prevNewCount} new order${currNew-prevNewCount>1?'s':''} arrived! 🔔`,'info');
    }
    prevNewCount = currNew;
  
    document.getElementById('statNew').textContent = `${newOrds.length} New`;
    document.getElementById('statPreparing').textContent = `${prepOrds.length} Cooking`;
    document.getElementById('statReady').textContent = `${readyOrds.length} Ready`;
    document.getElementById('countNew').textContent = newOrds.length;
    document.getElementById('countPreparing').textContent = prepOrds.length;
    document.getElementById('countReady').textContent = readyOrds.length;
  
    const render=(list,colId)=>{
      const el=document.getElementById(colId);
      if(!list.length){ el.innerHTML=`<div class="kit-empty"><i class="fas fa-check-double"></i><p>All clear!</p></div>`; return; }
      el.innerHTML=list.map(o=>ticketHTML(o)).join('');
    };
    render(newOrds,'colNew');
    render(prepOrds,'colPreparing');
    render(readyOrds,'colReady');
  }
  
  // ══════════════════════════════════
  //  TOAST
  // ══════════════════════════════════
  function toast(msg,type){
    const c=document.getElementById('toastWrap');
    const t=document.createElement('div');
    t.className=`toast ${type}`;
    t.innerHTML=`<i class="fas ${type==='success'?'fa-check-circle':type==='error'?'fa-exclamation-circle':'fa-info-circle'}"></i> ${msg}`;
    c.appendChild(t);
    requestAnimationFrame(()=>requestAnimationFrame(()=>t.classList.add('in')));
    setTimeout(()=>{t.classList.remove('in');setTimeout(()=>t.remove(),300);},3000);
  }
  
  // ══════════════════════════════════
  //  INIT + AUTO REFRESH
  // ══════════════════════════════════
  renderMenuAdd();
  renderKitchen();
  setInterval(renderKitchen, 4000);
