# RSS feed to AMP page - microservice on AWS Lambda using serverless framework & NodeJS 
> Assuming that you have already an aws Account. In order to use the framework [Serverless](https://serverless.com/) you need to set up an [AWS IAM](https://aws.amazon.com/iam/) user credentials for the configuration of the new Key and Secret which serverless will use to deploy the  service. the command is :
`serverless config credentials --provider aws --key EXAMPLEKEY --secret EXAMPLESECRET`

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/facebook/react/blob/master/LICENSE) [![NodeJS 3.7.1](https://img.shields.io/badge/NodeJS-8.1.0-blue.svg)](https://www.python.org/downloads/release/python-371/)

The service's aim is to fetch rss news feed from  **.XML** urls and transform them to an [AMP](https://www.ampproject.org/) page.
For this project you need to install [rss-parser](https://www.npmjs.com/package/rss-parser) the fetch the rss feed from url or from a local file plus many other features...


## Workflow



###### Clone the repository

- `git clone https://github.com/cygniv404/RSS-feed-TO-AMP-site-microservices-on-AWS-Lambda-using-serverless-framework-NodeJS.git feed-service`

###### Install dependencies
- `cd feed-service` then ` npm install`
**this will install rss-parser & serverless-offline (dev dependency) for the local developement server**

###### Deploy to aws
- `serverless deploy`

###### Local developement 
- `serverless offline start` then open `http://localhost:3000/`

###### Test
to test the service, replace *FEED_URL* with the rss url you want to fetch news from:
- `http://localhost:3000/?url=FEED_URL`
## Author
Ahmed Riahi – [@LinkedIn](https://www.linkedin.com/in/ahmed-riahi-24011b85/)
