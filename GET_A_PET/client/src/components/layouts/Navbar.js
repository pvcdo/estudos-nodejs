import {Link} from 'react-router-dom'

import Logo from '../../assets/img/logo.png'

function Navbar(){
  return(
    <nav>
      <div>
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
