import api from "../../utils/api"

import styles from './Home.module.css'

import { Link } from "react-router-dom"
import { useState, useEffect } from "react"

function Home(){
  const [pets, setPets] = useState([])
  const [token] = useState(localStorage.getItem('token') || '')
  const [user,setUser] = useState({})

  useEffect(() => {
    api.get('/pets').then((response) => {
      setPets(response.data.pets)
    })
    api.get('/users/checkUser').then((response) => {
      setUser(response.data)
    })
  }, [])

  return(
    <section>
      <div className={styles.pet_home_header}>
        <h1>Home</h1>
      </div>
      <div className={styles.pet_container}>
        {pets.length > 0 &&
          pets.map((pet) => (
            <div className={styles.pet_card} key={pet._id}>
              <div
                style={{
                  backgroundImage: `url(${process.env.REACT_APP_API}/img/pets/${pet.images[0]})`,
                }}
                className={styles.pet_card_image}
              ></div>
              <h3>{pet.name}</h3>
              <p>
                <span className="bold">Peso:</span> {pet.weight}kg
              </p>
              {pet.available ? (
                <Link to={`/pet/${pet._id}`}>Mais detalhes</Link>
              ) : (
                <p className={styles.adopted_text}>Adotado!</p>
              )}
              {/* VER SE O PET JÁ FOI AGENDADO PELO USUÁRIO LOGADO
                user._id === pet.adopter._id ?
                (<p>Agendado!</p>):(<></>)
              */}
            </div>
          ))
        }
        {pets.length === 0 &&
          <p>Não há pets para serem exibidos</p>
        }
      </div>
    </section>
  )
}

export default Home
