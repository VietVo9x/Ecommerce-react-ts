import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AddressForm from './AddressForm';
import Review from './Review';
import { useSelector } from 'react-redux';
import { Res_Cart, Res_UserInfoLogin } from '../../types/response.type';
import PageHero from '../../components/PageHero';
import { Req_Checkout_Address } from '../../types/request.type';
import { _CART } from '../../utils/constantAPI';
import { getData } from '../../utils/DB';

const steps = ['Shipping address', 'Review your order'];

export default function Checkout() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [isError, setIsError] = React.useState(true);
  const [cart, setCart] = React.useState<Res_Cart[]>([]);

  const user = useSelector(
    (state: { auth: { user: Res_UserInfoLogin | null } }) => state.auth.user,
  );
  const [addressForm, setAddressForm] = React.useState<Req_Checkout_Address>({
    full_name: user?.full_name || '',
    address: user?.address || '',
    phone: user?.phone || '',
    province: '',
    city: '',
  });
  function getStepContent(step: number) {
    switch (step) {
      case 0:
        return (
          <AddressForm
            setError={setIsError}
            addressForm={addressForm}
            setAddressForm={setAddressForm}
          />
        );
      case 1:
        return <Review cart={cart} />;
      default:
        throw new Error('Unknown step');
    }
  }

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
  const handleSubmit = () => {};
  React.useEffect(() => {
    getData(_CART).then((res) => {
      if (res) {
        console.log(res.data);
        setCart(res.data);
      }
    });
  }, []);
  return (
    <React.Fragment>
      <React.Fragment>
        <CssBaseline />
        <PageHero title="Checkout" />
        <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
          <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
            <Typography component="h1" variant="h4" align="center">
              Checkout
            </Typography>
            <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  Your order number is #2001539. We have emailed your order confirmation, and will
                  send you an update when your order has shipped.
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                      Back
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 3, ml: 1 }}
                    disabled={isError}
                  >
                    {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                  </Button>
                </Box>
              </React.Fragment>
            )}
          </Paper>
        </Container>
      </React.Fragment>
    </React.Fragment>
  );
}
