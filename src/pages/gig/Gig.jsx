import React from "react";
import "./Gig.scss"
import { Slider } from "infinite-react-carousel/lib"
import { useParams } from "react-router-dom";
import { useQuery } from '@tanstack/react-query'
import { newRequest } from "../../components/utils/newRequest";
import { Reviews } from "../../components/reviews/Reviews";

export const Gig = () => {
  const { id } = useParams()

  const { isLoading, error, data } = useQuery({
    queryKey: ['gig'],
    queryFn: () => newRequest.get(
      `/gigs/single/${id}`
    )
  })
  console.log("single Gig",data)

  const userId = data?.userId;

  const {
    isLoading: isLoadingUser,
    error: errorUser,
    data: dataUser,
  } = useQuery({
    queryKey: ["users"],
    queryFn: () =>
      newRequest.get(`/users/${userId}`).then((res) => {
        return res.data;
      }),
    enabled: !!userId,
  });
  // console.log("dataUser....",dataUser)
  // console.log("data.",data)
  // console.log(isLoading && Array(Math.round(data.data.totalStars / data.data.starNumber)).fill())
  return (
    <div className="gig">
      {isLoading ? "loading" : error ? "something went wrong" :
        <div className="container">
          <div className="left">
            <span className="breadCrumbs">
              FIVER `&gt;` GRAPHICS & DESIGN
            </span>
            <h1>{data.data.title}</h1>
            {
              isLoadingUser ? ("loading") : error ? ("something went wrong") :
                (
                <div className="user">
                  <img src="" alt="" />
                  <span>{data.data.title}</span>
                  {!isNaN(data.data.totalStars / data.data.starNumber) && (
                    <div className="stars">
                      {Array(Math.round(data.data.totalStars / data.data.starNumber)).fill().map((item, i) => (
                        <img src="../../public/img/star.png" alt="" />
                      ))}
                      <span>{Math.round(data.data.totalStars / data.data.starNumber)}</span>
                    </div>)}
                </div>)}
            <Slider slidesToShow={1} arrowsScroll={1} className="slider">
              {
                data.data.images.map((img) => (
                  <img
                    key={img}
                    src={img}
                    alt=""
                  />
                ))
              }
            </Slider>
            <h2>About This Gig</h2>
            <p>{data.data.desc}</p>
            {
              isLoadingUser ? ("loading") : error ? ("something went wrong") :
                (
            <div className="seller">
              <h2>About the seller</h2>
              <div className="user">

                <img src={data.data.img || "https://images.pexels.com/photos/1074535/pexels-photo-1074535.jpeg?auto=compress&cs=tinysrgb&w=1600"} alt="" />
                <div className="info">
                  <span>{data.data.username}</span>
                  {!isNaN(data.data.totalStars / data.data.starNumber) && (
                    <div className="stars">
                      {Array(Math.round(data.data.totalStars / data.data.starNumber)).fill().map((item, i) => (
                        <img src="../../public/img/star.png" alt="" />
                      ))}

                      <span>{Math.round(data.data.totalStars / data.data.starNumber)}</span>
                    </div>)}
                  <button>Contact Me</button>
                </div>
              </div>
              <div className="box">
                <div className="items">
                  <div className="item">
                    <span className="title">Last Delivery</span>
                    <span className="desc">1 day</span>
                  </div>
                  <div className="item">
                    <span className="title">Languages</span>
                    <span className="desc">English</span>
                  </div>
                </div>
                <hr />
                <p>I use an AI program to create images based on text prompts. This
                  means I can help you to create a vision you have through a textual
                  description of your scene without requiring any reference images.
                  Some things I've found it often excels at are: Character portraits</p>
              </div>
            </div>)}
            <Reviews gigId={id}/>
          </div>
          <div className="right">
            <div className="price">
              <h3>{data.data.shortTitle}</h3>
              <h2>${data.data.price}</h2>
            </div>
            <p>{data.data.shortDesc}</p>
            <div className="details">
              <div className="item">
                <img src="../../public/img/clock.png" alt="" />
                <span>{data.data.deliveryDate} days delivery</span>
              </div>
              <div className="item">
                <img src="../../public/img/recycle.png" alt="" />
                <span>{data.data.revisionNumber} Revisions</span>
              </div>
            </div>
            <div className="features">
              {data.data.features.map((feature) => (
                <div className="item" key={feature}>
                  <img src="../../public/img/greencheck.png" alt="" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
            <button>Continue</button>
          </div>
        </div>
      }
    </div>
  )
}