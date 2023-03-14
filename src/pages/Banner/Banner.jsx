import React, { useEffect, useState } from 'react'
import './banner.styles.scss';
import Topbar from '../../components/Topbar/Topbar'
import Nav from '../../components/Nav/Nav'
import Add from './add.png';
import Banner1 from './banner1.png';
import Calender from './calender.png';
import Links from './link.png';
import Lock from './lock.png';
import { Link } from 'react-router-dom';
import AddBannerModal from './AddBannerModal';
import { data } from './Data';
import { getAllBanners } from '../../api/index';

const Banner = (props) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [categories, setCategories] = useState(true);
    function closeModal() {
        setModalOpen(false);
    }
    function openModal() {
        setModalOpen(true);
    }
    useEffect(() => {
        getAllBanners();
    }, [])
    return (
        <div>
            {modalOpen && <AddBannerModal closeModal={closeModal} categories={categories} setCategories={setCategories} />}
            <Topbar />
            <Nav />
            <div className='bMainContent'>
                <div className='bHeading'>
                    <div className='bTwoTab'>
                        <div className='bTextOneDiv'>
                            <p className='bTextOne'>All Banners</p>
                        </div>
                    </div>
                    <div className='bAddButton'>
                        <div className='bBtnDiv'>
                            <img src={Add} alt='' />
                            <p className='bBtnTextOne' onClick={(e) => setModalOpen(true)}>Add</p >
                        </div>
                    </div>
                </div>


                <div className='bBanner'>
                    <div className='bBanPar'>
                        <div className='bBanChild'>
                            <img className='bBanImgOne' src={Banner1} alt='' />
                            <div className='bCon'>
                                <p className='bTextTwo'>Banner 1</p>
                                <div className='bExpOne'>
                                    <img src={Calender} alt='' className='bBanImgThree' />
                                    <p className='bBanTextThree'>Expire on 20 March 2023</p>
                                </div>
                                <div className='bExpTwo'>
                                    <img src={Links} alt='' className='bBanImgThree' />
                                    <p className='bBanTextThree'>Expire on 20 March 2023</p>
                                </div>
                            </div>
                        </div>
                        <div className='bDes'>

                            <p className='bDesText'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                        </div>
                        <img src={Lock} alt='' className='bLoc' />
                    </div>
                </div>

            </div>

        </div>
    )
}

export default Banner