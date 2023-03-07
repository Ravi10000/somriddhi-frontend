import './offers.styles.scss'
import React from 'react'
import OfferCard from './offer-card/offer-card'
import offerList from './offers-list'
console.log(offerList)
export default function Offers() {
    return (
        <section className='offers-section'>
            <div className="categories">
                <div className="category">
                    <img src="/popular.png" alt="" />
                    <p>Popular</p>
                </div>
                <div className="category selected">
                    <img src="/ending.png" alt="" />
                    <p>Ending Soon</p>
                </div>
                <div className="category">
                    <img src="/latest.png" alt="" />
                    <p>Latest Coupons</p>
                </div>
            </div>
            <div className='offers-container'>
                {
                    offerList?.map(({title, discount, imgUrl}, index) => <OfferCard key={index} title={title} discount={discount} imgUrl={imgUrl} />)
                }
            </div>
        </section>
    )
}
