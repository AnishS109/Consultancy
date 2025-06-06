import { Box, Button, Card, CardContent, CardMedia, Typography } from '@mui/material'
import React from 'react'

const HomeCards = ({item}) => {
  return (
    <>
      <Card className='border-[1px] border-[#d8d5d5] w-[200px] rounded-[20px] cursor-pointer'>

        <CardMedia className='p-3'>
          <Box 
          sx={{backgroundImage:`url(${item.consultProfilePhoto1})`}} 
          className="bg-cover h-[180px] w-[170px] bg-no-repeat rounded-[30px]">
            <Button
            variant='contained'
            className='bg-white text-green-600 text-[11px] font-extrabold normal-case rounded-[25px] mt-32 ml-2'
            >
              {item.consultCountry}
            </Button>
          </Box>
        </CardMedia>

        <CardContent>

          <Typography className='mt-[-20px] font-bold text-[20px]'>
            {item.name}
          </Typography>

          <Typography
            className="text-wrap text-[15px] text-[#696868] line-clamp-2">
            {item.consultDescription}
          </Typography>

        </CardContent>
      </Card>
    </>
  )
}

export default HomeCards
