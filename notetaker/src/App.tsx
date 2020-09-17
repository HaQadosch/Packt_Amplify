import React from 'react'
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
