import React, { useState } from 'react'
import './deal.styles.scss';
import Topbar from '../../components/Topbar/Topbar'
import Nav from '../../components/Nav/Nav'
import Add from './add.png';
import Cloth from './cloth.png';


const Deal = (props) => {
    return (
        <div>
            <Topbar />
            <Nav />
            <div className='bMainContent'>
                <div className='bHeading'>
                    <div className='bTwoTab'>
                        <div className='bTextOneDiv'>
                            <p className='bTextOn'>All Deals</p>
                        </div>
                    </div>
                    <div className='bAddButton'>
                        <div className='bBtnDiv'>
                            <img src={Add} alt='' />
                            <p className='bBtnTextOne'>Add</p>
                        </div>
                    </div>
                </div>
                <div className='rOne'>
                    <div className='cat'>
                        <div className='ic'>
                            <img src={Cloth} alt='' className='clothImg' />
                        </div>
                        <p className='clothText'>Cloth</p>
                    </div>
                    <div className='cat'>
                        <div className='ic'>
                            <img src={Cloth} alt='' className='clothImg' />
                        </div>
                        <p className='clothText'>Cloth</p>
                    </div>
                    <div className='cat'>
                        <div className='ic'>
                            <img src={Cloth} alt='' className='clothImg' />
                        </div>
                        <p className='clothText'>Cloth</p>
                    </div>
                    <div className='cat'>
                        <div className='ic'>
                            <img src={Cloth} alt='' className='clothImg' />
                        </div>
                        <p className='clothText'>Cloth</p>
                    </div>
                    <div className='cat'>
                        <div className='ic'>
                            <img src={Cloth} alt='' className='clothImg' />
                        </div>
                        <p className='clothText'>Cloth</p>
                    </div>
                    <div className='cat'>
                        <div className='ic'>
                            <img src={Cloth} alt='' className='clothImg' />
                        </div>
                        <p className='clothText'>Cloth</p>
                    </div>
                    <div className='cat'>
                        <div className='ic'>
                            <img src={Cloth} alt='' className='clothImg' />
                        </div>
                        <p className='clothText'>Cloth</p>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Deal