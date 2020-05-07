const path=require('path');
const express= require('express');
const hbs=require('hbs');
const geocode=require('../utils/geocode');
const forecast=require('../utils/forecast');
const app=express();

//const expressLayouts=require('express-ejs-layouts')
//define paths for express config
const publicpath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates');

app.use(express.static(publicpath))
//app.use(expressLayouts);
//app.set('layout extractStyles',true);
//app.set('layout extractScripts',true);

//set up handlebars engine and views location
app.set('view engine','ejs');
app.set('views',viewsPath);
//hbs.registerPartials(partialsPath)



app.get('/',(req,res)=>{

    res.render('index',{
        title:'Weather app',
        name:'ayushi bhardwaj'
    })

})
app.get('/about',(req,res)=>{

    res.render('about',{
        title:'about',
        name:'ayushi bhardwaj'
    });

})
app.get('/help',(req,res)=>{

    res.render('help',
        {
            title:'help',
           message:"if you need help pls look this out!",
           name:"ayushi"
        });

})
app.get('/weather',(req,res)=>{

    //console.log(req.query.key);
    if(!req.query.address)
    {
        return res.send({
        })
    }

    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({
                error
            })
        }
            forecast(latitude,longitude,(error,forecastdata)=>{
                if(error){
                    return res.send({
                        error
                    })
                }
                res.send({
                    forecast:forecastdata,
                    location,
                    address:req.query.address
                })

            })
            

    })


    // res.send({
    //     forecast:'it is snowing',
    //     location:req.query.address
    // })
})

app.get('/help/*',(req,res)=>{
    res.render('4o4',
    {
        title:'Oops something went wrong',
       message:"Help artical not found",
       name:"ayushi"
    }
);
})

app.get('*',(req,res)=>{
    res.render('4o4',
    {
        title:'Oops something went wrong',
       message:"Page not found",
       name:"ayushi"
    }
);
})



app.listen(3000,()=>{
    console.log('hey server is up and running ')
})