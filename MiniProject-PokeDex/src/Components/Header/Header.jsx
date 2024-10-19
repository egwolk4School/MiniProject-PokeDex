import { useState } from "react"
import { Link } from "react-router-dom"
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Header.css'
export const Header = () => {
    const [menuOpen,setMenuOpen] = useState(false)
  return (
    <nav>
        <Link to='/' className='title' >PokingEnaMo{'<'}3</Link>
        
        <div className="menu" onClick={()=>{
            setMenuOpen(!menuOpen)
        }}>
            <FontAwesomeIcon icon={faBars} className='bars'/>
        </div>
        <ul className={menuOpen?'open':''}>
            <li>
                <Link to="/">PokeDex</Link>
            </li>
            <li>
                <Link to="/About">About</Link>
            </li>
            <li>
                <Link to="/Contact">Contact</Link>
            </li>
        </ul>
    </nav>
  )
}
