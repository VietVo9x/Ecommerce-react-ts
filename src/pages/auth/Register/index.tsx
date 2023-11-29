import PageHero from '../../../components/PageHero';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import Typography from '@mui/material/Typography';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './style.scss';
import RegisterServices from './RegisterServices';
import { F_UserRegister } from '../../../types/form.type';
import { Err_UserRegister } from '../../../types/error.type';
import { Res_Err_User_Register } from '../../../types/error.res';
import { ToastContainer, toast } from 'react-toastify';

export default function Register() {
  const navigate = useNavigate();
  const registerServices = new RegisterServices();
  const [dataForm, setFormData] = useState<F_UserRegister>({
    email: '',
    user_name: '',
    password: '',
    confirm_password: '',
  });
  const [errors, setErrors] = useState<Err_UserRegister>({
    isError: false,
    msgEmail: '',
    msgUserName: '',
    msgPassword: '',
    msgPasswordConfirm: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData((prev: F_UserRegister) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();

      const responseValidate = registerServices.validator(dataForm);
      setErrors({ ...responseValidate });

      if (responseValidate.isError) {
        return;
      }

      const registerResponse = await registerServices.register(dataForm);

      if (registerResponse) {
        toast.success('Register Success', {
          autoClose: 1000,
        });

        setTimeout(() => {
          navigate('/login');
        }, 3000);
      }
    } catch (error) {
      const newError = error as Res_Err_User_Register;
      toast.error(newError.message, {
        autoClose: 1000,
      });
    }
  };

  return (
    <div>
      <ToastContainer />
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
            name="user_name"
            label="User Name"
            fullWidth
            onChange={handleChange}
            error={errors.msgUserName.length > 0}
            helperText={errors.msgUserName}
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
            error={errors.msgEmail.length > 0}
            helperText={errors.msgEmail}
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
            error={errors.msgPassword.length > 0}
            helperText={errors.msgPassword}
          />
          <TextField
            margin="normal"
            required
            id="Confirm Password"
            label="Confirm Password"
            type="password"
            name="confirm_password"
            fullWidth
            onChange={handleChange}
            error={errors.msgPasswordConfirm.length > 0}
            helperText={errors.msgPasswordConfirm}
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
