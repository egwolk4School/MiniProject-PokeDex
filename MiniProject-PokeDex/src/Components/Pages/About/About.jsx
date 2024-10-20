import { useEffect } from "react"
import './About.css'


export const About = () => {
    useEffect(()=>{
        document.title='PokeDex | About'
    },[])
  return (
    <>
      <div className="about-section">
        <div className="about">
        <h2>About this site</h2>
        <p>This website is a MiniProject for our APPDEV Midterms.</p>
        <br />

        <h2>Devs</h2>
        <ul className="lister">
          <li><strong>Front-end: </strong>Stephen</li>
          <li><strong>Back-end: </strong>Erin</li>
        </ul>
        <br />

        <h2>Used</h2>
        <ul className="lister">
          <li>React</li>
          <li>Axios</li>
          <li>PokeAPI</li>
        </ul>
        <br />

        <h2>Made With</h2>
        <ul className="lister">
          <li>❤</li>
        </ul>
        </div>
      </div>
    </>
  )
}
