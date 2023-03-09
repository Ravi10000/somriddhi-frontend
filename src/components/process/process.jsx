import './process.styles.scss';

import React from 'react'

export default function Process() {
    return (
        <section className='process-section'>
            <h2 className='_title'>How It Works?</h2>
            <div className="process-cards-container">
                <div className="process-card">
                    <div className="img-container">
                        <img src="/signup.png" alt="" />
                    </div>
                    <h4>signup</h4>
                    <p>If you are going to use a passage of Lorem Ipsum, you need to be sure there</p>
                    <img className='arrow' src="/arrow.png" alt="" />
                </div>
                <div className="process-card">
                    <div className="img-container">
                        <img src="/coupon.png" alt="" />
                    </div>
                    <h4>Choose Coupon</h4>
                    <p>If you are going to use a passage of Lorem Ipsum, you need to be sure there</p>
                    <img className='arrow flip' src="/arrow-fliped.png" alt="" />

                </div>
                <div className="process-card">
                    <div className="img-container">
                        <img src="/coupon2.png" alt="" />
                    </div>
                    <h4>Grab Coupon</h4>
                    <p>If you are going to use a passage of Lorem Ipsum, you need to be sure there</p>
                </div>
            </div>
        </section>
    )
}
