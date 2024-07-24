import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
// Context
import { useUserContext } from '../context/UserContext'
// Custom Hooks
import { usePost } from '../hooks/usePost'
// Helpers
import {
  handleChange,
  handleFileChange,
  handleEditorChange,
} from '../utils/formHelpers'
// Components
import PageTitle from '../components/PageTitle'
import Editor from '../components/Editor'

const CreatePost = () => {
  const { user } = useUserContext()
  const { createPost } = usePost()
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(false)
  const [editorData, setEditorData] = useState('')
  const [formData, setFormData] = useState({
    title: '',
    body: editorData,
    buttonLink: '',
    buttonText: '',
    image: '',
    creator: user?._id,
  })

  const handleSubmit = async (e) => {
    e.preventDefault()

    const data = new FormData()
    data.append('title', formData.title)
    data.append('body', formData.body)
    data.append('buttonLink', formData.buttonLink)
    data.append('buttonText', formData.buttonText)
    data.append('image', formData.image)
    data.append('creator', formData.creator)

    const res = await createPost(data)
    if (res) {
      toast.success('Post Created!')
      navigate('/posts')
    }
  }

  return (
    <>
      <PageTitle title={'Create Post'} />
      <form onSubmit={handleSubmit} className='card card--med'>
        <label htmlFor='title'>Title</label>
        <input
          type='text'
          name='title'
          id='title'
          onChange={(e) => handleChange(e, setFormData, formData)}
          value={formData.title}
          required
          autoFocus
        />
        <label htmlFor='image'>Image</label>
        <input
          type='file'
          name='image'
          id='image'
          accept='image/png, image/jpeg'
          onChange={(e) => handleFileChange(e, setFormData, formData)}
        />
        <Editor
          onChange={(e, editor) =>
            handleEditorChange(e, editor, setEditorData, setFormData, formData)
          }
          data={editorData}
        />
        <label htmlFor='buttonLink'>Button Link</label>
        <input
          type='url'
          name='buttonLink'
          id='buttonLink'
          placeholder='https://www.google.com/'
          onChange={(e) => handleChange(e, setFormData, formData)}
          value={formData.buttonLink}
        />
        <label htmlFor='buttonText'>Button Text</label>
        <input
          type='text'
          name='buttonText'
          id='buttonText'
          placeholder='Button Text'
          onChange={(e) => handleChange(e, setFormData, formData)}
          value={formData.buttonText}
        />

        <button className='btn'>Create Post</button>
      </form>
    </>
  )
}

export default CreatePost
