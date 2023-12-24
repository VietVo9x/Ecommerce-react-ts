import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { formatCurrency, totalPriceCart } from '../../utils/constant';
import { Res_CartItem } from '../../types/response.type';

interface Props {
  cart: Res_CartItem[];
}
export default function Review(props: Props) {
  const { cart } = props;
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {cart &&
          cart.map((cartItem, index) => (
            <ListItem key={index} sx={{ py: 1, px: 0 }}>
              <ListItemText
                primary={cartItem.product.product_name}
                secondary={'x ' + cartItem.quantity}
              />
              <Typography variant="body2">
                {formatCurrency(cartItem.quantity * cartItem.product.price)}
              </Typography>
            </ListItem>
          ))}
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {cart && formatCurrency(totalPriceCart(cart))}
          </Typography>
        </ListItem>
      </List>
    </React.Fragment>
  );
}
