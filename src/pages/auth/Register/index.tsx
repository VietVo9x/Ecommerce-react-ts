import PageHero from '../../../components/PageHero';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import Typography from '@mui/material/Typography';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './style.scss';
import { I_RegisterError, I_UserRegister } from '../../../types/RegisterType';
import RegisterServices from './RegisterServices';

export default function Register() {
  const navigate = useNavigate();
  const registerServices = new RegisterServices();
  const [dataForm, setFormData] = useState<I_UserRegister>({
    password: '',
    email: '',
    userName: '',
    fullName: '',
    repeatPassword: '',
    phone: '',
    address: '',
  });
  const [error, setError] = useState<I_RegisterError>({
    isError: false,
    msgEmail: '',
    msgPhone: '',
    msgUserName: '',
    msgFullName: '',
    msgAddress: '',
    msgPassword: '',
    msgPasswordConfirm: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData((prev: I_UserRegister) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const responseValidate = await registerServices.validator(dataForm);
    setError({ ...responseValidate });

    if (responseValidate.isError) {
      return;
    }

    const registerResponse = await registerServices.register(dataForm);
    console.log(registerResponse);
    if (registerResponse) {
      navigate('/login');
    }
  };

  return (
    <div>
      <PageHero title="Sign Up" />
      <Box
        sx={{
          my: 8,
          mx: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box component="form" noValidate sx={{ mt: 1, width: '400px' }} onSubmit={handleSubmit}>
          <Typography component={'h1'} variant="h4" align="center" color={'secondary'} gutterBottom>
            Sign Up
          </Typography>
          <TextField
            margin="normal"
            required
            id="User Name"
            name="userName"
            label="User Name"
            fullWidth
            onChange={handleChange}
            error={error.isError && error.msgUserName.length > 0}
            helperText={error.msgUserName}
          />
          <TextField
            margin="normal"
            required
            id="Email"
            type="email"
            label="Email"
            name="email"
            fullWidth
            onChange={handleChange}
            error={error.isError && error.msgEmail.length > 0}
            helperText={error.msgEmail}
          />
          <TextField
            margin="normal"
            required
            id="fullName"
            label="Full Name"
            name="fullName"
            fullWidth
            onChange={handleChange}
            error={error.isError && error.msgFullName.length > 0}
            helperText={error.msgFullName}
          />
          <TextField
            margin="normal"
            required
            id="Password"
            type="password"
            label="Password"
            name="password"
            fullWidth
            onChange={handleChange}
            error={error.isError && error.msgPassword.length > 0}
            helperText={error.msgPassword}
          />
          <TextField
            margin="normal"
            required
            id="Confirm Password"
            label="Confirm Password"
            type="password"
            name="repeatPassword"
            fullWidth
            onChange={handleChange}
            error={error.isError && error.msgPasswordConfirm.length > 0}
            helperText={error.msgPasswordConfirm}
          />
          <TextField
            margin="normal"
            required
            id="phone"
            label="Phone"
            name="phone"
            fullWidth
            onChange={handleChange}
            error={error.isError && error.msgPhone.length > 0}
            helperText={error.msgPhone}
          />
          <TextField
            margin="normal"
            required
            id="address"
            label="Address"
            name="address"
            fullWidth
            onChange={handleChange}
            error={error.isError && error.msgAddress.length > 0}
            helperText={error.msgAddress}
          />

          <Button
            variant="contained"
            type="submit"
            startIcon={<SendIcon />}
            fullWidth
            sx={{ mt: 3, mb: 2 }}
            color={'secondary'}
          >
            Sign Up
          </Button>

          <Link to="/login">
            <Typography component={'span'} color={'primary'}>
              Already have an account? Sign in
            </Typography>
          </Link>
        </Box>
      </Box>
    </div>
  );
}
