import "./add-Banner-Modal.styles.scss";

import React, { useEffect, useState } from "react";
// import Button from "../../button/button";
import Button from "../../components/button/button";
import Arrow from './arrow.png';
import Cross from './cross.png';
import Upload from './upload.png';
import { data } from "./Data";
import { createNewBanner } from "../../api/index";

export default function AddDealModal({ closeModal, categories, setCategories }) {
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "unset";
        };
    });



    const [file, setFile] = useState();
    const [bannername, setBannerName] = useState('');
    const [bannerUrl, setUrl] = useState('');
    const [bannerDescription, setBannerDescription] = useState('');


    const saveFile = (e) => {
        setFile(e.target.files[0]);
    };
    const addBanner = async () => {
        console.log(file)
        const formData = new FormData();
        formData.append("bannerPhoto", file);
        formData.append("name", bannername);
        formData.append("description", bannerDescription);
        formData.append("url", bannerUrl);

        const banner = await createNewBanner(formData);
        console.log(banner);
        closeModal();
        if (categories == 'yes') {
            setCategories('no');
        }
        else {
            setCategories('yes');
        }
    };

    // async function addBanner() {
    //     // console.log(file) // path of the file
    //     // let array = file.split('\\');
    //     // console.log(array[array.length - 1]);
    //     // let fileName = array[array.length - 1];
    //     console.log(file)
    //     const newBanner = {
    //         name: bannername,
    //         bannerPhoto: file,
    //         description: bannerDescription,
    //         url: bannerUrl
    //     }
    //     const banner = await createNewBanner(newBanner);
    //     console.log(banner);

    //     // to update the banner ui again
    //     data.push(bannername);
    //     closeModal();
    //     if (categories) {
    //         setCategories(false);
    //     }
    //     else {
    //         setCategories(true);
    //     }
    // }

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
                        <div className="fileLabelText">Banner Image</div>
                    </div>
                    <div className="fileField">
                        <div className="fileFieldImage">
                            <img src={Upload} alt="" />

                        </div>
                        <form>
                            <input type="file" accept="image/png, image/jpeg" onChange={(e) => saveFile(e)} className="fileFieldText" name="file" placeholder="Upload Image" />
                        </form>
                    </div>
                </div>
                <div className="fileText">
                    <div className="fileLabel">
                        <p className="textOne"  >Name</p>
                    </div>
                    <form >
                        <input className="fileFieldTwo" onChange={(e) => setBannerName(e.target.value)} placeholder="Enter Banner Name" />
                    </form>
                </div>
                <div className="fileText">
                    <div className="fileLabel">
                        <p className="textOne" >URL</p>
                    </div>
                    <form >
                        <input className="fileFieldTwo" onChange={(e) => setUrl(e.target.value)} placeholder="Paste Banner url" />
                    </form>
                </div>
                <div className="textArea">
                    <p className="textAreaText">Description</p>
                    <form>
                        <input className="textAreaInput" onChange={(e) => setBannerDescription(e.target.value)} placeholder="Write Banner Description" />
                    </form>
                </div>
                <button onClick={addBanner} className="formButton"> <span className="addBannerClass">Add Banner</span> </button>
            </div>


        </div>
    );
}
