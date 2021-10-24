import styles from './styles.module.scss'

import logoImg from '../../assets/logo.svg'
import { useContext, useEffect, useState } from 'react'
import { api } from '../../services/api'
import { io } from 'socket.io-client'
import { AuthContext } from '../../contexts/authContext'

interface IUser {
  avatar_url: string
  name: string
}

interface IMessage {
  id: string
  text: string
  user: IUser
}

const messagesQueue: IMessage[] = []

const socket = io('https://impulsenode.herokuapp.com')

socket.on('new_message', (newMessage: IMessage) => {
  messagesQueue.push(newMessage)
})

export function MessageList() {
  const [messages, setMessages] = useState<IMessage[]>([])
  const { user } = useContext(AuthContext)

  useEffect(() => {
    setInterval(() => {
      if (messagesQueue.length > 0) {
        setMessages(prevState => [
          messagesQueue[0],
          prevState[0],
          prevState[1]
        ].filter(Boolean))
        messagesQueue.shift()
      }
    }, 3000)
  }, [])

  useEffect(() => {
    api.get('/getLast3Messages').then(response => {
      setMessages(response.data as IMessage[])
    })
  }, [])

  return (
    <div className={styles.messageListWrapper}>
      <img src={logoImg} alt="DoWhile 2021 image" />



      <ul className={`${styles.messageList} ${user && styles.loggedUser}`}>

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