const mongoose=require('mongoose');
const {Schema}=require('mongoose');
const exSchema= new Schema({
    username:{type:String,required:true},
    content:{type:String,required:true},
    date:{type:Date,required:true},},
    {timestamps:true,
})
const Ex=mongoose.model('Ex',exSchema)
module.exports=Ex;