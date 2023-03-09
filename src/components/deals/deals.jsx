import './deals.styles.scss';

import React from 'react'
import DealCard from './deal-card/deal-card';
import dealList from './deal-list';

export default function Deals() {
    return (
        <section className='deals-section'>
            <h2 className='_title'>Deal Of The Day</h2>
            <div className="deals-container">
                {
                    dealList.map(({ title, imgUrl, details }, index) => <DealCard key={index} title={title} imgUrl={imgUrl} details={details} />)
                }
            </div>
        </section>
    )
}
