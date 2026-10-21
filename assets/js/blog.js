
// Simple in-memory dataset for demo
const BLOG_POSTS = [
  {
    slug: "crafting-captivating-headlines",
    title: "Crafting Captivating Headlines",
    date: "2025-04-25",
    excerpt: "Engaging introductions: capturing your audience’s interest. The initial impression your…",
    image: "assets/img/img-1.webp",
    body: [
      "The initial impression your content makes is crucial—your headline and introduction set the tone.",
      "In IT services marketing, clarity beats cleverness. State the value proposition early and concretely.",
      "Use active verbs, avoid jargon, and guide the reader with meaningful subheadings."
    ]
  },
  {
    slug: "art-of-drawing-readers-in",
    title: "The Art of Drawing Readers In",
    date: "2025-04-25",
    excerpt: "Structure your message to guide attention and build trust from the start…",
    image: "assets/img/img-2.webp",
    body: [
      "Start with the problem statement your client feels today.",
      "Bridge from pain to promise with a crisp, outcome-focused narrative.",
      "Validate with proof: metrics, testimonials, or architecture diagrams."
    ]
  },
  {
    slug: "mastering-first-impression",
    title: "Mastering the First Impression",
    date: "2025-04-25",
    excerpt: "Best practices to craft concise, compelling value propositions for IT buyers…",
    image: "assets/img/img-3.webp",
    body: [
      "Lead with outcomes: speed, reliability, security, and total cost of ownership.",
      "Use language that resonates with decision-makers: risk reduction and ROI.",
      "Close with a single, clear action—book a consult or request a proposal."
    ]
  }
];

function formatDate(iso) {
  try {
    const d = new Date(iso + "T00:00:00");
    return d.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
  } catch { return iso; }
}

// Render blog list
function renderBlogList() {
  const root = document.getElementById('blogList');
  if (!root) return;
  root.innerHTML = '';
  BLOG_POSTS.forEach(post => {
    const a = document.createElement('article');
    a.className = 'card';
    a.innerHTML = `
      <img src="${post.image}" alt="">
      <div class="card-body">
        <h3>${post.title}</h3>
        <p class="muted" style="margin:0 0 6px">${formatDate(post.date)}</p>
        <p>${post.excerpt}</p>
        <a href="post.html?slug=${encodeURIComponent(post.slug)}" class="link">Read Post »</a>
      </div>
    `;
    root.appendChild(a);
  });
}

function getQueryParam(name) {
  const url = new URL(window.location.href);
  return url.searchParams.get(name);
}

// Render a single post on post.html
function renderPostFromQuery() {
  const slug = getQueryParam('slug');
  const post = BLOG_POSTS.find(p => p.slug === slug) || BLOG_POSTS[0];
  const t = document.getElementById('postTitle');
  const m = document.getElementById('postMeta');
  const img = document.getElementById('postImage');
  const body = document.getElementById('postBody');
  if (!t || !m || !img || !body) return;

  t.textContent = post.title;
  m.textContent = formatDate(post.date);
  img.src = post.image;
  img.alt = post.title;

  body.innerHTML = '';
  post.body.forEach(par => {
    const p = document.createElement('p');
    p.textContent = par;
    body.appendChild(p);
  });
}

// Auto-render list when on blog.html
document.addEventListener('DOMContentLoaded', renderBlogList);
