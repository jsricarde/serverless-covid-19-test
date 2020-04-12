# Serverless Covid-19 Test
[![Build Status](https://api.travis-ci.org/jsricarde/serverless-covid-19-test.svg?branch=master)](https://travis-ci.org/jsricarde/dillinger)

This app consist in a todo list app to manage the covid-19 test per user.
I used a cloud-severless infrastructure with serverless framework (backend builded in Node.js}, client builded in React with a user role to schedule a test and admin role to manage the test results.

## Functionality of the application
You can login as a normal user to schedule a test or login as a admin to upload a result for a test and edit the test date.

## Setup an AWS account
First you need to create an free trial account in [AWS].

After that you need to configure [AWS-CLI]:

```
pip3 install awscli
```

And configure the SSH from your AWS account:

```
aws configure
AWS Access Key ID [None]: AKIAIOSFODNN7EXAMPLE
AWS Secret Access Key [None]: wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
Default region name [None]: us-east-1
Default output format [None]: json
```

## Install Serverless Framework
```
npm install -g serverless
```
Configure serverless to use the AWS credentials you just set up:
```
sls config credentials --provider aws --key YOUR_ACCESS_KEY --secret YOUR_SECRET_KEY --profile serverless
```

## Setup client side (Auth0 info and AWS ApiId)
You need to add your auth0 config data and your apiId from AWS in the client [config.ts]:
```
// TODO: Once your application is deployed, copy an API id here so that the frontend could interact with it
const apiId = 'Add you ApiId from AWS'
export const apiEndpoint = `https://${apiId}.execute-api.us-east-1.amazonaws.com/dev`

export const authConfig = {
  // TODO: Create an Auth0 application and copy values from it into this map
  domain: '',            // Auth0 domain
  clientId: '',          // Auth0 client id
  callbackUrl: 'http://localhost:3000/callback'
}
```
## Setup backend side (Auth0 endpoint and change the AWS bucket name)
You need to add your auth0 enpoint in the backend side [auth0Authorizer.ts]:
```
const jwksUrl = 'Your Auth0 endpoint'
```
And setup a new new unique name for the bucket to use in the [serverless.yml] file:
```
S3_BUCKET: your-unique-name-${self:provider.stage}
```

## How to run the application

### Backend
To deploy an application run the following commands:

```
cd backend
npm install
sls deploy -v
```

### Frontend
To run a client application first edit the `client/src/config.ts` file to set correct parameters. And then run the following commands:

```
cd client
npm install
npm run start
```
This should start a development server with the React application that will interact with the serverless application.

See the client running locally
```sh
http://localhost:3000
```

### Postman Collection
You can import this [postman collection] to view the endpoints used in the app
Note: You need to cofigure some application variable in the [postman collection]:
![Alt text](screenshots/postman-variables.PNG?raw=true "Setup variables")

### Evidences of the stack running in AWS
You can see a series of [screenshots] of the stack running in my AWS account


[AWS]: <https://aws.amazon.com/>
[config.ts]: <https://github.com/jsricarde/serverless-covid-19-test/blob/master/client/src/config.ts>
[auth0Authorizer.ts]: <https://github.com/jsricarde/serverless-covid-19-test/blob/master/backend/src/lambda/auth/auth0Authorizer.ts>

[serverless.yml]: <https://github.com/jsricarde/serverless-covid-19-test/blob/master/backend/serverless.yml>

[screenshots]: <https://github.com/jsricarde/serverless-covid-19-test/blob/master/screenshots>

[postman collection]: <https://github.com/jsricarde/serverless-covid-19-test/blob/master/backend/covid-test.postman_collection.json>

[AWS-CLI]: <https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html>

[covid-client-app]: <https://github.com/jeffrysteven/covid-ios>

[java]: <https://www.java.com/es/download/>