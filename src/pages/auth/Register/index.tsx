import PageHero from '../../../components/PageHero';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import './style.scss';
import { I_RegisterError, I_UserRegister } from '../../../types/RegisterType';
import RegisterEvent from './RegisterEvent';
import axios from 'axios';
export default function Register() {
  const registerEvent = new RegisterEvent();
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
    msgEmail: null,
    msgPhone: null,
    msgUserName: null,
    msgFullName: null,
    msgAddress: null,
    msgPassword: null,
    msgPasswordConfirm: null,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // const data = {
    //   email: dataForm.email,
    //   password: dataForm.password,
    // };
    // axios
    //   .post('http://localhost:3004/users', data)
    //   .then((response) => {
    //     console.log(response);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    const response = registerEvent.onRegister(dataForm);
    if (response?.isError) {
      setError({ ...response.msgError });
    }
    console.log(error);
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
          <Typography component={'h1'} variant="h4" align="center" color={'primary'} gutterBottom>
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
            error={!!error.msgUserName}
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
            error={!!error.msgEmail}
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
            error={!!error.msgFullName}
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
            error={!!error.msgPassword}
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
            error={!!error.msgPasswordConfirm}
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
            error={!!error.msgPhone}
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
            error={!!error.msgAddress}
            helperText={error.msgAddress}
          />

          <Button
            variant="contained"
            type="submit"
            startIcon={<SendIcon />}
            fullWidth
            sx={{ mt: 3, mb: 2 }}
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
