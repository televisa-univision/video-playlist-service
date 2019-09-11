var Utils = require('./helpers/utils.js');

// API handler
exports.handler = async function (event, context, callback) {
    
    if (!event.queryStringParameters.playlistId) {
        console.error('Name parameter missing');
    }
    if (!event.queryStringParameters.mediaId) {
        console.error('Name parameter missing');
    }
    
    // creaete variables using get parameters
    const playListId = event.queryStringParameters.playlistId;
    const mediaId = event.queryStringParameters.mediaId;

    let limit;
    if (event.queryStringParameters && event.queryStringParameters.limit) {
        limit = event.queryStringParameters.limit;
    }

    let isDynamicPlaylist;
    if (event.queryStringParameters && event.queryStringParameters.isDynamicPlaylist) {
        isDynamicPlaylist = event.queryStringParameters.isDynamicPlaylist;
    }

    const endpoint = 'https://cdn.jwplayer.com/v2/playlists/' + playListId;

    let params = {
      page_limit: limit || '30'
    };

    if (isDynamicPlaylist) {
      params.related_media_id = mediaId;
    }

    const request = {
      type: 'GET',
      url: `${endpoint}?${Utils.serialize(params)}`,
    };

    // request call
    try {
		const apiResponse = await Utils.request(request);

		const response = {
          "statusCode": 200,
          "body": apiResponse
      };
      
      callback(null, response);
	}
	catch(error) {
		// Promise rejected
		const response = {
        "statusCode": 500,
        "body": JSON.stringify(error)
    };
    
    callback(Error, response);
	}
};
