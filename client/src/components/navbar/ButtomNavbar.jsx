import { FaHome, FaUser } from "react-icons/fa";

// Bottom Navbar is only for small screen, we put it on navbar component
export default function BottomNavbar() {
  return (
    <nav className=' fixed bottom-0 left-0 z-50 block md:hidden p-1'>
      <div className='flex items-center justify-between'>
        <FaHome />
        <FaUser />
      </div>
    </nav>
  )
}