import React from 'react'
import {AiOutlineLogin} from "react-icons/ai"

const CartIcon = () => {
  return (
    <div className="relative">
    <AiOutlineLogin className="text-2xl"/>
    <span className="absolute -top-1 -left-32 text-xl"> Kullanıcı Girişi </span>
      </div>
  )
}

export default CartIcon
