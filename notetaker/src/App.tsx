import React, { useEffect, useState } from 'react'
import { AmplifyAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';

export const App: React.FC = () => {
  const [authState, setAuthState] = useState<AuthState>()
  const [user, setUser] = useState<object | undefined>()
  const [notes/*, setNotes*/] = useState([{ id: 1, text: "hello world" }])

  useEffect(() => {
    return onAuthUIStateChange((nextAuthState, authData) => {
      setAuthState(nextAuthState)
      setUser(authData)
    })
  }, [])

  return authState === AuthState.SignedIn && user
    ? (
      <>
        <header>
          <p>
            Hello {(user as object & { username: string } | undefined)?.username}
          </p>
          <h1>Note Taker</h1>
        </header>
        <main>
          <article>
            <form>
              <fieldset>
                <legend>How do we feel today?</legend>
                <label htmlFor="inputNote"></label>
                <input id="inputNote" type="text" placeholder="Write down something" />
                <button type="submit">Add Note</button>
              </fieldset>
            </form>
          </article>
          <article>
            <ul>
              {notes.map(({ id, text }) => (
                <li key={id}>
                  <p>{text}</p>
                  <button><span role="img" aria-label="deleteNote">✖️</span></button>
                </li>
              ))}
            </ul>
          </article>
        </main>
        <footer>
          <AmplifySignOut />
        </footer>
      </>
    )
    : <AmplifyAuthenticator />
}
