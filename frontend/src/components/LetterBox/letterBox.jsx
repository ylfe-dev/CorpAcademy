import { useEffect, useState } from 'react';
import './letter-box.scss'

function LetterBox ({letter, writable, cqSize, state}){
    const bottomPaddingRatio = state == "active" ? 4 : 6;

    const letter_container_style = {
        marginInline: buildCssMin(cqSize, 14),
        borderRadius: buildCssMin(cqSize, 5),

    }
    const letter_style = {
        fontSize: buildCssMin(cqSize),
        paddingInline:  buildCssMin(cqSize, 2.5),
        paddingBottom: buildCssMin(cqSize, bottomPaddingRatio),
        marginBottom: buildCssMin(cqSize, 6),
        borderRadius: buildCssMin(cqSize, 6)
    }
    

    return writable ? (
        <div className={"letter-box letter-box--" + state} style={letter_container_style}>
            <div style={letter_style} className='letter-box__inner'>
                <span>{letter}</span>
            </div>
        </div>
    ) : <span class="non-writable" style={{fontSize: letter_style.fontSize}}>{letter}</span>
}

export default LetterBox


const buildCssMin = (size, ratio=1) => "min("+(size.w/ratio)+"cqw, "+ (size.h /ratio)+"cqh)";