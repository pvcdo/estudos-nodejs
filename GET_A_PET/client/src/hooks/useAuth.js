import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import api from '../utils/api'

import useFlashMessage from './useFlashMessage'

export default function useAuth() {
  const {setFlashMessage} = useFlashMessage()
  
  const [authenticated, setAuthenticated] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if(token){
      api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`
      setAuthenticated(true)
    }
  },[])

  async function register(user) {
    let message = "Usuário registrado com sucesso!"
    let type = "success"

    try {
      const data = await api.post('/users/register', user)
        .then((response) => {
          return response.data
        })

      await authUser(data)
    } catch (error) {
      // tratar erro
      message = error.response.data.message
      type = "error"
    }

    setFlashMessage(message,type)
  }

  async function authUser(data){
    setAuthenticated(true)
    localStorage.setItem('token',JSON.stringify(data.token))
    navigate('/')
  }

  return { register, authenticated }
}
