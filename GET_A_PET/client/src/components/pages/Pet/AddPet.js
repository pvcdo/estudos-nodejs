import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import api from '../../../utils/api'

import useFlashMessage from '../../../hooks/useFlashMessage'

import styles from './AddPet.module.css'

import PetForm from '../../form/PetForm'

function AddPet(){
  const [token] = useState(localStorage.getItem('token') || '')
  const { setFlashMessage } = useFlashMessage()
  const navigate = useNavigate()

  async function registerPet(pet){
    let msgType = 'success'

    const formData = new FormData()

    console.log("temos " + pet["images"].length + " imagens do cão")

    Object.keys(pet).forEach(key => {
      if(key === 'images'){
        for(let i = 0; i < pet[key].length; i++){
          formData.append("images",pet[key][i])
        }
      }else{
        formData.append(key,pet[key])
      }
    })

    const data = await api.post('/pets/create',formData,{
      headers:{
        Authorization: `Bearer ${JSON.parse(token)}`,
        'Content-Type':'multipart/form-data'
      }
    }).then((response) => {
      return response.data
    }).catch((err)=>{
      msgType = 'error'
      return err.response.data
    })

    setFlashMessage(data.message, msgType)
    if(msgType !== 'error'){
      navigate('/pet/mypets')
    }
  }

  return(
    <section>
      <div className= {styles.addpet_header}>
        <h1> Cadastre um pet</h1>
      </div>
      <PetForm handleSubmit={registerPet} btnText="Cadastrar pet"/>
    </section>
  )
}

export default AddPet
