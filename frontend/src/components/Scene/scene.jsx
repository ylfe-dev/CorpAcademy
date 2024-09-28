import { useEffect, useState } from 'react';
import './scene.scss'

function Scene ({type, children}){
    
    return <main className={'scene scene--' + type}>
        {children}
    </main> 
}

export default Scene