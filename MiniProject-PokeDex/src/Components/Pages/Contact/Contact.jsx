import { useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGithub, faFacebook,faDiscord } from "@fortawesome/free-brands-svg-icons"
useEffect
export const Contact = () => {
    useEffect(()=>{
        document.title='PokeDex | Contact'
    },[])
  return (
    <>
      <div className="about-section">
        <div className="about">
        <h2>Reach Us @</h2>
        <br />

        <h2>Stephen</h2>
        <ul className="lister">
          <li><a href="https://github.com/tpen14" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faGithub} /> tpen14</a></li>
          <li><a href="https://www.facebook.com/st.ph.n0314" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faFacebook} /> Stephen Robles</a></li>
          <li><a href="https://discord.com/users/574486635480350734" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faDiscord} /> tsumuluvr</a></li>
        </ul>
        <br />
        
        <h2>Erin</h2>
        <ul className="lister">
          <li><a href="https://github.com/egwolk4School" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faGithub} /> egwolk4School</a></li>
          <li><a href="https://www.facebook.com/egwolk/" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faFacebook} /> ErinCovacha</a></li>
          <li><a href="https://discord.com/users/757221998085799997" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faDiscord} /> Egwolk</a></li>
        </ul>
        <br />

        
        </div>
      </div>
    </>
  )
}
