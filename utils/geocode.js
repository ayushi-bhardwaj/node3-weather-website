const request=require('request');

const geocode=(address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiYXl1LTEyMyIsImEiOiJjazlwa3d1d2UwYms5M29yMTV4Nzd5cTdrIn0.ERFsfGgzcPWJDrcySPiHbQ'
      request({url:url,json:true},(error,{body}={})=>{
          if(error){
            callback('unable to connect to location services!',undefined);
          }
          else if(body.features.length==0){
            callback('unable to find location try another search!',undefined)
          }
           else{

              callback(undefined,{
                latitude:body.features[2].center[0],
                longitude:body.features[2].center[1],
                location:body.features[2].place_name
              })
           }
      })
}

module.exports=geocode;