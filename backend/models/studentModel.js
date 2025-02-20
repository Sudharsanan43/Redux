import mongoose from "mongoose";


const StudSchema= new mongoose.Schema({
    name:String,
    email:String,
    password:String,

});
 const studModel=mongoose.model("student",StudSchema);
 export default studModel;
