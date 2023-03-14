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
    const [categories, setCategories] = useState('yes');
    const [banners, setBanners] = useState([]);
    function closeModal() {
        setModalOpen(false);
    }
    function openModal() {
        setModalOpen(true);
    }
    let data;
    const allBannersData = async () => {
        data = await getAllBanners();
        console.log(data.data.data)
        setBanners(data.data.data)
    }
    useEffect(() => {
        allBannersData();

    }, [banners])
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
                    {
                        banners.map((banner, index) => (
                            <div className='bBanPar'>
                                <div className='bBanChild'>
                                    <img className='bBanImgOne' src={banner.url} alt='' />
                                    <div className='bCon'>
                                        <p className='bTextTwo'>{banner.name}</p>
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

                                    <p className='bDesText'>{banner.description}</p>
                                </div>
                                <img src={Lock} alt='' className='bLoc' />
                            </div>
                        ))
                    }

                </div>

            </div>

        </div>
    )
}

export default Banner