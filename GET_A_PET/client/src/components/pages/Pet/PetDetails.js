//permitir o cadastro de mais de um interessado na visita ao pet

import api from '../../../utils/api'
import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

import useFlashMessage from '../../../hooks/useFlashMessage'

import styles from './PetDetails.module.css'

function PetDetails(){
  const [pet, setPet] = useState({})
  const { id } = useParams()
  const { setFlashMessage } = useFlashMessage()
  const [token] = useState(localStorage.getItem('token'))

  useEffect(() => {
    api.get(`/pets/${id}`).then((response) => {
      setPet(response.data.pet)
    })
  },[id])

  async function schedule(){
    let msgType = 'success'

    console.log(token)

    const data = await api.patch(`/pets/schedule/${id}`,undefined,{
        headers:{
          Authorization: `Bearer ${JSON.parse(token)}`
        }
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
    <>
      {pet.name && 
        <section className={styles.pet_details_container}>
          <div className={styles.petdetails_header}>
            <h1>{pet.name}</h1>
          </div>
          <div className={styles.pet_images}>
            {pet.images.map((image, index) => (
              <img 
                key = {index}
                src = {`${process.env.REACT_APP_API}/img/pets/${image}`}
                alt = {`Imagem ${index+1} de ${pet.name}`}
              />
            ))}
          </div>
          <p>
            <span className="bold">Peso:</span> {pet.weight}kg
          </p>
          <p>
            <span className="bold">Idade:</span> {pet.age} anos
          </p>
          {token ? (
            <button onClick={schedule}>Solicitar uma Visita</button>
          ) : (
            <p>
              Você precisa <Link to="/register">criar uma conta</Link> para
              solicitar a visita.
            </p>
          )}
        </section>
      }
    </>
  )
}

export default PetDetails