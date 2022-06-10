import { useState } from "react";

import formStyles from './Form.module.css'
import Input from './Input'
import Select from "./Select";

function PetForm({handleSubmit, petData, btnText}){

  const [pet, setPet] = useState(petData || {})
  const [preview, setPreview] = useState([])
  const colors = ['Branco', 'Preto', 'Cinza', 'Caramelo']

  function onFileChange(e){
    setPreview(Array.from(e.target.files))
    setPet({...pet,images: [...e.target.files]})
  }

  function onHandleChange(e){
    setPet({...pet,[e.target.name]:e.target.value})
  }

  function handleColor(e){
    setPet({...pet,color:e.target.options[e.target.selectedIndex].text})
  }

  function onFormSubmit(e){
    e.preventDefault()
    handleSubmit(pet)
  }

  return(
    <form onSubmit={onFormSubmit} className={formStyles.form_container}>
      <div className={formStyles.preview_pet_images}>
        {preview.length > 0
          ? preview.map((image, index) => (
              <img
                src={URL.createObjectURL(image)}
                alt={pet.name}
                key={`${pet.name}+${index}`}
              />
            ))
          : pet.images &&
            pet.images.map((image, index) => (
              <img
                src={`${process.env.REACT_APP_API}/img/pets/${image}`}
                alt={pet.name}
                key={`${pet.name}+${index}`}
              />
            ))}
      </div>
      
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

      <input type="submit" value={btnText}/>
    </form>
  )
}

export default PetForm
