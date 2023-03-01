import React from 'react';
import axios from "axios";
import { useState, useEffect } from "react";
import './gallery.css';
import CloseIcon from '@material-ui/icons/Close';
import InfoIcon from '@material-ui/icons/Info';
import DeleteIcon from '@material-ui/icons/Delete';

const Gallery = () => {
    const [data, setData] = useState([]);
    
    useEffect(() => {
        axios
        .get("http://localhost:3001/allImages")
        .then((res) => setData(res.data))
        .catch((err) => console.log(err, "it has an error"));
    });

    const arrayBufferToBase64 = function (buffer: any) {
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
    };

    const [model, setModel] = useState(false);
    const [infomodel, setInfoModel] = useState(false);
    const [tempimgSrc, setTempImgSrc] = useState('');
    const [imageid, setImageId] = useState('');
    const [imagename, setImageName] = useState('');
    const [imageartist, setImageArtist] = useState('');
    const [imagebuyer, setImageBuyer] = useState('');

    const getImg = (imgSrc: string, image: any) => {
        setTempImgSrc(imgSrc);
        setModel(true);
        setImageId(image._id);
        setImageArtist(image.artist);
        setImageName(image.name);
        setImageBuyer(image.buyer);
    }

    const showInfo = function() {
        setModel(false);
        setInfoModel(true);
    }

    const hideInfo = function() {
        setInfoModel(false);
        setModel(true);
    }

    const deleteImage = function() {
        axios.delete("http://localhost:3001/deleteImg/" + imagename);
        setModel(false);
        const newData = data.filter((item) => (item as any).name !== imagename);
        setData(newData);
    }

    return (
        <>
        <div className={model? "model open" : "model"}>
            <img src={tempimgSrc} />
            <div style={{
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
            }}>
                <CloseIcon className="close" onClick={() => setModel(false)}></CloseIcon>
                <InfoIcon onClick={() => showInfo()}></InfoIcon>
                <DeleteIcon onClick={() => deleteImage()}></DeleteIcon>
            </div>
        </div>
        <div className={infomodel? "infomodel open" : "infomodel"}>
            <div className="imageinfo">
                <p style={{textAlign: 'center', fontSize: '40px', fontWeight: 'bold'}}>Art ID: <div style={{textAlign: 'center', fontSize: '40px', fontWeight: 'normal'}}>{imageid}</div></p>
                <p style={{textAlign: 'center', fontSize: '40px', fontWeight: 'bold'}}>Name: <div style={{textAlign: 'center', fontSize: '40px', fontWeight: 'normal'}}>{imagename}</div></p>
                <p style={{textAlign: 'center', fontSize: '40px', fontWeight: 'bold'}}>Artist: <div style={{textAlign: 'center', fontSize: '40px', fontWeight: 'normal'}}>{imageartist? imageartist: "NA"}</div></p>
                <p style={{textAlign: 'center', fontSize: '40px', fontWeight: 'bold'}}>Buyer: <div style={{textAlign: 'center', fontSize: '40px', fontWeight: 'normal'}}>{imagebuyer? imagebuyer: "NA"}</div></p>
                <div style={{
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                }}>
                    <CloseIcon className="close" onClick={() => hideInfo()}></CloseIcon>
                </div>
            </div>
        </div>
        <div className="gallery">
            {data.map((item, index) => {
                const base64String = arrayBufferToBase64((item as any).img.data.data);
                return (
                    <div className="pics" key={index} onClick={() => getImg(`data:image/png;base64,${base64String}`, item)}>
                        <img src ={`data:image/png;base64,${base64String}`} style={{width: '100%'}} />
                    </div>
                )
            })
            }
        </div>
        </>
    );   
}

export default Gallery;