import { useEffect, useState } from 'react';
import LetterBox from '../LetterBox'
import './style.scss'

function LetterBoxInput ({sentence, words, onSuccess, onFailure}){ 
    const [input, setInput] = useState("")
    
    const max_height_vh = 10;
    const min_height_vh = 8;

    const font_size_ratio = 0.65;


    const max_width_vh = sentence.length * max_height_vh;
    const min_width_vh = sentence.length * min_height_vh;
   
    const font_size = {
        w: (100 / sentence.length) / 100 * font_size_ratio * min_width_vh,
        h: (100 / sentence.length) / 100 * font_size_ratio * max_width_vh
    }

    const getLetterState = index => {
        if(index == input.length+1)
            return "active"
        if(index < input.length+1)
            return "done"
        return "blank"
    }

    
    let sentence_words = sentence.toLowerCase().split(" ")
    let lesson_words = words.toLowerCase().split(" ")

    let to_input = ""; 
    
    let index = 0;
    
    sentence_words = sentence_words.map(word => {
        is_lesson_word = lesson_words.findFirst(word) ? true : false;
        return [...word].map(letter => {
            ++index;
            return {writable: is_lesson_word, letter: letter, state: getLetterState(index)}
        })
    })
    
    return (
        <div className='letter-box-input'>
            <label htmlFor="LetterBoxInput">
                {words.map((word, index) => <Word key={index} word={word} cqSize={font_size} />)}
            </label>
            <input 
                id="LetterBoxInput"
                type="text" 
                className="letter-box-input" 
                maxLength={sentence.length}
                onChange={e => setInput(e.target.value)} /> 
        </div>)
}

export default LetterBoxInput


function Word({word, cqSize}){

    return (
    <div className='word'>
        {[...word].map( (box, index) => 
        <LetterBox 
            key={index} 
            letter={box.letter} 
            cqSize={cqSize} 
            state={box.state} /> 
        )}
    </div>)
}
