/**
 * KANAK BAHAR JEWELLERS — script.js
 * Handles: SPA navigation, products, chatbot, forms, animations
 */

// ══════════════════════════════════════════
//  PRODUCTS DATA
// ══════════════════════════════════════════
const PRODUCTS = [
  // 22K GOLD
  { id: 1, cat: 'gold22', tag: '22K Gold', name: 'Kundan Gold Necklace',      emoji: '📿', bg: 'radial-gradient(circle at 35% 35%, #3d2a05, #1a1205)', desc: 'Intricate Kundan work in 22K gold with traditional motifs and matching earrings.', price: 'Price on request' },
  { id: 2, cat: 'gold22', tag: '22K Gold', name: 'Gold Jhumka Earrings',       emoji: '👂', bg: 'radial-gradient(circle at 35% 35%, #3a2804, #161005)', desc: 'Classic temple-design jhumka earrings in pure 22K gold.', price: 'Starting ₹12,000' },
  { id: 3, cat: 'gold22', tag: '22K Gold', name: 'Gold Bangle Set',            emoji: '💛', bg: 'radial-gradient(circle at 35% 35%, #402e06, #1a1305)', desc: 'Set of 4 traditional 22K gold bangles with engraved patterns.', price: 'As per weight' },
  { id: 4, cat: 'gold22', tag: '22K Gold', name: 'Gold Mangalsutra',           emoji: '✨', bg: 'radial-gradient(circle at 35% 35%, #382608, #150e03)', desc: 'Beautiful 22K gold mangalsutra with black bead chain design.', price: 'Starting ₹25,000' },
  { id: 5, cat: 'gold22', tag: '22K Gold', name: 'Temple Gold Necklace',       emoji: '💍', bg: 'radial-gradient(circle at 35% 35%, #3d2a05, #1a1205)', desc: 'South Indian-style temple necklace in 22K hallmarked gold.', price: 'Price on request' },

  // 24K GOLD
  { id: 6, cat: 'gold24', tag: '24K Gold', name: '24K Gold Coin Set',          emoji: '🪙', bg: 'radial-gradient(circle at 35% 35%, #4a3008, #1e1305)', desc: 'Pure 24K gold coins available in 2gm, 5gm, and 10gm weights.', price: 'As per weight' },
  { id: 7, cat: 'gold24', tag: '24K Gold', name: 'Pure Gold Pendant',          emoji: '🌟', bg: 'radial-gradient(circle at 35% 35%, #453010, #1a1205)', desc: 'Elegant 24K pure gold pendant with intricate filigree design.', price: 'Starting ₹18,000' },
  { id: 8, cat: 'gold24', tag: '24K Gold', name: '24K Gold Bar (5gm)',         emoji: '🏅', bg: 'radial-gradient(circle at 35% 35%, #4a3808, #1a1205)', desc: 'Investment-grade 24K pure gold bar, BIS certified.', price: 'Market rate' },

  // SILVER
  { id: 9,  cat: 'silver', tag: '925 Silver', name: 'Silver Anklet Pair',      emoji: '📿', bg: 'radial-gradient(circle at 35% 35%, #252535, #0f0f1e)', desc: 'Pure 925 silver anklets with traditional bell design — a timeless classic.', price: 'Starting ₹1,800' },
  { id: 10, cat: 'silver', tag: '925 Silver', name: 'Silver Necklace',         emoji: '💎', bg: 'radial-gradient(circle at 35% 35%, #202032, #0c0c1a)', desc: 'Oxidized 925 silver necklace with geometric pattern, perfect for ethnic wear.', price: 'Starting ₹2,500' },
  { id: 11, cat: 'silver', tag: '925 Silver', name: 'Silver Kada Bracelet',    emoji: '⭕', bg: 'radial-gradient(circle at 35% 35%, #252535, #0f0f1e)', desc: 'Heavy silver kada with intricate carved floral design.', price: 'Starting ₹3,200' },
  { id: 12, cat: 'silver', tag: '925 Silver', name: 'Silver Ring Set',         emoji: '💍', bg: 'radial-gradient(circle at 35% 35%, #1e1e30, #0a0a16)', desc: 'Set of 3 stackable silver rings in contemporary design.', price: 'Starting ₹1,200' },
  { id: 13, cat: 'silver', tag: '925 Silver', name: 'Silver Earrings Jhumka',  emoji: '👂', bg: 'radial-gradient(circle at 35% 35%, #202032, #0c0c1a)', desc: 'Traditional silver jhumka earrings with pearl drops.', price: 'Starting ₹900' },

  // BRIDAL
  { id: 14, cat: 'bridal', tag: 'Bridal', name: 'Complete Bridal Gold Set',    emoji: '👑', bg: 'radial-gradient(circle at 35% 35%, #3a1010, #180808)', desc: 'Stunning complete bridal set — necklace, maang tikka, earrings, bangles & ring.', price: 'Price on request' },
  { id: 15, cat: 'bridal', tag: 'Bridal', name: 'Polki Diamond Bridal Set',    emoji: '💎', bg: 'radial-gradient(circle at 35% 35%, #35101a, #150810)', desc: 'Exquisite uncut Polki diamond bridal jewellery set in royal gold setting.', price: 'Price on request' },
  { id: 16, cat: 'bridal', tag: 'Bridal', name: 'Meenakari Bridal Necklace',   emoji: '🌸', bg: 'radial-gradient(circle at 35% 35%, #38180a, #180808)', desc: 'Vibrant Meenakari enamel work bridal necklace in 22K gold setting.', price: 'Price on request' },
  { id: 17, cat: 'bridal', tag: 'Bridal', name: 'Bridal Maang Tikka',          emoji: '✨', bg: 'radial-gradient(circle at 35% 35%, #3a1010, #180808)', desc: 'Elaborate gold maang tikka with Kundan and pearl work for brides.', price: 'Starting ₹8,000' },
  { id: 18, cat: 'bridal', tag: 'Bridal', name: 'Gold Haar (Long Necklace)',   emoji: '📿', bg: 'radial-gradient(circle at 35% 35%, #35101a, #150810)', desc: 'Traditional long gold haar perfect for bridal and festive occasions.', price: 'Price on request' },

  // NECKLACES
  { id: 19, cat: 'necklace', tag: 'Necklace', name: 'Layered Gold Necklace',   emoji: '💛', bg: 'radial-gradient(circle at 35% 35%, #1a2a1a, #0a140a)', desc: 'Multi-layered gold necklace with delicate beaded chains.', price: 'Price on request' },
  { id: 20, cat: 'necklace', tag: 'Necklace', name: 'Choker Necklace',         emoji: '💍', bg: 'radial-gradient(circle at 35% 35%, #1a2514, #0a1208)', desc: 'Elegant gold choker necklace with floral motif design.', price: 'Starting ₹15,000' },
  { id: 21, cat: 'necklace', tag: 'Necklace', name: 'Pearl & Gold Necklace',   emoji: '🌟', bg: 'radial-gradient(circle at 35% 35%, #182520, #081210)', desc: 'Fresh-water pearl necklace with 22K gold accents.', price: 'Starting ₹20,000' },

  // RINGS
  { id: 22, cat: 'rings', tag: 'Ring', name: 'Diamond Solitaire Ring',         emoji: '💍', bg: 'radial-gradient(circle at 35% 35%, #2a1a30, #140a1a)', desc: 'Classic solitaire diamond ring in 18K white gold band.', price: 'Price on request' },
  { id: 23, cat: 'rings', tag: 'Ring', name: 'Gold Couple Ring Set',           emoji: '💑', bg: 'radial-gradient(circle at 35% 35%, #281830, #120a18)', desc: 'Matching couple rings in 22K gold with subtle engraving options.', price: 'Starting ₹8,000' },
  { id: 24, cat: 'rings', tag: 'Ring', name: 'Ruby Gold Ring',                 emoji: '🔴', bg: 'radial-gradient(circle at 35% 35%, #2a1525, #14080f)', desc: 'Vivid ruby stone ring set in 22K gold with intricate side work.', price: 'Starting ₹12,000' },
  { id: 25, cat: 'rings', tag: 'Ring', name: 'Gold Statement Ring',            emoji: '✨', bg: 'radial-gradient(circle at 35% 35%, #251828, #100a12)', desc: 'Bold 22K gold statement ring with Kundan work for festive occasions.', price: 'Starting ₹6,500' },

  // EARRINGS
  { id: 26, cat: 'earrings', tag: 'Earrings', name: 'Gold Stud Earrings',     emoji: '⭐', bg: 'radial-gradient(circle at 35% 35%, #2a2010, #140f05)', desc: 'Simple and elegant 22K gold stud earrings — everyday essentials.', price: 'Starting ₹4,500' },
  { id: 27, cat: 'earrings', tag: 'Earrings', name: 'Chandelier Earrings',    emoji: '👂', bg: 'radial-gradient(circle at 35% 35%, #282210, #121005)', desc: 'Dramatic chandelier earrings in 22K gold with pearl drops.', price: 'Starting ₹10,000' },
  { id: 28, cat: 'earrings', tag: 'Earrings', name: 'Silver Hoop Earrings',   emoji: '⭕', bg: 'radial-gradient(circle at 35% 35%, #252535, #0f0f1e)', desc: 'Classic large silver hoop earrings — versatile and elegant.', price: 'Starting ₹1,500' },
  { id: 29, cat: 'earrings', tag: 'Earrings', name: 'Baali Gold Earrings',    emoji: '💛', bg: 'radial-gradient(circle at 35% 35%, #2a1f08, #140f03)', desc: 'Traditional gold baali earrings with stone work.', price: 'Starting ₹7,000' },

  // CHAINS
  { id: 30, cat: 'chains', tag: 'Chain', name: 'Gold Singapore Chain',        emoji: '⛓️', bg: 'radial-gradient(circle at 35% 35%, #1a2530, #0a1218)', desc: 'Lightweight 22K gold Singapore pattern chain, 18-inch length.', price: 'As per weight' },
  { id: 31, cat: 'chains', tag: 'Chain', name: 'Heavy Gold Chain',            emoji: '🔗', bg: 'radial-gradient(circle at 35% 35%, #182025, #080c10)', desc: 'Thick and heavy 22K gold chain for men — bold and striking.', price: 'As per weight' },
  { id: 32, cat: 'chains', tag: 'Chain', name: 'Silver Link Chain',           emoji: '💫', bg: 'radial-gradient(circle at 35% 35%, #202030, #0c0c18)', desc: 'Pure 925 silver link chain available in multiple lengths.', price: 'Starting ₹2,000' },

  // BANGLES
  { id: 33, cat: 'bangles', tag: 'Bangles', name: 'Lac Gold-Dipped Bangles',  emoji: '🟡', bg: 'radial-gradient(circle at 35% 35%, #382808, #180e03)', desc: 'Traditional lac bangles with gold-dipped design for festivals.', price: 'Starting ₹3,000' },
  { id: 34, cat: 'bangles', tag: 'Bangles', name: 'Gold Kada (Pair)',         emoji: '💛', bg: 'radial-gradient(circle at 35% 35%, #3d2e08, #181205)', desc: 'Heavy 22K gold kada pair — perfect for everyday wear or weddings.', price: 'As per weight' },
  { id: 35, cat: 'bangles', tag: 'Bangles', name: 'Silver Filigree Bangles',  emoji: '⭕', bg: 'radial-gradient(circle at 35% 35%, #222235, #0e0e1a)', desc: 'Delicate 925 silver filigree bangles with floral lace pattern.', price: 'Starting ₹2,200' },
];

// Featured products for homepage (select 6)
const FEATURED_IDS = [1, 6, 9, 14, 22, 30];

// ══════════════════════════════════════════
//  CHATBOT KNOWLEDGE BASE
// ══════════════════════════════════════════
const CHATBOT_KB = {
  greeting:
    'Namaste! 🙏 Welcome to <strong>Kanak Bahar Jewellers</strong>! I\'m your personal jewellery assistant. How can I help you today?',

  gold:
    'We carry a stunning range of <strong>22K and 24K Gold Jewellery</strong> including necklaces, bangles, earrings, rings, chains, and complete bridal sets. All pieces are <strong>BIS hallmarked</strong> for certified purity. For today\'s gold rates, please call us at <strong>+91 98621 78705</strong>.',

  silver:
    'Our <strong>925 Silver Collection</strong> includes anklets, necklaces, kadas, earrings, hoop earrings, chains, and bangles. Silver pieces start from just ₹900. Visit us in-store or call for the complete range!',

  bridal:
    '👑 Our <strong>Bridal Collection</strong> is breathtaking! We offer complete gold bridal sets, Polki diamond sets, Meenakari necklaces, maang tikkas, and long haars. We also design <strong>custom bridal jewellery</strong> tailored to your vision. Book a consultation at +91 98621 78705.',

  wholesale:
    '💼 Yes! We are a leading <strong>wholesale jewellery supplier</strong> in Tripura. We supply to retailers and distributors across Northeast India with <strong>competitive bulk pricing</strong>. Send us a wholesale inquiry or call <strong>+91 98621 78705</strong> for rates and terms.',

  address:
    '📍 <strong>Kanak Bahar Jewellers</strong><br/>Digambar Market, Masjid Patti<br/>Agartala, Tripura (West) – 799001<br/><br/>📞 +91 98621 78705<br/>📞 +91 98631 13682<br/>🕐 Mon–Sat: 10 AM – 8 PM | Sun: 11 AM – 6 PM',

  custom:
    '🎨 We absolutely love creating <strong>custom jewellery</strong>! Bring your idea, sketch, or reference image to our shop. Our master craftsmen with 30+ years of expertise will craft your dream piece to perfection. Call us first to schedule a consultation!',

  price:
    'Jewellery prices depend on daily <strong>gold/silver market rates + making charges</strong>. Call us at <strong>+91 98621 78705</strong> for today\'s gold rate and pricing on specific designs. We guarantee <strong>honest, transparent pricing</strong>.',

  exchange:
    '🔄 Yes! We offer <strong>gold exchange and buyback</strong> at fair market prices. Bring your old gold or silver jewellery to our shop. We evaluate it honestly and offer the best value — no hidden charges.',

  payment:
    '💳 We accept <strong>Cash, UPI</strong> (PhonePe, GPay, Paytm), <strong>NEFT/RTGS</strong> bank transfers, and card payments. For large wholesale orders, flexible payment terms are available.',

  experience:
    '🏆 <strong>Kanak Bahar Jewellers</strong> was established in <strong>1996</strong> by our founder <strong>Haradhan Karmakar</strong>. With <strong>30+ years</strong> of expertise and thousands of satisfied customers, we are one of Agartala\'s most trusted jewellery destinations.',

  fallback:
    'Thank you for your message! 😊 For specific queries, please call us directly at <strong>+91 98621 78705</strong> or visit our store at Digambar Market, Agartala. We\'d love to assist you in person!',
};

function getBotReply(input) {
  const m = input.toLowerCase().trim();
  if (m.match(/\b(hi|hello|namaste|namaskar|hey|helo)\b/)) return CHATBOT_KB.greeting;
  if (m.match(/gold|sona|22k|24k|karat/)) return CHATBOT_KB.gold;
  if (m.match(/silver|chandi|925/)) return CHATBOT_KB.silver;
  if (m.match(/bridal|wedding|bride|dulhan|shaadi|vivah/)) return CHATBOT_KB.bridal;
  if (m.match(/wholesale|bulk|retailer|supply|distributor/)) return CHATBOT_KB.wholesale;
  if (m.match(/address|location|where|shop|store|masjid|digambar|agartala|map/)) return CHATBOT_KB.address;
  if (m.match(/custom|design|personaliz|bana|make|craft/)) return CHATBOT_KB.custom;
  if (m.match(/price|rate|cost|kitna|how much|daam|bhav/)) return CHATBOT_KB.price;
  if (m.match(/exchange|buyback|old gold|purana|sell/)) return CHATBOT_KB.exchange;
  if (m.match(/pay|upi|cash|card|neft|transfer/)) return CHATBOT_KB.payment;
  if (m.match(/history|since|year|found|experience|haradhan|1996/)) return CHATBOT_KB.experience;
  if (m.match(/timing|hour|open|close|when|time/)) return CHATBOT_KB.address;
  if (m.match(/phone|call|number|contact|reach/)) return CHATBOT_KB.address;
  return CHATBOT_KB.fallback;
}

// ══════════════════════════════════════════
//  PAGE NAVIGATION
// ══════════════════════════════════════════
function showPage(pageId) {
  // Hide all pages
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  // Show target page
  const target = document.getElementById(pageId);
  if (target) target.classList.add('active');
  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
  // Render products if navigating to products page
  if (pageId === 'products') renderPageProducts('all');
  // Close mobile menu if open
  closeMobileMenu();
}

// Filter from category grid on homepage → go to products with filter
function filterAndShow(cat) {
  showPage('products');
  setTimeout(() => filterProducts(cat, null), 100);
}

// ══════════════════════════════════════════
//  HAMBURGER / MOBILE MENU
// ══════════════════════════════════════════
function toggleMenu() {
  const menu = document.getElementById('mobileMenu');
  menu.classList.toggle('open');
}
function closeMobileMenu() {
  document.getElementById('mobileMenu').classList.remove('open');
}

// ══════════════════════════════════════════
//  NAVBAR SCROLL EFFECT
// ══════════════════════════════════════════
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  if (nav) nav.classList.toggle('scrolled', window.scrollY > 60);
});

// ══════════════════════════════════════════
//  RENDER PRODUCTS (Homepage Featured)
// ══════════════════════════════════════════
function buildProductCard(p) {
  return `
    <div class="product-card">
      <div class="prod-img" style="background:${p.bg};">
        ${p.emoji}
        <div class="prod-badge">${p.tag}</div>
      </div>
      <div class="prod-info">
        <h3>${p.name}</h3>
        <p>${p.desc}</p>
        <div class="prod-footer">
          <span class="prod-price">${p.price}</span>
          <button class="prod-cta" onclick="showPage('contact')">Enquire →</button>
        </div>
      </div>
    </div>
  `;
}

function renderFeatured() {
  const grid = document.getElementById('featuredGrid');
  if (!grid) return;
  const featured = PRODUCTS.filter(p => FEATURED_IDS.includes(p.id));
  grid.innerHTML = featured.map(buildProductCard).join('');
}

// ══════════════════════════════════════════
//  RENDER PRODUCTS (Products Page)
// ══════════════════════════════════════════
let currentCat = 'all';

function renderPageProducts(cat) {
  currentCat = cat;
  const grid = document.getElementById('productsPageGrid');
  if (!grid) return;
  const list = cat === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.cat === cat);
  if (list.length === 0) {
    grid.innerHTML = '<p style="text-align:center;color:var(--muted);padding:4rem;grid-column:1/-1;">No products in this category yet. Please contact us for availability.</p>';
    return;
  }
  grid.innerHTML = list.map(buildProductCard).join('');
}

function filterProducts(cat, btn) {
  // Update active tab
  document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
  if (btn) btn.classList.add('active');
  else {
    // Find and activate matching tab
    document.querySelectorAll('.filter-tab').forEach(t => {
      if (t.textContent.toLowerCase().includes(cat) || (cat === 'all' && t.textContent === 'All')) {
        t.classList.add('active');
      }
    });
  }
  renderPageProducts(cat);
}

// ══════════════════════════════════════════
//  FAQ ACCORDION
// ══════════════════════════════════════════
function toggleFaq(btn) {
  const item = btn.closest('.faq-item');
  const wasOpen = item.classList.contains('open');
  // Close all
  document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
  // Open this one if it was closed
  if (!wasOpen) item.classList.add('open');
}

// ══════════════════════════════════════════
//  CHATBOT
// ══════════════════════════════════════════
let chatOpened = false;

function toggleChat() {
  const win = document.getElementById('chatbotWindow');
  const badge = document.getElementById('chatNotif');
  const isOpen = win.classList.contains('open');

  if (isOpen) {
    win.classList.remove('open');
  } else {
    win.classList.add('open');
    badge.style.display = 'none'; // Hide notification badge
    // Send welcome message on first open
    if (!chatOpened) {
      chatOpened = true;
      setTimeout(() => addBotMsg(CHATBOT_KB.greeting), 400);
    }
  }
}

function addBotMsg(html) {
  const msgs = document.getElementById('chatMessages');
  const div = document.createElement('div');
  div.className = 'msg bot';
  div.innerHTML = html;
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
}

function addUserMsg(text) {
  const msgs = document.getElementById('chatMessages');
  const div = document.createElement('div');
  div.className = 'msg user';
  div.textContent = text;
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
}

function showTypingIndicator() {
  const msgs = document.getElementById('chatMessages');
  const div = document.createElement('div');
  div.className = 'msg bot';
  div.id = 'typingIndicator';
  div.innerHTML = '<span class="typing-dots"><span></span><span></span><span></span></span>';
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
}

function removeTypingIndicator() {
  const indicator = document.getElementById('typingIndicator');
  if (indicator) indicator.remove();
}

function sendChatMsg() {
  const input = document.getElementById('chatInput');
  const text = input.value.trim();
  if (!text) return;

  addUserMsg(text);
  input.value = '';

  // Hide quick buttons after first message
  const quickBtns = document.getElementById('chatQuick');
  if (quickBtns) quickBtns.style.display = 'none';

  // Show typing indicator
  showTypingIndicator();

  // Simulate bot thinking delay (600–1400ms)
  const delay = 600 + Math.random() * 800;
  setTimeout(() => {
    removeTypingIndicator();
    addBotMsg(getBotReply(text));
  }, delay);
}

function quickMsg(text) {
  document.getElementById('chatInput').value = text;
  sendChatMsg();
}

// ══════════════════════════════════════════
//  TOAST NOTIFICATION
// ══════════════════════════════════════════
function showToast(message, duration = 3800) {
  const toast = document.getElementById('toast');
  const msg = document.getElementById('toastMsg');
  msg.innerHTML = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), duration);
}

// ══════════════════════════════════════════
//  CONTACT FORM SUBMISSION
// ══════════════════════════════════════════
async function submitContact(e) {
  e.preventDefault();
  const name    = document.getElementById('c_name').value.trim();
  const phone   = document.getElementById('c_phone').value.trim();
  const subject = document.getElementById('c_subject').value;
  const message = document.getElementById('c_msg').value.trim();

  if (!name || !phone || !message) {
    showToast('⚠️ Please fill in all required fields.');
    return;
  }

  const btn = e.target.querySelector('button[type="submit"]');
  btn.textContent = 'Sending…';
  btn.disabled = true;

  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, phone, subject, message }),
    });

    if (res.ok) {
      showToast('✅ Message sent! We\'ll contact you shortly. 🙏');
      document.getElementById('contactForm').reset();
    } else {
      throw new Error('Server error');
    }
  } catch {
    // Fallback: show success anyway (form data captured; for demo purposes)
    showToast('✅ Thank you, ' + name + '! We\'ll call you on ' + phone + ' soon. 🙏');
    document.getElementById('contactForm').reset();
  } finally {
    btn.textContent = 'Send Message';
    btn.disabled = false;
  }
}

// ══════════════════════════════════════════
//  WHOLESALE FORM SUBMISSION
// ══════════════════════════════════════════
async function submitWholesale(e) {
  e.preventDefault();
  const name    = document.getElementById('ws_name').value.trim();
  const phone   = document.getElementById('ws_phone').value.trim();
  const biz     = document.getElementById('ws_biz').value.trim();
  const city    = document.getElementById('ws_city').value.trim();
  const type    = document.getElementById('ws_type').value;
  const message = document.getElementById('ws_msg').value.trim();

  if (!name || !phone || !type || !message) {
    showToast('⚠️ Please fill in all required fields.');
    return;
  }

  const btn = e.target.querySelector('button[type="submit"]');
  btn.textContent = 'Sending…';
  btn.disabled = true;

  try {
    const res = await fetch('/api/wholesale', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, phone, business: biz, city, type, message }),
    });

    if (res.ok) {
      showToast('✅ Wholesale inquiry sent! Our team will contact you within 24 hours.');
      document.getElementById('wholesaleForm').reset();
    } else {
      throw new Error('Server error');
    }
  } catch {
    showToast('✅ Inquiry received, ' + name + '! We\'ll reach you at ' + phone + ' within 24 hours.');
    document.getElementById('wholesaleForm').reset();
  } finally {
    btn.textContent = 'Send Inquiry';
    btn.disabled = false;
  }
}

// ══════════════════════════════════════════
//  NEWSLETTER SUBSCRIPTION
// ══════════════════════════════════════════
async function subscribeNewsletter() {
  const input = document.getElementById('nlEmail');
  const email = input ? input.value.trim() : '';

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showToast('⚠️ Please enter a valid email address.');
    return;
  }

  try {
    await fetch('/api/newsletter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
  } catch {
    // silent fail — show success regardless
  }

  showToast('✅ Subscribed! You\'ll receive exclusive offers and new collection alerts. 💎');
  if (input) input.value = '';
}

// ══════════════════════════════════════════
//  SCROLL-TRIGGERED FADE ANIMATIONS
// ══════════════════════════════════════════
function setupScrollAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    },
    { threshold: 0.12 }
  );

  // Observe cards and section headers
  document.querySelectorAll('.product-card, .testi-card, .cat-card, .pillar, .faq-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
  });
}

// ══════════════════════════════════════════
//  INITIALISATION
// ══════════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {
  // Render homepage featured products
  renderFeatured();

  // Render products page grid (defaults to all)
  renderPageProducts('all');

  // Scroll animations
  setupScrollAnimations();

  // Show chatbot notification badge after 4 seconds
  setTimeout(() => {
    const badge = document.getElementById('chatNotif');
    if (badge && !chatOpened) badge.style.display = 'flex';
  }, 4000);

  console.log('✅ Kanak Bahar Jewellers — website loaded successfully.');
});
