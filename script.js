const projects = {
  codefolio: {
    title: "CodeFolio",
    subtitle: "Full-stack web platform · CodePath WEB103 Capstone",
    badge: "WEB103 Capstone",
    badgeColor: "var(--accent-light)",
    badgeText: "var(--accent)",
    desc: "CodeFolio is a developer portfolio builder and social platform where developers can create personalized profiles, upload project demos, and connect with others in the community. The app supports full CRUD, GitHub OAuth authentication, project bookmarking, a social feed, comments, likes, connection requests, and real-time notifications.\n\nBuilt as a team capstone for CodePath WEB103. Live at codefolio-client.onrender.com.",
    embed: null,
    tags: ["React", "Node.js", "Express", "PostgreSQL", "Neon", "TailwindCSS", "GitHub OAuth", "REST API"],
    links: [
      { label: "Live Demo", href: "https://codefolio-client.onrender.com", primary: true },
      { label: "GitHub", href: "https://github.com/CapstoneGuild/codefolio" },
    ],
    collab: "Built with Mercy Akinyemi, Dominique Wilson, and Mycah Accad."
  },
  pinpals: {
    title: "PinPals",
    subtitle: "iOS location-sharing app · Macalester College, Spring 2026",
    badge: "iOS · Swift",
    badgeColor: "var(--teal-light)",
    badgeText: "var(--teal)",
    desc: "PinPals lets friends share location pins on a live shared map. Users sign up, add friends, drop pins anywhere (with a name, comment, rating, and category), and see only their own and their friends' pins.\n\nKey features: real-time Firestore sync, MapKit search with autocomplete, friend request system, pin detail sheets, and filter-by-friend mode. I built the Firebase Auth/Firestore setup, the complete friends system including requests and real-time listeners, and the ViewModels.",
    embed: null,
    tags: ["Swift 5.9", "SwiftUI", "Firebase Auth", "Firestore", "MapKit", "MVVM", "iOS 17"],
    links: [
      { label: "GitHub", href: "https://github.com/BerniPdn/SocialLocations" },
    ],
    collab: "Built with Bernarda Perez De Nucci, Silas Revenaugh, and Shahed Zahaykeh."
  },
  layoffs: {
    title: "MySQL Layoffs Analysis",
    subtitle: "Data Cleaning & Exploratory Data Analysis · MySQL",
    badge: "MySQL · EDA",
    badgeColor: "var(--teal-light)",
    badgeText: "var(--teal)",
    desc: "An end-to-end data pipeline project applied to a real-world dataset of tech layoffs. The work covers two phases: data cleaning (removing duplicates, standardizing categorical fields like industry and country, handling nulls, and converting text-based date fields into proper formats) and exploratory data analysis (surfacing trends by company, industry, stage, and geography over time).\n\nBuilt entirely in MySQL, with an emphasis on writing clean, well-structured SQL that could be extended into a reporting pipeline.",
    embed: null,
    tags: ["MySQL", "SQL", "Data Cleaning", "EDA", "Aggregation", "Window Functions"],
    links: [
      { label: "GitHub", href: "https://github.com/IreneGallini/mysql-layoffs-analysis" },
    ],
    collab: ""
  },
  imdb: {
    title: "IMDB Database Redesign",
    subtitle: "Relational database design & population · COMP302",
    badge: "DB Design · COMP302",
    badgeColor: "var(--amber-light)",
    badgeText: "var(--amber)",
    desc: "A ground-up redesign of the IMDB relational database schema. The project involved modeling entities and relationships for films, people, roles, genres, and ratings; designing and enforcing constraints and triggers; and populating the database with real IMDB data via a scripted ingestion process.\n\nFocus areas included normalization, ER diagram design, and writing non-trivial queries that exercise joins, subqueries, and aggregations across the schema.",
    embed: null,
    tags: ["SQL", "PostgreSQL", "Database Design", "ER Modeling", "Normalization", "Triggers"],
    links: [
      { label: "GitHub", href: "https://github.com/IreneGallini/comp302_group_project" },
    ],
    collab: "Built with Nayla and Sam."
  },
  quantum: {
    title: "Quantum Cryptography",
    subtitle: "Research poster · BeyondQuantum 2025",
    badge: "BeyondQuantum 2025",
    badgeColor: "var(--purple-light)",
    badgeText: "var(--purple)",
    desc: "Research on quantum key distribution (QKD) — how quantum mechanical properties can be used to establish provably secure communication channels resistant to both classical and quantum eavesdroppers.\n\nThe work was conducted through the BeyondQuantum 2025 research program and culminated in a research poster presented to a technical audience.",
    embed: null,
    tags: ["Quantum Computing", "QKD", "Cryptography", "Qiskit", "Research Poster"],
    links: [
      { label: "GitHub", href: "https://github.com/ThinkingBeyond/BeyondQuantum-2025/tree/main/Taskia%20Islam%20and%20Irene%20Gallini" },
    ],
    collab: "Research collaboration with Taskia Islam. BeyondQuantum 2025 program."
  },
  lstm: {
    title: "Transformers vs LSTMs with Attention",
    subtitle: "ML research · BeyondAI Program",
    badge: "BeyondAI",
    badgeColor: "var(--amber-light)",
    badgeText: "var(--amber)",
    desc: "A comparative study of Transformer architectures vs LSTM models with attention mechanisms on sequence modeling tasks. The research analyzed performance, training efficiency, and generalization across different sequence lengths and dataset sizes.\n\nResults and methodology are available in the GitHub repository. Findings were also presented as a research poster.",
    embed: null,
    tags: ["Python", "PyTorch", "Transformers", "LSTM", "Attention", "ML Research"],
    links: [
      { label: "GitHub", href: "https://github.com/hibablj/LSTMvsTRANSFORMERS/tree/main/results" },
    ],
    collab: "Research collaboration with Hiba. BeyondAI research program."
  }
};

function openModal(key) {
  const p = projects[key];

  const badge = document.getElementById('modal-badge');
  badge.textContent = p.badge;
  badge.style.background = p.badgeColor;
  badge.style.color = p.badgeText;
  badge.style.border = `1px solid ${p.badgeText}30`;

  document.getElementById('modal-title-el').textContent = p.title;
  document.getElementById('modal-subtitle-el').textContent = p.subtitle;

  const descEl = document.getElementById('modal-desc-el');
  descEl.innerHTML = p.desc.replace(/\n\n/g, '<br><br>');

  const embedWrap = document.getElementById('modal-embed-wrap');
  const iframe = document.getElementById('modal-iframe');
  if (p.embed) {
    iframe.src = p.embed;
    embedWrap.style.display = 'block';
  } else {
    iframe.src = '';
    embedWrap.style.display = 'none';
  }

  const tagsEl = document.getElementById('modal-tags-el');
  tagsEl.innerHTML = p.tags.map(t => `<span class="modal-tag">${t}</span>`).join('');

  const linksEl = document.getElementById('modal-links-el');
  linksEl.innerHTML = p.links.map(l =>
    `<a class="modal-link${l.primary ? ' primary' : ''}" href="${l.href}" target="_blank" rel="noopener">${l.label} ↗</a>`
  ).join('');

  const collabEl = document.getElementById('modal-collab-el');
  collabEl.textContent = p.collab || '';
  collabEl.style.display = p.collab ? 'block' : 'none';

  document.getElementById('modal-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('modal-overlay').classList.remove('open');
  document.getElementById('modal-iframe').src = '';
  document.body.style.overflow = '';
}

function handleOverlayClick(e) {
  if (e.target === document.getElementById('modal-overlay')) closeModal();
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});
