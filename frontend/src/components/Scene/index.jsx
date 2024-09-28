import { useEffect, useState } from 'react';
import './style.scss'

function Scene ({type}){
    const [input, setInput] = useState("")
    
    return <div className={'scene scene--'+type}>
        <Ciapka/>
        <Ciapka/>
    </div> 
       
}

export default Scene

function Ciapka(){
    return( 
        <svg className="ciapka" width="1730" height="920" viewBox="0 0 1730 920" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="865.059" cy="460.045" rx="868.5" ry="452" transform="rotate(6.33311 865.059 460.045)" fill="black"/>
        </svg>
    )
}