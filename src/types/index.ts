export type Post = {
    id: string
    title: string
    text: string
    author?: string
    image?: string
    reactions: PostReactions
}

export type NewPost = Omit<Post, 'id'>

export type UpdatePost = {
  id: string
  updatedPost: NewPost
}

export type FormFields = {
  title: string
  text: string
}

export type PostReactions = {
  like: number
  dislike: number
  heart: number
  laughter: number
  cup: number
}

export type ReactionProps = {
  icon: string
  count: number
  onClick: () => void
}