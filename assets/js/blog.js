// =========================================================
// Lintech Innovations Corp. — Articles & Guides
// Practical, engineering- and operations-focused content.
// =========================================================

const BLOG_POSTS = [
  {
    slug: "custom-software-vs-saas",
    title: "When to Build Custom Software vs. Buying Off-the-Shelf SaaS",
    category: "Engineering",
    date: "2026-03-12",
    excerpt: "SaaS subscriptions multiply quickly. Here is the framework we use to decide when a business process warrants bespoke engineering.",
    image: "assets/img/img-1.webp",
    body: [
      "Every growing organization eventually runs into the limits of third-party SaaS. Spreadsheets get unruly, subscription costs mount, and your unique operational advantage gets forced into a rigid workflow designed for someone else.",
      "The rule of thumb we share with our partners is straightforward: buy commodities, build core competencies. If an off-the-shelf tool solves 95% of a generic problem like bookkeeping or email hosting, use it. But if the workflow represents your secret sauce—how you fulfill orders, manage client logistics, or deliver service—custom software consistently delivers higher ROI and total IP ownership.",
      "By engineering internal dashboards and custom API bridges, teams eliminate double data entry, prevent vendor lock-in, and gain visibility that standard tools simply cannot offer."
    ]
  },
  {
    slug: "web-performance-and-conversion",
    title: "Why Web Performance and Clean UX Directly Impact Acquisition",
    category: "Web Development",
    date: "2026-02-28",
    excerpt: "Modern buyers judge technical competence within three seconds of landing on your site. How to ensure your web presence converts.",
    image: "assets/img/img-2.webp",
    body: [
      "A corporate website is frequently the first proof-of-work a prospective client sees. When a site is slow, cluttered, or difficult to navigate on mobile devices, buyers subconsciously question the technical capability of the organization.",
      "We build with modern web standards—prioritizing semantic HTML, optimized assets, and responsive layouts that load instantaneously across all devices. A snappy interface builds immediate confidence.",
      "Beyond page speed, conversion comes down to clarity. Clearly articulating what you build, who it is for, and how to get started will always outperform vague marketing jargon."
    ]
  },
  {
    slug: "scaling-with-virtual-assistants",
    title: "How Dedicated Virtual Assistants Unlock Engineering & Executive Focus",
    category: "Operations",
    date: "2026-01-20",
    excerpt: "High-value team members shouldn't be bogged down by recurring administrative friction. How to integrate virtual support effectively.",
    image: "assets/img/img-3.webp",
    body: [
      "The most common bottleneck in growing tech and service companies isn't strategic vision—it's operational overload. Founders and senior operators often spend hours each week triaging incoming inquiries, scheduling appointments, and managing data entry.",
      "Our Virtual Assistant services bridge this gap by placing trained, dedicated support staff directly into your day-to-day communication channels. With standardized operating procedures, assistants handle customer support tickets, manage calendars, and audit operational data.",
      "This separation of responsibilities ensures key stakeholders stay focused on strategic execution, client relationships, and business growth."
    ]
  }
];

function formatDate(iso) {
  try {
    const d = new Date(iso + "T00:00:00");
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  } catch {
    return iso;
  }
}

// Render articles into #blogList or #homeInsights
function renderBlogList() {
  ['blogList', 'homeInsights'].forEach(id => {
    const root = document.getElementById(id);
    if (!root) return;
    root.innerHTML = '';

    BLOG_POSTS.forEach(post => {
      const card = document.createElement('article');
      card.className = 'article-card';
      card.innerHTML = `
        <a class="article-thumb" href="post.html?slug=${encodeURIComponent(post.slug)}" aria-label="${post.title}">
          <img src="${post.image}" alt="${post.title}" loading="lazy" />
        </a>
        <div class="article-body">
          <span class="article-date">${post.category} &middot; ${formatDate(post.date)}</span>
          <h3><a href="post.html?slug=${encodeURIComponent(post.slug)}">${post.title}</a></h3>
          <p>${post.excerpt}</p>
          <a class="link-inline" href="post.html?slug=${encodeURIComponent(post.slug)}">
            <span>Read article</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
        </div>
      `;
      root.appendChild(card);
    });
  });
}

function getQueryParam(name) {
  const url = new URL(window.location.href);
  return url.searchParams.get(name);
}

// Render individual article on post.html
function renderPostFromQuery() {
  const slug = getQueryParam('slug');
  const post = BLOG_POSTS.find(p => p.slug === slug) || BLOG_POSTS[0];

  const t = document.getElementById('postTitle');
  const m = document.getElementById('postMeta');
  const img = document.getElementById('postImage');
  const body = document.getElementById('postBody');

  if (!t || !m || !img || !body) return;

  t.textContent = post.title;
  m.textContent = `${post.category} · Published ${formatDate(post.date)}`;
  img.src = post.image;
  img.alt = post.title;

  body.innerHTML = '';
  post.body.forEach(para => {
    const p = document.createElement('p');
    p.textContent = para;
    body.appendChild(p);
  });
}

document.addEventListener('DOMContentLoaded', renderBlogList);
