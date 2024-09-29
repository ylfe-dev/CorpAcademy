import { useEffect, useState, useRef } from 'react';
import LetterBox from '../LetterBox/letterBox'
import './letter-box-input.scss'

function LetterBoxInput ({sentence, words, noMistakes=true, onSuccess, onFailure, onTime=null}){ 
    const [input, setInput] = useState("")
    const [mistakes, setMistakes] = useState(0)
    const isMistake = useRef(false);
    const toInput = useRef("");
    
   
    useEffect(()=>{
        if(noMistakes && mistakes>1){
            setTimeout(()=>onFailure(), 600)
        }
    }, [mistakes])

    useEffect(()=>{
        isMistake.current = false;
        setMistakes(0)
        setInput("")
    }, [sentence])

    useEffect(()=>{
        if( input === toInput.current) {
            setTimeout(()=>onSuccess(), 2000)
        }
    }, [input])



    const max_height_vh = 8;
    const min_height_vh = 3;
    const font_size_ratio = 0.65;

    const max_width_vh = sentence.length * max_height_vh;
    const min_width_vh = sentence.length * min_height_vh;
   
    const font_size = {
        w: (100 / sentence.length) / 100 * font_size_ratio * min_width_vh,
        h: (100 / sentence.length) / 100 * font_size_ratio * max_width_vh
    }

    const getLetterState = index => {
        if(toInput.current.length && input === toInput.current)
            return "win";
        if(noMistakes && mistakes>1)
            return "allwrong";
        if(index == input.length+1)
            return isMistake.current ? "wrong" :"active";
        if(index < input.length+1)
            return "done"
        return "blank"
    }

    const handleInput = ev => {
        ev.preventDefault()
        setInput(ev.target.value);
    }

    const handleBeforeInput = ev => {
        if(input == toInput.current){
            ev.stopPropagation()
            ev.preventDefault()
        } else if(ev.data != toInput.current[input.length]){
            setMistakes(mistakes+1)
            isMistake.current = true;
            ev.stopPropagation()
            ev.preventDefault()
        } else {
            isMistake.current = false;
            setMistakes(0)
        }
    }
    console.log("words:")
    console.log(words)
    let sentence_words = filterString(sentence).toLowerCase().split(" ")
    let lesson_words = words.map(word => word.toLowerCase())

    let to_input = ""; 
    let index = 0;
    sentence_words = sentence_words.map(word => {
        const is_lesson_word = lesson_words.includes(word);
        to_input += is_lesson_word ? word : "";

        return [...word].map(letter => {
            
            const written = is_lesson_word && getLetterState(index) != "blank" ? input[index] : null;
            index += is_lesson_word ? 1 : 0;

            return {
                writable: is_lesson_word, 
                written: written,
                letter: letter, 
                state: getLetterState(index)
            }
        })
    })
    toInput.current = to_input;

    return (
        <div className='letter-box-input'>
            <label htmlFor="LetterBoxInput">
                {sentence_words.map((word, index) => <Word key={index} word={word} cqSize={font_size} />)} 
            </label>
            <input 
                autoFocus
                autoComplete="off"
                id="LetterBoxInput"
                type="text" 
                className="letter-box-input" 
                maxLength={toInput.current.length}
                onChange={handleInput}
                onBeforeInput={handleBeforeInput}
                value={input} /> 
        </div>)
}

export default LetterBoxInput


function Word({word, cqSize}){
    return (
    <div className='word' style={{marginInline: buildCssMin(cqSize, 6)}}>
        {[...word].map( (box, index) => 
        <LetterBox 
            key={index} 
            letter={box.letter}
            written={box.written}
            cqSize={cqSize} 
            state={box.state} 
            writable={box.writable}/> 
        )}
    </div>)
}


const buildCssMin = (size, ratio=1) => "max("+(size.w/ratio)+"cqw, "+ (size.h /ratio)+"cqh)";

function filterString(str) {
    return str.replace(/[^a-zA-Z\s]/g, '');
  }
  