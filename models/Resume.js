const mongoose = require('mongoose');

const headingSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  profession: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  pinCode: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
      message: 'Invalid email format',
    },
  }
});

const socialLinksSchema = mongoose.Schema({
  website: {
    type: String,
    validate: {
      validator: (value) => /^https?:\/\/\S+$/.test(value),
      message: 'Invalid URL format',
    },
  },
  portfolio: {
    type: String,
    validate: {
      validator: (value) => /^https?:\/\/\S+$/.test(value),
      message: 'Invalid URL format',
    },
  },
  profileLink: {
    type: String,
    validate: {
      validator: (value) => /^https?:\/\/\S+$/.test(value),
      message: 'Invalid URL format',
    },
  },
 
});

const summarySchema = mongoose.Schema({
  professionalSummary: {
    type: String,
   
  },
 
});

const skillsSchema = mongoose.Schema({
  skills: {
    type: [String],
    validate: {
      validator: (values) => values.every((value) => typeof value === 'string'),
      message: 'Skills must be an array of strings',
    },
  },
 
});

const educationSchema = mongoose.Schema({
  schoolName: {
    type: String,
    required: true,
  },
  schoolLocation: {
    type: String,
    required: true,
  },
  degree: {
    type: String,
    required: true,
  },
  fieldOfStudy: {
    type: String,
    required: true,
  },
  graduationStartDate: {
    type: Date,
    required: true,
  },
  graduationEndDate: {
    type: Date,
    default: null,
  },
  currentlyAttending: {
    type: Boolean,
    default: false,
  },
  
});

const workHistorySchema = mongoose.Schema({
  jobTitle: {
    type: String,
    required: true,
  },
  employer: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    default: null,
  },
  currentlyWorking: {
    type: Boolean,
    default: false,
  },
  
});

const certificationSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  provider: {
    type: String,
    required: true,
  },
  certificationId: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    default: null,
  },
 
});

const accomplishmentSchema = mongoose.Schema({
  accomplishmentName: {
    type: String,
    required: true,
  },
  issuer: {
    type: String,
    required: true,
  },
  issueDate: {
    type: Date,
    required: true,
  },
  
});

const projectSchema = mongoose.Schema({
  projectName: {
    type: String,
    required: true,
  },
  projectDescription: {
    type: String,
    required: true,
  },
  projectDuration: {
    type: String,
    required: true,
  },
  
});

const ResumeHeading = mongoose.model('ResumeHeading', headingSchema);
const SocialLinks = mongoose.model('SocialLinks', socialLinksSchema);
const Summary = mongoose.model('Summary', summarySchema);
const Skills = mongoose.model('Skills', skillsSchema);
const Education = mongoose.model('Education', educationSchema);
const WorkHistory = mongoose.model('WorkHistory', workHistorySchema);
const Certification = mongoose.model('Certification', certificationSchema);
const Accomplishment = mongoose.model('Accomplishment', accomplishmentSchema);
const Project = mongoose.model('Project', projectSchema);

const resumeSchema = mongoose.Schema({
  heading: headingSchema,
  socialLinks: socialLinksSchema,
  summary: summarySchema,
  skills: skillsSchema,
  education: [educationSchema], 
  workHistory: [workHistorySchema],
  certifications: [certificationSchema], 
  accomplishments: [accomplishmentSchema],
  projects: [projectSchema],
});

const Resume = mongoose.model('Resume', resumeSchema);
module.exports = Resume;