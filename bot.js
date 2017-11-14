console.log('Started follow bot succesfuly');

var Twit = require('twit');
var config = require('./config');
var T = new Twit(config);

//Setting up a user stream
var stream = T.stream('user');

//Anytime someone follows me
stream.on('follow', followed);
function followed(eventMsg) {
    console.log("Follow event!");
    var name = eventMsg.source.name;
    var screenName = eventMsg.source.screen_name;
    tweetIt('@' + screenName + ' Thank you for following me ');
}
//Replies automatically
stream.on('tweet', tweetEvent);

function tweetEvent(eventMsg) {
    console.log("Repiler event!");
    var fs = require('fs');
    var json = JSON.stringify(eventMsg, null, 2);
    fs.writeFile("tweet.json", json);

    var replyto = eventMsg.in_reply_to_screen_name;
    var text = eventMsg.text;
    var from = eventMsg.user.screen_name;
    console.log(replyto + '' + from);
    if (replyto === 'UshodayaNallola') {
        var newtweet = '@' + from + ' Thank you for tweeting me';
        tweetIt(newtweet);
    }
}


// var params = {
//     q: 'banana', count: 100
// }

// var tweet = {
//     status: '#coding is fun from node.js'
// }

// T.post('statuses/update', tweet, tweeted);
// function tweeted(err, data, response) {
//     if (err) {
//         console.log("Something went wrong!");
//     }
//     else {
//         console.log("It works!");
//     }
// };

//tweetIt();
// setInterval(tweetIt,1000*20)
function tweetIt(txt) {

    var tweet = {
        status: txt
    }
    //var r = Math.floor(Math.random() * 100);

    // var tweet = {
    //     status: '#Ushodayanallola creating twitter-bot application' + r + ' #test'
    // }

    T.post('statuses/update', tweet, tweeted);
    function tweeted(err, data, response) {
        if (err) {
            console.log("Something went wrong!");
        }
        else {
            console.log("It works!");
        }
        console.log(data)
    };


    // T.get('search/tweets', params, gotData);


    // function gotData(err, data, response) {
    //     var tweets = data.statuses;
    //     for (var i = 0; i < tweets.length; i++) {
    //         console.log(tweets[i].text);
    //     }

    // };
}