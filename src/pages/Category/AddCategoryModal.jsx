import "./add-Category-Modal.styles.scss";

import React, { useEffect, useState } from "react";
// import Button from "../../button/button";
import Button from "../../components/button/button";
import Arrow from './arrow.png';
import Cross from './cross.png';
import Upload from './upload.png';
import { data } from './ClothData.js';
import { createNewDeal } from '../../api/index.js';

export default function AddDealModal({ closeModal, categories, setCategories }) {
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "unset";
        };
    });

    const [file, setFile] = useState();
    const [dealname, setDealName] = useState('');
    const [dealUrl, setUrl] = useState('');
    const [dealCashbackPercent, setCashbackPercent] = useState('');
    const [dealLiveDate, setLiveDate] = useState('');
    const [dealExpiryDate, setExpiryDate] = useState();

    const saveFile = (e) => {
        setFile(e.target.files[0]);
    };
    const addDeal = async () => {

        const formData = new FormData();
        formData.append("dealPhoto", file);
        formData.append("name", dealname);
        formData.append("url", dealUrl);
        formData.append("cashbackPercent", dealCashbackPercent);
        formData.append("liveDate", dealLiveDate);
        formData.append("expiryDate", dealExpiryDate);

        const deal = await createNewDeal(formData);
        console.log(deal);
        closeModal();
        if (categories == 'yes') {
            setCategories('no');
        }
        else {
            setCategories('yes');
        }
    };

    return (
        <div className="backdrop">
            <div className="loginNew">
                <div className="heading">
                    <div className="arrowLeft">
                        <img src={Arrow} alt="" onClick={closeModal} />
                    </div>
                    <p className='addBannerText'>Add New Deal</p>
                    <div className="arrowLeftic">
                        <div className="closeDiv" onClick={closeModal}>
                            <img src={Cross} alt="" />
                        </div>
                    </div>
                </div>
                <div className="fileUpload">
                    <div className="fileLabel">
                        <div className="fileLabelText">Banner Image</div>
                    </div>
                    <div className="fileField">
                        <div className="fileFieldImage">
                            <img src={Upload} alt="" />

                        </div>
                        <form>
                            <input type="file" accept="image/png, image/jpeg" onChange={(e) => saveFile(e)} className="fileFieldText" placeholder="Upload Image" />
                        </form>
                    </div>
                </div>
                <div className="fileText">
                    <div className="fileLabel">
                        <p className="textOne"  >Name</p>
                    </div>
                    <form >
                        <input className="fileFieldTwo" onChange={(e) => setDealName(e.target.value)} placeholder="Enter Deal Name" />
                    </form>
                </div>
                <div className="fileText">
                    <div className="fileLabel">
                        <p className="textOne">URL</p>
                    </div>
                    <form >
                        <input onChange={(e) => setUrl(e.target.value)} className="fileFieldTwo" placeholder="Paste Deal url" />
                    </form>
                </div>
                <div className="fileText">
                    <div className="fileLabel">
                        <p className="textOne">CashBack</p>
                    </div>
                    <form >
                        <input type='number' className="fileFieldTwo" onChange={(e) => setCashbackPercent(e.target.value)} placeholder="CashBack" />
                    </form>
                </div>
                <div className="fileText">
                    <div className="fileLabel">
                        <p className="textOne">Live Date</p>
                    </div>
                    <form >
                        <input type="Date" onChange={(e) => setLiveDate(e.target.value)} className="fileFieldTwo" placeholder="Select">
                            {/* <option className="fileFieldTwo" placeholder="Now">Now</option> */}
                        </input>
                    </form>
                    {/* <form >
                        <select onChange={(e) => setsetLiveDateUrl(e.target.value)} className="fileFieldTwo" placeholder="Now">
                            <option className="fileFieldTwo" placeholder="Now">Now</option>
                            <option className="fileFieldTwo" placeholder="Now">Later</option>
                            <option className="fileFieldTwo" placeholder="Now">Earlier</option>
                        </select>
                    </form> */}
                </div>

                <div className="fileText">
                    <div className="fileLabel">
                        <p className="textOne">Live Date</p>
                    </div>
                    <form >
                        <input type="Date" onChange={(e) => setExpiryDate(e.target.value)} className="fileFieldTwo" placeholder="Select">
                            {/* <option className="fileFieldTwo" placeholder="Now">Now</option> */}
                        </input>
                    </form>
                </div>
                <button onClick={addDeal} className="formButton"> <span className="addBannerClass">Add Banner</span> </button>
            </div>


        </div>
    );
}
