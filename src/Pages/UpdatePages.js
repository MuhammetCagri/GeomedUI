import React from 'react'
import AddProduct from '../Components/AddProduct'
import AddMainPage from '../Components/AddMainPage'
import AddContactPage from '../Components/AddContactPage'
import AddAboutUsPage from '../Components/AddAboutUsPage'
import UpdateHeader from '../Components/UpdateHeader'

const UpdatePages = () => {
  return (
    <div>
      <UpdateHeader/>
      <AddProduct/>
      <AddMainPage/>
      <AddContactPage/>
      <AddAboutUsPage/>
    </div>
  )
}

export default UpdatePages

