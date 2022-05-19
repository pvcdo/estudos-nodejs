const User = require('../models/User')
const Pet = require('../models/Pet')

//helpers
const getToken = require("../helpers/get-token")
const getUserByToken = require("../helpers/get-user-by-token")
const ObjectId = require('mongoose').Types.ObjectId

module.exports = class PetControllers{

  static async create(req, res){
    const {name,age,weight,color} = req.body
    const images = req.files
    const available = true

    if(!name){
      return res.status(422).json({
        message:"O nome é obrigatório"
      })
    }
    if(!age){
      return res.status(422).json({
        message:"A idade é obrigatória"
      })
    }
    if(!weight){
      return res.status(422).json({
        message:"O peso é obrigatório"
      })
    }
    if(!color){
      return res.status(422).json({
        message:"A cor é obrigatória"
      })
    }
    if(!images){
      return res.status(422).json({
        message:"As imagens são obrigatórias"
      })
    }

    //get pet owner
    const token = getToken(req)
    const user = await getUserByToken(token)

    //create a pet 
    const pet = new Pet({
      name,
      age,
      images:[],
      weight,
      color,
      available,
      owner:{
        _id:user._id,
        name:user.name,
        email:user.email,
        phone:user.phone
      }
    })

    images.forEach(image => {
      pet.images.push(image.filename)
    })

    try {

      const newPet = await pet.save()

      res.status(200).json({
        message:"Doguinho registrado",
        newPet      
      })
      
    } catch (error) {
      res.status(500).json({
        message:error,     
      })
    }
  
  }

  static async getAll(req,res){
    const pets = await Pet.find().sort('createdAt')

    res.status(200).json({
      message:"Resgatando todos doguinhos registrados",
      pets
    })
  }

  static async getPet(req,res){
    const id = req.params.id

    if(!ObjectId.isValid(id)){
      return res.status(422).json({message:"ID inválido"})
    }

    const pet = await Pet.findOne({_id:id})

    if(!pet){
      return res.status(404).json({message:"Nenhum pet encontrado, tente novamente mais tarde!"})
    }

    res.status(200).json({
      message:`Dados de ${pet.name}`,
      pet
    })
  }

  static async getAllUserPets(req,res){
    //get user
    const token = getToken(req)
    const user = await getUserByToken(token)

    const pets = await Pet.find({"owner._id":user._id}).sort('createdAt')

    res.status(200).json({
      message:`Estes são os pets de ${user.name}`,
      pets
    })
  }

  static async getAllUserAdoptions(req,res){
    const token = getToken(req)
    const user = await getUserByToken(token)

    const pets = await Pet.find({"adopter._id":user._id}).sort('-createdAt')

    if(pets.length > 0){
      res.status(200).json({
        message: `Seguem cachorros adotados por ${user.name}`,
        pets
      })
    }else{
      res.status(200).json({
        message: `${user.name} ainda não adotou nenhum amiguinho :(`
      })
    }
  }

  static async updatePet(req,res){
    const id = req.params.id
    const {name,age,weight,color} = req.body

    if(!ObjectId.isValid(id)){
      return res.status(422).json({message:"ID inválido"})
    }

    const pet = await Pet.findOne({_id:id})

    if(!pet){
      return res.status(404).json({message:"Nenhum pet encontrado, tente novamente mais tarde!"})
    }

    const user = await getUserByToken(getToken(req))

    if(pet.owner._id.toString() !== user._id.toString()){
      return res.status(422).json({message:`${user.name} não é dono do ${pet.name}`})
    }

    const images = req.files
    
    let updateData = {}

    if(!name){
      return res.status(422).json({
        message:"O nome é obrigatório"
      })
    }else{
      updateData.name = name
    }
    if(!age){
      return res.status(422).json({
        message:"A idade é obrigatória"
      })
    }else{
      updateData.age = age
    }
    if(!weight){
      return res.status(422).json({
        message:"O peso é obrigatório"
      })
    }else{
      updateData.weight = weight
    }
    if(!color){
      return res.status(422).json({
        message:"A cor é obrigatória"
      })
    }else{
      updateData.color = color
    }
    if(images.length == 0){
      return res.status(422).json({
        message:"As imagens são obrigatórias"
      })
    }else{
      updateData.images = []
      images.forEach(image => {
        updateData.images.push(image.filename)
      })
    }

    await Pet.findByIdAndUpdate(id,updateData)

    res.status(200).json({message:'Pet atualizado com sucesso!'})
  }

  static async schedule(req,res){
    const id = req.params.id

    if(!ObjectId.isValid(id)){
      return res.status(422).json({message:"ID inválido"})
    }

    const pet = await Pet.findOne({_id:id})

    if(!pet){
      return res.status(404).json({message:"Nenhum pet encontrado, tente novamente mais tarde!"})
    }

    const user = await getUserByToken(getToken(req))

    if(pet.owner._id.toString() === user._id.toString()){
      return res.status(422).json({message:`Você é o dono de ${pet.name} e portanto não pode marcar visita consigo mesmo.`})
    }

    if(pet.adopter){
      if(pet.adopter._id.equals(user._id)){
        return res.status(422).json({message:`Você já agendou visita a este pet.`})
      }
    }

    pet.adopter = {
      _id:user._id,
      name:user.name,
      image:user.image
    }

    await Pet.findByIdAndUpdate(id,pet)

    res.status(200).json({message:'Visita ao pet agendada com sucesso!'})
  }

  static async concludeAdoption(req,res){
    const id = req.params.id

    if(!ObjectId.isValid(id)){
      return res.status(422).json({message:"ID inválido"})
    }

    const pet = await Pet.findOne({_id:id})

    if(!pet){
      return res.status(404).json({message:"Nenhum pet encontrado, tente novamente mais tarde!"})
    }

    const user = await getUserByToken(getToken(req))

    if(pet.owner._id.toString() !== user._id.toString()){
      return res.status(422).json({message:`Você, ${user.name}, não é dono de ${pet.name}`})
    }

    pet.available = false;

    await Pet.findByIdAndUpdate(id,pet)

    res.status(200).json({message:`Agora ${pet.name} tem um novo lar!`})
  }

  static async deletePet(req,res){
    const id = req.params.id

    if(!ObjectId.isValid(id)){
      return res.status(422).json({message:"ID inválido"})
    }

    const pet = await Pet.findOne({_id:id})

    if(!pet){
      return res.status(404).json({message:"Nenhum pet encontrado, tente novamente mais tarde!"})
    }

    const user = await getUserByToken(getToken(req))

    if(pet.owner._id.toString() !== user._id.toString()){
      return res.status(422).json({message:`${user.name} não é dono do ${pet.name}`})
    }

    await Pet.findByIdAndDelete(id)

    res.status(200).json({message:"Pet removido com sucesso"})

  }
}
