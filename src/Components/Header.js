
import CartIcon from "./CartIcon"
import HeaderLogoItem from "./HeaderLogoItem"

const Header = () => {
  return (
    <div class ="flex justify-between items-center mb-4 border p-4 m-2 rounded-lg shadow-lg">

     <HeaderLogoItem/>
     <CartIcon/>
    </div>
  )
}

export default Header
