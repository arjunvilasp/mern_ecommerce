import React from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import './ImageSlider.css'

const spanStyle = {
  padding: '10px 20px',
  background: '#efefef',
  color: '#000000',
  borderRadius: '5px'
};

const divStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundSize: 'cover',
  height: '500px',
  marginTop: '30px',
  borderRadius: '5px',
  position: 'relative',
  textAlign: 'center'
};

const slideImages = [
  {
    url: '/slide-img.avif',
    caption: 'Slide 1'
  },
  {
    url: '/slide-img2.avif',
    caption: 'Slide 2'
  },
  {
    url: '/slide-img3.avif',
    caption: 'Slide 3'
  }
];

const ImageSlider = () => {
  return (
    <div className="slide-container">
      <Slide >
        {slideImages.map((slideImage, index) => (
          <div key={index}>
            <div
            className='slide'
              style={{
                ...divStyle,
                backgroundImage: `url(${slideImage.url})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center'
              }}
            >
              {/* <span style={spanStyle}>{slideImage.caption}</span> */}
            </div>
          </div>
        ))}
      </Slide>
    </div>
  );
};

export default ImageSlider;
