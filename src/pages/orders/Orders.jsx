import React from "react";
import "./Orders.scss"
import { Link } from "react-router-dom";
import { useQuery } from '@tanstack/react-query'
import { newRequest } from "../../components/utils/newRequest";

export const Orders = () => {
  const {
    isLoading,
    error,
    data
  } = useQuery({
    queryKey: ["orders"],
    queryFn: () =>
      newRequest.get(`/orders`).then((res) => {
        return res.data;
      }),
  });
  console.log("orders",data)

  const currentUser = JSON.parse(localStorage.getItem("currentUser"))
  return (
    <div className="myGigs">
      {isLoading ? "loading" : error ? "error" : <div className="container">
        <div className="title">
          <h1>Orders</h1>
        </div>
        <table>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Price</th>
            <th>{currentUser?.isSeller ? "Buyer" : "Seller"}</th>
            <th>Contact</th>
          </tr>

          {data.map(order=>(
            <tr key={order._id}>
            <td>
              <img className="img" src={order.img} alt="" />
            </td>
            <td>{order.title}</td>
            <td>{order.price}</td>
            <td>
              <img className="delete" src="../../public/img/message.png" alt="" />
            </td>
          </tr>))}
        </table>
      </div>}
    </div>
  )
}