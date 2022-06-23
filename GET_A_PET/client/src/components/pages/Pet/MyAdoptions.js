import styles from './Dashboard.module.css'

import api from '../../../utils/api'

import { useState, useEffect } from 'react'

import RoundedImage from '../../layouts/RoundedImage'

function MyAdoptions(){
  const [pets, setPets] = useState([])
  const [token] = useState(localStorage.getItem('token') || '')

  useEffect(() => {
    api.get('/pets/myadoptions', {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        setPets(response.data.pets)
      })
  }, [token])

  return(
    <section>
      <div>
        <h1>Minhas adoções</h1>
      </div>
      <div>
        {pets.length > 0 &&
          pets.map((pet) => (
            <div key={pet._id} className={styles.petlist_row}>
              <RoundedImage
                src={`${process.env.REACT_APP_API}/img/pets/${pet.images[0]}`}
                alt={pet.name}
                width="px75"
              />
              <span className="bold">{pet.name}</span>
              <div className={styles.contacts}>
                <p>
                  <span className="bold">Ligue para:</span> {pet.owner.phone}
                </p>
                <p>
                  <span className="bold">Fale com:</span> {pet.owner.name}
                </p>
              </div>
              <div className={styles.actions}>
                {pet.available ? (
                  <p>Adoção em processo</p>
                ) : (
                  <p>Parabéns por concluir a adoção</p>
                )}
              </div>
            </div>
          ))
        }  
      </div>    
    </section>
  )
}

export default MyAdoptions