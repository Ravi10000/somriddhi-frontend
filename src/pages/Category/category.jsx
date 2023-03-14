import React, { useEffect, useState } from 'react'
import './add-category.styles.scss';
import Topbar from '../../components/Topbar/Topbar'
import Nav from '../../components/Nav/Nav'
import Add from './add.png';
import Minus from './minus.png';
import Banner from './category.png';
import Delete from './Delete.png';
import Edit from './edit.png';
import { Data } from './Data.js';
import AddCategoryModal from './AddCategoryModal';
import { getAllDeals } from '../../api/index.js';

const Category = (props) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [categories, setCategories] = useState('yes');
    const [deals, setDeals] = useState([]);
    function closeModal() {
        setModalOpen(false);
    }
    function openModal() {
        setModalOpen(true);
    }

    const allDealsData = async () => {
        const allDeals = await getAllDeals();
        console.log(allDeals.data.data);
        setDeals(allDeals.data.data);
    }

    useEffect(() => {
        allDealsData();
    }, [categories])
    return (
        <div>
            {modalOpen && <AddCategoryModal closeModal={closeModal} categories={categories} setCategories={setCategories} />}

            <Topbar />
            <Nav />
            <div className='bMainContent'>
                <div className='bHeading'>
                    <div className='bTwoTab'>
                        <div className='bTextOneDiv'>
                            <p className='bTextOn'>All Categories</p>
                        </div>
                    </div>
                    <div className='bAddButton'>
                        <div className='bBtnDiv'>
                            <img src={Add} alt='' />
                            <p className='bBtnTextOne' onClick={(e) => setModalOpen(true)}>Add</p>
                        </div>
                    </div>
                </div>
                <div className='bDeals'>
                    <div className='parentFilter'>
                        {
                            Data.map((item, index) => (
                                <div className='childFilter'>
                                    <div className='Tag'>
                                        <p className='tagText'>{item.title} </p>
                                        <img src={Minus} alt='' className='tagImage' />
                                    </div>
                                    <div className='List'>
                                        {
                                            item.list.map((listItem, listIndex) => (
                                                <form className='cOne'>
                                                    <input type='checkbox' name='check' />
                                                    <p className='listClass'>{listItem}</p>
                                                </form>
                                            ))
                                        }

                                    </div>
                                </div>
                            ))
                        }

                    </div>
                    <div className='parentDeal'>
                        <div className='childDeal'>
                            {
                                deals.map((deal, index) => (
                                    <div className='nodeDeal'>
                                        <img src={deal.url} alt='' className='dealImg' />
                                        <div className='dealDetails'>
                                            <p className='deatilsIconsText'>{deal.name}</p>
                                            <div className='dealsIcons'>
                                                <img className='editDImg' src={Edit} alt='' />
                                                <img className='deleteDImg' src={Delete} alt='' />
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Category