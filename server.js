import express from 'express'
import {dirname} from "path"
import {fileURLToPath} from "url"
import mongoose from 'mongoose'
import { User } from './js/user.js'



const mongodb = mongoose.connect("mongodb://localhost:27017/blog")
const app = express()
const port = 3000

app.use(express.static('public'))
app.use(express.json())
app.set('view engine','ejs')
app.use(express.urlencoded({ extended: true }));
const __filename = fileURLToPath(import.meta.url); // Get the current file's URL
const __dirname = dirname(__filename); 

app.get('/',(req,res)=>{
    
    console.log("this is get")
})

app.post('/home',async(req,res)=>{
    console.log("This is from the login ")
    // console.log(req.body)

    try {

        const result  =await User.findOne({$and :[{emailId : req.body.username},{password : req.body.password}]})
        console.log(result.fullname)
        if(result){
            console.log("This user is valid and registered")
            res.render('about',{fullname : result.fullname,about : result.about,})
        }else{
            console.log('This is not valid and registered user')
            res.render('relogin')
        }

    } catch (error) {
        console.log(error)
        console.log("Some Error Occur in post /home")
    }
    // res.sendFile('home-page.html',{root: './public'})

})

app.post('/app',async(req,res)=>{
    console.log("Post invoke")
    console.log(req.body)
    try {
        if(req.body.password === req.body.confirmpassword){
            console.log("Password Matched")
        }else{
            console("Mismatched Password")
        }        
    } catch (error) {
        console.log("Something Wrong Bro")
    }
    const user = new User({fullname : req.body.fullname, uniqueId : req.body.uniqueid , emailId : req.body.email,
                           password :  req.body.password ,  about : req.body.about })
    let checkRes = await User.findOne({$or:[{fullname:req.body.fullname},{uniqueId:req.body.uniqueid}]})
    console.log(checkRes)
    if(checkRes == null){
        user.save()
        console.log("User is Added => ",user)
    }else{
        console.log("This is already in the database")
    }
                           
    // res.send(req.body.fullname)

    res.redirect('/')
})

app.listen(port,()=>{
    console.log(` Successfully Connected with ${port} port`)
})