const mongoose = require('mongoose');
 const db="mongodb://localhost:8080";
   
 mongoose.connect(db,{
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
    
 }).then(()=>{ console.log('Connection established')})
