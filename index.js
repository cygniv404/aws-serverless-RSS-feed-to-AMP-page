'use strict';

const parseRSS = require('rss-parser');
let parser = new parseRSS();

// function to create the response whitch takes the html/amp and returns it with a response related.
var _Response = (statusCode, message) => {

  return {

    statusCode: statusCode,

    headers: {

      'Content-Type': 'text/html',
      //"Access-Control-Allow-Origin": "*"
    },

    body: message

  };

}

// function to get data and time when the xml is fethed.
var _getDate = () => {
  let _date = new Date()
  const _day = _date.getDate()
  const _month = _date.getMonth()
  const _year = _date.getFullYear()
  const _hour = _date.getHours()
  const _minutes = _date.getMinutes()
  const _seconds = _date.getSeconds()
  return 'Last Sync: ' + _day + '/' + _month + '/' + _year + ' @ ' + _hour + ':' + _minutes + ':' + _seconds
}

// function **getFeed** declaration for the event **Feed**
// declared in the serverless.yml
module.exports.getFeed = async (event, context, callback) => {
  // include this line to prevent any loop over empty callback response
  context.callbackWaitsForEmptyEventLoop = false;

  let dynamicHtml = '<p>Fetch RSS Feed Reader</p>';
  var fetched = false
  // check if the event parameter **url** is triggred
  if (event.queryStringParameters && event.queryStringParameters.url) {
    // parse RSS feed
    let feed = await parser.parseURL(event.queryStringParameters.url);
    dynamicHtml = `<h1>${feed.items.length} Feeds</h1>`;
    // single feed html division
    let feedHtml = ''
    feed.items.forEach(item => {
      feedHtml += `<div>
                            <p class="categorie">${typeof(item.categories)===! "string" ? item.categories:""} </p>
                            <p class="title">${item.title} </p>
                            <p class="content">${item.content} </p>
                            <a href="${item.link}" target="_blank">${item.link}</a>
                            <p class="meta">${item.pubDate}  </p>
         					       </div>`;

    });
    dynamicHtml += feedHtml;
    // the feed is fetched
    fetched = true;


  }
  // html of the AMP page to return
  let html = `  <!doctype html>
                <html amp>
                <head>
                <meta charset="utf-8" />
                <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
                <link rel="canonical" href="this">
                <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>

                <title>AMP page for News RSS FEED</title>
                  <style amp-custom>
                    h1 { color: black; }
                    p { font-size: medium;}
                    .title { font-size: large; color: steelblue;}
                    .categorie {color: #73757d;}
                    .content {color: black;}
                    .meta {color: gray;}

                    a {
                    	color:#145252;
                    	margin-bottom: 10px;
                    }
                    div {

                        background: #e5e5e5;
                      	font-size: 12px;
                        box-shadow: inset 0 -15px 30px#e5e5e5, 0 5px 10px #e5e5e5;
                        height: auto;
                        margin: 19px auto;
                        overflow:hidden;
                        border-radius: 4px;
                        padding: 3px;


                    }
                  </style>
                  <script async src="https://cdn.ampproject.org/v0.js"></script>
                  <script async custom-element="amp-social-share" src="https://cdn.ampproject.org/v0/amp-social-share-0.1.js"></script>
                  </head>
                  <body>
                  <p class="heading">
                  <amp-social-share type="twitter"
                    width="45"
                    height="33"></amp-social-share>
                  <amp-social-share type="linkedin" width="45"
                  height="33"></amp-social-share>
                  <amp-social-share type="gplus"
                    width="45"
                    height="33"></amp-social-share>
                  <amp-social-share type="email"
                    width="45"
                    height="33"></amp-social-share>
                  <amp-social-share type="pinterest"
                    width="45"
                    height="33"></amp-social-share>
                  </p>
                    <header>${_getDate()}</header>
                    ${dynamicHtml}


                  </body>
                </html>`;
  return _Response(200, html);

};
