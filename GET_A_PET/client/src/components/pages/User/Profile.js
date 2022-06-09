import { useState, useEffect } from 'react';

import api from '../../../utils/api';

import styles from './Profile.module.css';
import formStyles from '../../form/Form.module.css';
import Input from '../../form/Input';
import RoundedImage from '../../layouts/RoundedImage';

import useFlashMessage from '../../../hooks/useFlashMessage';

function Profile(){
  const [user,setUser] = useState({})
  const [preview, setPreview] = useState()

  const {setFlashMessage} = useFlashMessage()
  const token = localStorage.getItem('token') || ''

  useEffect(()=>{
    api.get('/users/checkUser',{
      headers:{
        Authorization:`Bearer ${JSON.parse(token)}`
      }
    })
      .then((response) => {
        setUser(response.data)
      })
  },[token])

  function onFileChange(e){
    setUser({...user,[e.target.name]:e.target.files[0]})
    setPreview(e.target.files[0])
  }

  function handleChange(e){
    setUser({...user,[e.target.name]:e.target.value})
  }

  async function handleSubmit(e){
    e.preventDefault()
    let msgType = 'success'

    const formData = new FormData()

    Object.keys(user).forEach((key) =>
      formData.append(key, user[key]),
    )

    const data = await api.patch(`/users/update/${user._id}`, formData, {
        headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
        'Content-Type': 'multipart/form-data',
        },
    })
    .then((response) => {
        console.log(response.data)
        return response.data
    })
    .catch((err) => {
        console.log(err)
        msgType = 'error'
        return err.response.data
    })

    setFlashMessage(data.message, msgType)
  }

  return(
    <section>
      <form onSubmit={handleSubmit} className={formStyles.form_container}>
        <div className={styles.profile_header}>
          <h1>Perfil</h1>
          {(user.image || preview) && (
            <RoundedImage  
              src={
                preview 
                  ? URL.createObjectURL(preview)
                  : `${process.env.REACT_APP_API}/img/users/${user.image}`
              }
              alt={user.name}
            />
          )}
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
    </section>
  )
}

export default Profile
