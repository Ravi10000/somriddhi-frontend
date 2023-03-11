import React, { useState, useNavigate } from 'react'
import './topbar.styles.scss';
import Logo from './logo.png';
import Dot from './Dot.png';
import allMenus from './Data.js';
import { allHelp } from './Data.js';

const Topbar = () => {
    const [isClicked, setIsClicked] = useState(0);

    return (
        <div className='drawer'>
            <div className='logo'>
                <img className='logoImg' src={Logo} alt='' />
            </div>
            <div class='allMenu'>
                {
                    allMenus.map((item, index) => (
                        <div>

                            {(isClicked === index + 8) ? (
                                <div className='menuC'>
                                    <p className='menuTextC'>{item.name}</p>
                                </div>
                            ) : (
                                <div className='menuNC' onClick={(e) => { setIsClicked(index + 8) }} >
                                    <p className='menuTextNC'>{item.name}</p>
                                </div>
                            )}
                        </div>


                    ))
                }
            </div>
            <div className='btMenu'>
                {
                    allHelp.map((item, index) => (
                        <div>
                            {(isClicked === index) ? (
                                <div className='menuC'>
                                    <img className='dot' src={Dot} alt='' />
                                    <p className='dotmenuTextC'>{item.name}</p>
                                </div>
                            ) : (
                                <div className='dotmenuNC' onClick={(e) => { setIsClicked(index) }} >
                                    <img className='dot' src={Dot} alt='' />
                                    <p className='dotmenuTextC'>{item.name}</p>
                                </div>
                            )}
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Topbar