import api from "../../../utils/api"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

import styles from './AddPet.module.css'

import PetForm from '../../form/PetForm'

import useFlashMessage from "../../../hooks/useFlashMessage"

function EditPet(){

  const [pet, setPet] = useState({})
  const [msgError, setMsgError] = useState('')
  const [token] = useState(localStorage.getItem('token') || '')
  const { id } = useParams() //isso funciona porque no app nós chamamos essa página através do path com :id, que é referenciado na desestruturação
  const { setFlashMessage } = useFlashMessage()

  useEffect(() => {
    api.get(`/pets/${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      }).then((response) => {
        setPet(response.data.pet)
      }).catch((err)=>{
        setMsgError(err.response.data.message)
      })
  }, [token, id])

  async function updatePet(pet){
    let msgType = 'success'

    const formData = new FormData()

    Object.keys(pet).forEach((key) => {
      if (key === 'images') {
        for (let i = 0; i < pet[key].length; i++) {
          formData.append(/*`images` teste*/ key, pet[key][i])
        }
      } else {
        formData.append(key, pet[key])
      }
    })

    const data = await api.patch(`pets/${pet._id}`, formData, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        return response.data
      })
      .catch((err) => {
        msgType = 'error'
        return err.response.data
      })

    setFlashMessage(data.message, msgType)
  }

  return(
    <section>
      {pet.name ? (
        <>
          <div className={styles.addpet_header}>
            <h1>Editando o Pet {pet.name}</h1>
            <p>Depois da edição os dados serão atualizados no sistema</p>
          </div>
          {pet.name && (
            <PetForm handleSubmit={updatePet} petData={pet} btnText="Editar" />)
          }
        </>
        ):(
        <>
          <div className={styles.addpet_header}>
            <p>{msgError}</p>
          </div>
        </>
        )
      }
    </section>
  )
}

export default EditPet
