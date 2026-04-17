/* ============================================================
   FoodieGo – Single Page App JavaScript
   ============================================================ */

// ---- STATE ----
const state = {
  cart: JSON.parse(localStorage.getItem('fg_cart') || '[]'),
  user: JSON.parse(localStorage.getItem('fg_user') || 'null'),
  location: localStorage.getItem('fg_location') || 'Sector 18, Noida',
  theme: localStorage.getItem('fg_theme') || 'light',
  orders: JSON.parse(localStorage.getItem('fg_orders') || '[]'),
  currentPage: 'home',
  currentRestaurantId: 1,
  activeFilters: { veg: false, rating: false, fast: false, price: false },
  filteredRestaurants: [],
  couponDiscount: 0,
  reviewsIndex: 0,
  reviewsTimer: null,
};

// ---- RESTAURANT DATA ----
const allRestaurants = [
  { id:1, name:"Spice Garden",       cuisine:"North Indian, Biryani",    rating:4.5, time:"25-30 min", price:"₹400", type:"veg",     offer:"20% OFF above ₹149", image:"https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&q=80", category:"Biryani" },
  { id:2, name:"Burger Nation",      cuisine:"Burgers, Fast Food",       rating:4.2, time:"20-25 min", price:"₹300", type:"non-veg", offer:"Free delivery",       image:"https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80", category:"Burger" },
  { id:3, name:"Pizza Paradise",     cuisine:"Pizza, Italian",           rating:4.7, time:"30-35 min", price:"₹500", type:"veg",     offer:"Buy 1 Get 1",         image:"https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80", category:"Pizza" },
  { id:4, name:"Wok Express",        cuisine:"Chinese, Asian",           rating:4.1, time:"25-30 min", price:"₹350", type:"non-veg", offer:"30% OFF",             image:"https://images.unsplash.com/photo-1563245372-f21724e3856d?w=400&q=80", category:"Chinese" },
  { id:5, name:"The Dosa House",     cuisine:"South Indian, Dosa",       rating:4.6, time:"15-20 min", price:"₹200", type:"veg",     offer:"Flat ₹50 OFF",        image:"https://images.unsplash.com/photo-1630383249896-424e482df921?w=400&q=80", category:"Dosa" },
  { id:6, name:"Tandoor Tales",      cuisine:"Mughlai, BBQ",             rating:4.3, time:"35-40 min", price:"₹600", type:"non-veg", offer:"20% OFF",             image:"https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&q=80", category:"Biryani" },
  { id:7, name:"Sushi Zen",          cuisine:"Japanese, Sushi",          rating:4.8, time:"40-45 min", price:"₹800", type:"non-veg", offer:"",                    image:"https://images.unsplash.com/photo-1553621042-f6e147245754?w=400&q=80", category:"Sushi" },
  { id:8, name:"Sweet Indulgence",   cuisine:"Desserts, Ice Cream",      rating:4.4, time:"20-25 min", price:"₹250", type:"veg",     offer:"Free dessert on ₹300+",image:"https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&q=80", category:"Desserts" },
  { id:9, name:"Pav Bhaji Corner",   cuisine:"Street Food, Chaat",       rating:4.0, time:"15-20 min", price:"₹150", type:"veg",     offer:"",                    image:"https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&q=80", category:"Street Food" },
  { id:10,name:"Kebab Kings",        cuisine:"Mughlai, Kebabs",          rating:4.5, time:"30-35 min", price:"₹500", type:"non-veg", offer:"25% OFF",             image:"https://images.unsplash.com/photo-1544025162-d76694265947?w=400&q=80", category:"Biryani" },
  { id:11,name:"Roll Factory",       cuisine:"Rolls, Wraps, Frankie",    rating:3.9, time:"15-20 min", price:"₹180", type:"non-veg", offer:"",                    image:"https://images.unsplash.com/photo-1552566626-52f8b828add9?w=400&q=80", category:"Burger" },
  { id:12,name:"Green Bowl",         cuisine:"Salads, Healthy",          rating:4.3, time:"20-25 min", price:"₹350", type:"veg",     offer:"First order FREE delivery",image:"https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80", category:"Healthy" },
];
state.filteredRestaurants = [...allRestaurants];

// ---- MENU DATA ----
const menuData = {
  1: {
    name:"Spice Garden", cuisine:"North Indian, Biryani, Mughlai", rating:4.5, price:"₹400",
    time:"25-30 min", banner:"https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=1200&q=80",
    categories:[
      { name:"Bestsellers", items:[
        { id:"sg1", name:"Butter Chicken",  desc:"Tender chicken in rich tomato-cream sauce",      price:320, veg:false, image:"https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=300&q=80" },
        { id:"sg2", name:"Dal Makhani",     desc:"Slow-cooked black lentils in butter and cream",  price:220, veg:true,  image:"https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=300&q=80" },
        { id:"sg3", name:"Paneer Tikka",    desc:"Marinated cottage cheese grilled in tandoor",    price:280, veg:true,  image:"https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=300&q=80" },
      ]},
      { name:"Biryani", items:[
        { id:"sg4", name:"Chicken Biryani", desc:"Fragrant basmati rice with spiced chicken",      price:350, veg:false, image:"https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=300&q=80" },
        { id:"sg5", name:"Veg Biryani",     desc:"Mixed vegetables with aromatic rice",            price:260, veg:true,  image:"https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=300&q=80" },
      ]},
      { name:"Breads", items:[
        { id:"sg6", name:"Garlic Naan",     desc:"Soft bread with garlic and butter",              price:60,  veg:true,  image:"https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=300&q=80" },
        { id:"sg7", name:"Laccha Paratha",  desc:"Flaky layered whole wheat bread",                price:50,  veg:true,  image:"https://images.unsplash.com/photo-1628294895950-9805252a4702?w=300&q=80" },
      ]},
      { name:"Desserts", items:[
        { id:"sg8", name:"Gulab Jamun",     desc:"Soft dumplings in sugar syrup",                  price:90,  veg:true,  image:"https://images.unsplash.com/photo-1601303516534-bf9a4b1df8ae?w=300&q=80" },
      ]},
    ]
  }
};
// Fill remaining restaurants with Spice Garden data for demo
for(let i=2;i<=12;i++) {
  if(!menuData[i]) menuData[i] = {...menuData[1], name: allRestaurants.find(r=>r.id===i)?.name || 'Restaurant'};
}

/* ============================================================
   PAGE ROUTING
   ============================================================ */
window.showPage = function(page, scrollTo) {
  // Hide all
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  // Show target
  const target = document.getElementById('page-' + page);
  if(target) target.classList.add('active');
  state.currentPage = page;
  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'instant' });

  // Update nav active state
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.classList.remove('active-link');
    if(a.dataset.page === page) a.classList.add('active-link');
  });

  // Close mobile nav
  document.getElementById('navLinks')?.classList.remove('open');
  document.getElementById('hamburger')?.classList.remove('open');

  // Page-specific init
  if(page === 'home') {
    initScrollAnimations();
    renderRestaurantsGrid();
    if(scrollTo) {
      setTimeout(() => {
        document.getElementById(scrollTo)?.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    }
  } else if(page === 'restaurant') {
    initRestaurantPage();
  } else if(page === 'cart') {
    renderCartPage();
    initPaymentOptions();
  } else if(page === 'myorders') {
    renderMyOrders();
  }
};

/* ============================================================
   INIT
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  applyTheme(state.theme);
  updateCartBadge();
  initNavbar();
  initThemeToggle();
  initAuthModal();
  initUserMenu();
  updateUserUI();
  initScrollAnimations();
  initReviewsSlider();
  renderRestaurantsGrid();
  initCategoryCards();
  initSearchAndFilters();
});

/* ============================================================
   THEME
   ============================================================ */
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  const btn = document.getElementById('themeToggle');
  if(btn) btn.textContent = theme === 'dark' ? '☀️' : '🌙';
}

function initThemeToggle() {
  document.getElementById('themeToggle')?.addEventListener('click', () => {
    state.theme = state.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('fg_theme', state.theme);
    applyTheme(state.theme);
  });
}

/* ============================================================
   NAVBAR
   ============================================================ */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar?.classList.toggle('scrolled', window.scrollY > 20);
  });

  // Hamburger
  const ham = document.getElementById('hamburger');
  const links = document.getElementById('navLinks');
  ham?.addEventListener('click', (e) => {
    e.stopPropagation();
    links?.classList.toggle('open');
    ham.classList.toggle('open');
  });
  document.addEventListener('click', (e) => {
    if(!e.target.closest('#hamburger') && !e.target.closest('#navLinks')) {
      links?.classList.remove('open');
      ham?.classList.remove('open');
    }
  });

  document.querySelectorAll('.location-chip').forEach(chip => {
  chip.addEventListener('click', () => {
    state.location = chip.textContent.trim();
    localStorage.setItem('fg_location', state.location);

    const disp = document.getElementById('locationDisplay');
    if(disp) disp.textContent = state.location;

    // 🔥 YE ADD KARO (IMPORTANT)
    const heroLoc = document.querySelector('.location-text-val');
    if(heroLoc) heroLoc.textContent = state.location;

    closeLocationDropdown();
    showToast('📍 Location set to ' + state.location, 'success');
  });
});
  // Cart icon btn
  document.getElementById('cartIconBtn')?.addEventListener('click', () => showPage('cart'));
}

window.toggleLocationDropdown = function() {
  document.getElementById('locationDropdown')?.classList.toggle('open');
};
function closeLocationDropdown() {
  document.getElementById('locationDropdown')?.classList.remove('open');
}
document.addEventListener('click', (e) => {
  if(
    !e.target.closest('.location-select') && 
    !e.target.closest('.nav-location') && 
    !e.target.closest('#locationDropdown')
  ) {
    closeLocationDropdown();
  }
});

/* ============================================================
   CART BADGE
   ============================================================ */
function updateCartBadge() {
  const total = state.cart.reduce((s,i) => s + i.qty, 0);
  document.querySelectorAll('.cart-badge').forEach(el => {
    el.textContent = total;
    el.classList.toggle('show', total > 0);
  });
  const fb = document.getElementById('floatingCartCount');
  if(fb) fb.textContent = total;
}

/* ============================================================
   TOAST
   ============================================================ */
window.showToast = function(msg, type='') {
  const container = document.getElementById('toastContainer');
  if(!container) return;
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span>${type==='success'?'✓':type==='error'?'✕':'ℹ'}</span> ${msg}`;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3200);
};

/* ============================================================
   AUTH MODAL
   ============================================================ */
function initAuthModal() {
  const overlay = document.getElementById('authModal');
  if(!overlay) return;

  document.getElementById('btnLogin')?.addEventListener('click', () => overlay.classList.add('open'));
  document.getElementById('btnSignup')?.addEventListener('click', () => overlay.classList.add('open'));
  document.getElementById('modalClose')?.addEventListener('click', () => overlay.classList.remove('open'));
  overlay.addEventListener('click', e => { if(e.target === overlay) overlay.classList.remove('open'); });

  overlay.querySelectorAll('.modal-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      overlay.querySelectorAll('.modal-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      overlay.querySelectorAll('.tab-content').forEach(c => c.style.display = 'none');
      const el = document.getElementById(tab.dataset.tab);
      if(el) el.style.display = 'block';
    });
  });

  document.getElementById('loginForm')?.addEventListener('submit', e => {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    state.user = { name: email.split('@')[0], email };
    localStorage.setItem('fg_user', JSON.stringify(state.user));
    overlay.classList.remove('open');
    updateUserUI();
    showToast('Welcome back, ' + state.user.name + '! 👋', 'success');
  });

  document.getElementById('signupForm')?.addEventListener('submit', e => {
    e.preventDefault();
    const name = e.target.querySelector('input[type="text"]').value;
    const email = e.target.querySelectorAll('input')[1].value;
    state.user = { name, email };
    localStorage.setItem('fg_user', JSON.stringify(state.user));
    overlay.classList.remove('open');
    updateUserUI();
    showToast('Welcome to FoodieGo, ' + name + '! 🎉', 'success');
  });
}

function updateUserUI() {
  const authBtns = document.getElementById('authBtns');
  const userMenu = document.getElementById('userMenu');
  if(!authBtns || !userMenu) return;
  if(state.user) {
    authBtns.style.display = 'none';
    userMenu.classList.add('visible');
    const av = document.getElementById('userAvatar');
    if(av) av.textContent = state.user.name.charAt(0).toUpperCase();
    const un = document.getElementById('userName'); if(un) un.textContent = state.user.name;
    const ue = document.getElementById('userEmail'); if(ue) ue.textContent = state.user.email;
  } else {
    authBtns.style.display = 'flex';
    userMenu.classList.remove('visible');
  }
}

function initUserMenu() {
  document.getElementById('logoutBtn')?.addEventListener('click', () => {
    state.user = null;
    localStorage.removeItem('fg_user');
    updateUserUI();
    showToast('Logged out successfully');
  });
}

/* ============================================================
   SCROLL ANIMATIONS
   ============================================================ */
function initScrollAnimations() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if(e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }});
  }, { threshold: 0.1 });
  document.querySelectorAll('.fade-up').forEach(el => { el.classList.remove('visible'); obs.observe(el); });
}

/* ============================================================
   HERO SEARCH
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {

  // 🔥 LOCATION SYNC (ADD KIYA)
  const disp = document.getElementById('locationDisplay');
  if(disp) disp.textContent = state.location;

  const heroLoc = document.querySelector('.location-text-val');
  if(heroLoc) heroLoc.textContent = state.location;
// ===========================================================
document.getElementById('navSearchInput')?.addEventListener('keydown', (e) => {
  if(e.key === 'Enter') {
    const q = e.target.value.trim();
    if(q) {
      document.getElementById('mainSearchInput').value = q;
      applyFiltersAndSort();
      showPage('home', 'restaurants');
    }
  }
});

// ==============================================================
  // EXISTING CODE (unchanged)
  document.getElementById('heroSearchBtn')?.addEventListener('click', () => {
    const q = document.getElementById('heroSearchInput')?.value.trim();
    if(q) {
      document.getElementById('mainSearchInput').value = q;
      applyFiltersAndSort();
    }
    showPage('home', 'restaurants');
  });

  document.getElementById('heroSearchInput')?.addEventListener('keydown', e => {
    if(e.key === 'Enter') document.getElementById('heroSearchBtn')?.click();
  });

});
/* ============================================================
   CATEGORIES
   ============================================================ */
function initCategoryCards() {
  document.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('click', () => {
      const cat = card.dataset.category;
      state.filteredRestaurants = allRestaurants.filter(r => r.category === cat);
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      state.activeFilters = { veg:false, rating:false, fast:false, price:false };
      document.getElementById('mainSearchInput').value = '';
      renderRestaurantsGrid();
      showPage('home', 'restaurants');
    });
  });
}

/* ============================================================
   RESTAURANTS GRID
   ============================================================ */
function initSearchAndFilters() {
  document.getElementById('mainSearchInput')?.addEventListener('input', e => {
    applyFiltersAndSort();
  });
  document.querySelectorAll('.filter-btn[data-filter]').forEach(btn => {
    btn.addEventListener('click', () => {
      const f = btn.dataset.filter;
      state.activeFilters[f] = !state.activeFilters[f];
      btn.classList.toggle('active', state.activeFilters[f]);
      applyFiltersAndSort();
    });
  });
  document.getElementById('sortSelect')?.addEventListener('change', applyFiltersAndSort);
}

function applyFiltersAndSort() {
  const q = document.getElementById('mainSearchInput')?.value?.toLowerCase() || '';
  let results = [...allRestaurants];
  if(q) results = results.filter(r => r.name.toLowerCase().includes(q) || r.cuisine.toLowerCase().includes(q));
  if(state.activeFilters.veg)    results = results.filter(r => r.type === 'veg');
  if(state.activeFilters.rating) results = results.filter(r => r.rating >= 4.3);
  if(state.activeFilters.fast)   results = results.filter(r => parseInt(r.time) <= 25);
  const sort = document.getElementById('sortSelect')?.value;
  if(sort === 'rating')    results.sort((a,b) => b.rating - a.rating);
  else if(sort === 'delivery') results.sort((a,b) => parseInt(a.time) - parseInt(b.time));
  else if(sort === 'price_asc') results.sort((a,b) => parseInt(a.price.replace('₹','')) - parseInt(b.price.replace('₹','')));
  else if(state.activeFilters.price) results.sort((a,b) => parseInt(a.price.replace('₹','')) - parseInt(b.price.replace('₹','')));
  state.filteredRestaurants = results;
  renderRestaurantsGrid();
}

function renderRestaurantsGrid() {
  const grid = document.getElementById('restaurantsGrid');
  if(!grid) return;
  const list = state.filteredRestaurants;
  if(list.length === 0) {
    grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:60px 20px;color:var(--text-muted)"><div style="font-size:48px;margin-bottom:12px">🍽️</div><p style="font-size:16px">No restaurants found. Try a different search.</p></div>`;
    return;
  }
  // Show skeletons first
  grid.innerHTML = Array(Math.min(list.length, 8)).fill(`
    <div class="skeleton-card">
      <div class="skeleton sk-image"></div>
      <div class="sk-body">
        <div class="skeleton sk-line w80"></div>
        <div class="skeleton sk-line w60"></div>
        <div class="skeleton sk-line w40"></div>
      </div>
    </div>`).join('');
  setTimeout(() => {
    grid.innerHTML = list.map((r,i) => `
      <div class="restaurant-card fade-up" style="animation-delay:${i*0.04}s" onclick="openRestaurant(${r.id})">
        <div class="card-image">
          <img src="${r.image}" alt="${r.name}" loading="lazy">
          ${r.offer ? `<div class="card-offer-badge">🏷️ ${r.offer}</div>` : ''}
          <div class="card-veg-badge">${r.type==='veg'?'🟢 VEG':'🔴 NON-VEG'}</div>
        </div>
        <div class="card-body">
          <div class="card-name">${r.name}</div>
          <div class="card-cuisine">${r.cuisine}</div>
          <div class="card-meta">
            <span class="rating ${r.rating<4.0?'poor':r.rating<4.3?'low':''}">★ ${r.rating}</span>
            <span class="dot">•</span>
            <span>${r.time}</span>
            <span class="dot">•</span>
            <span>${r.price} for two</span>
          </div>
        </div>
      </div>`).join('');
    initScrollAnimations();
  }, 500);
}

window.openRestaurant = function(id) {
  state.currentRestaurantId = id;
  showPage('restaurant');
};

/* ============================================================
   RESTAURANT PAGE
   ============================================================ */
function initRestaurantPage() {
  const id = state.currentRestaurantId;
  const data = menuData[id] || menuData[1];
  const rest = allRestaurants.find(r => r.id === id) || allRestaurants[0];

  // Banner
  const img = document.getElementById('bannerImg');
  if(img) img.src = data.banner;
  const name = document.getElementById('bannerName');
  if(name) name.textContent = data.name;
  const cuisine = document.getElementById('bannerCuisine');
  if(cuisine) cuisine.textContent = data.cuisine + ' • ' + state.location;
  const rating = document.getElementById('bannerRating');
  if(rating) rating.textContent = '★ ' + data.rating;
  const price = document.getElementById('bannerPrice');
  if(price) price.textContent = data.price + ' for two';
  const infoR = document.getElementById('infoRating');
  if(infoR) infoR.textContent = data.rating + ' ★';
  const infoT = document.getElementById('infoTime');
  if(infoT) infoT.textContent = data.time;
  const cpn = document.getElementById('cartPanelRestName');
  if(cpn) cpn.textContent = data.name;

  // Build menu nav + content
  const navEl = document.getElementById('menuNav');
  const contentEl = document.getElementById('menuContent');
  if(!navEl || !contentEl) return;

  navEl.innerHTML = data.categories.map((cat, i) => `
    <div class="menu-nav-item ${i===0?'active':''}" onclick="scrollToMenuSection(${i})">${cat.name} <span class="count">${cat.items.length}</span></div>
  `).join('');

  contentEl.innerHTML = data.categories.map((cat, i) => `
    <div class="menu-section" id="msec-${i}">
      <h2>${cat.name}</h2>
      ${cat.items.map(item => renderMenuItem(item)).join('')}
    </div>
  `).join('');

  renderCartPanel();
  updateCartBadge();

  // Sticky nav highlight
  const sections = contentEl.querySelectorAll('.menu-section');
  const navItems = navEl.querySelectorAll('.menu-nav-item');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if(e.isIntersecting) {
        const idx = e.target.id.split('-')[1];
        navItems.forEach(n => n.classList.remove('active'));
        if(navItems[idx]) navItems[idx].classList.add('active');
      }
    });
  }, { rootMargin:'-30% 0px -60% 0px' });
  sections.forEach(s => obs.observe(s));

  // Show floating cart on mobile if cart has items
  updateFloatingCartBtn();
}

function renderMenuItem(item) {
  const inCart = state.cart.find(c => c.id === item.id);
  const qty = inCart ? inCart.qty : 0;
  return `
    <div class="menu-item" id="item-${item.id}">
      <div class="item-details">
        <div class="item-veg-dot ${!item.veg?'non-veg':''}"></div>
        <div class="item-name">${item.name}</div>
        <div class="item-desc">${item.desc}</div>
        <div class="item-price">₹${item.price}</div>
      </div>
      <div class="item-image-wrap">
        <img class="item-image" src="${item.image}" alt="${item.name}" loading="lazy">
        <button class="add-btn" id="add-${item.id}" onclick="addToCart('${item.id}','${item.name}',${item.price})" style="${qty>0?'display:none':''}">ADD +</button>
        <div class="qty-controls ${qty>0?'show':''}" id="qty-${item.id}">
          <button class="qty-btn" onclick="changeQty('${item.id}','${item.name}',${item.price},-1)">−</button>
          <span class="qty-num" id="qnum-${item.id}">${qty}</span>
          <button class="qty-btn" onclick="changeQty('${item.id}','${item.name}',${item.price},1)">+</button>
        </div>
      </div>
    </div>`;
}

window.scrollToMenuSection = function(idx) {
  document.getElementById(`msec-${idx}`)?.scrollIntoView({ behavior:'smooth', block:'start' });
};

window.addToCart = function(id, name, price) {
  const ex = state.cart.find(i => i.id === id);
  if(ex) ex.qty++;
  else state.cart.push({ id, name, price, qty:1 });
  saveCart();
  const addBtn = document.getElementById(`add-${id}`);
  if(addBtn) addBtn.style.display = 'none';
  const qtyEl = document.getElementById(`qty-${id}`);
  if(qtyEl) qtyEl.classList.add('show');
  const qnum = document.getElementById(`qnum-${id}`);
  if(qnum) qnum.textContent = ex ? ex.qty : 1;
  renderCartPanel();
  updateCartBadge();
  updateFloatingCartBtn();
  showToast(`🛒 ${name} added!`, 'success');
};

window.changeQty = function(id, name, price, delta) {
  const idx = state.cart.findIndex(i => i.id === id);
  if(idx === -1 && delta > 0) state.cart.push({ id, name, price, qty:1 });
  else if(idx !== -1) {
    state.cart[idx].qty += delta;
    if(state.cart[idx].qty <= 0) {
      state.cart.splice(idx, 1);
      const qtyEl = document.getElementById(`qty-${id}`);
      if(qtyEl) qtyEl.classList.remove('show');
      const addBtn = document.getElementById(`add-${id}`);
      if(addBtn) addBtn.style.display = '';
    } else {
      const qnum = document.getElementById(`qnum-${id}`);
      if(qnum) qnum.textContent = state.cart[idx].qty;
    }
  }
  saveCart();
  renderCartPanel();
  updateCartBadge();
  updateFloatingCartBtn();
};

function updateFloatingCartBtn() {
  const btn = document.getElementById('floatingCartBtn');
  if(!btn) return;
  if(window.innerWidth < 768 && state.cart.length > 0) {
    btn.style.display = 'flex';
  } else {
    btn.style.display = 'none';
  }
}

/* ---- CART PANEL (slide-in on restaurant page) ---- */
function renderCartPanel() {
  const itemsEl = document.getElementById('cartPanelItems');
  const emptyEl = document.getElementById('cartPanelEmpty');
  const footerEl = document.getElementById('cartPanelFooter');
  if(!itemsEl) return;

  if(state.cart.length === 0) {
    itemsEl.style.display = 'none';
    if(emptyEl) emptyEl.style.display = 'flex';
    if(footerEl) footerEl.style.display = 'none';
    return;
  }
  itemsEl.style.display = 'block';
  if(emptyEl) emptyEl.style.display = 'none';
  if(footerEl) footerEl.style.display = 'block';

  itemsEl.innerHTML = state.cart.map(item => `
    <div class="cart-item">
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">₹${item.price} × ${item.qty}</div>
      </div>
      <div class="cart-item-qty">
        <button class="cqty-btn" onclick="changeQty('${item.id}','${item.name}',${item.price},-1)">−</button>
        <span class="cqty-num">${item.qty}</span>
        <button class="cqty-btn" onclick="changeQty('${item.id}','${item.name}',${item.price},1)">+</button>
      </div>
    </div>`).join('');

  const total = state.cart.reduce((s,i) => s+i.price*i.qty, 0);
  const totalEl = document.getElementById('cartPanelTotal');
  if(totalEl) totalEl.textContent = '₹' + total;
}

window.toggleCartPanel = function() {
  document.getElementById('cartPanel')?.classList.toggle('open');
};

/* ============================================================
   CART / CHECKOUT PAGE
   ============================================================ */
function renderCartPage() {
  state.couponDiscount = 0;
  const listEl = document.getElementById('cartItemsList');
  if(!listEl) return;

  if(state.cart.length === 0) {
    listEl.innerHTML = `<div style="text-align:center;padding:40px;color:var(--text-muted)">
      <div style="font-size:48px;margin-bottom:12px">🛒</div>
      <p style="margin-bottom:20px">Your cart is empty</p>
      <button onclick="showPage('home','restaurants')" class="btn-explore">Browse Restaurants →</button>
    </div>`;
    renderOrderSummary();
    return;
  }

  listEl.innerHTML = state.cart.map(item => `
    <div class="cart-item" id="cp-${item.id}">
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">₹${item.price * item.qty}</div>
      </div>
      <div class="cart-item-qty">
        <button class="cqty-btn" onclick="updateCartPage('${item.id}',${item.price},-1)">−</button>
        <span class="cqty-num" id="cpqty-${item.id}">${item.qty}</span>
        <button class="cqty-btn" onclick="updateCartPage('${item.id}',${item.price},1)">+</button>
      </div>
    </div>`).join('');

  renderOrderSummary();
}

window.updateCartPage = function(id, price, delta) {
  const idx = state.cart.findIndex(i => i.id === id);
  if(idx === -1) return;
  state.cart[idx].qty += delta;
  if(state.cart[idx].qty <= 0) state.cart.splice(idx, 1);
  saveCart();
  renderCartPage();
  updateCartBadge();
};

function renderOrderSummary() {
  const subtotal = state.cart.reduce((s,i) => s+i.price*i.qty, 0);
  const delivery = subtotal > 0 ? 49 : 0;
  const taxes = Math.round(subtotal * 0.05);
  const total = subtotal + delivery + taxes - state.couponDiscount;

  const set = (id, val) => { const el = document.getElementById(id); if(el) el.textContent = val; };
  set('summary-subtotal', '₹' + subtotal);
  set('summary-delivery', subtotal > 0 ? '₹' + delivery : '₹0');
  set('summary-taxes', '₹' + taxes);
  set('summary-discount', '-₹' + state.couponDiscount);
  set('summary-total', '₹' + Math.max(0, total));
}

window.applyCoupon = function() {
  const input = document.getElementById('couponInput');
  const code = input?.value.trim().toUpperCase();
  const subtotal = state.cart.reduce((s,i) => s+i.price*i.qty, 0);
  if(!code) { showToast('Please enter a coupon code', 'error'); return; }
  if(code === 'FOODIE50' && subtotal > 0) {
    state.couponDiscount = Math.round(subtotal * 0.2);
    renderOrderSummary();
    showToast('🎉 Coupon applied! Saved ₹' + state.couponDiscount, 'success');
  } else if(code === 'FLAT100' && subtotal >= 300) {
    state.couponDiscount = 100;
    renderOrderSummary();
    showToast('🎉 Coupon applied! Saved ₹100', 'success');
  } else if(subtotal === 0) {
    showToast('Add items to cart first', 'error');
  } else {
    showToast('❌ Invalid coupon code', 'error');
  }
};

function initPaymentOptions() {
  document.querySelectorAll('.payment-option').forEach(opt => {
    opt.addEventListener('click', () => {
      document.querySelectorAll('.payment-option').forEach(o => o.classList.remove('selected'));
      opt.classList.add('selected');
      const radio = opt.querySelector('input[type="radio"]');
      if(radio) radio.checked = true;
      const upiDiv = document.getElementById('upiInput');
      if(upiDiv) upiDiv.style.display = radio?.value === 'upi' ? 'block' : 'none';
    });
  });

  document.getElementById('placeOrderBtn')?.addEventListener('click', placeOrder);
}

function placeOrder() {
  const name = document.getElementById('addr-name')?.value.trim();
  const phone = document.getElementById('addr-phone')?.value.trim();
  const street = document.getElementById('addr-street')?.value.trim();
  if(!name || !phone || !street) { showToast('Please fill all delivery details', 'error'); return; }
  if(state.cart.length === 0) { showToast('Your cart is empty!', 'error'); return; }

  const btn = document.getElementById('placeOrderBtn');
  if(btn) { btn.textContent = '⏳ Placing Order…'; btn.disabled = true; }

  setTimeout(() => {
    // Save to orders history
    const subtotal = state.cart.reduce((s,i) => s+i.price*i.qty, 0);
    const orderRecord = {
      id: Date.now(),
      items: [...state.cart],
      total: subtotal + 49 + Math.round(subtotal*.05) - state.couponDiscount,
      date: new Date().toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' }),
      restaurant: menuData[state.currentRestaurantId]?.name || 'Spice Garden',
      status: 'Delivered',
    };
    state.orders.unshift(orderRecord);
    localStorage.setItem('fg_orders', JSON.stringify(state.orders));

    state.cart = [];
    saveCart();
    updateCartBadge();
    if(btn) { btn.textContent = '✓ Order Placed!'; btn.style.background = '#1a6e3c'; }
    showToast('🎉 Order placed! Estimated 30 mins', 'success');
    setTimeout(() => showPage('home'), 2000);
  }, 1800);
}

window.setAddrType = function(btn) {
  document.querySelectorAll('.addr-type-btn').forEach(b => b.classList.remove('active-addr'));
  btn.classList.add('active-addr');
};

/* ============================================================
   MY ORDERS PAGE
   ============================================================ */
function renderMyOrders() {
  const el = document.getElementById('myOrdersContent');
  if(!el) return;
  if(state.orders.length === 0) {
    el.innerHTML = `<div class="empty-orders">
      <div style="font-size:64px;margin-bottom:16px">📦</div>
      <h3>No orders yet</h3>
      <p>Looks like you haven't placed any orders. Start exploring!</p>
      <button class="btn-explore" onclick="showPage('home','restaurants')">Explore Restaurants →</button>
    </div>`;
    return;
  }
  el.innerHTML = state.orders.map(order => `
    <div class="order-history-item">
      <div class="order-history-header">
        <div>
          <strong>${order.restaurant}</strong>
          <div style="font-size:13px;color:var(--text-muted);margin-top:4px">${order.date}</div>
        </div>
        <span class="order-status delivered">✓ ${order.status}</span>
      </div>
      <div class="order-history-items">
        ${order.items.map(i => `${i.name} × ${i.qty}`).join(', ')}
      </div>
      <div class="order-history-footer">
        <span style="color:var(--text-muted)">Order #${order.id.toString().slice(-6)}</span>
        <strong>₹${order.total}</strong>
        <button class="reorder-btn" onclick="reorder(${order.id})">Reorder</button>
      </div>
    </div>`).join('');
}

window.reorder = function(orderId) {
  const order = state.orders.find(o => o.id === orderId);
  if(!order) return;
  order.items.forEach(item => {
    const ex = state.cart.find(i => i.id === item.id);
    if(ex) ex.qty += item.qty;
    else state.cart.push({...item});
  });
  saveCart();
  updateCartBadge();
  showToast('🛒 Items added to cart!', 'success');
  showPage('cart');
};

/* ============================================================
   REVIEWS SLIDER
   ============================================================ */
function initReviewsSlider() {
  const slider = document.getElementById('reviewsSlider');
  const dotsEl = document.getElementById('reviewsDots');
  const prevBtn = document.getElementById('reviewPrev');
  const nextBtn = document.getElementById('reviewNext');
  if(!slider) return;

  const cards = slider.querySelectorAll('.review-card');
  const total = cards.length;
  let cur = 0;
  let dragging = false, startX = 0, dragDelta = 0;

  function visibleCount() {
    const w = window.innerWidth;
    if(w < 600) return 1;
    if(w < 1024) return 2;
    return 3;
  }

  function cardWidth() {
    return cards[0] ? cards[0].getBoundingClientRect().width + 24 : 340;
  }

  function maxIdx() { return Math.max(0, total - visibleCount()); }

  function goTo(idx) {
    cur = Math.max(0, Math.min(idx, maxIdx()));
    slider.style.transform = `translateX(-${cur * cardWidth()}px)`;
    buildDots();
  }

  function buildDots() {
    if(!dotsEl) return;
    dotsEl.innerHTML = '';
    const max = maxIdx();
    for(let i = 0; i <= max; i++) {
      const d = document.createElement('button');
      d.className = 'reviews-dot' + (i === cur ? ' active' : '');
      d.setAttribute('aria-label', `Review ${i+1}`);
      d.onclick = () => { goTo(i); resetTimer(); };
      dotsEl.appendChild(d);
    }
  }

  function next() { goTo(cur >= maxIdx() ? 0 : cur + 1); }
  function prev() { goTo(cur <= 0 ? maxIdx() : cur - 1); }

  function resetTimer() {
    clearInterval(state.reviewsTimer);
    state.reviewsTimer = setInterval(next, 4500);
  }

  prevBtn?.addEventListener('click', () => { prev(); resetTimer(); });
  nextBtn?.addEventListener('click', () => { next(); resetTimer(); });

  // Drag / touch
  slider.addEventListener('mousedown', e => { dragging=true; startX=e.clientX; slider.style.transition='none'; });
  slider.addEventListener('mousemove', e => { if(dragging) dragDelta=e.clientX-startX; });
  slider.addEventListener('mouseup', () => {
    if(!dragging) return; dragging=false; slider.style.transition='';
    if(dragDelta < -50) { next(); resetTimer(); }
    else if(dragDelta > 50) { prev(); resetTimer(); }
    else goTo(cur);
    dragDelta=0;
  });
  slider.addEventListener('mouseleave', () => { if(dragging){ dragging=false; slider.style.transition=''; goTo(cur); dragDelta=0; }});
  slider.addEventListener('touchstart', e => { startX=e.touches[0].clientX; }, {passive:true});
  slider.addEventListener('touchend', e => {
    const d = e.changedTouches[0].clientX - startX;
    if(d < -50) { next(); resetTimer(); } else if(d > 50) { prev(); resetTimer(); }
  });
  slider.addEventListener('mouseenter', () => clearInterval(state.reviewsTimer));
  slider.addEventListener('mouseleave', () => { if(!dragging) resetTimer(); });
  window.addEventListener('resize', () => goTo(Math.min(cur, maxIdx())));

  buildDots();
  resetTimer();
}

/* ============================================================
   UTILITIES
   ============================================================ */
function saveCart() {
  localStorage.setItem('fg_cart', JSON.stringify(state.cart));
}
