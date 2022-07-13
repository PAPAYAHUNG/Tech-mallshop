import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import style from "./product.module.scss";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {useSelector,useDispatch} from 'react-redux'
import { decrement, increment } from "../../../Redux/Slice/ecommerceSlice";
export default function Product({ item, handleAddtoCart,cart }) {
  const dispatch = useDispatch()
  // const {quantity} = useSelector(state=>state.quantityReducer)
  // console.log({quantity})
console.log('cart inside',cart)
  const objectFound = cart?.line_items?.find(cartItem=>cartItem.product_id === item.id)
  console.log({objectFound})
  const quantity = objectFound?.quantity
  return (
    <Card sx={{ maxWidth: 345 }} style={{ borderRadius: 10 }}>
      <CardMedia
        style={{ height: 200 }}
        component="img"
        // height="140"
        // image="https://animals.sandiegozoo.org/sites/default/files/2017-07/animals-lizard-redheadedrockagama.jpg"
        image={item.image.url}
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {item.name}
        </Typography>
        <div className={style.card}>
          <Typography
            dangerouslySetInnerHTML={{ __html: item.description }}
            variant="body2"
            color="text.secondary"
          />

          <Typography variant="h4" color="text.secondary">
            ${item.price.raw}
          </Typography>
        </div>
      </CardContent>
      <CardActions style={{ display: "flex", justifyContent: "space-between" }}>
        <Button
          size="large"
          onClick={() => {
            handleAddtoCart(item.id,1);
          }}
        >
          <ShoppingCartIcon /> Buy Now
        </Button>
        <div className="flex items-center">
          <Button
            style={{ fontSize: 15, fontWeight: 700 }}
            size="small"
            variant="outlined"
            color="success"
            // onClick={()=>{
            //     dispatch(increment())}
            // }
            onClick={()=>{
              handleAddtoCart(item.id,1)
            }}
          >
            +
          </Button>
          <span className="mx-3 font-bold">{quantity}</span>
          <Button
            style={{ fontSize: 15, fontWeight: 700 }}
            size="small"
            variant="outlined"
            color="error"
            onClick={()=>{
              if(quantity<0){
                alert('Quantity as least 0')
              }
              else{
                // console.log('im clicked')
                // dispatch(decrement())}
               
                  handleAddtoCart(item.id,-1)
                
              }
            }}
          >
            -
          </Button>
        </div>
      </CardActions>
    </Card>
  );
}
