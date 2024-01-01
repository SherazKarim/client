import React from 'react'
import './Reviews.scss'
import { Review } from '../review/Review'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { newRequest } from '../utils/newRequest'

export const Reviews = ({gigId}) => {
  const queryCLient = useQueryClient()
  const { isLoading, error, data } = useQuery({
    queryKey: ["reviews"],
    queryFn: () =>
      newRequest.get(`/reviews/${gigId}`).then((res) => {
        return res.data;
      }),
  });
  // console.log("review data",data)

  const mutation = useMutation({
    mutationKey: ["reviews"],
    mutationFn: (review)=>{
      return newRequest.post("/reviews",review)
    },
    onSuccess:()=>{
      queryCLient.invalidateQueries(["reviews"])
    }
  })

  const handleSubmit =(e)=>{
    e.preventDefault()
    const desc = e.target[0].value;
    const star = e.target[1].value;
    mutation.mutate({desc,star,gigId})
  }
  return (
    <div className="reviews">
              <h2>Reviews</h2>
              {
                isLoading ? "loading" : error ? "something went wrong" : data.map((review)=> <Review key={review._id} review={review}/>)
              }
              <div className="add">
                <h3>Add a review</h3>
                <form className='addForm' onSubmit={handleSubmit} action="">
                  <input type="text" placeholder='write your opinion' />
                  <select name="" id="">
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                  </select>
                  <button>Submit</button>
                </form>
              </div>
              
            </div>
  )
}
