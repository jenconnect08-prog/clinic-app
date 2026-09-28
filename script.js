// CLINIC RESOURCES DATA
const TOPICS_DATA = [
  {
    id: "eating-disorder",
    title: "Eating Disorder",
    resources: [
      {
        title: "Initial Visit template",
        desc: "For clinician use during first appointment",
        status: "available",
        url: "https://example.com/docs/eating-disorder-initial.pdf"
      },
      {
        title: "Initial Visit Handout (For Parent)",
        desc: "Take-home summary",
        status: "available",
        url: "https://example.com/docs/eating-disorder-parent.pdf"
      },
      {
        title: "Initial Visit Handout (For Patient)",
        desc: "Coming soon",
        status: "coming_soon",
        url: "#"
      }
    ]
  },
  {
    id: "adolescent-anxiety",
    title: "Adolescent Anxiety",
    resources: [
      {
        title: "Initial Visit template",
        desc: "For clinician use during first appointment",
        status: "available",
        url: "https://example.com/docs/anxiety-template.pdf"
      }
    ]
  },
  {
    id: "poor-school-performance",
    title: "Adolescent Poor School Performance",
    resources: []
  },
  {
    id: "adolescent-fatigue",
    title: "Adolescent Fatigue",
    resources: []
  },
  {
    id: "adhd-assessment",
    title: "Adolescent Poor Concentration / ADHD Assessment",
    resources: [
      {
        title: "ADHD Screening Form",
        desc: "Initial assessment form",
        status: "available",
        url: "https://example.com/docs/adhd-screening.pdf"
      }
    ]
  }
];

// Render topics list
function renderTopics() {
  const container = document.getElementById('topicsContainer');
  container.innerHTML = '';

  TOPICS_DATA.forEach(topic => {
    const availCount = topic.resources.filter(r => r.status === 'available').length;
    const card = document.createElement('div');
    card.className = 'topic-card';
    card.onclick = () => openModal(topic);

    card.innerHTML = `
      <span class="topic-title">${topic.title}</span>
      <span class="topic-status">
        ${availCount > 0 ? availCount + ' available' : 'coming soon'}
      </span>
    `;
    container.appendChild(card);
  });
}

function openModal(topic) {
  document.getElementById('modalTitle').innerText = topic.title;
  const container = document.getElementById('modalResources');
  container.innerHTML = '';

  if (topic.resources.length === 0) {
    container.innerHTML = '<p style="color: #a0a0a0; margin: 15px 0;">No documents uploaded yet.</p>';
  } else {
    topic.resources.forEach(res => {
      const isAvailable = res.status === 'available';
      const card = document.createElement(isAvailable ? 'a' : 'div');

      card.className = `resource-card ${!isAvailable ? 'disabled' : ''}`;

      if (isAvailable) {
        card.href = res.url;
        card.target = '_blank';
        card.style.textDecoration = 'none';
      }

      card.innerHTML = `
        <div class="res-title">${res.title}</div>
        <div class="res-desc">${res.desc}</div>
      `;
      container.appendChild(card);
    });
  }

  document.getElementById('modalOverlay').classList.add('active');
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('active');
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', renderTopics);