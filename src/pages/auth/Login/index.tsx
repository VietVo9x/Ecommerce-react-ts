import * as React from 'react';
import PageHero from '../../../components/PageHero';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import Typography from '@mui/material/Typography';
import { Link, useNavigate } from 'react-router-dom';
import { I_LoginError, I_UserLogin } from '../../../types/LoginType';
import { useState } from 'react';
import { LoginServices } from './LoginServices';
import { useDispatch } from 'react-redux';
import { login } from '../../../redux/slice/AuthSlice';

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginServices = new LoginServices();
  const [dataForm, setDataForm] = useState<I_UserLogin>({
    email: '',
    password: '',
    isChecked: false,
  });
  const [error, setError] = useState<I_LoginError>({
    isError: false,
    msgEmail: '',
    msgPassword: '',
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const retValidator = await loginServices.validator(dataForm);
    if (retValidator.isError) {
      return setError(retValidator);
    }
    const responseLogin = await loginServices.onLogin(dataForm);
    if (responseLogin) {
      delete responseLogin.password;
      localStorage.setItem('userLogin', JSON.stringify(responseLogin));
      dispatch(login(responseLogin));
      navigate('/');
    }
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setDataForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <PageHero title="Sign In" />
      <Box
        sx={{
          my: 8,
          mx: 4,
        }}
      >
        <Box
          component="form"
          noValidate
          sx={{
            mt: 1,
            width: '400px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            margin: '0 auto',
          }}
          onSubmit={handleSubmit}
        >
          <Typography component={'h1'} variant="h4" align="center" color={'secondary'} gutterBottom>
            Sign In
          </Typography>

          <TextField
            margin="normal"
            required
            id="email"
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
            id="password"
            type="password"
            label="Password"
            name="password"
            fullWidth
            onChange={handleChange}
            error={error.isError && error.msgPassword.length > 0}
            helperText={error.msgPassword}
          />

          <Button
            variant="contained"
            type="submit"
            startIcon={<SendIcon />}
            fullWidth
            sx={{ mt: 3, mb: 2 }}
            color="secondary"
          >
            Sign In
          </Button>

          <Link to="/register">
            <Typography
              component={'span'}
              color={'primary'}
              sx={{ display: 'block', width: '400px' }}
            >
              Don't have an account? Sign Up
            </Typography>
          </Link>
        </Box>
      </Box>
    </div>
  );
}
