const request=require('request')
function geocoding(address, callback)
{
    const url2='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiY2hoYWJyYS1yaGVhIiwiYSI6ImNrazE2bWlkcDBvNmUydXBjZTF1ODd1M2sifQ.Kl1QJ0K2B5vnRsbq_Xkb0w&limit=1'
    request({url:url2,json:true},(error,response)=>{
        if(error)
          callback('Unable to connect to geocoding service!')
        else if(response.body.features.length===0)
            callback('Unable to find. Try another search!')
            else{
                data={
            latitude:response.body.features[0].center[1],
            longitude:response.body.features[0].center[0],
            location:response.body.features[0].place_name
        }
           callback(undefined,data)}
    })
}

module.exports=geocoding