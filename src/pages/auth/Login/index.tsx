import * as React from 'react';
import PageHero from '../../../components/PageHero';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import Typography from '@mui/material/Typography';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { LoginServices } from './LoginServices';
import { F_UserLogin } from '../../../types/form.type';
import { Err_UserLogin } from '../../../types/error.type';
import { ToastContainer, toast } from 'react-toastify';
import { Res_Err_User_Login } from '../../../types/error.res';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess } from '../../../redux/slice/AuthSlice';
import axios, { AxiosError } from 'axios';

export default function Login() {
  const navigate = useNavigate();
  const loginServices = new LoginServices();
  const dispatch = useDispatch();
  const [dataForm, setDataForm] = useState<F_UserLogin>({
    email: '',
    password: '',
  });
  const [error, setError] = useState<Err_UserLogin>({
    isError: false,
    msgEmail: '',
    msgPassword: '',
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      const retValidator = await loginServices.validator(dataForm);
      setError(retValidator);
      if (retValidator.isError) {
        return;
      }
      const responseLogin = await loginServices.onLogin(dataForm);
      dispatch(loginSuccess(responseLogin?.data));
      toast.success('Login successful', {
        autoClose: 1000,
      });
      setTimeout(() => {
        navigate('/');
      }, 1000);
    } catch (error) {
      const newError = error as Res_Err_User_Login;
      toast.error(newError.message, {
        autoClose: 1000,
      });
    }
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setDataForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <ToastContainer />
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
            error={error.msgEmail.length > 0}
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
            error={error.msgPassword.length > 0}
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
