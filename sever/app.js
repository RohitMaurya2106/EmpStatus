const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
require('./Employee')

app.use(bodyParser.json())

const Employee = mongoose.model("employee")
const mongouri = "mongodb+srv://rohit:<password>@cluster0-qq6yu.mongodb.net/test?retryWrites=true&w=majority"
mongoose.connect(mongouri,{
    useNewUrlParser:true,
    useUnifiedTopology: true
})

mongoose.connection.on("connected",()=>{
    console.log("Connected to mongo")
})
mongoose.connection.on("error",(err)=>{
    console.log(" error ",err)
})
app.get('/',(req,res)=>{
    Employee.find({}).then(data=>{
        res.send(data)
    }).catch(err=>{
        console.log(err)
    })
})

app.post('/send-data',(req,res)=>{
    const employee = new Employee({
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        picture:req.body.picture,
        position:req.body.position,
        salary:req.body.salary
    })
    employee.save()
    .then(data=>{
        console.log(data)
        res.send(data)
    }).catch(err=>{
        console.log(err)
    })
    
})

app.post('/delete',(req,res)=>{
    Employee.findByIdAndRemove(req.body.id)
    .then(data=>{
        console.log(data)
        res.send(data)
    })
    .catch(err=>{
        console.log(err)
    })
})

app.post('/update',(req,res)=>{
    Employee.findByIdAndUpdate(req.body.id,{
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        picture:req.body.picture,
        position:req.body.position,
        salary:req.body.salary
    }).then(data=>{
        console.log(data)
        res.send(data)
    }).catch(err=>{
        console.log(err)
    })
})

app.listen(3000,()=>{
    console.log("server running")
})












// {
//     "name":"Mukesh",
//     "email":"abc@gmail.com",
//     "phone":"123",
//     "picture":"req.body.picture",
//     "position":"web dev",
//     "salary":"10 LPA"
// }
