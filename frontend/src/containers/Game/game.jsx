import { useEffect, useState } from 'react';
import axios from 'axios';
import './game.scss';
import LetterBoxInput from '../../components/LetterBoxInput/letterBoxInput';
import Scene from '../../components/Scene/scene';
import Hint from '../../components/Hint/hint'


function Game() {
  const [lesson, setLesson] = useState({sentence: "This", words: "this for"});
  const [progress, setProgress] = useState(50);

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
          <progress id="file"  className="reverse" value={progress} max="100"> 32% </progress>
        
        </section>
        
        <section className='content'>
          <LetterBoxInput sentence={lesson.sentence} words={lesson.words}/>
          <div className="translate-section"><span className=''>{lesson.sentence}</span></div>
        </section>
        
        <section className='action'>
          {/* {<Hint text="Nakurwiaj szybko!" character="rat" />} */}
        </section>

        <div className='background'>
          <div class="fat-cat shadow">
            <img src="img/fat cat.png" alt="fat cat"/>
            <b noise="tap"></b>
            <b noise="bam"></b>
          </div>
          <div class="smart-rat shadow">
              <img src="img/smart rat.png" alt="smart rat"/>
              <b noise="click"></b>
          </div>
        </div>

    </Scene>
  )
}

export default Game
