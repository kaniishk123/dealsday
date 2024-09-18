import mongoose from "mongoose";
const login_schema=new mongoose.Schema({
    sno:{
        type:Number,
        required:true,
    },
    userName:{
        type:String,
        required:true,
    },
    pwd:{
        type:String,
        required:true,
    },
});
const login_table=mongoose.model("login_table",login_schema);
const employee_schema= new mongoose.Schema({
    id:{
        type:Number,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    mobile:{
        type:String,
        required:true,
    },
    designation:{
        type:String,
        required:true,
    },
    gender:{
        type:String,
        required:true,
    },
    course:{
        type:String,
        required:true,
    },
    createdate:{
        type:Date,
        required:true,
    }

});
const employee_table= mongoose.model("employee_table",employee_schema);
export {employee_table,login_table};