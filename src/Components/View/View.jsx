import React, { useEffect, useState } from 'react';
import { db } from '../../Firebase';
import { collection, getDocs } from "firebase/firestore";
import './View.css';

function View() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "product"));
        const productsArray = querySnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            price: data.price,
            name:data.name,
            category: data.category,
            createdAt: new Date(data.createdAt).toDateString(),
            description: data.description,
            // product: data.product,
            url: data.imageUrl,
            userId: data.userId
          };
        });
        setProducts(productsArray);
      } catch (error) {
        console.error("Error fetching products: ", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="viewParentDiv">
      <div className="cardContainer">
        {products.map(product => (
          <div key={product.id} className="productCard">
            <div className="imageContainer">
              <img src={product.url} alt={product.product} className="productImage" />
            </div>
            <div className="productInfo">
              {/* <p className=''>{product.name}</p> */}
              <p className="productPrice">&#x20B9; {product.price}</p>
              <h3 className="productName">{product.name}</h3>
              <p className="productCategory">{product.category}</p>
              <p className="productDate">{product.createdAt}</p>
              <p className="productDescription">{product.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default View;
