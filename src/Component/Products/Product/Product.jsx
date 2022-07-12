import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import style from './product.module.scss'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
export default function Product({item}) {

  return (
    <Card sx={{ maxWidth: 345 }} style={{borderRadius:10}}>
      <CardMedia
        style={{height:200}}
        component="img"
        // height="140"
        // image="https://animals.sandiegozoo.org/sites/default/files/2017-07/animals-lizard-redheadedrockagama.jpg"
        image={item.image.url}
        object-fit
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {item.name}
        </Typography>
      <div className={style.card}>
      <Typography variant="body2" color="text.secondary">
          {item.description}
        </Typography>
        <Typography variant="h4" color="text.secondary">
          ${item.price.raw}
        </Typography>
      </div>
      </CardContent>
      <CardActions style={{display:'flex',justifyContent:"space-between"}}>
        <Button size="large">
            <ShoppingCartIcon/> Buy Now
        </Button>
        <Button size="large">Learn More</Button>
      </CardActions>
    </Card>
  );
}
