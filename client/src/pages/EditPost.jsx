import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
// Custom Hooks
import { usePost } from '../hooks/usePost'
// Helpers
import {
  handleChange,
  handleFileChange,
  handleEditorChange,
} from '../utils/formHelpers'
// Components
import Loader from '../components/Loader'
import PageTitle from '../components/PageTitle'
import Editor from '../components/Editor'

const EditPost = () => {
  const { id } = useParams()
  const { getPost, updatePost } = usePost()
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(false)
  const [editorData, setEditorData] = useState('')
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    body: editorData,
    buttonLink: '',
    buttonText: '',
    image: '',
    creator: '',
  })

  useEffect(() => {
    const fetchPost = async (id) => {
      setIsLoading(true)
      const res = await getPost(id)
      setEditorData(res?.body)
      setFormData({
        id: res?._id,
        title: res?.title,
        body: res?.body,
        buttonLink: res?.buttonLink,
        buttonText: res?.buttonText,
        image: res?.image,
        creator: res?.creator,
      })

      setIsLoading(false)
    }
    fetchPost(id)
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const data = new FormData()
    data.append('id', formData.id)
    data.append('title', formData.title)
    data.append('body', formData.body)
    data.append('buttonLink', formData.buttonLink)
    data.append('buttonText', formData.buttonText)
    data.append('image', formData.image)
    data.append('creator', formData.creator)

    const res = await updatePost(data)
    if (res) {
      toast.success('Post Updated!')
      navigate('/posts')
    }
  }

  // Conditional loader
  if (isLoading) return <Loader />

  return (
    <>
      <PageTitle title={'Edit Post'} />
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

        <button className='btn'>Save Changes</button>
      </form>
    </>
  )
}

export default EditPost
