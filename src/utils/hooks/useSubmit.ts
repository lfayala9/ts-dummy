import { useState, type ChangeEvent } from 'react'
import { commentService, postService } from '../../services/posts'
import { useAppDispatch } from './selector'

const useSubmit = (isPost: boolean, token: string, user?: string, postId?: string): {
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void
  handleSubmit: (e: {
    preventDefault: () => void
  }) => void
  picture: boolean
  setPicture: React.Dispatch<React.SetStateAction<boolean>>
} => {
  const postValue = {
    userId: user,
    postContent: '',
    picture: null as File | null
  }
  const [picture, setPicture] = useState(false)
  const [form, setForm] = useState(postValue)
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.name === 'picture') {
      const file = e.target.files != null ? e.target.files[0] : null
      setForm({ ...form, [e.target.name]: file })
      setPicture(true)
    } else {
      setForm({ ...form, [e.target.name]: e.target.value })
    }
  }
  const dispatch = useAppDispatch()
  const handleSubmit = (e: { preventDefault: () => void }): void => {
    e.preventDefault()
    const formData = new FormData()
    for (const [key, value] of Object.entries(form)) {
      if (value !== undefined && value !== null) {
        formData.append(key, value)
      }
    }
    void dispatch(isPost ? postService(formData, token) : commentService(postId != null ? postId : '', formData, token))
  }
  return { handleChange, handleSubmit, picture, setPicture }
}

export default useSubmit
