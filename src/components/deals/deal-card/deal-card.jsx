import './deal-card.styles.scss';

import React from 'react'
import Button from '../../button/button';

export default function DealCard() {
    return (
        <div className='deal-card'>
            <img src="/amazon.png" alt="amazon" />
            <h4 className="title">Amazon</h4>
            <p className="discount">Flat 30% off</p>
            <Button>Grab Now</Button>
        </div>
    )
}
