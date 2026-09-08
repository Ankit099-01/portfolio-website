const express = require("express");
const app = express();
const port = 7061;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

// MERN Stack Projects from Resume with Enhanced Project Badges & Metadata
let project = [
  {
    projectname: "Government Services Platform (GOV DESK)",
    projectinfo: "Full-stack government services portal using the MERN stack (MongoDB, Express.js, React.js, Node.js). Integrated Google Maps API for location-based office search, service categorization, and RESTful APIs for efficient data management.",
    category: "MERN Stack",
    tech: ["React.js", "Node.js", "Express.js", "MongoDB", "Google Maps API", "REST APIs"],
    repo: "https://github.com/Ankit099-01",
    link: "#",
    image: "/images/p-image1.jpeg",
    iconClass: "fas fa-landmark",
    accentColor: "linear-gradient(135deg, #6366f1, #3b82f6)"
  },
  {
    projectname: "AI-Hiring Platform",
    projectinfo: "AI-powered candidate screening and recruitment platform built with React.js, Node.js, Express.js, and MongoDB. Features OpenAI API integration for candidate evaluation, WebRTC live video interviews, Socket.io, and recruiter dashboard.",
    category: "Full Stack AI",
    tech: ["React.js", "Node.js", "Express.js", "MongoDB", "OpenAI API", "WebRTC", "Socket.io"],
    repo: "https://github.com/Ankit099-01",
    link: "#",
    image: "/images/image.jpeg",
    iconClass: "fas fa-robot",
    accentColor: "linear-gradient(135deg, #06b6d4, #3b82f6)"
  },
  {
    projectname: "Portfolio Website",
    projectinfo: "Ultra-modern responsive personal portfolio website engineered with Node.js, Express.js, EJS, and custom ambient liquid canvas animations showcasing full-stack projects, skills, and resume details.",
    category: "MERN Stack",
    tech: ["Node.js", "Express.js", "MongoDB", "EJS", "CSS Glassmorphism", "HTML5 Canvas"],
    repo: "https://github.com/Ankit099-01/Portfolio-website",
    link: "http://localhost:7061",
    image: "/images/profile_photo.jpeg",
    iconClass: "fas fa-layer-group",
    accentColor: "linear-gradient(135deg, #ec4899, #8b5cf6)"
  }
];

// Routes
app.get("/", (req, res) => {
  res.render("home", { project });
});

app.get("/portfolio", (req, res) => {
  res.render("home", { project });
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/projects", (req, res) => {
  res.render("projects", { project });
});

app.get("/skills", (req, res) => {
  res.render("skills");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.get("/resume", (req, res) => {
  res.render("resume");
});

// Add project route
app.get("/projects/add", (req, res) => {
  res.render("add");
});

// Post new project
app.post("/projects", (req, res) => {
  let { projectname, projectinfo, category, tech, repo, link } = req.body;

  let parsedTech = [];
  if (tech) {
    if (typeof tech === 'string') {
      parsedTech = tech.split(',').map(t => t.trim()).filter(Boolean);
    } else if (Array.isArray(tech)) {
      parsedTech = tech;
    }
  } else {
    parsedTech = ["MERN Stack", "React.js", "Node.js"];
  }

  project.unshift({
    projectname: projectname || "Untitled MERN Project",
    projectinfo: projectinfo || "No description provided.",
    category: category || "MERN Stack",
    tech: parsedTech,
    repo: repo || "https://github.com/Ankit099-01",
    link: link || "#",
    image: "/images/p-image1.jpeg",
    iconClass: "fas fa-code",
    accentColor: "linear-gradient(135deg, #6366f1, #06b6d4)"
  });

  res.redirect("/projects");
});

// Start server
app.listen(port, () => {
  console.log(`🚀 MERN Portfolio server running on http://localhost:7061`);
});
