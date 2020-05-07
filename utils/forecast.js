const request=require('request');
const forecast=(latitude,longitude,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=d60b68a2e5f47bdfac73dfe04309392a&query='+encodeURIComponent(latitude)+','+encodeURIComponent(longitude)+'&units=f'
    
    request({url:url,json:true},(error,{body}={})=>{
      if(error){
        callback('unable to connect to location services!',undefined);
      }
      else if(body.error){
        callback('unable to find locattion try another search!',undefined);
      }
       else{
          callback(undefined,
            "It is currently "+body.current.temperature+" degrees out."+" It feels like "+body.current.feelslike+" degree out"
          );
       }
    })
}
module.exports=forecast;