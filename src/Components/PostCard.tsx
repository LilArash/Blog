import React from 'react'
import { useNavigate } from 'react-router-dom'
import type { Post } from '../types'

const PostCard = (postData: Post) => {

  const naviagate = useNavigate()

  const showDetails = () => {
    naviagate(`/posts/${postData.id}`, {
        state: {
          postData
        }
    })
  }

  return (
    <div className='p-4 flex justify-between border rounded-md'>
      <div className='flex flex-col justify-center'>
        <h2 className='font-bold text-xl'>{postData.title}</h2>
        <p className='line-clamp-2'>{postData.text}</p>
      </div>
      <button onClick={showDetails} className='button-style bg-blue-500'>read more</button>
    </div>
  )
}

export default PostCard