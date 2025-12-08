import React from 'react'
import type { Post } from '../types'
import { useParams, useNavigate } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { fetchPosts, deletePost, updatePost } from '../api/posts'
import Nav from '../Components/Nav'

const PostDetails = () => {

    const { id } = useParams<{ id: string }>()
    const queryClient = useQueryClient()
    const navigate = useNavigate()

    const { data: posts, isPending, error } = useQuery({
        queryFn: fetchPosts,
        queryKey: ['posts'],
    })

    const post = posts?.find((p: Post) => p.id === id)

    const deletePostMutation = useMutation({
        mutationFn: deletePost,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['posts'] })
            navigate('/')
        }
    })

    const redirectToEdit = () => {
        navigate(`/edit/${post.id}`, { state: { post } })
    }

    if (!post) return <div>post not found</div>

    return (
        <div>
            <Nav />
            <div>
                <div>
                    <h2 className='text-3xl'>{post.title}</h2>
                    <p>{post.text}</p>
                </div>
                <div className='flex gap-4'>
                    <button onClick={
                        () => {
                            deletePostMutation.mutate(post.id)
                        }
                    }
                    className='button-style bg-red-400'>delete</button>
                    <button className='button-style bg-blue-500' onClick={redirectToEdit}>edit</button>
                </div>
            </div>
        </div>
    )
}

export default PostDetails