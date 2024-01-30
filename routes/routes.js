const express = require('express');
const router=express.Router();
const auth=require('../middleware/auth');
const Resume= require("./models/Resume");
const { check, validationResult } = require('express-validator');
router.get('/', (req, res)=>{
   console.log("connected successfully")
});
router.post("/register",auth, async (req, res) => {
   const {
       heading,
       socialLinks,
       summary,
       skills,
       education,
       workHistory,
       certifications,
       accomplishments,
       projects
   } = req.body;

   // Validate required fields
   if (!heading || !socialLinks || !summary || !skills || !education || !workHistory || !certifications || !accomplishments || !projects) {
       return res.status(400).json({ error: 'All fields are required.' });
   }

   try {
       // Check if a user with the given heading.email already exists
       const preUser = await Resume.findOne({ 'heading.email': heading.email });

       if (preUser) {
           return res.status(400).json({ error: 'Email already exists.' });
       }

       // Create a new resume instance
       const newResume = new Resume({
           heading,
           socialLinks,
           summary,
           skills,
           education,
           workHistory,
           certifications,
           accomplishments,
           projects
       });

       // Save the new resume to the database
       await newResume.save();

       // Respond with the created resume
       res.status(201).json(newResume);
       console.log(newResume);
   } catch (error) {
       console.error(error);
       res.status(500).json({ error: 'Internal Server Error' });
   }
});

router.get("/getResume",auth, async (req, res) => {
   const userEmail = req.user.email; // Assuming you have the user's email from the login process
 
   try {
     // Find the resume based on the user's email
     const resume = await Resume.findOne({ 'heading.email': userEmail });
 
     if (!resume) {
       return res.status(404).json({ error: 'Resume not found for the user' });
     }
 
     // Return the resume data
     res.status(200).json(resume);
 
   } catch (error) {
     console.error(error);
     res.status(500).json({ error: 'Internal Server Error' });
   }
 });
 router.post("/create-pdf",auth, (req, res) => {
   // Generate PDF using pdfTemplate and options
   pdf.create(pdfTemplate(req.body), options).toFile('Resume.pdf', (err) => {
      if (err) {
        // If an error occurs during PDF generation
        console.log(err);
        res.status(500).json({ success: false, error: 'PDF generation failed' });
      } else {
        // If PDF generation is successful
        res.status(200).json({ success: true });
      }
    });
 });
 router.get("/fetch-pdf",auth, (req, res) => {
   // Specify the path to the generated PDF file
   const file = `${__dirname}/Resume.pdf`;
 
   // Use res.download to send the file as an attachment
   res.download(file);
 });

module.exports = router;
