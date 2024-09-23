import React, { useState, Fragment } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { storage, db } from '../../Firebase'; // Ensure the path is correct
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { addDoc, collection } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Create = () => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const navigate=useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!name || !category || !price || !image) {
      toast.error("Please fill out all fields and upload an image.");
      return;
    }

    try {
      // Upload the image to Firebase Storage
      const imageRef = ref(storage, `images/${image.name}`);
      await uploadBytes(imageRef, image);
      const imageUrl = await getDownloadURL(imageRef);

      // Store the data in Firestore
      await addDoc(collection(db, 'product'), {
        name,
        category,
        price,
        imageUrl,
        createdAt: new Date().toISOString(), 
      });

      toast.success("Product added successfully!");
      setName('');
      setCategory('');
      setPrice('');
      setImage(null);
      navigate('/')
    } catch (error) {
      console.error("Error adding product: ", error);
      toast.error("Failed to add product.");
    }
  };

  return (
    <Fragment>
      <Header />
      <div className="centerDivContainer">
        <div className="centerDiv">
          <form onSubmit={handleSubmit}>
            <label className="label" htmlFor="name">Name</label>
            <br />
            <input className="input" type="text" id="name" name="Name" value={name} onChange={(e) => setName(e.target.value)} />
            <br />
            <label htmlFor="category">Category</label>
            <br />
            <input className="input" type="text" id="category" name="category" value={category} onChange={(e) => setCategory(e.target.value)} />
            <br />
            <label htmlFor="price">Price</label>
            <br />
            <input className="input" type="number" id="price" name="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
            <br />
            <input type="file" onChange={(e) => setImage(e.target.files[0])} />
            <br />
            <button className="uploadBtn" type="submit">Upload and Submit</button>
          </form>
          <br />
          {image && (
            <img alt="Preview" width="200px" height="200px" src={URL.createObjectURL(image)} />
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default Create;
