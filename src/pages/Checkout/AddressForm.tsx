import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import CheckoutService from './checkoutService';
import { Err_Checkout_AddressForm } from '../../types/error.type';
import { Req_Checkout_Address } from '../../types/request.type';
const checkoutService = new CheckoutService();
interface Props {
  setError: (err: any) => void;
  addressForm: Req_Checkout_Address;
  setAddressForm: Function;
}
export default function AddressForm(props: Props) {
  const [formError, setFormError] = React.useState<Err_Checkout_AddressForm>({
    isError: false,
    msgFullName: '',
    msgAddress: '',
    msgPhone: '',
    msgProvince: '',
    msgCity: '',
  });
  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    props.setAddressForm({ ...props.addressForm, [name]: value });
  };
  React.useEffect(() => {
    // Validate
    const errors = checkoutService.validator(props.addressForm);

    if (errors.isError) {
      props.setError(true);
    } else {
      props.setError(false);
    }
    setFormError(errors);
  }, [props.addressForm]);

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            id="lastName"
            name="full_name"
            label="Full name"
            fullWidth
            autoComplete="family-name"
            variant="standard"
            value={props.addressForm.full_name}
            onChange={(event) => {
              handleChange(event);
            }}
            error={formError.msgFullName.length > 0}
            helperText={formError.msgFullName}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="address"
            label="Address"
            fullWidth
            autoComplete="shipping address-line1"
            variant="standard"
            value={props.addressForm.address}
            onChange={(event) => {
              handleChange(event);
            }}
            error={formError.msgAddress.length > 0}
            helperText={formError.msgAddress}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="phone"
            name="phone"
            label="Phone number"
            fullWidth
            autoComplete="shipping postal-code"
            variant="standard"
            value={props.addressForm.phone}
            onChange={(event) => {
              handleChange(event);
            }}
            error={formError.msgPhone.length > 0}
            helperText={formError.msgPhone}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="province"
            name="province"
            label="State/Province/Region"
            fullWidth
            autoComplete="shipping address-level2"
            variant="standard"
            value={props.addressForm.province}
            onChange={(event) => {
              handleChange(event);
            }}
            error={formError.msgProvince.length > 0}
            helperText={formError.msgProvince}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="state"
            name="city"
            label="City"
            fullWidth
            variant="standard"
            value={props.addressForm.city}
            onChange={(event) => {
              handleChange(event);
            }}
            error={formError.msgCity.length > 0}
            helperText={formError.msgCity}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
