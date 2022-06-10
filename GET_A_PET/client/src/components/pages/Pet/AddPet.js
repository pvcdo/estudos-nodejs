import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import api from '../../../utils/api'

import useFlashMessage from '../../../hooks/useFlashMessage'

import styles from './AddPet.module.css'

import PetForm from '../../form/PetForm'

function AddPet(){
  return(
    <section>
      <div className= {styles.addpet_header}>
        <h1> Cadastre um pet</h1>
      </div>
      <PetForm btnText="Cadastrar pet"/>
    </section>
  )
}

export default AddPet
