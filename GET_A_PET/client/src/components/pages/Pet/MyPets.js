import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'

import RoundedImage from '../../layouts/RoundedImage'

import api from '../../../utils/api'

import useFlashMessage from '../../../hooks/useFlashMessage'

import styles from './Dashboard.module.css'

function MyPets(){
  const [token] = useState(localStorage.getItem('token') || '')
  const {setFlashMessage} = useFlashMessage()
  
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

  return(
    <section>
      <div>
        <h1>MyPets</h1>
        <Link to='/pet/add'>Cadastrar pet</Link>
      </div>
      <div>
        {pets.length > 0 && 
          pets.map((pet) => (
            <div key={pet.id}>
              <RoundedImage
                src={`${process.env.REACT_APP_API}/img/pets/${pet.images[0]}`}
                alt={pet.name}
                width="px75"
              />
              <span>{pet.name}</span>
              <div>
                {pet.available ? (
                  <>
                    {pet.adopter && (
                      <button>
                        Concluir adoção
                      </button>
                    )}
                    <Link to={`/pet/edit/${pet._id}`}>Editar</Link>
                    <button>
                      Excluir
                    </button>
                  </>
                ):(
                  <p>Pet já adotado</p>
                )
                }
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
