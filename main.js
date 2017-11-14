var redis = require('redis');
var Twit = require('twit');

var T = new Twit({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token: process.env.TWITTER_ACCESS_TOKEN,
    access_token_secret: process.env.TWITTER_ACCESS_SECRET
});
var stream = T.stream('statuses/filter', { track: 'fun' });

stream.on('tweet', function (tweet) {
    console.log(tweet.text);
});

stream.on('limit', function (limitMessage) {
    console.log(limitMessage);
});

stream.on('disconnect', function (disconnectMessage) {
    console.log(disconnectMessage);
});

stream.on('reconnect', function (request, response, connectInterval) {
    console.log('Reconnecting in ' + connectInterval + 'ms...');
})

stream.on('error', function(error) {
    console.log(error);
});

var url = require('url');
var redisURL = url.parse(process.env.REDISCLOUD_URL || 'redis://127.0.0.1:6379');
var client = redis.createClient(redisURL.port, redisURL.hostname, {no_ready_check: true});
if (process.env.REDISCLOUD_URL) {
    client.auth(redisURL.auth.split(":")[1]);
}