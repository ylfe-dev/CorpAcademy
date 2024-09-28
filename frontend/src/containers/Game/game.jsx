import { useEffect, useState } from 'react';
import axios from 'axios';
import './game.scss';
import LetterBoxInput from '../../components/LetterBoxInput/letterBoxInput';
import Scene from '../../components/Scene/scene';
import Hint from '../../components/Hint/hint'


function Game() {
  const [lesson, setLesson] = useState({sentence: "This", words: "this for"});

  useEffect(()=>{
   /* let audio = new Audio('/Onion.mp3');
    audio.loop = true;
    audio.play();
    */

    return () => {
      /*audio.pause();
      audio.currentTime = 0; 
      audio.src = ''; */
    }
  },[])

  return (
    <Scene type="typ">
      
        <section className='info'>
          <progress id="file" value="32" max="100"> 32% </progress>
        </section>
        
        <section className='content'>
          <LetterBoxInput sentence={lesson.sentence} words={lesson.words}/>
          <div><span className=''>{lesson.sentence}</span></div>
        </section>
        
        <section className='action'>
          <Hint text="Nakurwiaj szybko!" character="rat" />
        </section>

    </Scene>
  )
}

export default Game
