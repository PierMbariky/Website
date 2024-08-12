const express=require('express');
const mongoose=require('mongoose');
const dataHandler = require('./datahandler'); // Make sure this path is correct
const cors = require('cors');
const app=express();
const uri = "mongodb+srv://PierMbariky:Lolo1322567@playwise.at3wwbu.mongodb.net/PlayWise?retryWrites=true&w=majority&appName=PlayWise";
app.use(cors()); // Allow all origins
app.use(express.json());
async function connect(){
    try{
        await mongoose.connect(uri)
        console.log("connected successfully");
    }catch(error)
    {
        console.error(error);
    }
}

(async () => {
    try {
        connect();
} catch (error) {
  console.error('Error initializing MongoDB:', error.message);
}
app.post('/api/signUp', (req, res) => {
    dataHandler.handleSignUp(req, res);
  });
app.post('/api/login', (req, res) => {
    dataHandler.handleLogin(req, res);
  });
app.get('/api/courses', (req, res) => {
    dataHandler.handleCourses(req, res);
  });
app.get('/api/courses/:courseId/units', (req, res) => {

    dataHandler.handleUnits(req, res);
});
app.get('/api/units/:unitId/lessons', (req, res) => {
  dataHandler.handleLessons(req, res);
});
app.get('/api/lessons/:lessonId/questions', (req, res) => {
  dataHandler.handleQuestions(req, res);
});
app.get('/api/users/:email/units/:unitId/lessonsprogress', (req, res) => {
  console.log('hi');
  dataHandler.getLessonsProgress(req, res);
});
app.post('/api/lessons/:lessonId/complete', (req, res) => {
  dataHandler.updateCompletedLesson(req, res);
});


// Start the server
app.listen(3000, () => {
  console.log(`Server is running on port $8000`);
});
})();
