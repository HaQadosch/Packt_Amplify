import React, { useEffect, useState } from 'react'
import { AmplifyAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';

export const App: React.FC = () => {
  const [authState, setAuthState] = useState<AuthState>()
  const [user, setUser] = useState<object | undefined>()

  useEffect(() => {
    return onAuthUIStateChange((nextAuthState, authData) => {
      console.log({ nextAuthState, authData })
      setAuthState(nextAuthState)
      setUser(authData)
    })
  }, [])

  return authState === AuthState.SignedIn && user
    ? (
      <main>
        <AmplifySignOut />
        Hello {(user as object & { username: string } | undefined)?.username}
      </main>
    )
    : <AmplifyAuthenticator />
}
