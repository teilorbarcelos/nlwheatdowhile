import styles from './styles.module.scss'

import logoImg from '../../assets/logo.svg'
import { useEffect, useState } from 'react'
import { api } from '../../services/api'

interface IUser {
  avatar_url: string
  name: string
}

interface IMessage {
  id: string
  text: string
  user: IUser
}

export function MessageList() {
  const [messages, setMessages] = useState<IMessage[]>([])

  useEffect(() => {
    api.get('/getLast3Messages').then(response => {
      setMessages(response.data as IMessage[])
    })
  }, [])

  return (
    <div className={styles.messageListWrapper}>
      <img src={logoImg} alt="DoWhile 2021 image" />

      <ul className={styles.messageList}>

        {
          messages?.map(message => {
            return (
              <li key={message.id} className={styles.message}>
                <p className={styles.messageContent}>{message.text}</p>
                <div className={styles.messageUser}>
                  <div className={styles.userImg}>
                    <img src={message.user.avatar_url} alt={`Foto de perfil do usuário ${message.user.name}`} />
                  </div>
                  <span>{message.user.name}</span>
                </div>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}