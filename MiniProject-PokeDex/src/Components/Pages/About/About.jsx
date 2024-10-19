import { useEffect } from "react"



export const About = () => {
    useEffect(()=>{
        document.title='PokeDex | About'
    },[])
  return (
    <div>About</div>
  )
}
