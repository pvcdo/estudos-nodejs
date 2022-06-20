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
  const [token] = useState(localStorage.getItem('token') || '')

  useEffect(() => {
    api.get(`/pets/${id}`).then((response) => {
      setPet(response.data.pet)
    })
  },[id])

  return(
    <section>
      <div>
        <h1>{pet.name}</h1>
      </div>
    </section>
  )
}

export default PetDetails