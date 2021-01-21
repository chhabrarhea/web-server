const path= require('path')
const express = require('express')
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

const app=express()

//__dirname returns path to current directory
//this command removes src from path and appends public to it.
const assetPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')
//setup static directory to use for stylesheets, js files and images
app.use(express.static(assetPath))


//handlebar allows us to display dynamic content
app.set('view engine','hbs')
//explicitly set path of viewPath, else name of folder can only be "views" and it must reside in the same dir
app.set('views',viewsPath)
//partials are common styling for all pages (e.g., header and footer)
hbs.registerPartials(partialsPath)


app.get('',(req,res)=>{
    res.render('index',{
        name:'Rhea Chhabra',
        title:'Weather'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{name:'Rhea',title:'About'})
})

app.get('/help',(req,res)=>{
    res.render('help',{message:'Seek help now!',title:'Help',name:'Rhea'})
})

app.get('/weather',(req,res)=>{
    if(!req.query.address)
    {
        return res.send({
            error:'Please pass an address in the URL'
        })
    }
    //Using object destructuring and shorthand
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error)
        return res.send({error})
        forecast(latitude,longitude,(error,weather)=>{
            if(error)
               return res.send({error})
            res.send({
               location,
               weather,
               address:req.query.address
            })
        })
    })
    
})

app.get('/help/*',(req,res)=>{
    res.render('404',{message:'Help article not found', title:'404',name:'Rhea Chhabra'})
})
app.get('*',(req,res)=>{
    res.render('404',{message:'Page not found!', title:'404',name:'Rhea Chhabra'})
})

// app.get('',(req,res)=>{
//     res.send([{
//         name:'Rhea',
//         age:'21'
//     },{
//         name:'Riya',
//         age:'19'
//     }])
// })

// app.get('/help',(req,res)=>{
//     res.send('<h1>Help Page!</h1>')
// })


app.listen(3000,()=>{
    console.log('Setting up server on localhost 3000')
})