import React from 'react'
import { withAuthenticator } from '@aws-amplify/ui-react'

export function App() {
  return (
    <main>
      Hello
    </main>
  )
}

export const AuthApp = withAuthenticator(App)