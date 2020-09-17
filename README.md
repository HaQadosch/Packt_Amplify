# Packt_Amplify
packtpub: Serverless React with AWS Amplify - The Complete Guide

## setup

### Application scaffold

```sh
  npx create-react-app notetaker --template typescript
  cd notetaker
  npm run start
```

### AWS credentials

Renew the credentials for aad.

### Amplify

In the root project folder:
```sh
  amplify init
```

# Amplify Note

Some next steps:
* ```amplify status``` will show you what you've added already and if it's locally configured or deployed
* ```amplify add <category>``` will allow you to add features like user login or a backend API
* ```amplify push``` will build all your local backend resources and provision it in the cloud
* ```amplify console``` to open the Amplify Console and view your project status
* ```amplify publish``` will build all your local backend and frontend resources (if you have hosting category added) and provision it in the cloud

### GraphQL

via amplify, no renew your aad creds.

Still in the root folder of the project:

```sh
  amplify add api
```

