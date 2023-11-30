import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Res_Cart } from '../../types/response.type';
import { formatNumberToLocaleString, totalPriceCart } from '../../utils/constant';

interface Props {
  cart: Res_Cart[];
}
export default function Review(props: Props) {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {props.cart.map((cartItem) => (
          <ListItem key={cartItem.id} sx={{ py: 1, px: 0 }}>
            <ListItemText
              primary={cartItem.product.product_name}
              secondary={'x ' + cartItem.quantity}
            />
            <Typography variant="body2">
              $ {formatNumberToLocaleString(cartItem.quantity * cartItem.product.price)}
            </Typography>
          </ListItem>
        ))}
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            $ {formatNumberToLocaleString(totalPriceCart(props.cart))}
          </Typography>
        </ListItem>
      </List>
    </React.Fragment>
  );
}
