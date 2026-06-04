const express = require("express");
const app = express();
const port = 7061;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));   // ✅ add this

app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("home");
});


// project detail in form of arrays

let project = [
    
    {
        projectname: "Portfolio Website",
        projectinfo: "Personal responsive portfolio using HTML & CSS."
    },
    {
        projectname: "Todo App",
        projectinfo: " Simple task manager using JavaScript. "
    },
    {
        projectname: "DSA Practice",
        projectinfo: "Problem solving using Java."
    }
];

 


// send portfolio pages
app.get("/portfolio", (req, res) => {
    console.log("App is Requesting");
    res.render("home");
});

app.get("/about", (req, res) => {
    res.render("about");
});

app.get("/projects", (req, res) => {
    res.render("projects" ,{project});
});

app.get("/skills", (req, res) => {
    res.render("skills");
});
app.get("/contact",(req , res) =>{
    res.render("contact");
});

// add project 

app.get("/projects/add",(req, res) => {
    res.render("add.ejs");
});

// post project on porject page

app.post("/projects",(req, res) => {
    let { projectname, projectinfo } = req.body;

    project.push({
        projectname,
        projectinfo
    });

    res.redirect("/projects");
});

// start server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
