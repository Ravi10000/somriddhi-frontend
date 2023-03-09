import './carousel.styles.scss';

import React, { useEffect, useState } from 'react'

export default function Carousel({ listOfItems }) {
    const [current, setCurrent] = useState(0);

    return (
        <div className='carousel'>
            {
                listOfItems.map((img, index) =>
                    <div className='img-container' key={index} style={{ display: `${current === index ? 'block' : 'none'} ` }}>
                        <img src={img} />
                    </div>)
            }
            <div className="switches">
                {
                    listOfItems.map((img, index) =>
                        <div className={`switch ${index === current && 'current'}`} id={index} key={index} onClick={() => { setCurrent(index) }}></div>)
                }
            </div>
        </div>
    )
}
