import React from 'react';

import Header from '../Components/Header/Header';
import Banner from '../Components/Banner/Banner';

import Posts from '../Components/Posts/Posts';
import Footer from '../Components/Footer/Footer';
import ViewPost from './ViewPost';

const Home=({IsAuthenticated})=>{
  return (
    <div className="homeParentDiv">
 
      <Header  IsAuthenticated={IsAuthenticated} />
      <Banner />
      <ViewPost />
      <Footer />
    </div>
  );
 }


export default Home;
 
