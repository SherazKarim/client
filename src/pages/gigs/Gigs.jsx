import React, { useEffect, useRef, useState } from 'react'
import "./Gigs.scss"
import { GigCard } from "../../components/gigCard/GigCard"
import { newRequest } from '../../components/utils/newRequest';
import {useQuery} from '@tanstack/react-query'
import { useLocation } from 'react-router-dom';

export const Gigs = () => {
  const [open, setOpen] = useState(false);
  const [sort, setSort] = useState("sales");

  const minRef = useRef();
  const maxRef = useRef();

  const { search } = useLocation()
  // console.log(search)
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ['gigs'],
    queryFn: () => newRequest.get(
      `/gigs?${search}&min=${minRef.current.value}&max=${maxRef.current.value}&sort=${sort}`
    ).then((res) => {
      return res.data;
    }),
  })


  console.log("data", data)
  // useEffect(() => {

  // }, [data]);



  const resort = (type) => {
    setSort(type);
    setOpen(false)
  }

  const dropdown = () => {
    console.log("dropdown", open)
    setOpen(!open)
  }
  const apply = () => {
    refetch()
  }
  return (
    <div className='gigs'>
      <div className="container">
        <div className="breadcrumbs">
          <span className='fiver'>FIVER `&gt;` Graphics & Design</span>
          <h1>AI Artists</h1>
          <p>Explore the boundries of art and technology with fiver's AI artists</p>
          <div className="menu">
            <div className="left">
              <span>Budget</span>
              <input ref={minRef} type="number" placeholder='min' />
              <input ref={maxRef} type="number" placeholder='max' />
              <button onClick={apply}>Apply</button>
            </div>
            <div className="right">
              <span className='sortBy'>sortBy</span>
              <div onClick={() => dropdown()}>
                <span className='sortType'>{sort === "sales" ? "Best Selling" : "Newest"}</span>
                <img src="../../public/img/down.png" alt="" />
              </div>
              {open ? (
                <div className="rightMenu">
                  {sort === "sales" ? <span onClick={() => resort("createdAt")}>Newest</span> :
                    <span onClick={() => resort("sales")}>Best Selling</span>}
                </div>) : ""}
            </div>
          </div>
        </div>
        <div className="cards">

          {
            isLoading
              ? "loading"
              : error
                ? "something went wrong!"
                : data.map((gig) => <GigCard key={gig._id} item={gig} />)
          }


        </div>
      </div>
    </div>
  )
}
