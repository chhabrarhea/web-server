//module for api requests
const request= require('request')
function getWeather(latitude,longitude,callback){
    const url1='http://api.weatherstack.com/current?access_key=04eba9a0e881a1d725d716fa7bee590e&query='+latitude+','+longitude+'&units=m'
    request({url:url1,json:true},(error,response)=>{
        if(error)
           callback('Unable to connect to the weather service!')
        else if(response.body.error)
           callback('Invalid input given!')
        else{
          callback(undefined, data={desc:response.body.current.weather_descriptions[0],temp:response.body.current.temperature})
          }
        })
}
module.exports=getWeather
