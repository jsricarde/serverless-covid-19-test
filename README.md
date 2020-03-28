# Serverless Covid-19 Test

This app consist in a todo list app to manage the covid-19 test per user.
I used a cloud-severless infrastructure with serverless framework (backend builded in Node.js}, client builded in React as a PWA application with offline-storage support.

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

