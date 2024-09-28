import { useEffect, useState } from 'react';
import axios from 'axios';
import './game.scss';
import LetterBoxInput from '../../components/LetterBoxInput/letterBoxInput';
import Scene from '../../components/Scene/scene';
import Hint from '../../components/Hint/hint'


function Game() {
  const [lesson, setLesson] = useState(); //{sentence: "This", words: "this for"});
  const [progress, setProgress] = useState(50);
  const [game, setGame] = useState(0);
  //const games = 




  

  useEffect(()=>{
    /* 
    let audio = new Audio('/Onion.mp3');
    audio.loop = true;
    audio.play();
    */

    const guid = "c395d9ea-d686-41e7-8977-2f87f0e99fb9";
    const category_id = "716a9b28-240a-43ea-bdcd-de48cfb288de";
    const sentence_url = "https://corporationacademy-e0gshgcqahaye4aa.polandcentral-01.azurewebsites.net/api/generate-sentences?categoryId=";
   
     getData(sentence_url+category_id, guid);
    

    return () => {
      /*audio.pause();
      audio.currentTime = 0; 
      audio.src = ''; */
    }
  },[])

  const successHandler = score => {

  }
  const errorHandler = score => {

  }

  return (
    <Scene type="typ">
      
        <section className='info'>
          <progress id="file"  className="reverse" value={progress} max="100"> 32% </progress>
        
        </section>
        
        <section className='content'>
          {
            lesson ? 
            <>
              <LetterBoxInput sentence={lesson.sentence} words={lesson.words} onSuccess={successHandler} onError={errorHandler}/>
              <div className="translate-section"><span>{lesson.sentence}</span></div>
            </>
            : <span className="loader"></span> 
          }
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



const getData = async (url, guid) => {
  let data = undefined;
  do {
    try {
      const response = await axios.get(url, {headers: { 'userId': guid }});
      data = response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  } while(false)
    console.log(data)
  return data
}