import React, { useState } from 'react'
import Carousel from 'react-bootstrap/Carousel';
import "./MainCarousel.css"

function MainCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel fade activeIndex={index} onSelect={handleSelect} controls={true} >
    <Carousel.Item key={1} >
      <img
        className="d-block w-100"
        src="https://res.cloudinary.com/vcorner1/image/upload/v1673081742/alumni/bg2_rtlwid.jpg"
        alt="First slide"
      />
      
    </Carousel.Item>
    <Carousel.Item key={2} >
      <img
        className="d-block w-100"
        src="https://res.cloudinary.com/vcorner1/image/upload/v1673081742/alumni/bg1_bv2xvn.jpg"
        alt="Second slide"
      />

      
    </Carousel.Item>
    <Carousel.Item key={3} >
      <img
        className="d-block w-100"
        src="https://res.cloudinary.com/vcorner1/image/upload/v1673081742/alumni/bg3_u8ufih.jpg"
        alt="Third slide"
      />

      
    </Carousel.Item>
  </Carousel>

  )
}

export default MainCarousel
