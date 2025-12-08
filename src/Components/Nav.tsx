import React from 'react'
import { Link } from 'react-router-dom'

const Nav = () => {
  return (
    <div className='w-full flex justify-between items-center'>
        <div className='flex gap-4 *:cursor-pointer'>
            <Link to='/'>
                <span>Feed</span>
            </Link>
            <Link to='/newpost'>
                <span>New Post</span>
            </Link>
            <Link to='/about'>
                <span>About</span>
            </Link>
        </div>
        <div>
            <h1 className='text-3xl font-bold'>A BLOG</h1>
        </div>
    </div>
  )
}

export default Nav