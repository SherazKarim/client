import React from 'react'
import './Slide.scss'
import Slider from 'infinite-react-carousel';

export const Slide = ({children,arrowsScroll,slidesToShow}) => {
  return (
    <div className='slide'>
      <div className="container">
        <Slider slidesToShow={slidesToShow} arrowsScroll={arrowsScroll} className="slider">
          {children}
        </Slider>
      </div>
    </div>
  )
}
