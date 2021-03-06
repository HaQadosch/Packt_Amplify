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

#### Amplify Note

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

From the CLI :
* add the AppSync GraphQL service
* set the auth via cognito user pool

#### Amplify Note

Some next steps:
* ```amplify push``` will build all your local backend resources and provision it in the cloud
* ```amplify publish``` will build all your local backend and frontend resources (if you have hosting category added) and provision it in the cloud


We add the new config into the cloud
```sh
  amplify push
```

Amplify generate the GraphQL code at the same time.

GraphQL endpoint: https://aehskk6azvf6hhrnwpuceh2crq.appsync-api.eu-central-1.amazonaws.com/graphql

### Amplify libraries

Still in the root folder of the project:

```sh
  npm install aws-amplify @aws-amplify/ui-react
```

#### Set up Amplify in the project

In `Index.ts`, add those lines
```js
  import Amplify from "aws-amplify"
  import awsExports from "./aws-exports"
  Amplify.configure(awsExports)
```

## Set up authentication in the Front End

In `App.tsx`, add the lines
```js
import { AmplifyAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'

export function App() {
  return (
    <AmplifyAuthenticator>
      <main>
        <AmplifySignOut />
        Hello
      </main>
    </AmplifyAuthenticator>
  )
}
```

`<App />` will be the component to be displayed once the user has been authenticated.


# Test Auth Demo

1. Create Snowpack App
2. Amplify init
3. Configure React to work with Amplify
4. Amplify add Auth
5. Add React components

## 1 Create React App
Create front-end project scaffold:
```js
  npx create-react-app auth_test --template typescript
```

Check everything is ok
```zsh
  cd auth_test
  npm test
  npm start
```

## 2 Initialise Amplify

We initialize the amplify project from the root folder of tbe project
```zsh
  aada login -n --profile aad 
  amplify init
```

We then answer a series of questions:
```
Note: It is recommended to run this command from the root of your app directory
? Enter a name for the project xbauthtest
? Enter a name for the environment dev
? Choose your default editor: Visual Studio Code
? Choose the type of app that you're building javascript
Please tell us about your project
? What javascript framework are you using react
? Source Directory Path:  src
? Distribution Directory Path: build
? Build Command:  npm run build
? Start Command: npm run start
Using default provider  awscloudformation

Pro tip:
Try "amplify add api" to create a backend API and then "amplify publish" to deploy everything
```

This will create a `amplify` folder and a `aws-export.js` file.
All the services definition (Infrastructure templates) will be added in the `amplify/backend/<service>`
The configuration are added in `aws-export.js`

The template project will also be added in the cloud: `amplify console`

### Deploy button

In the readme of the project, not the one at the roof folder,
```md
[![amplifybutton](https://oneclick.amplifyapp.com/button.svg)](https://console.aws.amazon.com/amplify/home#/deploy?repo=https://github.com/XavierBrinonECS/test)
```

## 3 Configure React to work with Amplify

In the root folder of the project
```zsh
  npm install aws-amplify @aws-amplify/ui-react
```

In `index.tsx`
```javascript
  import Amplify from "aws-amplify";
  import awsExports from "./aws-exports";
  Amplify.configure(awsExports);
```

## 4 Add auth service

In the root folder
```zsh
  amplify add auth
```

We answer the series of questions
```
 Do you want to use the default authentication and security configuration? Default configuration
 Warning: you will not be able to edit these selections. 
 How do you want users to be able to sign in? Email
 Do you want to configure advanced settings? No, I am done.
Successfully added auth resource authtest8a5b81e2 locally

Some next steps:
"amplify push" will build all your local backend resources and provision it in the cloud
"amplify publish" will build all your local backend and frontend resources (if you have hosting category added) and provision it in the cloud

```

And we push that config in the cloud:
```zsh
  amplify push
```

The folder `/Packt_Amplify/auth_test/amplify/backend/auth` has been created and with it the cloudformation config. 
The amplify console has now the ability to set up the user config in the auth tab: ```amplyfy console```

## 5 UI

### The old way

In `App.tsx`
```javascript
  import { withAuthenticator } from '@aws-amplify/ui-react';
  ...
  - export default App;
  + export default withAuthenticator(App);
```

Test creating new user via `https://10minutemail.com/`

### Adding the sign Out

In `App.tsx`
```javascript
      <AmplifySignOut />
  </header>
```

The whole component:
```javascript
import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

import { AmplifySignOut, AmplifyAuthenticator } from '@aws-amplify/ui-react';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';

export const App = () => {
  const [authState, setAuthState] = useState<AuthState>()
  const [user, setUser] = useState<object | undefined>()

  useEffect(() => {
    return onAuthUIStateChange((nextAuthState, authData) => {
      setAuthState(nextAuthState)
      setUser(authData)
    })
  }, [])

  return authState === AuthState.SignedIn && user ? (
    <div className="App">
      <header className="App-header">
        <p>Hello {(user as object & { username: string } | undefined)?.username}</p>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <AmplifySignOut />
      </header>
    </div>
  ) : <AmplifyAuthenticator />
}


```