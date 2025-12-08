import React from 'react'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { addNewPost, updatePost } from '../api/posts'
import type { NewPost, Post, UpdatePost } from '../types'
import Nav from '../Components/Nav'

const NewPost = () => {

  const [newPost, setNewPost] = React.useState<NewPost>({ title: '', text: '' })
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { id } = useParams<{ id: string }>()
  const isEditing = Boolean(id)
  const location = useLocation()
  const postToEdit = location.state?.post

  React.useEffect(() => {
    if (isEditing && postToEdit) {
      setNewPost({
        title: postToEdit.title,
        text: postToEdit.text
      })
    }
  }, [postToEdit, isEditing])

  const addNewPostMutation = useMutation<Post, Error, NewPost>({
    mutationFn: addNewPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
      setTimeout(() => {
        navigate('/')
      }, 1000);
    }
  })

  const editPostMutation = useMutation<Post, Error, UpdatePost>({
    mutationFn: updatePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
      setTimeout(() => {
        navigate('/')
      }, 1000);
    }
  })

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (isEditing && id) {

      editPostMutation.mutate({
        id,
        updatedPost: newPost
      })

    } else {
      addNewPostMutation.mutate({
        title: newPost.title,
        text: newPost.text
      })
    }
    setNewPost({ title: '', text: '' })

  }
  if (addNewPostMutation.isPending) return 'saving...'
  if (addNewPostMutation.isError) return 'error'


  return (
    <div>
      <Nav />
      <form className='flex flex-col w-48 gap-4' onSubmit={handleSubmit}>
        <input onChange={
          (e) => setNewPost(prev => (
            { ...prev, title: e.target.value }
          ))
        }
          className='border rounded-lg px-2 py-1'
          type="text"
          placeholder='title'
          value={newPost.title} />
        <textarea onChange={
          (e) => setNewPost(prev => (
            { ...prev, text: e.target.value }
          ))
        }
          className='border rounded-lg px-2 py-1'
          name="" id=""
          placeholder='text'
          value={newPost.text}></textarea>
        <button
          className='button-style bg-blue-500'
          type='submit'>
            {
              isEditing && id ? "save changes" : "add post"
            }
          </button>
      </form>
    </div>
  )
}

export default NewPost