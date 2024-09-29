import { useEffect, useState, useRef, useContext } from 'react';
import LetterBoxInput from '../../components/LetterBoxInput/letterBoxInput';
import Scene from '../../components/Scene/scene';
import useAPI from '/src/useAPI';
import {fetchFromApi} from '/src/useAPI';

import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from '../../UserContext';


import './game.scss';
function Game() {
    const timer = useRef({interval:null, time: 20, maxTime: 20});
    const { categoryId } = useParams();
    const category = localStorage.getItem("category")
    const navigate = useNavigate();
    const gameplay = useRef(getGameplay());
    const user = useContext(UserContext);
    
    const [data, setData] = useAPI({url: categoryId ? "generate-sentences?categoryId="+categoryId+"&learningLanguage="+user.current.learnedLanguage : null, 
        data: {learningLanguage: user.current.learnedLanguage}});
    const [game, setGame] = useState(0);
    const [finished, setFinished] = useState(false);
    const [stages, setStages] = useState()
    const [progress, setProgress] = useState(0);
    const score = useRef({wins: 0, time: 0, score: 0})

   const buildScore = () => {
    const acc = Math.round(((score.current.wins / stages.length *100) + score.current.score*2)/3);
    console.log(score.current.score)
    return {
        acc: acc,
        time: score.current.time,
        points: Math.round(((timer.current.maxTime-score.current.time)/timer.current.maxTime*100+acc)/2)
    }}
   

  useEffect(() => {
    
    let audio = new Audio('/Onion.mp3');
    audio.loop = true;
    audio.play();

    if(!categoryId &&  !gameplay.current?.sentences?.length  && !data?.sentences?.length){
        navigate('/menu');
    }

    return () => {
      audio.pause();
      audio.currentTime = 0;
      audio.src = '';
    }
  }, [])

  useEffect(()=>{

    if(stages && game == stages.length){
        setFinished(true);
    }
    if(stages)
        setProgress((game)/(stages.length-1)*100)

    if(isWholeSentence()) {

        console.log("timer start")
        console.log(game)
        console.log(stages)
        timer.current.interval=setInterval(()=>{
            timer.current.time -= 1;
            if(timer.current.time <=0){
                timer.current.time = 0
                clearInterval(timer.current.interval);
            }
            setProgress(timer.current.time/20*100)
        }, 1000)
    }

    return () => clearInterval(timer.current.interval)
  },[game])

  useEffect(()=>{ console.log(data)
    
    if(!data?.sentences && gameplay.current.sentences && !categoryId){
        setData(gameplay.current)
    }
    if(data?.sentences?.length && !finished){
        localStorage.setItem("sentences", JSON.stringify(data))
        const words = data.sentences[0].words.map(word=>({
            text: word.learnedLanguage, 
            words: word.learnedLanguage.split(" "),
            native: word.nativeLanguage
        }))
        const sentence = {
            text: data.sentences[0].content, 
            words: data.sentences[0].words.map(word=> word.learnedLanguage),
            native: data.sentences[0].translatedContent
        }
        setStages([...words, sentence])
    }
    if(categoryId)
        localStorage.setItem("category", categoryId)
  }, [data])

  const successHandler = () => {
    console.log("successhandler")

    score.current.wins +=1;
    setGame(game + 1)
  }

  const errorHandler = async () => {
    const word = stages[game].words[0];
    const catid= categoryId ? categoryId : category;
    console.log("add word:")
    console.log(word)
    console.log(catid)
    await fetchFromApi({ url: "learning-word" , user, method: "POST",  data: { learningWord: word, categoryId: catid} });
    console.log("error send")
    setGame(game + 1)
  }

  const timeHandler = ({acc}) => {
    score.current.time= timer.current.maxTime - timer.current.time;
    score.current.score= acc;

    setGame(game + 1)
  }

  const handleSceneClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const [helpers, setHelpers] = useState(true);

  const toggleHelpers = () => {
    setHelpers(!helpers);
  };

  const isWholeSentence = () => stages && (game+1 == stages.length)

  return (
    <Scene type="typ" onClick={handleSceneClick}>
      
        <section className='info'>
          <div className="progress-section">
            <progress id="file" className={(isWholeSentence() ? "reverse" : "")} value={progress} max="100"> </progress>
            <div className={"clock "+(isWholeSentence() ? "" : "hidden")} >
              <img width="40" src="/img/clock.svg" alt="clock" />
              <b noise="tic"></b>
              <b noise="tac"></b>
            </div>
          </div>
        </section>
        
        <section className='content'>
          {
            stages && stages.length &&  game != stages.length ? 
            <>
              <LetterBoxInput
                sentence={stages[game].text}
                words={stages[game].words}
                onSuccess={successHandler}
                onFailure={errorHandler}
                onTime={timeHandler}
                noMistakes={!isWholeSentence()}
                helpers={helpers}/>
              <span className="translate-section">{stages[game].native}</span>
            </>
            : finished ? <SaveGameplay sentences={data.sentences.slice(1)} score={buildScore()}/>
            : <span className="loader loader--small"></span>
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
        <div className="pizza">
          <img src="/img/pizza.png" alt="pizza" />
        </div>
        <div className="monstera">
          <img src="/img/monstera.png" alt="monstera" />
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
        console.log("read sentences")
        console.log(last_sentences)
        return last_sentences
    } catch(error){
        console.error(error)
        return null;
    }
}

const SaveGameplay = ({score, sentences}) => {
    const navigate = useNavigate();
    const category = localStorage.getItem("category")
    const saved = useAPI({url: "level", data: { "categoryId": category,  "experience":score.points}, method:"POST"})

    useEffect(()=>{
        console.log("saving")
        console.log(score)
        console.log(sentences)
        console.log(category)
        localStorage.setItem("sentences", JSON.stringify({sentences: sentences}))
        console.log(getGameplay())
    },[])

    useEffect(()=>{
        if(saved) {
            console.log("score Saved!")
            navigate('/summary/'+score.acc+'/'+score.time+'/'+score.points);
        }
    },[saved])

    return <span className="loader loader--medium"></span>

}

