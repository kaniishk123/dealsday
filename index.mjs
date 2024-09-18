import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import { login_table,employee_table } from './tablemodels.mjs';
const app=express();
let count=1;
app.use(bodyParser.json());
app.use(cors());
const port=8000;
mongoose.connect('mongodb://localhost:27017/dealsday').then(()=>console.log("db connected")).catch(error=>console.error("error db"));
app.listen(port,()=>{
    console.log(`listening on port number ${port}`);
});
app.post('/login',async(req,res)=>{
    try{
        const {username,pwd}=req.body;
        const z=await login_table.findOne({username:username, pwd:pwd});
        if(z){
            res.status(201).json(z);
        }
        else{
            res.status(400).send('failure');
        }
    }catch(error){
        console.error("error sending details to front-end");
    }
    

});
app.post("/create-employee", async (req, res) => {
    const { full_name, email, mobile, designation, gender, course, im } = req.body;
    try {
      const existingEmployee = await employee_table.findOne({ email });
      if (existingEmployee) {
        return res.status(208).send("Employee with this email already exists.");
      }
      else{
      const max_id = await employee_table.findOne().sort({id:-1}).limit(1);
      let employeeId;
      try{
        if(max_id){
          employeeId=max_id.id+1;
        }else{
          employeeId=1;
        }
      }catch(error){
        console.error("ee query ey pedda tappu");
      }
      console.log(employeeId);
      const newEmployee = new employee_table({
        id: employeeId,
        image:im,
        name: full_name,
        email,
        mobile,
        designation,
        gender,
        course,
        createdate: new Date().toISOString(), 
      });
  
      try {
        await newEmployee.save();
        console.log("Employee created successfully:", newEmployee);
        res.status(201).send("Employee created successfully.");
      } catch (error) {
        console.error("Error creating employee:", error);
        res.status(500).send("Internal server error.");
      }
    }
    } catch (error) {
      console.error("Unexpected error:", error);
      res.status(500).send("Internal server error.");
    }
  }
  );
  app.get("/view-employees",async(req,res)=>{
    try{
        const k=await employee_table.find();
        if(k){
            res.status(201).json(k);
        }
    }catch(error){
        console.error("could not fetch the details");
    }
  });
app.delete('/delete-employee/:id',async(req,res)=>{
  const{id}=req.params
  try{
    const k=await employee_table.deleteOne({id:id});
    if(k){
      res.status(201).send("successful");
    }

  }catch(error){
    console.error("error in deleting the value")
  }
});
app.get("/update-employee/:id",async(req,res)=>{
  const {id}=req.params
  try{
    const z=await employee_table.find({id});
    if(z){
      res.json(z);
    }
  }catch(error){
    console.log(error);

  }
})

  