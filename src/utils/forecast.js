const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=5f7c250458247546ec1cd0a4f727ee7b&query=' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) + '&units=f';
    request({ url, json : true}, (error, { body }) =>{
        if(error){
            callback('Unable to connect to weather service!', undefined);
        } else if(body.error){
            callback('Unable to find location!', undefined);
        } else{
            callback(undefined, body.current.weather_descriptions[0] + '. It\'s currently ' + body.current.temperature + ' degree out. It feels like ' + 
                body.current.feelslike + ' degree out.');
        }                
    });
};



module.exports = forecast;