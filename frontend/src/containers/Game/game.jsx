import { useEffect, useState } from 'react';
import axios from 'axios';
import './game.scss';
import LetterBoxInput from '../../components/LetterBoxInput/letterBoxInput';
import Scene from '../../components/Scene/scene';
import Hint from '../../components/Hint/hint'
import { useParams } from 'react-router-dom';
import useAPI from '/src/useAPI';
import { useNavigate } from "react-router-dom";

function Game() {
    const { categoryId } = useParams();
    const sentences = useAPI({url: "generate-sentences?categoryId="+categoryId});
    const [game, setGame] = useState(0);

    const [progress, setProgress] = useState(0);

    const navigate = useNavigate();

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

  useEffect(()=>{
    if(sentences.sentences && game == sentences.sentences.length-1)
        navigate('/summary');
    setProgress(game/5*100)
  },[game])

  const successHandler = () => {

  }

  const errorHandler = () => {
    setGame(game+1)
  }

  const timeHandler = time => {

  }
  
  return (
    <Scene type="typ">
      
        <section className='info'>
          <progress id="file"  className="reverse" value={progress} max="100"> 32% </progress>
        
        </section>
        
        <section className='content'>
          {
            sentences.sentences ? 
            <>
              <LetterBoxInput 
                sentence={sentences.sentences[game].content} 
                words={sentences.sentences[game].words} 
                onSuccess={successHandler} 
                onFailure={errorHandler}
                onFinish={timeHandler}/>
              <span>{sentences.sentences[game].content}</span>
            </>
            : <span className="loader loader--medium"></span> 
          }
        </section>
        
        <section className='action'>
          {/* {<Hint text="Nakurwiaj szybko!" character="rat" />} */}
        </section>

        <div className='background'>
          <div className="fat-cat shadow">
            <img src="/img/fat%20cat.png" alt="fat cat"/>
            <b noise="tap"></b>
            <b noise="bam"></b>
          </div>
          <div className="smart-rat shadow">
              <img src="/img/smart%20rat.png" alt="smart rat"/>
              <b noise="click"></b>
          </div>
        </div>

    </Scene>
  )
}

export default Game

