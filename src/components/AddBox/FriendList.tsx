import React from 'react'
import './styles.css'
import { Wrapper } from '../../styles/components'
import { Box, Typography } from '@mui/material'

const FriendList: React.FC = () => {
  return (
    <>
      <Wrapper className="addBox">
        <Box>
          <Typography variant="h3" my={1}>
            Friends
          </Typography>
        </Box>
      </Wrapper>
    </>
  )
}

export default FriendList
