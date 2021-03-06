//incluir atualização do front quando a adoção for concluída, sem que seja feito o refresh da página, apenas usando useEffect, por exemplo

import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'

import { useNavigate, useParams } from 'react-router-dom'

import RoundedImage from '../../layouts/RoundedImage'

import api from '../../../utils/api'

import useFlashMessage from '../../../hooks/useFlashMessage'

import styles from './Dashboard.module.css'

function MyPets(){
  const {id} = useParams()
  const [token] = useState(localStorage.getItem('token') || '')
  const {setFlashMessage} = useFlashMessage()
  const navigate = useNavigate()
  
  const [pets, setPets] = useState([])

  useEffect(() => {
    api.get('/pets/mypets',{
      headers:{
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    }).then((response) => {
      setPets(response.data.pets)
    })
  },[token])

  useEffect(()=>{
    const pet = pets.filter((pet)=>pet._id === id)
    setFlashMessage(`${pet.name} tem um novo lar`, 'success')
  },[id])

  async function removePet(id){
    let msgType = 'success'

    const data = api.delete(`/pets/${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
    }).then((response) => {
      const updatedPets = pets.filter((pet) => pet._id !== id) //pega o array de pets que está renderizado na tela e filtro por aqueles que tem o id diferente do pet deletado
      setPets(updatedPets) //altero o array dos pets renderizados para o updatedPets, o qual não tem o pet deletado do banco de dados.
      //a técnica acima faz o tratamento da exibição apenas do front-end, poupando tráfego de rede
      return response.data
    }).catch((err) => {
      msgType = 'error'
      return err.response.data
    })

    setFlashMessage(data.message, msgType)
  }

  async function concludeAdoption(id) {
    let msgType = 'success'

    const data = await api
      .patch(`/pets/conclude/${id}`,undefined,{ 
          headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
          },
        }
      )
      .then((response) => {
        return response.data
      })
      .catch((err) => {
        console.log(err)
        msgType = 'error'
        return err.response.data
      })
    navigate(`/pet/mypets/concludeAdoption/${id}`)
    setFlashMessage(data.message, msgType)
  }

  return(
    <section>
      <div className={styles.petslist_header}>
        <h1>Meus pets</h1>
        <Link to='/pet/add'>Cadastrar pet</Link>
      </div>
      <div className={styles.petslist_container}>
        {pets.length > 0 && 
          pets.map((pet) => (
            <div className={styles.petlist_row} key={pet._id}>
              <RoundedImage
                src={`${process.env.REACT_APP_API}/img/pets/${pet.images[0]}`}
                alt={pet.name}
                width="px75"
              />
              <span className='bold'>{pet.name}</span>
              <div className={styles.actions}>
                {pet.available ? (
                  <>
                    {pet.adopter && (
                      <button 
                        onClick={()=>{concludeAdoption(pet._id)}} 
                        className={styles.conclude_btn}
                      >
                        Concluir adoção
                      </button>
                    )}
                    <Link to={`/pet/edit/${pet._id}`}>Editar</Link>
                    <button onClick={()=>{removePet(pet._id)}}>
                      Excluir
                    </button>
                  </>
                ):(
                  <p>Pet já adotado</p>
                )}
              </div>
            </div>
          ))
        }
        {pets.length === 0 && <p>Não há pets cadastrados.</p>}
      </div>
    </section>
  )
}

export default MyPets
