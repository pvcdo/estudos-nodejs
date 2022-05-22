import {Link} from 'react-router-dom'

import styles from './Navbar.module.css'
import Logo from '../../assets/img/logo.png'

function Navbar(){
  return(
    <nav className={styles.navbar}>
      <div className={styles.navbar_logo}>
        <img src={Logo} alt="Logo de Get a Pet" />
        <h2>Get a pet</h2>
      </div>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/register'>Registrar</Link>
        </li>
        <li>
          <Link to='/login'>Login</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
