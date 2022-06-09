import { useState, useEffect } from "react";

import bus from '../../utils/bus'

import styles from "./Message.module.css";

function Message() {
  let [visibility, setVisibility] = useState(false)
  let [message, setMessage] = useState('')
  let [type, setType] = useState("");

  useEffect(()=>{
    bus.addListener('flash',({message,type}) => { //os parâmetros message e type foram definidos em useFlashMessage.js para o evento flash 
      setVisibility(true)
      setMessage(message)
      setType(type)

      setTimeout(()=>{
          setVisibility(false)
      },1000) 
    })
  },[]/*colocamos o array vazio para indicar que não é pro useEffect ficar observando constantemente nenhuma prop*/)

  return (
      visibility&&<div className={`${styles.message} ${styles[type]}`}>{message}</div>
  )

}

export default Message;