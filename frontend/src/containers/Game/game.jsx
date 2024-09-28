import { useEffect, useState, useRef } from 'react';
import LetterBoxInput from '../../components/LetterBoxInput/letterBoxInput';
import Scene from '../../components/Scene/scene';
import useAPI from '/src/useAPI';
import { useNavigate, useParams } from "react-router-dom";

import './game.scss';
function Game() {
    const { categoryId } = useParams();
    const last_sentences = localStorage.getItem("sentences");
    const sentences = (categoryId || !last_sentences) ? useAPI({url: "generate-sentences?categoryId="+categoryId}) : last_sentences;
    const [game, setGame] = useState(0);
    const [stage, setStage] = useState()
    const [progress, setProgress] = useState(0);
    const score = useRef({wins: 0, time: 0, score: 0})

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
        navigate('/summary/');
    setProgress(game/5*100)
  },[game])

  useEffect(()=>{
    if(sentences.sentences){
        localStorage.setItem("sentences", sentences)
    }
  },[sentences])

  const successHandler = () => {
    score.current = {...score.current, wins: score.current.wins+1};
    setGame(game+1)
  }

  const handleSceneClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const errorHandler = () => {
    setGame(game+1)
  }

  const timeHandler = time => {

  }
  
  return (
    <Scene type="typ" onClick={handleSceneClick}>
      
        <section className='info'>
          <div className="progress-section">
            <progress id="file"  className="reverse" value={progress} max="100"> 32% </progress>
            <div className="clock">
              <img width="40" src="/img/clock.svg" alt="clock" />
              <b noise="tic"></b>
              <b noise="tac"></b>
            </div>
          </div>
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
              <span className="translate-section">{sentences.sentences[game].content}</span>
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

