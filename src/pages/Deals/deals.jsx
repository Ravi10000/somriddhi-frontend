import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import './deal.styles.scss';
import Topbar from '../../components/Topbar/Topbar'
import Nav from '../../components/Nav/Nav'
import Add from './add.png';
import Cloth from './cloth.png';
import AddDealModal from './AddDealModal';
import { data } from './Data';
import { getAllCategories } from '../../api/index.js';

const Deal = (props) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [categories, setCategories] = useState('yes');
    const [categoriesData, setCategoriesData] = useState([]);
    function closeModal() {
        setModalOpen(false);
    }
    function openModal() {
        setModalOpen(true);
    }
    const allCategories = async () => {
        const data = await getAllCategories();
        console.log(data.data.data)
        setCategoriesData(data.data.data);
    }
    useEffect(() => {
        allCategories();
    }, [categories])
    return (
        <div>
            {modalOpen && <AddDealModal closeModal={closeModal} categories={categories} setCategories={setCategories} />}
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
                            <p className='bBtnTextOne' onClick={(e) => setModalOpen(true)}>Add</p>
                        </div>
                    </div>
                </div>
                <div className='rOne'>
                    {
                        categoriesData.map((category, index) => (
                            <div className='cat'>
                                <div className='ic'>
                                    <img src={category.description} alt='' className='clothImg' />
                                </div>
                                <p className='clothText'>{category.name} </p>
                            </div>
                        ))
                    }

                </div>


            </div>
        </div>
    )
}

export default Deal