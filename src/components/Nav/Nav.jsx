import React from 'react'
import './nav.styles.scss';
import Person from './person.png';
import Search from './sea.png';
import Noti from './noti.png';

const nav = () => {
    return (
        <div className='nav-mainHeading'>
            <div className='nav-headings'>
                <p className='nav-ta'>Banners</p>
                <div className='nav-rightOptions'>
                    <div className='nav-search'>
                        <img src={Search} alt='' />
                    </div>
                    <div className='nav-notifi'>
                        <img src={Noti} alt='' />
                    </div>
                    <div className='nav-profile'>
                        <img src={Person} alt='' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default nav