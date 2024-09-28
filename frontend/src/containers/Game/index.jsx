import { useEffect, useState } from 'react';
import axios from 'axios';
import './style.scss';
import LetterBoxInput from '../../components/LetterBoxInput';
import Scene from '../../components/Scene';
import Hint from '../../components/Hint'


function Game() {
  const [lesson, setLesson] = useState({sentence: "This gift is for you", words: "gift for"});

  useEffect(()=>{
    let audio = new Audio('/Onion.mp3');
    audio.loop = true;
    audio.play();

    return () => {
      audio.pause();
      audio.currentTime = 0; 
      audio.src = ''; 
    }
  },[])

  return (
    <div className='app'>

      <Scene type="typ"/>

      <header className='app__header'>
        <h1>CorpoRATion</h1>
      </header>

      <main>
        <LetterBoxInput sentence={lesson.sentece} words={lesson.words}/>
        <div><span className=''>{lesson.sentence}</span></div>
        <Hint text="Nakurwiaj szybko!" character="rat" />
      </main>



      <span className='loader loader--small'></span>

      <footer>Footer sratatata</footer>
    </div>
  )
}

export default Game
