/**
 * ANKIT KUMAR PORTFOLIO - ULTRA-SMOOTH REACT 18 UI ENGINE
 * Native React Components for Hero, Interactive Projects with Search & Filter, Skills, and Resume Modal
 */

const { useState, useEffect, useMemo } = React;

/* ==========================================================================
   1. REACT HERO COMPONENT
   ========================================================================== */
function ReactHero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [availableForHire, setAvailableForHire] = useState(true);

  const roles = useMemo(() => [
    "Full Stack Developer",
    "MERN Stack Specialist (React, Node, Express, MongoDB)",
    "B.Tech CSE @ Parul University",
    "100+ LeetCode DSA Solver",
    "AI & WebRTC Applications Developer"
  ], []);

  useEffect(() => {
    const currentWord = roles[roleIndex];
    let speed = isDeleting ? 40 : 80;

    if (!isDeleting && displayText === currentWord) {
      speed = 1800; // Pause at full word
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
      speed = 400;
    }

    const timer = setTimeout(() => {
      setDisplayText(prev => 
        isDeleting 
          ? currentWord.substring(0, prev.length - 1)
          : currentWord.substring(0, prev.length + 1)
      );

      if (!isDeleting && displayText === currentWord) {
        setIsDeleting(true);
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, roleIndex, roles]);

  return React.createElement('div', { className: 'hero-grid' },
    // Left Text Area
    React.createElement('div', { className: 'hero-content' },
      React.createElement('div', { 
        className: 'liquid-badge', 
        style: { cursor: 'pointer' },
        onClick: () => setAvailableForHire(!availableForHire)
      },
        React.createElement('div', { 
          className: 'liquid-badge-pulse',
          style: { background: availableForHire ? '#10b981' : '#f59e0b' }
        }),
        React.createElement('span', null, 
          availableForHire 
            ? 'Available for Full Stack Internships & Graduate Roles' 
            : 'Open to Software Engineering Opportunities'
        )
      ),

      React.createElement('h1', { className: 'hero-title' },
        "Hi, I'm ",
        React.createElement('span', { className: 'gradient-text-accent' }, "Ankit Kumar")
      ),

      React.createElement('div', { className: 'typewriter-box' },
        "> ",
        React.createElement('span', null, displayText),
        React.createElement('span', { className: 'cursor-blink' })
      ),

      React.createElement('p', { className: 'hero-description' },
        "Computer Science Engineering student at Parul University Vadodara proficient in building full-stack web applications using the ",
        React.createElement('strong', null, "MERN stack (MongoDB, Express.js, React.js, Node.js)"),
        ", RESTful APIs, AI integrations (OpenAI), and Java Data Structures."
      ),

      React.createElement('div', { className: 'hero-cta' },
        React.createElement('button', { 
          className: 'btn-liquid btn-liquid-primary',
          onClick: () => window.openResumeModal && window.openResumeModal()
        },
          React.createElement('i', { className: 'fas fa-file-pdf' }),
          " View & Download Resume"
        ),
        React.createElement('a', { href: '#projects', className: 'btn-liquid btn-liquid-secondary' },
          React.createElement('i', { className: 'fas fa-rocket' }),
          " View Projects"
        ),
        React.createElement('a', { href: '#contact', className: 'btn-liquid btn-liquid-secondary' },
          React.createElement('i', { className: 'fas fa-envelope' }),
          " Contact Me"
        )
      )
    ),

    // Right Portrait Area
    React.createElement('div', { className: 'hero-visual' },
      React.createElement('div', { className: 'avatar-container avatar-morph-frame' },
        React.createElement('img', { 
          src: '/images/p-image1.jpeg', 
          alt: 'Ankit Kumar - Full Stack Developer', 
          className: 'avatar-img' 
        })
      ),
      React.createElement('div', { className: 'float-card float-card-1' },
        React.createElement('div', { className: 'float-icon' },
          React.createElement('i', { className: 'fas fa-layer-group' })
        ),
        React.createElement('div', { className: 'float-text' },
          React.createElement('h4', null, "Full Stack Developer"),
          React.createElement('p', null, "MERN Stack & REST APIs")
        )
      ),
      React.createElement('div', { className: 'float-card float-card-2' },
        React.createElement('div', { className: 'float-icon', style: { background: 'rgba(16, 185, 129, 0.1)', color: '#10b981' } },
          React.createElement('i', { className: 'fas fa-graduation-cap' })
        ),
        React.createElement('div', { className: 'float-text' },
          React.createElement('h4', null, "Parul University"),
          React.createElement('p', null, "B.Tech CSE (2023-2027)")
        )
      )
    )
  );
}

/* ==========================================================================
   2. REACT INTERACTIVE PROJECTS COMPONENT (WITH LIVE SEARCH & CATEGORY FILTER)
   ========================================================================== */
function ReactProjects({ initialProjects }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);

  const projectsList = useMemo(() => {
    return initialProjects || [
      {
        id: 1,
        projectname: "Government Services Platform (GOV DESK)",
        projectinfo: "Full-stack government services portal using the MERN stack (MongoDB, Express.js, React.js, Node.js). Integrated Google Maps API for location-based office search, service categorization, and RESTful APIs for efficient data management.",
        category: "MERN Stack",
        tech: ["React.js", "Node.js", "Express.js", "MongoDB", "Google Maps API", "REST APIs"],
        repo: "https://github.com/Ankit099-01",
        link: "#",
        iconClass: "fas fa-landmark",
        accentColor: "linear-gradient(135deg, #6366f1, #3b82f6)"
      },
      {
        id: 2,
        projectname: "AI-Hiring Platform",
        projectinfo: "AI-powered candidate screening and recruitment platform built with React.js, Node.js, Express.js, and MongoDB. Features OpenAI API integration for candidate evaluation, WebRTC live video interviews, Socket.io, and recruiter dashboard.",
        category: "Full Stack AI",
        tech: ["React.js", "Node.js", "Express.js", "MongoDB", "OpenAI API", "WebRTC", "Socket.io"],
        repo: "https://github.com/Ankit099-01",
        link: "#",
        iconClass: "fas fa-robot",
        accentColor: "linear-gradient(135deg, #06b6d4, #3b82f6)"
      },
      {
        id: 3,
        projectname: "MERN Liquid Glass Portfolio",
        projectinfo: "Ultra-modern responsive personal portfolio website engineered with React 18 UI engine, Node.js, Express.js, EJS, and custom ambient liquid canvas animations showcasing full-stack projects, skills, and resume details.",
        category: "MERN Stack",
        tech: ["React 18", "Node.js", "Express.js", "MongoDB", "EJS", "CSS Glassmorphism"],
        repo: "https://github.com/Ankit099-01/Portfolio-website",
        link: "http://localhost:7061",
        iconClass: "fas fa-layer-group",
        accentColor: "linear-gradient(135deg, #ec4899, #8b5cf6)"
      }
    ];
  }, [initialProjects]);

  const filteredProjects = useMemo(() => {
    return projectsList.filter(p => {
      const matchesCategory = activeCategory === 'all' || 
        (activeCategory === 'mern' && p.category.toLowerCase().includes('mern')) ||
        (activeCategory === 'ai' && (p.category.toLowerCase().includes('ai') || p.tech.some(t => t.toLowerCase().includes('ai'))));

      const matchesSearch = p.projectname.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.projectinfo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tech.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesSearch;
    });
  }, [projectsList, activeCategory, searchQuery]);

  return React.createElement('div', null,
    // Header & Filter Bar
    React.createElement('div', { className: 'projects-filter-bar', style: { display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '32px', alignItems: 'center' } },
      // Live Search Box
      React.createElement('div', { style: { position: 'relative', width: '100%', maxWidth: '480px' } },
        React.createElement('i', { className: 'fas fa-magnifying-glass', style: { position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' } }),
        React.createElement('input', {
          type: 'text',
          className: 'form-control',
          placeholder: 'Search projects by technology or keyword (e.g. React, OpenAI, Maps)...',
          value: searchQuery,
          onChange: (e) => setSearchQuery(e.target.value),
          style: { paddingLeft: '44px', borderRadius: '9999px', background: 'rgba(255, 255, 255, 0.85)', backdropFilter: 'blur(10px)' }
        })
      ),

      // Category Filter Buttons
      React.createElement('div', { className: 'skills-filter', style: { marginBottom: 0 } },
        React.createElement('button', {
          className: `filter-btn ${activeCategory === 'all' ? 'active' : ''}`,
          onClick: () => setActiveCategory('all')
        }, `All Projects (${projectsList.length})`),
        React.createElement('button', {
          className: `filter-btn ${activeCategory === 'mern' ? 'active' : ''}`,
          onClick: () => setActiveCategory('mern')
        }, 'MERN Stack'),
        React.createElement('button', {
          className: `filter-btn ${activeCategory === 'ai' ? 'active' : ''}`,
          onClick: () => setActiveCategory('ai')
        }, 'AI & Real-Time')
      )
    ),

    // Projects Grid
    React.createElement('div', { className: 'projects-grid' },
      filteredProjects.length > 0 ? (
        filteredProjects.map((p, idx) => 
          React.createElement('div', { 
            key: p.id || idx, 
            className: 'glass-card project-card-modern tilt-card',
            style: { animation: 'fadeIn 0.4s ease forwards' }
          },
            React.createElement('div', { 
              className: 'project-preview-box', 
              style: { 
                background: p.accentColor || 'linear-gradient(135deg, #6366f1, #3b82f6)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                position: 'relative' 
              } 
            },
              React.createElement('div', { style: { fontSize: '3.8rem', color: '#ffffff', opacity: 0.9, textShadow: '0 10px 20px rgba(0,0,0,0.2)' } },
                React.createElement('i', { className: p.iconClass || 'fas fa-laptop-code' })
              ),
              React.createElement('span', { className: 'project-overlay-badge' }, p.category || 'MERN Stack')
            ),

            React.createElement('div', { className: 'project-body' },
              React.createElement('h3', { className: 'project-title' }, p.projectname),
              React.createElement('p', { className: 'project-desc' }, p.projectinfo),
              React.createElement('div', { className: 'project-tech-tags' },
                p.tech && p.tech.map((t, i) => 
                  React.createElement('span', { key: i, className: 'tech-tag' }, t)
                )
              )
            ),

            React.createElement('div', { className: 'project-footer-actions' },
              React.createElement('a', { 
                href: p.repo || 'https://github.com/Ankit099-01', 
                target: '_blank', 
                className: 'project-link-btn' 
              },
                React.createElement('i', { className: 'fab fa-github' }),
                " Code Repo"
              ),
              React.createElement('button', { 
                className: 'project-link-btn',
                style: { color: 'var(--accent-secondary)', background: 'transparent', border: 'none', cursor: 'pointer' },
                onClick: () => setSelectedProject(p)
              },
                React.createElement('i', { className: 'fas fa-circle-info' }),
                " Details"
              )
            )
          )
        )
      ) : (
        React.createElement('div', { className: 'glass-card', style: { padding: '40px', textAlign: 'center', gridColumn: '1 / -1' } },
          React.createElement('p', null, `No projects match your search "${searchQuery}".`)
        )
      )
    ),

    // Project Detail React Modal
    selectedProject && React.createElement('div', { 
      className: 'resume-modal-overlay show',
      onClick: () => setSelectedProject(null)
    },
      React.createElement('div', { 
        className: 'glass-card resume-modal-container',
        onClick: (e) => e.stopPropagation(),
        style: { maxWidth: '650px' }
      },
        React.createElement('button', { 
          className: 'resume-modal-close',
          onClick: () => setSelectedProject(null)
        }, React.createElement('i', { className: 'fas fa-xmark' })),

        React.createElement('h2', { style: { fontSize: '1.6rem', marginBottom: '12px' }, className: 'gradient-text-accent' }, selectedProject.projectname),
        React.createElement('p', { style: { color: 'var(--text-secondary)', marginBottom: '16px', lineHeight: '1.7' } }, selectedProject.projectinfo),

        React.createElement('h4', { style: { fontSize: '1rem', fontWeight: '700', marginBottom: '8px' } }, "Technologies & Libraries:"),
        React.createElement('div', { className: 'project-tech-tags', style: { marginBottom: '24px' } },
          selectedProject.tech.map((t, i) => React.createElement('span', { key: i, className: 'tech-tag' }, t))
        ),

        React.createElement('div', { style: { display: 'flex', gap: '16px' } },
          React.createElement('a', { 
            href: selectedProject.repo, 
            target: '_blank', 
            className: 'btn-liquid btn-liquid-primary',
            style: { flex: 1 }
          },
            React.createElement('i', { className: 'fab fa-github' }),
            " View Source Code"
          ),
          React.createElement('button', { 
            className: 'btn-liquid btn-liquid-secondary',
            onClick: () => setSelectedProject(null)
          }, "Close")
        )
      )
    )
  );
}

/* ==========================================================================
   3. REACT SKILLS GRID COMPONENT
   ========================================================================== */
function ReactSkills() {
  const [activeCategory, setActiveCategory] = useState('all');

  const skillsData = useMemo(() => [
    { name: "React.js", category: "frontend", icon: "fa-brands fa-react", color: "#61DAFB", bg: "#20232a", level: 90 },
    { name: "Node.js", category: "backend", icon: "fa-brands fa-node-js", color: "#339933", bg: "#ffffff", level: 88 },
    { name: "Express.js", category: "backend", icon: "fa-solid fa-server", color: "#4f46e5", bg: "#ffffff", level: 90 },
    { name: "MongoDB", category: "databases", icon: "fa-solid fa-database", color: "#13AA52", bg: "#ffffff", level: 85 },
    { name: "JavaScript (ES6+)", category: "languages", icon: "fa-brands fa-js", color: "#F7DF1E", bg: "#1e293b", level: 92 },
    { name: "Java & DSA", category: "languages", icon: "fa-brands fa-java", color: "#f89820", bg: "#ffffff", level: 85 },
    { name: "Python", category: "languages", icon: "fa-brands fa-python", color: "#3776AB", bg: "#ffffff", level: 75 },
    { name: "C Language", category: "languages", icon: "fa-solid fa-code", color: "#00599C", bg: "#ffffff", level: 78 },
    { name: "HTML5", category: "frontend", icon: "fa-brands fa-html5", color: "#E34F26", bg: "#ffffff", level: 95 },
    { name: "CSS3 & Glass", category: "frontend", icon: "fa-brands fa-css3-alt", color: "#1572B6", bg: "#ffffff", level: 92 },
    { name: "Bootstrap", category: "frontend", icon: "fa-brands fa-bootstrap", color: "#7952B3", bg: "#ffffff", level: 88 },
    { name: "MySQL / SQL", category: "databases", icon: "fa-solid fa-database", color: "#00758F", bg: "#ffffff", level: 82 },
    { name: "RESTful APIs", category: "backend", icon: "fa-solid fa-network-wired", color: "#06b6d4", bg: "#ffffff", level: 90 },
    { name: "Git & GitHub", category: "tools", icon: "fa-brands fa-git-alt", color: "#f05032", bg: "#ffffff", level: 90 },
    { name: "LeetCode 100+", category: "tools", icon: "fa-solid fa-brain", color: "#10b981", bg: "#ffffff", level: 85 }
  ], []);

  const filteredSkills = useMemo(() => {
    return activeCategory === 'all' 
      ? skillsData 
      : skillsData.filter(s => s.category === activeCategory);
  }, [skillsData, activeCategory]);

  return React.createElement('div', null,
    // Category Filter Buttons
    React.createElement('div', { className: 'skills-filter' },
      React.createElement('button', {
        className: `filter-btn ${activeCategory === 'all' ? 'active' : ''}`,
        onClick: () => setActiveCategory('all')
      }, 'All Skills'),
      React.createElement('button', {
        className: `filter-btn ${activeCategory === 'frontend' ? 'active' : ''}`,
        onClick: () => setActiveCategory('frontend')
      }, 'Frontend'),
      React.createElement('button', {
        className: `filter-btn ${activeCategory === 'backend' ? 'active' : ''}`,
        onClick: () => setActiveCategory('backend')
      }, 'Backend'),
      React.createElement('button', {
        className: `filter-btn ${activeCategory === 'languages' ? 'active' : ''}`,
        onClick: () => setActiveCategory('languages')
      }, 'Languages'),
      React.createElement('button', {
        className: `filter-btn ${activeCategory === 'databases' ? 'active' : ''}`,
        onClick: () => setActiveCategory('databases')
      }, 'Databases'),
      React.createElement('button', {
        className: `filter-btn ${activeCategory === 'tools' ? 'active' : ''}`,
        onClick: () => setActiveCategory('tools')
      }, 'Tools & Core CS')
    ),

    // Skills Grid
    React.createElement('div', { className: 'skills-grid' },
      filteredSkills.map((skill, idx) => 
        React.createElement('div', { 
          key: idx, 
          className: 'glass-card skill-card-modern tilt-card',
          style: { animation: 'fadeIn 0.3s ease forwards' }
        },
          React.createElement('div', { 
            className: 'skill-icon-wrap', 
            style: { color: skill.color, background: skill.bg } 
          },
            React.createElement('i', { className: skill.icon })
          ),
          React.createElement('span', { className: 'skill-title' }, skill.name),
          // Skill level progress bar
          React.createElement('div', { style: { width: '100%', height: '4px', background: 'rgba(0,0,0,0.06)', borderRadius: '2px', overflow: 'hidden', marginTop: '4px' } },
            React.createElement('div', { 
              style: { 
                width: `${skill.level}%`, 
                height: '100%', 
                background: skill.color, 
                borderRadius: '2px',
                transition: 'width 0.6s ease-in-out'
              } 
            })
          )
        )
      )
    )
  );
}

/* ==========================================================================
   MOUNT REACT COMPONENTS AUTOMATICALLY
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  // Mount React Hero
  const heroRoot = document.getElementById('react-hero-root');
  if (heroRoot && window.ReactDOM) {
    const root = ReactDOM.createRoot(heroRoot);
    root.render(React.createElement(ReactHero));
  }

  // Mount React Projects
  const projectsRoot = document.getElementById('react-projects-root');
  if (projectsRoot && window.ReactDOM) {
    const root = ReactDOM.createRoot(projectsRoot);
    const serverProjects = window.__SERVER_PROJECTS__ || null;
    root.render(React.createElement(ReactProjects, { initialProjects: serverProjects }));
  }

  // Mount React Skills
  const skillsRoot = document.getElementById('react-skills-root');
  if (skillsRoot && window.ReactDOM) {
    const root = ReactDOM.createRoot(skillsRoot);
    root.render(React.createElement(ReactSkills));
  }
});
