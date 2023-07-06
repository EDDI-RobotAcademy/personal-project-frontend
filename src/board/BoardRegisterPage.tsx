import { Box, Button,  Container,  TextField } from '@mui/material'
import React from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { registerBoard } from '../api/BoardApi'

const BoardRegisterPage = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const mutation = useMutation(registerBoard, {
    onSuccess: (data) => {
      queryClient.setQueryData('board',data)
      navigate(`/key-we-board-app/read/${data.boardId}`)
    }
  })

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    
      const target = event?.target as typeof event.target & {
        elements: {
          title: {value: string }
          writer: {value: string }
          content: {value: string }
        }
      }    
    const {title, writer, content} = target.elements

    const data = {
      title: title.value,
      writer: writer.value,
      content: content.value
    }
    await mutation.mutateAsync(data)
  }



  return (
    <Container maxWidth="md" sx={{ marginTop: '2rem' }}>
    <form onSubmit={handleSubmit}>
    <TextField label="작성자" name="writer" sx={{ borderRadius: '4px' }}/>
    {/* <TextField select label="카테고리" name='boardCategory' variant="outlined" >
          <MenuItem>Small</MenuItem>
          <MenuItem>Medium</MenuItem>
          <MenuItem>Large</MenuItem>
        </TextField>   */}
      <Box display='contents'>
        </Box>
        <Box display="flex" flexDirection="column" >
        <TextField label="제목" name="title" sx={{ borderRadius: '10px' }}/>            

        <TextField label="내용" name="content" multiline 
                  minRows={20} maxRows={20} sx={{ borderRadius: '4px' }}/>
      </Box>
      <Button type="submit">작성 완료</Button>
    </form>  
  </Container>

  )
}

export default BoardRegisterPage