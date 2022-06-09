import {Link} from 'react-router-dom'
import { useContext } from 'react'

import styles from './Navbar.module.css'
import Logo from '../../assets/img/logo.png'

import {Context} from '../../context/UserContext'

function Navbar(){

  const {authenticated, logout} = useContext(Context)

  return(
    <nav className={styles.navbar}>
      <Link to='/'>
        <div className={styles.navbar_logo}>
          <img src={Logo} alt="Logo de Get a Pet" />
          <h2>Get a pet</h2>
        </div>
      </Link>
      <ul>
        {authenticated ?
          <>
            <li>
              <Link to='/pet/mypets'>Meus pets</Link>
            </li>
            <li>
              <Link to='/user/profile'>Perfil</Link>
            </li>
            <li>
              <Link onClick={logout} to='/'>Logout</Link>
            </li>
          </> 
          :
          <>
            <li>
              <Link to='/register'>Registrar</Link>
            </li>
            <li>
              <Link to='/login'>Login</Link>
            </li>
          </>
        }
        
      </ul>
    </nav>
  )
}

export default Navbar
