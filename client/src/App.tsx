import React from 'react';
import './App.css';
import axios from "axios";
import { useState, useEffect } from "react";
import Gallery from './Gallery';

function App() {
  const [artistName, setArtistName] = useState('');
  const [image, setImage] = useState('');
  const [artName, setArtName] = useState('');
  const [buyer, setBuyer] = useState('');

  const handleImage = function(event: any) {
    console.log(event.target.files);
    setImage(event.target.files[0]);
  }

  const handleArtist = function(event: any) {
    console.log(event.target.value);
    setArtistName(event.target.value);
  }

  const handleArtName = function(event: any) {
    console.log(event.target.value);
    setArtName(event.target.value);
  }

  const handleBuyer = function(event: any) {
    console.log(event.target.value);
    setBuyer(event.target.value);
  }

  const handleUploadApi = function() {
    const formData = new FormData();
    formData.append('testImage', image);
    formData.append('name', artName);
    formData.append('artist', artistName);
    formData.append('buyer', buyer);
    axios.post("http://localhost:3001/uploadArt", formData)
    .then(() => {console.log("upload success!")})
    .catch((err) => console.log(err, "it has an error"));
  }
  
  return (
    <div className="App">
      <h1 style={{textAlign: 'center', fontSize: '60px'}}>Art Gallery</h1>
      <div style={{ marginBottom: '20px' }}>
        <input style={{ fontSize: '30px' }} type="file" name="file" onChange={handleImage} />
        <label style={{ fontSize: '30px' , marginLeft: '20px', fontWeight: 'bold'}} >Art Name: </label><input style={{ fontSize: '30px' }} type="text" name="artname" onChange={handleArtName} />
        <label style={{ fontSize: '30px' , marginLeft: '20px', fontWeight: 'bold'}} >Artist : </label><input style={{ fontSize: '30px' }} type="text" name="artist" onChange={handleArtist} />
        <label style={{ fontSize: '30px' , marginLeft: '20px', fontWeight: 'bold'}} >Buyer : </label><input style={{ fontSize: '30px' }} type="text" name="buyer" onChange={handleBuyer} />
        <button style={{ fontSize: '30px', marginLeft: '20px', fontWeight: 'bold'}} onClick={handleUploadApi}>Upload</button>
      </div>
      <Gallery></Gallery>
    </div>
  );
}

export default App;

