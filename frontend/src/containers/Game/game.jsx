import { useEffect, useState, useRef, useContext } from 'react';
import LetterBoxInput from '../../components/LetterBoxInput/letterBoxInput';
import Scene from '../../components/Scene/scene';
import useAPI from '/src/useAPI';
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from '../../UserContext';

import './game.scss';
function Game() {
    const { categoryId } = useParams();
    const navigate = useNavigate();
    const last_sentences = getGameplay();
    console.log(last_sentences)

    if(!categoryId && !last_sentences){
        navigate('/menu');
    }
    const sentences =  categoryId ? useAPI({url: "generate-sentences?categoryId="+categoryId}) : last_sentences ? last_sentences : null;
    const [game, setGame] = useState(0);
    const [stage, setStage] = useState()
    const [progress, setProgress] = useState(0);
    const score = useRef({wins: 0, time: 0, score: 0})


   

  useEffect(() => {
    let audio = new Audio('/Onion.mp3');
    audio.loop = true;
    audio.play();


    return () => {
      audio.pause();
      audio.currentTime = 0;
      audio.src = '';
    }
  }, [])

  useEffect(()=>{
    if(sentences.sentences && game == sentences.sentences.length){
        const acc = score.current.wins / sentences.sentences.length;
        let new_sentences = sentences.sentences.slice(1);
        console.log(new_sentences)
        localStorage.setItem("sentences", JSON.stringify({sentences: new_sentences}))
        navigate('/summary/'+acc+'/74/100');
    }
    setProgress((game+1)/5*100)
  },[game])

  useEffect(()=>{
    if(sentences.sentences){
        localStorage.setItem("sentences", JSON.stringify(sentences))
    }
  }, [sentences])

  const successHandler = () => {
    score.current = { ...score.current, wins: score.current.wins + 1 };
    setGame(game + 1)
  }

  const handleSceneClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const errorHandler = () => {
    setGame(game + 1)
  }

  const timeHandler = time => {
    localStorage.setItem("sentences", JSON.stringify(sentences.sentences.splice(1)))
  }

  const [helpers, setHelpers] = useState(true);

  const toggleHelpers = () => {
    setHelpers(!helpers);
  };

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
            sentences.sentences && game < sentences.sentences.length ? 
            <>
              <LetterBoxInput
                sentence={sentences.sentences[game].content}
                words={sentences.sentences[game].words}
                onSuccess={successHandler}
                onFailure={errorHandler}
                onFinish={timeHandler}
                helpers={helpers}/>
              <span className="translate-section">{sentences.sentences[game].translatedContent}</span>
            </>
            : <span className="loader loader--medium"></span>
        }
      </section>

      <section className='action'>
        <button className="button" onClick={toggleHelpers}>
          {helpers ? 'Wyłącz podpowiedzi' : 'Włącz podpowiedzi'}
        </button>
        {/* {<Hint text="Nakurwiaj szybko!" character="rat" />} */}
      </section>

      <div className='background'>
        <div className="fat-cat shadow">
          <img src="/img/fat%20cat.png" alt="fat cat" />
          <b noise="tap"></b>
          <b noise="bam"></b>
        </div>
        <div className="smart-rat shadow">
          <img src="/img/smart%20rat.png" alt="smart rat" />
          <b noise="click"></b>
        </div>
      </div>

    </Scene>
  )
}

export default Game

const getGameplay =() => {
    try {
        const last_sentences = JSON.parse(localStorage.getItem("sentences"));
        return last_sentences
    } catch(error){
        console.error(error)
        return null;
    }
}