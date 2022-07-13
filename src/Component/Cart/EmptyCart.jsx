import { Typography } from '@mui/material'
import React from 'react'

function EmptyCart() {
  return (
    <div>
        <Typography variant='subtitle1' style={{marginLeft:26, marginTop:20, paddingBottom:20}}>
            You have no items in your shopping cart, start adding some!
        </Typography>
    </div>
  )
}

export default EmptyCart