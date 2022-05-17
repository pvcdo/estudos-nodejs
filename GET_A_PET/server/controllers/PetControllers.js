const User = require('../models/User')
const Pet = require('../models/Pet')

//helpers
const getToken = require("../helpers/get-token")
const getUserByToken = require("../helpers/get-user-by-token")

module.exports = class PetControllers{
  static async getAll(req,res){
    const pets = await Pet.find().sort('createdAt')

    res.status(200).json({
      message:"Resgatando todos doguinhos registrados",
      pets
    })
  }

  static async getAllUserPets(req,res){
    //get user
    const token = getToken(req)
    const user = await getUserByToken(token)

    const pets = await Pet.find({"user._id":user._id}).sort('createdAt')

    res.status(200).json({
      message:`Estes são os pets de ${user.name}`,
      pets
    })
  }

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
}
