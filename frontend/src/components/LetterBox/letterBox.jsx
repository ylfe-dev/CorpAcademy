import { useEffect, useState } from 'react';
import './letter-box.scss'

function LetterBox ({letter, writable, written, cqSize, state, helpers}) {
    const bottomPaddingRatio = state == "active" ? 3 : 6;
   

    const letter_container_style = {
        marginInline: buildCssMin(cqSize, 14),
        borderRadius: buildCssMin(cqSize, 5),

    }
    const letter_style = {
        fontSize: buildCssMin(cqSize),
        paddingInline:  buildCssMin(cqSize, 2.5),
        // paddingBottom: buildCssMin(cqSize, bottomPaddingRatio),
        marginBottom: buildCssMin(cqSize, 6),
        borderRadius: buildCssMin(cqSize, 6)
    }

    useEffect(()=> {

    },[])

    const is_wrong = written && written != letter;


    return writable ? (
        <div className={"letter-box letter-box--" + state + (is_wrong ? " wrong" : "") + (helpers ? " letter-box--helpers" : "")} style={letter_container_style}>
            <div style={letter_style} className='letter-box__inner'>
                <span>{written ? written : letter}</span>
            </div>
        </div>
    ) : <span className={"non-writable non-writable--" +state} style={{fontSize: letter_style.fontSize}}>{letter}</span>
}

export default LetterBox


const buildCssMin = (size, ratio=1) => "max("+(size.w/ratio)+"cqw, "+ (size.h /ratio)+"cqh)";