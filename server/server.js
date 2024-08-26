
const express=require('express');
const mongoose=require('mongoose');
const dataHandler = require('./datahandler'); // Make sure this path is correct
const cors = require('cors');
const app=express();
const uri = "mongodb+srv://PierMbariky:Lolo1322567@playwise.at3wwbu.mongodb.net/PlayWise?retryWrites=true&w=majority&appName=PlayWise";
app.use(cors()); // Allow all origins
app.use(express.json());
// Function to connect to MongoDB
async function connect(){
    try{
        await mongoose.connect(uri)
        console.log("connected successfully");
    }catch(error)
    {
        console.error(error);
    }
}
// Immediately-Invoked Function Expression (IIFE) to handle asynchronous operations
(async () => {
    try {
        connect();
} catch (error) {
  console.error('Error initializing MongoDB:', error.message);
}
  // API Routes

app.post('/api/signUp', (req, res) => {
    dataHandler.handleSignUp(req, res);// Handle user signup
  });
app.post('/api/login', (req, res) => {
    dataHandler.handleLogin(req, res);// Handle user login
  });
app.get('/api/courses', (req, res) => {
    dataHandler.handleCourses(req, res);// Fetch all courses
  });
app.get('/api/courses/:courseId/units', (req, res) => {

    dataHandler.handleUnits(req, res);// Fetch units for a specific course
});
app.get('/api/units/:unitId/lessons', (req, res) => {// Fetch lessons for a specific unit
  dataHandler.handleLessons(req, res);
});
app.get('/api/lessons/:lessonId/questions', (req, res) => {
  dataHandler.handleQuestions(req, res);// Fetch questions for a specific lesson
});
app.get('/api/users/:email/units/:unitId/lessonsprogress', (req, res) => {
  dataHandler.getLessonsProgress(req, res);// Get lesson progress for a user
});
app.post('/api/lessons/:lessonId/complete', (req, res) => {
  dataHandler.updateCompletedLesson(req, res);// Update lesson completion status
});
app.post('/api/contact', async (req, res) => {// Handle contact form submission
  dataHandler.handleContact(req,res);
});


// Start the server
app.listen(3000, () => {
  console.log(`Server is running on port $3000`);
});
})();
