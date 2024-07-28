const axios = require('axios');
const mongoose = require('mongoose'); // Import mongoose

   // Define the user schema inside the function
   const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    points: { type: Number, default: 0 } // Set default points to 0
});

// Create a model from the schema inside the function
const User = mongoose.model('User', userSchema, 'Users');
const courseSchema = new mongoose.Schema({
    Coursename: { type: String, required: true },
    Imagesrc: { type: String, required: true },
    Courseid: {type: Number,required:true }
});
const unitSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    Courseid: { type: Number, required: true },
    Title: { type: String, required: true },
    Description:{type: String,required:true},
    order:{type: Number,required:true}

});
const lessonSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    unitid: { type: Number, required: true },
    title: { type: String, required: true },
    order: { type: Number, required: true }
});


const questionSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    lessonid: { type: Number, required: true },
    question: { type: String, required: true },
    options: [[String]], // Array of arrays of strings
    correct_answer: { type: String, required: true },
    difficulty: { type: Number, required: true }
  });
  const Question = mongoose.model('Question', questionSchema, 'Questions');

// Create a model from the lesson schema
const Lesson = mongoose.model('Lesson', lessonSchema, 'Lessons');


// Create a model from the schema
const Unit = mongoose.model('Unit', unitSchema, 'units');

// Create a model from the schema
const Course = mongoose.model('Course', courseSchema, 'Courses');

async function handleSignUp(req, res) {
 
    
    const { name, email, password } = req.body;
    
    try {
        // Check if the email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log('hi');
           return  res.status(400).json({error: 'Email already in use.' });
        }

        // Create a new user instance
        const newUser = new User({ name, email, password });

        // Save the user to the database
        await newUser.save();

        // Send a response
        res.json({ success:true ,message: 'User created successfully!' });
    } catch (error) {
        console.error('Error saving user:', error.message);
        res.status(500).json({ error: 'An error occurred while signing up.' });
    }
}

async function handleLogin(req, res) {
    const { email, password } = req.body;

    try {
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Invalid email.'});
        }

        // Check if the provided password matches the stored password
        if (user.password !== password) {
            return res.status(401).json({ error: 'Invalid password.' });
        }

        // Send a response with user info
        res.json({
            success: true,
            user: {
                username: user.name,
                email: user.email,
                points: user.points
            }
        });
    } catch (error) {
        console.error('Error during login:', error.message);
        res.status(500).json({ error: 'An error occurred while logging in.' });
    }
}
async function handleCourses(req, res) {
    try {
        const courses = await Course.find();
        res.json({ success: true, courses:
            courses.map(course => ({
                name: course.Coursename,
                imagesrc: course.Imagesrc,
                courseId:course.Courseid,
            })) 
        });
    } catch (error) {
        console.error('Error retrieving courses:', error.message);
        res.status(500).json({ error: 'An error occurred while retrieving courses.' });
    }
}

async function handleUnits(req, res) {
    const { courseId } = req.params;

    console.log(req.params)

    try {
        const units = await Unit.find({ Courseid: parseInt(courseId, 10) });
        console.log(units);
        res.json({
            success: true,
            units: units.map(unit => ({
                id: unit.id,
                Courseid: unit.courseId,
                Title:  unit.Title,
                Description:unit.Description,
                order:unit.order
            }))
        });
    } catch (error) {
        console.error('Error retrieving units:', error.message);
        res.status(500).json({ error: 'An error occurred while retrieving units.' });
    }
}
async function handleLessons(req, res) {
    const { unitId } = req.params;
  
    try {
      const lessons = await Lesson.find({ unitid: parseInt(unitId, 10) });
      console.log(lessons)
      res.json({
        success: true,
        lessons: lessons.map(lesson => ({
          id: lesson.id,
          unitid: lesson.unitid,
          title: lesson.title,
          order: lesson.order
        }))
      });
    } catch (error) {
      console.error('Error retrieving lessons:', error.message);
      res.status(500).json({ error: 'An error occurred while retrieving lessons.' });
    }
  }
  
  async function handleQuestions(req, res) {
    const { lessonId } = req.params;
  
    try {
      const questions = await Question.find({ lessonid: parseInt(lessonId, 10) });
      res.json({
        success: true,
        questions: questions.map(question => ({
          id: question.id,
          lessonid: question.lessonid,
          question: question.question,
          options: question.options, // Options is already an array of arrays
          correct_answer: question.correct_answer,
          difficulty: question.difficulty
        }))
      });
    } catch (error) {
      console.error('Error retrieving questions:', error.message);
      res.status(500).json({ error: 'An error occurred while retrieving questions.' });
    }
  }
  
  module.exports = { handleSignUp, handleLogin, handleCourses, handleUnits, handleLessons, handleQuestions };