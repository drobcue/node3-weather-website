const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode.js');
const forecast = require('./utils/forecast');


const app = express();

// Public Directory
const publicDirectoryPath = path.join(__dirname, '../public');
// Views Directory
const veiwsPath = path.join(__dirname, '../templates/views');
// Partials directory
const partialsPath = path.join(__dirname, '../templates/partials'); 

//Setup handlerbars engine and views location
app.set('view engine', 'hbs');
app.set('views', veiwsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req,res)=>{
    res.render('index',{
        title: 'Weather app',
        name: 'Derek Robles'
    });
});

app.get('/about', (req, res)=>{
    res.render('About',{
        title: 'About Me',
        name: 'Derek Robles'
    });
});

app.get('/help', (req, res)=>{
    res.render('help',{
        title: 'Help page',
        msg: 'This is a help message.',
        name: 'Derek Robles'
    });
});

app.get('/weather', (req, res)=>{
    if(!req.query.address)
        return res.send({
            error: " You must provide an address!"
        });
    geocode(req.query.address, (error, {latitude, longitude, location} = {})=>{
        if(error)
            return res.send({
                error
            });
        forecast(latitude, longitude,(error, foreData)=>{
            if(error)
                return res.send({
                    error
                });
            res.send({
                forecast: foreData,
                location,
                address: req.query.address
            });
        });        
    });
    
});

app.get('/products', (req, res)=>{
    if(!req.query.search){
        return res.send({
            error: "You mus provide a search term"
        });
    }    
    res.send({
    
        products:[]
    });
        
});

app.get('/help/*', (req, res)=>{
    res.render('404', {
        title: '404 Not Found',
        msg: 'Help article not found',
        name: 'Derek Robles'
    });
});

app.get('*', (req, res)=>{
    res.render('404', {
        title: '404 Not Found',
        msg: 'My 404 page',
        name: 'Derek Robles'
    });
});

app.listen(3000,()=>{
    console.log('Server is up in port 3000');
});