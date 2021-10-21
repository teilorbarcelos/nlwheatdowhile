import { useContext } from 'react'
import styles from './App.module.scss'
import LoginBox from './components/LoginBox'
import { MessageForm } from './components/MessageForm'
import { MessageList } from './components/MessageList'
import { AuthContext } from './contexts/authContext'
export function App() {
  const { user } = useContext(AuthContext)
  return (
    <main className={styles.contentWrapper}>

      <MessageList />

      {!!user ?
        <MessageForm />
        :
        <LoginBox />
      }

    </main>
  )
}