import { useState } from "react";

import formStyles from './Form.module.css'
import Input from './Input'
import Select from "./Select";

function PetForm({handleSubmit, petData, btnText}){

  const [pet, setPet] = useState(petData || {})
  const [preview, setPreview] = useState([])
  const colors = ['Branco', 'Preto', 'Cinza', 'Caramelo']

  function onFileChange(e){

  }

  function onHandleChange(e){
    setPet({...pet,[e.target.name]:e.target.value})
  }

  function handleColor(e){
    setPet({...pet,color:e.target.options[e.target.selectedIndex].text})
  }

  function onFormSubmit(e){
  }

  return(
    <form onSubmit={onFormSubmit} className={formStyles.form_container}>
      <Input 
        type= "file"
        text= "Imagem"
        name= "image"
        handleOnChange= {onFileChange}
        multiple={true}
      />

      <Input
        type= "text"
        text= "Nome"
        name= "name"
        placeholder= "Digite o nome do pet."
        handleOnChange= {onHandleChange}
        value= {pet.name || ''}
      />

      <Input
        type= "number"
        text= "Idade"
        name= "age"
        placeholder= "Digite a idade do pet."
        handleOnChange= {onHandleChange}
        value= {pet.age || ''}
      />

      <Input
        type= "number"
        text= "Peso"
        name= "weight"
        placeholder= "Digite o peso do pet."
        handleOnChange= {onHandleChange}
        value= {pet.weight || ''}
      />

      <Select 
        text= "Cores"
        name= "colors"
        options= {colors}
        handleOnChange= {handleColor}
        value={pet.color || ''} 
      />

      <input type="submit" value="Cadastrar"/>
    </form>
  )
}

export default PetForm
