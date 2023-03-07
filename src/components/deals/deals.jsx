import './deals.styles.scss';

import React from 'react'
import DealCard from './deal-card/deal-card';

export default function Deals() {
    return (
        <section className='deals-section'>
            <h2>Deal Of The Day</h2>
            <DealCard />
        </section>
    )
}
