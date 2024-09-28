import { useEffect, useState } from 'react';
import axios from 'axios';
import './game.scss';
import LetterBoxInput from '../../components/LetterBoxInput/letterBoxInput';
import Scene from '../../components/Scene/scene';
import Hint from '../../components/Hint/hint'
import { useParams } from 'react-router-dom';
import useAPI from '/src/useAPI';


function Game() {
<<<<<<< HEAD
    const { categoryId } = useParams();
    const sentences = useAPI({url: "generate-sentences?categoryId="+categoryId});
    const [game, setGame] = useState(0);
=======
  const [lesson, setLesson] = useState(); //{sentence: "This", words: "this for"});
  const [progress, setProgress] = useState(50);
  const [game, setGame] = useState(0);
  //const games = 




>>>>>>> bbbb90aed799859e05b70db2932cbed95f8bffb7
  

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


  const successHandler = score => {

  }
  const errorHandler = score => {
    setGame(game+1)
  }

  return (
    <Scene type="typ">
      
        <section className='info'>
          <progress id="file"  className="reverse" value={progress} max="100"> 32% </progress>
        
        </section>
        
        <section className='content'>
          {
<<<<<<< HEAD
            sentences.sentences ? 
            <>
              <LetterBoxInput sentence={sentences.sentences[game].content} words={sentences.sentences[game].words} onSuccess={successHandler} onFailure={errorHandler}/>
              <span>{sentences.sentences[game].content}</span>
=======
            lesson ?  
            <>
              <LetterBoxInput sentence={lesson.sentence} words={lesson.words} onSuccess={successHandler} onError={errorHandler}/>
              <div className="translate-section"><span>{lesson.sentence}</span></div>
>>>>>>> bbbb90aed799859e05b70db2932cbed95f8bffb7
            </>
            : <span className="loader loader--medium"></span> 
          }
        </section>
        
        <section className='action'>
          {/* {<Hint text="Nakurwiaj szybko!" character="rat" />} */}
        </section>

        <div className='background'>
          <div className="fat-cat shadow">
            <img src="img/fat cat.png" alt="fat cat"/>
            <b noise="tap"></b>
            <b noise="bam"></b>
          </div>
          <div className="smart-rat shadow">
              <img src="img/smart rat.png" alt="smart rat"/>
              <b noise="click"></b>
          </div>
        </div>

    </Scene>
  )
}

export default Game


const res = {sentences: [
  {
      "content": "I use my computer to browse the internet.",
      "words": [
          {
              "nativeLanguage": "komputer",
              "learnedLanguage": "computer"
          },
          {
              "nativeLanguage": "przeglądać",
              "learnedLanguage": "browse"
          },
          {
              "nativeLanguage": "internet",
              "learnedLanguage": "internet"
          }
      ]
  },
  {
      "content": "My favorite software for editing photos is very user-friendly.",
      "words": [
          {
              "nativeLanguage": "oprogramowanie",
              "learnedLanguage": "software"
          },
          {
              "nativeLanguage": "edycja",
              "learnedLanguage": "editing"
          },
          {
              "nativeLanguage": "przyjazny dla użytkownika",
              "learnedLanguage": "user-friendly"
          }
      ]
  },
  {
      "content": "I need to upgrade my hardware to improve performance.",
      "words": [
          {
              "nativeLanguage": "ulepszyć",
              "learnedLanguage": "upgrade"
          },
          {
              "nativeLanguage": "sprzęt",
              "learnedLanguage": "hardware"
          },
          {
              "nativeLanguage": "wydajność",
              "learnedLanguage": "performance"
          }
      ]
  },
  {
      "content": "The new game requires a powerful graphics card.",
      "words": [
          {
              "nativeLanguage": "gra",
              "learnedLanguage": "game"
          },
          {
              "nativeLanguage": "wymaga",
              "learnedLanguage": "requires"
          },
          {
              "nativeLanguage": "karta graficzna",
              "learnedLanguage": "graphics card"
          },
          {
              "nativeLanguage": "potężny",
              "learnedLanguage": "powerful"
          }
      ]
  },
  {
      "content": "Backing up data is essential to prevent loss.",
      "words": [
          {
              "nativeLanguage": "tworzenie kopii zapasowej",
              "learnedLanguage": "backing up"
          },
          {
              "nativeLanguage": "dane",
              "learnedLanguage": "data"
          },
          {
              "nativeLanguage": "niezbędny",
              "learnedLanguage": "essential"
          },
          {
              "nativeLanguage": "zapobiegać",
              "learnedLanguage": "prevent"
          },
          {
              "nativeLanguage": "utrata",
              "learnedLanguage": "loss"
          }
      ]
  }
]}
