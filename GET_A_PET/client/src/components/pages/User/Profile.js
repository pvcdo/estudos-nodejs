import { useState, useEffect } from 'react';

import api from '../../../utils/api';

import styles from './Profile.module.css';
import formStyles from '../../form/Form.module.css';
import Input from '../../form/Input';

function Profile(){
  const [user,setUser] = useState({})
  const [authenticated, setAuthenticated] = useState(false)

  const token = localStorage.getItem('token') || ''

  useEffect(()=>{
    api.get('/users/checkUser',{
      headers:{
        Authorization:`Bearer ${JSON.parse(token)}`
      }
    })
      .then((response) => {
        setUser(response.data)
        if(response.data != '' || response.data != null || response.data != undefined){
          setAuthenticated(true)
        }
      })
  },[token,authenticated])

  function onFileChange(e){

  }

  function handleChange(e){

  }

  return(
    <section>
      {authenticated ? 
        <form className={formStyles.form_container}>
          <div className={styles.profile_header}>
            <h1>Perfil</h1>
          </div>
          <Input
            type="file"
            text="Imagem"
            name="image"
            handleOnChange={onFileChange}
          />
          <Input
            type="text"
            text="E-mail"
            name="email"
            placeholder="Altere seu e-mail"
            handleOnChange={handleChange}
            value={user.email}
          />
          <Input
            type="text"
            text="Nome"
            name="name"
            placeholder="Altere seu nome"
            handleOnChange={handleChange}
            value={user.name}
          />
          <Input
            type="text"
            text="Telefone"
            name="phone"
            placeholder="Altere seu telefone"
            handleOnChange={handleChange}
            value={user.phone}
          />
          <Input
            type="password"
            text="Senha"
            name="password"
            handleOnChange={handleChange}
          />
          <Input
            type="text"
            text="E-mail"
            name="email"
            handleOnChange={handleChange}
          />
          <input type="submit" value="Editar"/>
        </form>
        :
        <>
          <h1>Usuário não autenticado! Faça <a>login</a> para continuar!</h1>
        </>
      }
    </section>
  )
}

export default Profile
