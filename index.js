import * as crypto from "crypto";

export default function getAuthorization(getConfig){

    try{
        let realm  = getConfig.realm_netsuite ;
        let url = getConfig.url ;
        let httpMethod = "POST";
        let tokenKey = getConfig.tokenid_netsuite;
        let tokenSecret = getConfig.tokensecret_netsuite;
        let consumerKey = getConfig.clientid_netsuite;
        let consumerSecret = getConfig.clientsecret_netsuite;
        let signatureMethod = 'HMAC-SHA256'; 
        let version  = '1.0'; 
        let timestamp = getTimeStamp();
        let nonce = getNonce(10);
        let {deploy, script} = getQueryParams(url);

        let baseString = "";
        baseString += 'deploy=' + deploy;
        baseString += '&oauth_consumer_key=' + consumerKey;
        baseString += '&oauth_nonce=' + nonce;
        baseString += '&oauth_signature_method=' + signatureMethod;
        baseString += '&oauth_timestamp=' + timestamp;
        baseString += '&oauth_token=' + tokenKey;
        baseString += '&oauth_version=' + version;
        baseString += '&script=' + script;

        baseString = httpMethod + "&" + encodeURIComponent(getBaseUrl(url)) + "&" + encodeURIComponent(baseString);

        let key = encodeURIComponent(consumerSecret) + '&' + encodeURIComponent(tokenSecret);

        let hmacSHA256Data = crypto.createHmac('sha256', key).update(baseString).digest('base64');
        let signature = encodeURIComponent(hmacSHA256Data);

        var headers = {};
        headers['Content-Type'] = 'application/json';
        headers['Authorization'] =  'OAuth realm="' + realm + '",oauth_consumer_key="' + consumerKey + '",oauth_token="' + tokenKey +
        '",oauth_signature_method="HMAC-SHA256",oauth_timestamp="' + timestamp + '",oauth_nonce="' + nonce +
        '",oauth_version="1.0",oauth_signature="' + signature + '"';

        return {code: 200, headers};
    }catch(err){
        console.error("_OAUTH_AUTHENTICATION", err);
        return { code: 500, message: "_ERROR_OAUTH_AUTHENTICATION" }
    }
}

function getNonce(nonce_length) {
    var word_characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var result = '';

    for(var i = 0; i < nonce_length; i++) {
        result += word_characters[Math.floor(Math.random() * word_characters.length)];
    }

    return result;
}

function getTimeStamp () {
    return Math.floor(Date.now()/1000);
}

function getQueryParams(url) {
    var paramObj = {};

    if (url.indexOf('?') === -1) {
        return paramObj;
    }

    // Trim any anchors
    url = url.split('#')[0];

    var queryString = url.split('?')[1];
    var params = queryString.split('&');
    for (var i in params) {
        var paramString = params[i];
        var keyValuePair = paramString.split('=');
        var key = keyValuePair[0];
        var value = keyValuePair[1];

        if (key in paramObj) {
            if (typeof paramObj[key] === 'string') {
                paramObj[key] = [paramObj[key]]
            }
            paramObj[key].push(value);
        } else {
            paramObj[key] = value;
        }
    }
    return paramObj;
}

function getBaseUrl (url) {
    return url.split('?')[0];
};