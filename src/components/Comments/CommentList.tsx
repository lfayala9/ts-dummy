import type { CommentType, CommentInfo } from '../../types'
import { useAppSelector } from '../../utils/hooks/selector'
import { getPostComments } from '../../utils/hooks/userGetComments'
import { useEffect, useState } from 'react'
import Comment from '../Comments/Comment'
import { io } from 'socket.io-client'

const API: string = import.meta.env.VITE_API
const socket = io(API)

const CommentList = ({ postId }: { postId: string }): JSX.Element => {
  const { token } = useAppSelector((state) => state.auth)
  const [commentList, setComments] = useState<CommentType[]>([])

  useEffect(() => {
    const commentsData = getPostComments(token, postId)
    const getData = async (): Promise<void> => {
      setComments(await commentsData)
    }
    void getData()
  }, [])

  socket.on('new-comment', (comment) => {
    const newCommentList = [...commentList, comment]
    setComments(newCommentList)
  })
  socket.on('deleted-comment', (comment) => {
    setComments((comments) => comments.filter((c) => c._id !== comment))
  })
  return (
  <div>
    {commentList.map((i: CommentType) => (
        <Comment comment={i as CommentInfo} key={i._id}/>
    ))}
  </div>)
}

export default CommentList
