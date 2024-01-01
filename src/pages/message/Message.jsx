import React from "react";
import "./Message.scss"
import { Link, useParams } from "react-router-dom";
import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query'
import { newRequest } from '../../components/utils/newRequest'

export const Message = () => {
  const { id } = useParams();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["messages"],
    queryFn: () =>
      newRequest.get(`/messages/${id}`).then((res) => {
        return res.data;
      }),
  });

  const mutation = useMutation({
    mutationFn: (message) => {
      return newRequest.post(`/messages`, message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["messages"]);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({
      conversationId: id,
      desc: e.target[0].value,
    });
    e.target[0].value = "";
  };
  console.log("messages", data)
  return (
    <div className="message">
      <div className="container">
        <span className="breadcrumbs">
          <Link to="/messages">MESSAGE</Link>  JOHN DOE 
        </span>
        {
          isLoading ? ("loading") : error ? ("error") :(
            <div className="messages">
              {
                data.map((m) => (
                  <div className={m.userId === currentUser._id ? "owner item" : "item"} key={m._id}>
                    <img src="https://images.pexels.com/photos/1074535/pexels-photo-1074535.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="" />
                    <p>{m.desc}</p>
                  </div>
                ))
              }

            </div>)}
        <form className="write" onSubmit={handleSubmit}>
          <textarea name="" placeholder="write a message" id="" cols="30" rows="10"></textarea>
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  )
}