import './process.styles.scss';

import React, { useEffect, useState } from 'react'
// import { getAProcess } from '../../api/index.js';

export default function Process() {
    const [processData, setProcessData] = useState([]);

    // const allProcessData = async () => {
    //     const data = await getAProcess();
    //     console.log(data.data.data);
    //     setProcessData(data.data.data);
    // }
    // useEffect(() => {
    //     allProcessData();
    // }, [])
    return (
        <section className='process-section'>
            <h2 className='_title'>How It Works?</h2>
            <div className="process-cards-container">
                {
                    processData.map((item, index) => (
                        <div className="process-card">
                            <div className="img-container">
                                <img src={`${process.env.REACT_APP_API_URL}/uploads/${item.image}`} alt="" />
                            </div>
                            <h4>{item.name}</h4>
                            <p>{item.description} </p>
                            {
                                (index == 0) ? (
                                    <img className='arrow' src="/arrow.png" alt="" />
                                ) : ((index == 2) ? (
                                    <img src="" alt="" />
                                ) : (
                                    <img className='arrow flip' src="/arrow-fliped.png" alt="" />
                                ))
                            }
                            {/* <img className='arrow' src="/arrow.png" alt="" /> */}
                        </div>
                    ))
                }
                {/* <div className="process-card">
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
                </div> */}
            </div>
        </section>
    )
}
