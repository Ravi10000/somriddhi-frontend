import "./add-Deal-Modal.styles.scss";

import React, { useEffect, useState } from "react";
// import Button from "../../button/button";
import Button from "../../components/button/button";
import Arrow from './arrow.png';
import Cross from './cross.png';
import Upload from './upload.png';
import { data } from "./Data";
import { createNewCategory } from '../../api/index.js';

export default function AddDealModal({ closeModal, categories, setCategories }) {
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "unset";
        };
    });

    const [file, setFile] = useState();
    const [categoryname, setCategoryName] = useState('');
    const [categoryUrl, setUrl] = useState('');

    const saveFile = (e) => {
        setFile(e.target.files[0]);
    };
    const addCategory = async () => {
        console.log(file)
        console.log(categoryname)
        console.log(categoryUrl)

        const formData = new FormData();
        formData.append("categoryPhoto", file);
        formData.append("name", categoryname);
        formData.append("description", categoryUrl);

        const catgeory = await createNewCategory(formData);
        console.log(catgeory);
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
                    <p className='addBannerText'>Add Banner</p>
                    <div className="arrowLeftic">
                        <div className="closeDiv" onClick={closeModal}>
                            <img src={Cross} alt="" />
                        </div>
                    </div>
                </div>
                <div className="fileUpload">
                    <div className="fileLabel">
                        <div className="fileLabelText">Icon</div>
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
                        <input className="fileFieldTwo" onChange={(e) => setCategoryName(e.target.value)} placeholder="Enter Category Name" />
                    </form>


                </div>
                <div className="fileText">
                    <div className="fileLabel">
                        <p className="textOne"  >URL</p>
                    </div>
                    <form >
                        <input className="fileFieldTwo" onChange={(e) => setUrl(e.target.value)} placeholder="Image Category url" />
                    </form>


                </div>

                <button onClick={addCategory} className="formButton"> <span className="addBannerClass">Add Banner</span> </button>
            </div>


        </div>
    );
}
