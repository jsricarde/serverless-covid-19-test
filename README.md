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
## Testing with my Auth0 and AWS setup(Udacity Reviewers)
 You only need to import the [postman collection] I already have some users and test created:
 **Important:** Each userId has a testId. The current variables setted in the postman collection are associated with Auth0 [my token] there are the first in the table.


testId: `4ba700d6-ca07-42d5-987d-3719c3ac4663`  userId: `google-oauth2|111841458144185665545`  **setted in postman**

testId: `46c79150-592e-4bf5-9c7f-192b33e3c448`  userId: `auth0|5e92d27954c3220c6976a364`

And I provided an [covid-test] file for the upload feature.

### Postman Collection
You can import this [postman collection] to view the endpoints used in the app.


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

### Evidences of the stack running in AWS
You can see a series of [screenshots] of the stack running in my AWS account


[AWS]: <https://aws.amazon.com/>
[config.ts]: <https://github.com/jsricarde/serverless-covid-19-test/blob/master/client/src/config.ts>
[auth0Authorizer.ts]: <https://github.com/jsricarde/serverless-covid-19-test/blob/master/backend/src/lambda/auth/auth0Authorizer.ts>

[serverless.yml]: <https://github.com/jsricarde/serverless-covid-19-test/blob/master/backend/serverless.yml>

[my token]: <https://github.com/jsricarde/serverless-covid-19-test/blob/master/myToken.txt>

[screenshots]: <https://github.com/jsricarde/serverless-covid-19-test/blob/master/screenshots>

[covid-test]: <https://github.com/jsricarde/serverless-covid-19-test/blob/master/convid-test.png>

[postman collection]: <https://github.com/jsricarde/serverless-covid-19-test/blob/master/backend/covid-test.postman_collection.json>

[AWS-CLI]: <https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html>

[covid-client-app]: <https://github.com/jeffrysteven/covid-ios>

[java]: <https://www.java.com/es/download/>