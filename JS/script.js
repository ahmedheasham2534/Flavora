  // ════════════════════════════════
  const MENU = [
    { id:1,  name:"Grilled Salmon Steak",  cat:"seafood",  price:80, badge:"Trending",   badgeType:"red",    type:"nonveg", emoji:"🐟", desc:"Premium Atlantic salmon fillet grilled to perfection with herbs and lemon butter sauce.",      sizes:[{label:"Regular",extra:0},{label:"Large",extra:15}],              addons:[{label:"Extra Sauce +$2",price:2},{label:"Side Salad +$5",price:5}] },
    { id:2,  name:"Cheese Burst Pizza",    cat:"pizza",    price:66, badge:"Must Try",   badgeType:"blue",   type:"veg",    emoji:"🍕", desc:"Crispy thin crust loaded with three-cheese blend, fresh tomatoes, and basil.",                 sizes:[{label:"Small",extra:-10},{label:"Medium",extra:0},{label:"Large",extra:12}], addons:[{label:"Extra Cheese +$3",price:3},{label:"Jalapeños +$1",price:1}] },
    { id:3,  name:"Garlic Butter Shrimp",  cat:"seafood",  price:55, badge:null,         badgeType:null,     type:"nonveg", emoji:"🦐", desc:"Juicy tiger shrimp sautéed in rich garlic butter with white wine and parsley.",                sizes:[{label:"Half",extra:-10},{label:"Full",extra:0}],                  addons:[{label:"Extra Garlic +$1",price:1},{label:"Lemon Zest +$1",price:1}] },
    { id:4,  name:"Chicken Taco",          cat:"fastfood", price:28, badge:"Hot",        badgeType:"red",    type:"nonveg", emoji:"🌮", desc:"Tender grilled chicken in warm tortillas with fresh salsa, lettuce, and crema.",               sizes:[{label:"x1",extra:0},{label:"x2",extra:25},{label:"x3",extra:48}], addons:[{label:"Extra Chicken +$4",price:4},{label:"Guacamole +$2",price:2}] },
    { id:5,  name:"Mushroom Risotto",      cat:"pasta",    price:45, badge:null,         badgeType:null,     type:"veg",    emoji:"🍄", desc:"Creamy Arborio rice slow-cooked with wild mushrooms, parmesan, and truffle oil.",              sizes:[{label:"Regular",extra:0},{label:"Large",extra:8}],               addons:[{label:"Extra Parmesan +$2",price:2},{label:"Truffle Oil +$5",price:5}] },
    { id:6,  name:"Beef Burger Deluxe",    cat:"fastfood", price:72, badge:"Best Seller",badgeType:"orange", type:"nonveg", emoji:"🍔", desc:"Double Angus beef patty with aged cheddar, caramelized onions, and signature sauce.",          sizes:[{label:"Regular",extra:0},{label:"Double",extra:20}],             addons:[{label:"Bacon +$4",price:4},{label:"Fried Egg +$2",price:2},{label:"Jalapeños +$1",price:1}] },
    { id:7,  name:"Caesar Salad",          cat:"salads",   price:35, badge:null,         badgeType:null,     type:"veg",    emoji:"🥗", desc:"Crisp romaine with house-made Caesar dressing, croutons, and shaved parmesan.",                sizes:[{label:"Small",extra:-5},{label:"Regular",extra:0},{label:"Large",extra:8}], addons:[{label:"Grilled Chicken +$8",price:8},{label:"Anchovies +$2",price:2}] },
    { id:8,  name:"Chocolate Lava Cake",   cat:"desserts", price:32, badge:"New",        badgeType:"blue",   type:"veg",    emoji:"🍫", desc:"Warm dark chocolate cake with a gooey molten center, served with vanilla ice cream.",          sizes:[{label:"Single",extra:0},{label:"Double",extra:28}],             addons:[{label:"Ice Cream Scoop +$4",price:4},{label:"Caramel Drizzle +$2",price:2}] },
    { id:9,  name:"Tom Yum Soup",          cat:"soups",    price:38, badge:null,         badgeType:null,     type:"nonveg", emoji:"🍜", desc:"Aromatic Thai broth with shrimp, mushrooms, lemongrass, galangal, and kaffir lime.",           sizes:[{label:"Bowl",extra:0},{label:"Large Bowl",extra:10}],            addons:[{label:"Extra Shrimp +$6",price:6},{label:"Tofu +$3",price:3}] },
    { id:10, name:"Margherita Flatbread",  cat:"pizza",    price:42, badge:null,         badgeType:null,     type:"veg",    emoji:"🫓", desc:"Thin crispy flatbread with San Marzano tomato, buffalo mozzarella, and fresh basil.",          sizes:[{label:"Regular",extra:0},{label:"Large",extra:10}],             addons:[{label:"Olives +$2",price:2},{label:"Sun-dried Tomato +$3",price:3}] },
    { id:11, name:"Tiramisu",              cat:"desserts", price:28, badge:null,         badgeType:null,     type:"veg",    emoji:"☕", desc:"Classic Italian dessert with espresso-soaked ladyfingers and mascarpone cream.",               sizes:[{label:"Single",extra:0},{label:"Share",extra:22}],              addons:[{label:"Extra Cocoa +$1",price:1}] },
    { id:12, name:"Lobster Bisque",        cat:"soups",    price:65, badge:"Premium",    badgeType:"blue",   type:"nonveg", emoji:"🦞", desc:"Velvety smooth bisque made with fresh lobster, cream, cognac, and aromatic spices.",           sizes:[{label:"Cup",extra:-15},{label:"Bowl",extra:0}],                  addons:[{label:"Lobster Chunks +$12",price:12},{label:"Croutons +$2",price:2}] },
  ];
  
  const CATEGORIES = [
    {id:"all",      label:"All",       icon:"🍽️"},
    {id:"seafood",  label:"Sea Food",  icon:"🐟"},
    {id:"pizza",    label:"Pizza",     icon:"🍕"},
    {id:"fastfood", label:"Fast Food", icon:"🍔"},
    {id:"pasta",    label:"Pasta",     icon:"🍝"},
    {id:"salads",   label:"Salads",    icon:"🥗"},
    {id:"desserts", label:"Desserts",  icon:"🍰"},
    {id:"soups",    label:"Soups",     icon:"🍜"},
  ];
  
  const DISCOUNT_CODES = { "SAVE10":10, "WELCOME":15, "VIP20":20 };
  
  const RECENT_ORDERS = [
    {id:"#14589", name:"James Smith",    type:"delivery", progress:60,  status:"On the way",       time:"11:30 AM"},
    {id:"#56998", name:"Maria Gonzalez", type:"takeaway", progress:100, status:"Ready",             time:"11:45 AM"},
    {id:"#57001", name:"Ahmed Hassan",   type:"dinein",   progress:30,  status:"Preparing",         time:"12:10 PM"},
    {id:"#57022", name:"Layla Nour",     type:"delivery", progress:80,  status:"Out for delivery",  time:"12:25 PM"},
  ];
  
  // ════════════════════════════════
  //  STATE
  // ════════════════════════════════
  let cart = [];
  let activeCat = "all";
  let typeFilter = "all";
  let orderType = "dinein";
  let discountPct = 0;
  let orderCounter = parseInt(localStorage.getItem("orderCounter") || "1");
  let selectedPayMethod = "cash";
  
  // Modal state
  let modalItem = null;
  let modalQtyVal = 1;
  let modalSelectedSize = 0;
  let modalSelectedAddons = new Set();
  
  // ════════════════════════════════
  //  INIT
  // ════════════════════════════════
  document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("theme") === "dark") applyDark(true);
    renderOrdersStrip();
    renderCategories();
    renderMenu();
    updateOrderDisplay();
    document.addEventListener("keydown", e => {
      if (e.key === "/" && document.activeElement.tagName !== "INPUT" && document.activeElement.tagName !== "TEXTAREA") {
        e.preventDefault();
        document.getElementById("searchInput").focus();
      }
      if (e.key === "Escape") { closeItemModal(); closePayModal(); closeReceiptModal(); }
    });
  });
  
  function updateOrderDisplay() {
    const now = new Date();
    document.getElementById("orderIdDisplay").textContent = `Order #${String(orderCounter).padStart(4,"0")}`;
    document.getElementById("orderTimeDisplay").textContent =
      now.toLocaleDateString("en-US",{day:"numeric",month:"short",year:"numeric"}) + " · " +
      now.toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit"});
  }
  
  // ════════════════════════════════
  //  DARK MODE
  // ════════════════════════════════
  function applyDark(on) {
    document.body.classList.toggle("dark", on);
    document.getElementById("darkIcon").className = on ? "fas fa-sun" : "fas fa-moon";
    localStorage.setItem("theme", on ? "dark" : "light");
  }
  function toggleDark() { applyDark(!document.body.classList.contains("dark")); }
  
  // ════════════════════════════════
  //  ORDERS STRIP
  // ════════════════════════════════
  function renderOrdersStrip() {
    const colorMap  = {delivery:"tag-delivery", takeaway:"tag-takeaway", dinein:"tag-dinein"};
    const progColor = {delivery:"#0066FF", takeaway:"#f97316", dinein:"#22c55e"};
    const typeLabel = {delivery:"Delivery", takeaway:"Take Away", dinein:"Dine In"};
    const statusProg = {ordered:15, preparing:55, ready:85, delivered:100, cancelled:0};

    // Read real orders from localStorage; fall back to static demo data if empty
    const stored = JSON.parse(localStorage.getItem("dreamsOrders") || "[]");
    const list = stored.length ? stored.slice(0, 5) : RECENT_ORDERS;

    document.getElementById("ordersStrip").innerHTML = list.map(o => {
      // Normalise fields — localStorage orders use ISO time, static data uses string
      const isStored = !!o.customer;
      const displayName  = isStored ? o.customer  : o.name;
      const displayTime  = isStored
        ? new Date(o.time).toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit"})
        : o.time;
      const displayStatus = isStored ? o.status   : o.status;
      const progress      = isStored ? (statusProg[o.status] || 15) : o.progress;
      return `
        <div class="order-chip">
          <div class="order-chip-top">
            <span class="order-chip-id">${o.id}</span>
            <span class="status-tag ${colorMap[o.type]||''}">${typeLabel[o.type]||o.type}</span>
          </div>
          <div class="order-chip-name">${displayName}</div>
          <div class="order-chip-time">${displayTime} · ${displayStatus}</div>
          <div class="progress-bar">
            <div class="progress-fill" style="width:${progress}%;background:${progColor[o.type]||'var(--blue)'}"></div>
          </div>
        </div>
      `;
    }).join("");
  }
  
  // ════════════════════════════════
  //  CATEGORIES
  // ════════════════════════════════
  function renderCategories() {
    document.getElementById("catsRow").innerHTML = CATEGORIES.map(c => `
      <div class="cat-chip ${activeCat===c.id?"active":""}" onclick="setCat('${c.id}')">
        <span class="cat-icon">${c.icon}</span>
        <span class="cat-label">${c.label}</span>
      </div>
    `).join("");
  }
  function setCat(id) { activeCat = id; renderCategories(); renderMenu(); }
  
  // ════════════════════════════════
  //  MENU
  // ════════════════════════════════
  function filterMenu() { renderMenu(); }
  
  function setTypeFilter(type, btn) {
    typeFilter = type;
    document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    renderMenu();
  }
  
  function renderMenu() {
    const q = document.getElementById("searchInput").value.toLowerCase();
    const filtered = MENU.filter(m => {
      if (activeCat !== "all" && m.cat !== activeCat) return false;
      if (typeFilter !== "all" && m.type !== typeFilter) return false;
      if (q && !m.name.toLowerCase().includes(q) && !m.cat.includes(q)) return false;
      return true;
    });
    document.getElementById("itemCount").textContent = `${filtered.length} item${filtered.length!==1?"s":""}`;
    const grid = document.getElementById("menuGrid");
    if (!filtered.length) {
      grid.innerHTML = `<div class="empty-state"><i class="fas fa-search"></i><p>No items found</p></div>`;
      return;
    }
    grid.innerHTML = filtered.map(m => {
      const ci = cart.find(c => c.id === m.id);
      const inCartBadge = ci ? `<div class="in-cart-badge">${ci.qty}</div>` : "";
      const badge = m.badge ? `<div class="card-badge badge-${m.badgeType}">${m.badge}</div>` : "";
      return `
        <div class="menu-card" onclick="openItemModal(${m.id})">
          ${inCartBadge}
          <div class="card-img">
            <div class="card-img-placeholder">${m.emoji}</div>
            ${badge}
          </div>
          <div class="card-body">
            <div class="card-meta">
              <span>${m.cat.charAt(0).toUpperCase()+m.cat.slice(1)}</span>
              <span class="${m.type}">${m.type==="veg"?"🌿 Veg":"🍗 Non-Veg"}</span>
            </div>
            <div class="card-name">${m.name}</div>
            <div class="card-foot">
              <div class="card-price">$${m.price}</div>
              <button class="add-btn" onclick="event.stopPropagation();quickAdd(${m.id})"><i class="fas fa-plus"></i></button>
            </div>
          </div>
        </div>
      `;
    }).join("");
  }
  
  // ════════════════════════════════
  //  QUICK ADD
  // ════════════════════════════════
  function quickAdd(id) {
    const item = MENU.find(m => m.id === id);
    addItemToCart({id, name:item.name, emoji:item.emoji, size:item.sizes[0].label, sizeExtra:item.sizes[0].extra, addons:[], addonTotal:0, basePrice:item.price, note:""});
  }
  
  // ════════════════════════════════
  //  ITEM MODAL
  // ════════════════════════════════
  function openItemModal(id) {
    modalItem = MENU.find(m => m.id === id);
    modalQtyVal = 1;
    modalSelectedSize = 0;
    modalSelectedAddons = new Set();
    document.getElementById("modalEmoji").textContent = modalItem.emoji;
    document.getElementById("modalTitle").textContent = modalItem.name;
    document.getElementById("modalDesc").textContent = modalItem.desc;
    document.getElementById("noteArea").value = "";
    renderModalSizes();
    renderModalAddons();
    updateModalTotal();
    document.getElementById("itemOverlay").classList.add("show");
  }
  function closeItemModal() { document.getElementById("itemOverlay").classList.remove("show"); }
  
  function renderModalSizes() {
    document.getElementById("sizeOptions").innerHTML = modalItem.sizes.map((s,i) => `
      <button class="size-opt ${i===modalSelectedSize?"active":""}" onclick="selectSize(${i})">
        ${s.label} ${s.extra===0?"($"+modalItem.price+")":(s.extra>0?"(+$"+s.extra+")":"(-$"+Math.abs(s.extra)+")")}
      </button>
    `).join("");
  }
  function selectSize(i) { modalSelectedSize = i; renderModalSizes(); updateModalTotal(); }
  
  function renderModalAddons() {
    document.getElementById("addonOptions").innerHTML = modalItem.addons.map((a,i) => `
      <button class="addon-opt ${modalSelectedAddons.has(i)?"active":""}" onclick="toggleAddon(${i})">${a.label}</button>
    `).join("");
  }
  function toggleAddon(i) {
    modalSelectedAddons.has(i) ? modalSelectedAddons.delete(i) : modalSelectedAddons.add(i);
    renderModalAddons();
    updateModalTotal();
  }
  
  function modalQty(delta) {
    modalQtyVal = Math.max(1, modalQtyVal + delta);
    document.getElementById("modalQtyNum").textContent = modalQtyVal;
    updateModalTotal();
  }
  
  function calcModalItemPrice() {
    let p = modalItem.price + modalItem.sizes[modalSelectedSize].extra;
    modalSelectedAddons.forEach(i => p += modalItem.addons[i].price);
    return p;
  }
  function updateModalTotal() {
    document.getElementById("modalTotal").textContent = `$${(calcModalItemPrice() * modalQtyVal).toFixed(2)}`;
  }
  
  function addToCartFromModal() {
    const size = modalItem.sizes[modalSelectedSize];
    const addons = [...modalSelectedAddons].map(i => modalItem.addons[i].label.split(" +")[0].split(" -")[0]);
    const addonTotal = [...modalSelectedAddons].reduce((s,i) => s + modalItem.addons[i].price, 0);
    addItemToCart({
      id: modalItem.id, name: modalItem.name, emoji: modalItem.emoji,
      size: size.label, sizeExtra: size.extra, addons, addonTotal,
      basePrice: modalItem.price, note: document.getElementById("noteArea").value, qty: modalQtyVal,
    });
    closeItemModal();
  }
  
  // ════════════════════════════════
  //  CART
  // ════════════════════════════════
  function addItemToCart(item) {
    const key = `${item.id}-${item.size}`;
    const existing = cart.find(c => c.key === key);
    if (existing) { existing.qty += (item.qty || 1); }
    else { cart.push({...item, key, qty: item.qty || 1}); }
    renderCart(); renderMenu();
    showToast(`${item.name} added ✓`, "success");
  }
  
  function updateQty(key, delta) {
    const item = cart.find(c => c.key === key);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) cart = cart.filter(c => c.key !== key);
    renderCart(); renderMenu();
  }
  
  function removeItem(key) {
    cart = cart.filter(c => c.key !== key);
    renderCart(); renderMenu();
  }
  
  function clearCart() {
    if (!cart.length) return;
    cart = []; discountPct = 0;
    document.getElementById("discountInput").value = "";
    document.getElementById("discountRow").style.display = "none";
    renderCart(); renderMenu();
  }
  
  function getItemTotal(item) {
    return (item.basePrice + item.sizeExtra + item.addonTotal) * item.qty;
  }
  
  function calcTotals() {
    const subtotal = cart.reduce((s,c) => s + getItemTotal(c), 0);
    const discount = subtotal * (discountPct / 100);
    const tax = (subtotal - discount) * 0.1;
    const total = (subtotal - discount) + tax;
    return {subtotal, discount, tax, total};
  }
  
  function renderCart() {
    const el = document.getElementById("cartItems");
    if (!cart.length) {
      el.innerHTML = `<div class="cart-empty"><i class="fas fa-shopping-bag"></i><p>No items yet.<br>Click a menu item to add.</p></div>`;
      document.getElementById("payBtn").disabled = true;
      updateTotals(); return;
    }
    el.innerHTML = cart.map(item => {
      const addonsText = item.addons && item.addons.length ? item.addons.join(", ") : "";
      const noteText = item.note ? `<div class="ci-note"><i class="fas fa-sticky-note"></i> ${item.note}</div>` : "";
      return `
        <div class="cart-item">
          <div class="ci-top">
            <div class="ci-emoji">${item.emoji}</div>
            <div class="ci-info">
              <div class="ci-name">${item.name}</div>
              <div class="ci-size">${item.size}</div>
              ${addonsText ? `<div style="font-size:11px;color:var(--muted);margin-top:2px;">+ ${addonsText}</div>` : ""}
              ${noteText}
            </div>
            <div class="ci-actions">
              <button class="qty-btn" onclick="updateQty('${item.key}',-1)">−</button>
              <span class="qty-num">${item.qty}</span>
              <button class="qty-btn" onclick="updateQty('${item.key}',1)">+</button>
            </div>
          </div>
          <div class="ci-bottom">
            <div class="ci-price-row">
              <div><div class="ci-price-label">Unit</div><div class="ci-price-val">$${(item.basePrice+item.sizeExtra+item.addonTotal).toFixed(2)}</div></div>
              <div><div class="ci-price-label">Total</div><div class="ci-price-val">$${getItemTotal(item).toFixed(2)}</div></div>
            </div>
            <button class="ci-remove" onclick="removeItem('${item.key}')"><i class="fas fa-trash"></i></button>
          </div>
        </div>
      `;
    }).join("");
    document.getElementById("payBtn").disabled = false;
    updateTotals();
  }
  
  function updateTotals() {
    const {subtotal, discount, tax, total} = calcTotals();
    document.getElementById("subtotalDisplay").textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById("taxDisplay").textContent = `$${tax.toFixed(2)}`;
    document.getElementById("totalDisplay").textContent = `$${total.toFixed(2)}`;
    if (discount > 0) {
      document.getElementById("discountDisplay").textContent = `-$${discount.toFixed(2)} (${discountPct}%)`;
      document.getElementById("discountRow").style.display = "flex";
    }
  }
  
  function applyDiscount() {
    const code = document.getElementById("discountInput").value.trim().toUpperCase();
    if (DISCOUNT_CODES[code]) {
      discountPct = DISCOUNT_CODES[code];
      showToast(`"${code}" applied — ${discountPct}% off! 🎉`, "success");
      updateTotals();
    } else {
      showToast("Invalid discount code", "error");
    }
  }
  
  // ════════════════════════════════
  //  ORDER TYPE
  // ════════════════════════════════
  function setOrderType(type, btn) {
    orderType = type;
    document.querySelectorAll(".ot-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
  }
  function setPage(page, btn) {
    document.querySelectorAll(".nav-item").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    if (page !== "pos") showToast(`${page.charAt(0).toUpperCase()+page.slice(1)} coming soon`, "");
  }
  
  // ════════════════════════════════
  //  PAYMENT MODAL
  // ════════════════════════════════
  function openPaymentModal() {
    if (!cart.length) return;
    const {subtotal, discount, tax, total} = calcTotals();
    document.getElementById("payOrderId").textContent = `Order #${String(orderCounter).padStart(4,"0")}`;
    document.getElementById("pSubtotal").textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById("pTax").textContent = `$${tax.toFixed(2)}`;
    document.getElementById("pTotal").textContent = `$${total.toFixed(2)}`;
    if (discount > 0) {
      document.getElementById("pDiscount").textContent = `-$${discount.toFixed(2)}`;
      document.getElementById("pDiscountRow").style.display = "flex";
    } else {
      document.getElementById("pDiscountRow").style.display = "none";
    }
    document.getElementById("cashGiven").value = "";
    document.getElementById("changeDisplay").innerHTML = `<i class="fas fa-coins"></i> $0.00`;
    document.getElementById("payOverlay").classList.add("show");
  }
  function closePayModal() { document.getElementById("payOverlay").classList.remove("show"); }
  
  function selectPayMethod(method, btn) {
    selectedPayMethod = method;
    document.querySelectorAll(".pay-method").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    document.getElementById("cashRow").style.display = method === "cash" ? "flex" : "none";
  }
  
  function calcChange() {
    const {total} = calcTotals();
    const given = parseFloat(document.getElementById("cashGiven").value) || 0;
    const change = given - total;
    document.getElementById("changeDisplay").innerHTML = `<i class="fas fa-coins"></i> $${Math.max(0,change).toFixed(2)}`;
    document.getElementById("changeDisplay").style.background = change < 0 ? "var(--red)" : "var(--green)";
  }
  
  function confirmPayment() {
    // Validate cash payment
    if (selectedPayMethod === "cash") {
      const {total} = calcTotals();
      const given = parseFloat(document.getElementById("cashGiven").value) || 0;
      if (given < total) {
        showToast("Amount given is less than total", "error");
        return;
      }
    }
    // Close modal first, then show receipt (receipt needs cart still populated)
    closePayModal();
    showReceipt();
  }
  // ════════════════════════════════
  //  RECEIPT + ORDER SAVE
  // ════════════════════════════════
  function showReceipt() {
    const {subtotal, discount, tax, total} = calcTotals();
    const now = new Date();
    const orderId = `#${String(orderCounter).padStart(4,"0")}`;
    const typeLabel = {dinein:"Dine In", takeaway:"Take Away", delivery:"Delivery"}[orderType];
    const waiter = document.getElementById("waiterSelect").value || "—";
    const table  = document.getElementById("tableSelect").value  || "—";
    const payLabel = {cash:"Cash", card:"Credit/Debit Card", wallet:"Digital Wallet"}[selectedPayMethod];
    const given  = parseFloat(document.getElementById("cashGiven").value) || 0;
    const change = Math.max(0, given - total);

    // ── SAVE ORDER TO dreamsOrders (shared with orders.html & kitchen.html) ──
    const orderObj = {
      id:         orderId,
      customer:   table !== "—" ? table : "Walk-in",
      type:       orderType,
      status:     "ordered",
      kitStatus:  "new",
      waiter:     waiter,
      table:      table,
      time:       now.toISOString(),            // ISO string so other pages can parse it
      items:      cart.map(c => ({
        id:         c.id,
        name:       c.name,
        emoji:      c.emoji,
        qty:        c.qty,
        size:       c.size,
        sizeExtra:  c.sizeExtra  || 0,
        addons:     c.addons     || [],
        addonTotal: c.addonTotal || 0,
        basePrice:  c.basePrice,
        note:       c.note       || "",
        done:       false                       // kitchen checkbox state
      })),
      subtotal:   subtotal,
      discount:   discount,
      tax:        tax,
      total:      total,
      payMethod:  selectedPayMethod
    };
    const existing = JSON.parse(localStorage.getItem("dreamsOrders") || "[]");
    existing.unshift(orderObj);               // newest first
    localStorage.setItem("dreamsOrders", JSON.stringify(existing));

    // ── FILL RECEIPT MODAL ──
    document.getElementById("rOrderId").textContent   = orderId;
    document.getElementById("rOrderType").textContent = typeLabel + (orderType === "dinein" ? ` · ${table}` : "");
    document.getElementById("rDate").textContent      = now.toLocaleString();
    document.getElementById("rWaiter").textContent    = waiter;
    document.getElementById("rItems").innerHTML = cart.map(item =>
      `<div class="receipt-item"><span>${item.emoji} ${item.name} ×${item.qty} (${item.size})</span><span>$${getItemTotal(item).toFixed(2)}</span></div>`
    ).join("");
    document.getElementById("rSubtotal").textContent  = `$${subtotal.toFixed(2)}`;
    document.getElementById("rTax").textContent       = `$${tax.toFixed(2)}`;
    document.getElementById("rTotal").textContent     = `$${total.toFixed(2)}`;
    document.getElementById("rPayMethod").textContent = payLabel;
    if (discount > 0) {
      document.getElementById("rDiscount").textContent = `-$${discount.toFixed(2)}`;
      document.getElementById("rDiscRow").style.display = "flex";
    }
    if (selectedPayMethod === "cash" && given > 0) {
      document.getElementById("rChange").textContent   = `$${change.toFixed(2)}`;
      document.getElementById("rChangeRow").style.display = "flex";
    }
    document.getElementById("rOrderNum").textContent = `Order ${orderId}`;
    document.getElementById("receiptOverlay").classList.add("show");

    // ── REFRESH STRIP + RESET ──
    renderOrdersStrip();
    orderCounter++;
    localStorage.setItem("orderCounter", String(orderCounter));
    cart = []; discountPct = 0;
    document.getElementById("discountInput").value = "";
    document.getElementById("discountRow").style.display = "none";
    renderCart(); renderMenu(); updateOrderDisplay();
    showToast("Order placed successfully! 🎉", "success");
    addNotification(orderObj);
  }
  function closeReceiptModal() { document.getElementById("receiptOverlay").classList.remove("show"); }
  
  // ════════════════════════════════
  //  TOAST
  // ════════════════════════════════
  function showToast(msg, type) {
    const container = document.getElementById("toastContainer");
    const t = document.createElement("div");
    t.className = `toast ${type}`;
    t.innerHTML = `<i class="fas ${type==="success"?"fa-check-circle":type==="error"?"fa-exclamation-circle":"fa-info-circle"}"></i> ${msg}`;
    container.appendChild(t);
    requestAnimationFrame(() => requestAnimationFrame(() => t.classList.add("in")));
    setTimeout(() => { t.classList.remove("in"); setTimeout(() => t.remove(), 300); }, 3000);
  }

// noitfication settings
let notifications = JSON.parse(localStorage.getItem("notifications") || "[]");


function addNotification(order) {
  const notif = {
    id: Date.now(),
    text: `New Order ${order.id} - ${order.type} (${order.status})`
  };

  notifications.unshift(notif);
  localStorage.setItem("notifications", JSON.stringify(notifications));
  renderNotifications();
}

function renderNotifications() {
  const box = document.getElementById("notifDropdown");

  if (!notifications.length) {
    box.innerHTML = `<div style="padding:10px;">No notifications</div>`;
    document.getElementById("notifDot").style.display = "none";
    return;
  }

  document.getElementById("notifDot").style.display = "block";

  box.innerHTML = notifications.map(n => `
    <div class="notif-item">
      <span>${n.text}</span>
      <button onclick="markAsRead(${n.id})">✓</button>
    </div>
  `).join("");
}

function markAsRead(id) {
  notifications = notifications.filter(n => n.id !== id);
  localStorage.setItem("notifications", JSON.stringify(notifications));
  renderNotifications();
}

function toggleNotifications() {
  const box = document.getElementById("notifDropdown");
  box.style.display = box.style.display === "flex" ? "none" : "flex";
}

renderNotifications();