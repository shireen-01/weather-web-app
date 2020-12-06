const path= require('path')
const express= require('express')
const app= express()
const hbs= require('hbs')

const port = process.env.PORT || 3000

require('dotenv').config()

const request=require('request')
const forecast=require('./utils/forecast')
const geocode=require('./utils/geocode')

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath=path.join(__dirname, '../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

// Setup handlebars(hbs) engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res) => {
    res.render('index',{
        helpText: 'This is some helpful text,',
        tittle:'Weather',
        name: 'Shireen Srivastava'
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        tittle:'About me',
        name: 'Shireen Srivastava'
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        helpText: 'This is some helpful text,',
        tittle:'Help',
        name: 'Shireen Srivastava'
    })
})


app.get('/weather', (req,res) =>{
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error,data = {}) => {
        if(error){
            return res.send({error})
        }
        forecast(data.latitude, data.longitude, (error,forecastData) => {
            if(error){
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location: data.location,
                address: req.query.address
            })
        
        })
    
    })
    
})

app.get('/product',(req, res)=>{
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search tree'
        })
    }
    res.send({
        products: []
    })
})

app.get('/help/*',(req,res)=>{
    res.render('error404',{
        name: 'Shireen Srivastava'
    })
})

app.get('*',(req,res)=>{
    res.render('error404',{
        name: 'Shireen Srivastava'
    })
})

app.listen(port, () =>{
    console.log('Server is up on port '+ port)
})