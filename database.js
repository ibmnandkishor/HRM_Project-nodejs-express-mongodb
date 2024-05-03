

mongoose=require('mongoose')

mongoose.connect("mongodb://127.0.0.1/hrm").then(()=>{
    console.log('connected successfully')
}).catch((error)=>{console.log(error)})


schema=mongoose.Schema({
    name:String,
    mail:String,
    phone:String,
    address:String,
    department:String,
    salary:Number,
    date:Date,
    gender:String

})
console.log('schema created')

employeeModel=mongoose.model('employee',schema)
module.exports=employeeModel


