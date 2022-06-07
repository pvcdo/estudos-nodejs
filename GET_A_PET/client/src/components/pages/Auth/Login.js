import {useState, useContext} from 'react';
import {Link} from 'react-router-dom';

import Input from '../../../components/form/Input'
import styles from '../../../components/form/Form.module.css'

import {Context} from '../../../context/UserContext'

function Login(){

  const [user,setUser] = useState({})
  const {login} = useContext(Context)
  
  function handleChange(e){
    setUser({...user,[e.target.name]:e.target.value})
  }

  function handleSubmit(e){
    e.preventDefault()
    login(user)
  }

  return(
    <section className={styles.form_container}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <Input 
          type='email'
          text='E-mail'
          name='email'
          placeholder="Digite o seu e-mail"
          handleOnChange={handleChange}
        />
        <Input 
          type='password'
          text='Senha'
          name='password'
          placeholder="Digite a sua senha"
          handleOnChange={handleChange}
        />
        <input type='submit' value="Entrar"/>
      </form>
      <p>Não é cadastrado? <Link to='/register'>Registre-se</Link>!</p>
    </section>
  )
}

export default Login
