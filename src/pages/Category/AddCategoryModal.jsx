import "./add-Category-Modal.styles.scss";

import React, { useEffect, useState } from "react";
// import Button from "../../button/button";
import Button from "../../components/button/button";
import Arrow from './arrow.png';
import Cross from './cross.png';
import Upload from './upload.png';
import { data } from './ClothData.js';

export default function AddDealModal({ closeModal, categories, setCategories }) {
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "unset";
        };
    });

    const [name, setName] = useState('');

    function addCategory(catgeoryName) {
        data.push(name);
        setName(' ');
        closeModal();
        if (categories) {
            setCategories(false);
        }
        else {
            setCategories(true);
        }
    }

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
                            <input type="file" className="fileFieldText" placeholder="Upload Image" />
                        </form>
                    </div>
                </div>
                <div className="fileText">
                    <div className="fileLabel">
                        <p className="textOne"  >Name</p>
                    </div>
                    <form >
                        <input className="fileFieldTwo" onChange={(e) => setName(e.target.value)} placeholder="Enter Banner Name" />
                    </form>
                </div>
                <div className="fileText">
                    <div className="fileLabel">
                        <p className="textOne">URL</p>
                    </div>
                    <form >
                        <input className="fileFieldTwo" placeholder="Paste Banner url" />
                    </form>
                </div>
                <div className="fileText">
                    <div className="fileLabel">
                        <p className="textOne">CashBack</p>
                    </div>
                    <form >
                        <input className="fileFieldTwo" placeholder="CashBack" />
                    </form>
                </div>
                <div className="fileText">
                    <div className="fileLabel">
                        <p className="textOne">Live Date</p>
                    </div>
                    <form >
                        <select className="fileFieldTwo" placeholder="Now">
                            <option className="fileFieldTwo" placeholder="Now">Now</option>
                            <option className="fileFieldTwo" placeholder="Now">Later</option>
                            <option className="fileFieldTwo" placeholder="Now">Earlier</option>
                        </select>
                    </form>
                </div>

                <div className="fileText">
                    <div className="fileLabel">
                        <p className="textOne">Live Date</p>
                    </div>
                    <form >
                        <input type="Date" className="fileFieldTwo" placeholder="Select">
                            {/* <option className="fileFieldTwo" placeholder="Now">Now</option> */}
                        </input>
                    </form>
                </div>

                {/* <div className="textArea">
                    <p className="textAreaText">Description</p>
                    <form>
                        <input className="textAreaInput" placeholder="Write Banner Description" />
                    </form>
                </div> */}
                <button onClick={addCategory} className="formButton"> <span className="addBannerClass">Add Banner</span> </button>
            </div>


        </div>
    );
}
