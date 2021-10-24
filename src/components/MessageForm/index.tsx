import { FormEvent, useContext, useState } from 'react'
import { VscGithubInverted, VscSignOut } from 'react-icons/vsc'
import { AuthContext } from '../../contexts/authContext'
import { api } from '../../services/api'
import Footer from '../Footer'
import Header from '../Header'
import styles from './styles.module.scss'

export function MessageForm() {
  const { user, logOut } = useContext(AuthContext)
  const [message, setMessage] = useState('')

  async function sendMessage(event: FormEvent) {
    event.preventDefault()

    if (!message.trim()) {
      alert('Digite uma mensagem!')
      return
    }

    await api.post('/messageCreate', { text: message })

    setMessage('')
  }

  return (
    <div className={styles.messageFormWrapper}>
      <button
        className={styles.signOutButton}
        onClick={logOut}
      >
        <VscSignOut size={32} />
      </button>

      <Header />

      <form onSubmit={sendMessage} className={styles.messageForm}>
        <label htmlFor="message">Mensagem</label>
        <textarea
          name="message"
          id="message"
          placeholder="Qual a sua expectativa para o evento?"
          onChange={event => setMessage(event.target.value)}
          value={message}
        />
        <button type="submit">Enviar mensagem</button>
      </form>

      <Footer />
    </div>
  )
}