import React from 'react'
import './Featured.scss'

export const Featured = () => {
  return (
    <div className='featured'>
        <div className="container">
            <div className="left">
                <h1>Find the perfact <i>freelance</i> services of your bussiness</h1>
                <div className="search">
                    <div className="searchInput">
                        <img src="../public/img/search.png" alt="" />
                        <input type='text' placeholder='Try "building mobile app"'/>
                    </div>
                    <button>Search</button>
                </div>
                <div className="popular">
                    <span>popular:</span>
                    <button>Web Design</button>
                    <button>WordPress</button>
                    <button>Logo Design</button>
                    <button>AI Services</button>
                </div>
            </div>
            <div className="right">
                <img src='../public/img/man.png' alt="" />
            </div>
        </div>
    </div>
  )
}
