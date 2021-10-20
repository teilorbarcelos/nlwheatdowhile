import styles from './styles.module.scss'

import logoImg from '../../assets/logo.svg'

export function MessageList() {
  return (
    <div className={styles.messageListWrapper}>
      <img src={logoImg} alt="DoWhile 2021 image" />

      <ul className={styles.messageList}>
        <li className={styles.message}>
          <p className={styles.messageContent}>Mensagem exemplo</p>
          <div className={styles.messageUser}>
            <div className={styles.userImg}>
              <img src={'https://github.com/teilorbarcelos.png'} alt={`Foto de perfil do usuário `} />
            </div>
            <span>Teilor Barcelos</span>
          </div>
        </li>
        <li className={styles.message}>
          <p className={styles.messageContent}>Mensagem exemplo</p>
          <div className={styles.messageUser}>
            <div className={styles.userImg}>
              <img src={'https://github.com/teilorbarcelos.png'} alt={`Foto de perfil do usuário `} />
            </div>
            <span>Teilor Barcelos</span>
          </div>
        </li>
        <li className={styles.message}>
          <p className={styles.messageContent}>Mensagem exemplo</p>
          <div className={styles.messageUser}>
            <div className={styles.userImg}>
              <img src={'https://github.com/teilorbarcelos.png'} alt={`Foto de perfil do usuário `} />
            </div>
            <span>Teilor Barcelos</span>
          </div>
        </li>
      </ul>
    </div>
  )
}