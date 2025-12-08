export type Post = {
    id: string
    title: string
    text: string
}

export type NewPost = Omit<Post, 'id'>

export type UpdatePost = {
  id: string
  updatedPost: NewPost
}