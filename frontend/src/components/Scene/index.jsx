import { useEffect, useState } from 'react';
import './style.scss'

function Scene ({type}){
    const [input, setInput] = useState("")
    
    return <div className={'scene scene--' + type}>
    </div> 
}

export default Scene