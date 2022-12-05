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
        src="https://vitapalumni.s3.ap-south-1.amazonaws.com/bg3.jpeg"
        alt="First slide"
      />
      
    </Carousel.Item>
    <Carousel.Item key={2} >
      <img
        className="d-block w-100"
        src="https://vitapalumni.s3.ap-south-1.amazonaws.com/bg2.jpg"
        alt="Second slide"
      />

      
    </Carousel.Item>
    <Carousel.Item key={3} >
      <img
        className="d-block w-100"
        src="https://vitapalumni.s3.ap-south-1.amazonaws.com/bg1.jpg"
        alt="Third slide"
      />

      
    </Carousel.Item>
  </Carousel>

  )
}

export default MainCarousel
