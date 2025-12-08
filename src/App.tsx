import './App.css'
import Feed from './Pages/Feed'
import NewPost from './Pages/NewPost'
import About from './Pages/About'
import PostDetails from './Pages/PostDetails'
import { Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path='/' element={<Feed />} />
        <Route path='/newpost' element={<NewPost />} />
        <Route path='/about' element={<About />} />
        <Route path='/posts/:id' element={<PostDetails />} />
        <Route path='/edit/:id' element={<NewPost />} />
      </Routes>
    </QueryClientProvider>
  )
}

export default App
