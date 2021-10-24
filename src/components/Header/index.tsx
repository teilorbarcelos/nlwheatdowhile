import { useContext } from 'react'
import { VscGithubInverted } from 'react-icons/vsc'
import { AuthContext } from '../../contexts/authContext'
import styles from './styles.module.scss'

export default function Header() {
  const { user, logOut } = useContext(AuthContext)
  return (
    <header className={styles.userInformation}>
      <p
        className={styles.logoutMobile}
        onClick={logOut}
      >Sair</p>
      <div className={styles.userImg}>
        {/* <img src={user?.avatar_url} alt={`Avatar from user ${user?.name}`} /> */}
        <img src={'https://avatars.githubusercontent.com/u/80414833?v=4'} alt={`Avatar from user ${user?.name}`} />
      </div>
      {/* <strong className={styles.userName}>{user?.name}</strong> */}
      <strong className={styles.userName}>Teilor Souza Barcelos</strong>
      <span className={styles.userGithub}>
        <VscGithubInverted size={16} />
        {/* {user?.login} */}
        teilorbarcelos
      </span>
    </header>
  )
}