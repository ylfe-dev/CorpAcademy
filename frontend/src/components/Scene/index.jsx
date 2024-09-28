import { useEffect, useState } from 'react';
import './style.scss'

function Scene ({type, children}){
    
    return <main className={'scene scene--' + type}>
        {children}
    </main> 
}

export default Scene