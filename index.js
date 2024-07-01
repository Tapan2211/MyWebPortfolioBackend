const express = require('express');
const mongoose = require('mongoose');
const connectionDB = require('./config/database');
const cors = require('cors');
const app = express();

connectionDB();
// Add routes
const projects = require('./routes/projects.route');
const education = require('./routes/education.route');
const experience = require('./routes/experience.route');
const information = require('./routes/information.route');
const skills = require('./routes/skill.route');

// Serve static files from the "uploads" directory
app.use('/uploads', express.static('uploads'));

// Enable CORS
app.use(cors());
app.options("*", cors());

const PORT = 8082;

// const DB_URI = 'mongodb://localhost:27017/test';
// mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log('Connected to DB:', DB_URI))
//     .catch((err) => console.log('Failed to connect to DB:', err));

app.use(express.json());
app.use('/projects', projects);
app.use('/education', education);
app.use('/experience', experience);
app.use('/information', information);
app.use('/skill', skills);

app.listen(PORT, (error) => {
    if (!error) {
        console.log(`Server is running on port: ${PORT}`);
    } else {
        console.log(`Error occurred, server can't start ${error}`);
    }
});
