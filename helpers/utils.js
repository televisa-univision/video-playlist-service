const https = require('https');

/**
* Generic util functions
*/
module.exports = {

  request: function (reqData, isJson = true) {
    console.log(reqData);
    if (reqData && !reqData.url) {
      console.error('No URL was provided.');
      return;
    }
    
    if (reqData && !reqData.type) {
      console.error('No type was provided.');
      return;
    }
    
    //const data = reqData && reqData.data ? reqData.data : null;
    
    const options = {
        method: reqData.type,
        timeout: 5000
    };
    
    // define the promise
    return new Promise((resolve, reject) => {
    	https.get(reqData.url, options, (response) => {
    	  let chunks_of_data = [];

  			response.on('data', (fragments) => {
  				chunks_of_data.push(fragments);
  			});
  
  			response.on('end', () => {
  				let response_body = Buffer.concat(chunks_of_data);
  				resolve(response_body.toString());
  			});
  
  			response.on('error', (error) => {
  				reject(error);
  			});
    		
    		response.on('timeout', () => {
          response.abort();
        });
    	});
    });
  },
  
  serialize: function (obj) {
    const str = [];
    for (const p in obj)
      if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      }
    return str.join("&");
  }
};
