const request=require('request')
const forecast=(latitude,longitude, callback)=>{
    const url='http://api.openweathermap.org/data/2.5/weather?lat='+(latitude)+'&lon='+(longitude)+'&appid='+ process.env.FORECAST_KEY +'&units=metric'
    request({url, json: true }, (error,response) =>{
    if (error)
    {
        callback('Unable to connect to weather services!',undefined)
    }
    else if(response.body.error)
    {
        callback('Unable to find location. Try another search',undefined)
    }
    else{
        callback(undefined, response.body.weather[0].description + '. It is currently ' + response.body.main.temp + ' degrees out.')
    }
    })

}

module.exports=forecast