const express = require('express');
const router=express.Router();
const auth=require('../middleware/auth');
const Resume= require('../models/Resume');
const { check, validationResult } = require('express-validator');
router.get('/', (req, res)=>{
   console.log("connected successfully")
});


router.post("/save",auth,async (req, res) => {
  console.log(req.body);
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

   if (!heading || !socialLinks || !summary || !skills || !education || !workHistory || !certifications || !accomplishments || !projects) {
       return res.status(400).json({ error: 'All fields are required.' });
   }

   try {
       
       const preUser = await Resume.findOne({ 'heading.email': heading.email });

       if (preUser) {
           return res.status(400).json({ error: 'Email already exists.' });
       }

    
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

    
       await newResume.save();

      
       res.status(201).json(newResume);
       console.log(newResume);
   } catch (error) {
       console.error(error);
       res.status(500).json({ error: 'Internal Server Error' });
   }
});




router.get("/",auth, async (req, res) => {
   const userEmail = req.user.email;
 
   try {
   
     const resume = await Resume.findOne({ 'heading.email': userEmail });
 
     if (!resume) {
       return res.status(404).json({ error: 'Resume not found for the user' });
     }
 
    
     res.status(200).json(resume);
 
   } catch (error) {
     console.error(error);
     res.status(500).json({ error: 'Internal Server Error' });
   }
 });



 router.get('/:resumeId', auth, async (req, res) => {
  const resumeId = req.params.resumeId;

  try {
      const resume = await Resume.findById(resumeId);

      if (!resume) {
          return res.status(404).json({ error: 'Resume not found' });
      }

      res.status(200).json(resume);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});



// Update a specific resume by ID
router.put('/update/:resumeId', auth, async (req, res) => {
  const resumeId = req.params.resumeId;

  try {
      const existingResume = await Resume.findById(resumeId);

      if (!existingResume) {
          return res.status(404).json({ error: 'Resume not found' });
      }

      // Update the resume fields based on the request body
      existingResume.heading = req.body.heading;
      existingResume.socialLinks = req.body.socialLinks;
      existingResume.summary = req.body.summary;
      // ... update other fields similarly

      // Save the updated resume
      await existingResume.save();

      res.status(200).json(existingResume);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Delete a specific resume by ID
router.delete('/delete/:resumeId', auth, async (req, res) => {
  const resumeId = req.params.resumeId;

  try {
      const deletedResume = await Resume.findByIdAndDelete(resumeId);

      if (!deletedResume) {
          return res.status(404).json({ error: 'Resume not found' });
      }

      res.status(200).json({ message: 'Resume deleted successfully' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});




 router.post("/create-pdf",auth, (req, res) => {
   
   pdf.create(pdfTemplate(req.body), options).toFile('Resume.pdf', (err) => {
      if (err) {
     
        console.log(err);
        res.status(500).json({ success: false, error: 'PDF generation failed' });
      } else {
     
        res.status(200).json({ success: true });
      }
    });
 });



 router.get("/fetch-pdf",auth, (req, res) => {
   
   const file = `${__dirname}/Resume.pdf`;
 
   
   res.download(file);
 });

module.exports = router;
