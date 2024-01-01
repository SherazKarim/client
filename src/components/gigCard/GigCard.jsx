import React from 'react'
import './gigCard.scss'
import { Link } from 'react-router-dom'

export const GigCard = ({ item }) => {
  return (
    <Link className='link' to={`/gigs/single/${item._id}`}>
      <div className='gigCard'>
        <img src={item.img} alt='' />
        <div className="info">
          <div className="user">
            <img src={item.pp} alt="" />
            <span>{item.username}</span>
          </div>
          <p>{item.desc}</p>
          <div className="star">
            <img src="../../public/img/star.png" alt="" />
            <span>{!isNaN(item.totalStars / item.starNumber) && Math.round(item.totalStars / item.starNumber)}</span>
          </div>
        </div>
        <hr />
        <div className="details">
          <img src="../../public/img/heart.png" alt="" />
          <div className="price">
            <span>STARTING AT</span>
            <h2>${item.price}</h2>
          </div>
        </div>
      </div>
    </Link>
  )
}
