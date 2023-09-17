import { Box, Avatar, Divider, Button, IconButton } from '@mui/material'
import './styles.css'
import { CustomField, Wrapper } from '../../styles/components'
import { useAppSelector } from '../../utils/hooks/selector'
import SendIcon from '@mui/icons-material/Send'
import PostAddIcon from '@mui/icons-material/PostAdd'
import LoaderRing from '../Widgets/Loader'
import CreatePostWidget from './CreatePostWidget'
import type { ChangeEvent } from 'react'

const CreatePost = ({
  createBox,
  isComment,
  onSubmit,
  onChange,
  picture,
  setPicture,
  classBox,
  fieldClass
}: {
  createBox: string
  isComment: boolean
  classBox: string
  fieldClass?: string
  onSubmit: (e: { preventDefault: () => void }) => void
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  picture?: boolean
  setPicture?: React.Dispatch<React.SetStateAction<boolean>>
}): JSX.Element => {
  const { theme } = useAppSelector((state) => state.settings)
  const { isLoading } = useAppSelector((state) => state.auth)
  return (
    <>
      <Wrapper className={createBox}>
        <form noValidate onSubmit={onSubmit} encType="multipart/form-data">
          <Box className={classBox}>
            {isComment
              ? null
              : (
              <Avatar className="avatar-medium">
                <PostAddIcon sx={{ color: 'black' }} />
              </Avatar>
                )}
            <CustomField
              onChange={onChange}
              className={fieldClass}
              name={'postContent'}
              fullWidth
              id="filled-multiline-static"
              multiline
              placeholder={isComment ? 'Reply!' : 'What are you thinking...?'}
              variant="outlined"
              sx={{
                backgroundColor: theme === 'light' ? '#BDBDBD' : '#757575',
                borderRadius: '2rem',
                '& fieldset': {
                  borderRadius: '2rem',
                  borderColor: isComment ? 'transparent' : 'white'
                }
              }}
            />
            {isComment
              ? (
              <Avatar className="avatar-medium" sx={{ bgcolor: '#284195' }}>
                <IconButton
                  size="large"
                  sx={{ bgcolor: '#284195' }}
                  aria-label="POST button"
                  type='submit'
                >
                  <SendIcon />
                </IconButton>
              </Avatar>
                )
              : null}
          </Box>
          {isComment
            ? null
            : <>
            <Divider />
            <Box className="buttons-container">
              <CreatePostWidget
                isPicture={picture}
                handleChange={onChange}
              />
              <Box>
                <Button
                  type="submit"
                  variant="contained"
                  onClick={() => { if (setPicture != null) { setPicture(false) } } }
                  color="primary"
                  aria-label="POST button"
                >
                  POST
                </Button>
              </Box>
            </Box>
          </>}
        </form>
      </Wrapper>
      {isLoading && <LoaderRing position="relative" top="10px" left="10%" />}
    </>
  )
}

export default CreatePost
