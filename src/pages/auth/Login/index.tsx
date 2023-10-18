import PageHero from '../../../components/PageHero';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Link } from 'react-router-dom';
export default function Login() {
  return (
    <div>
      <PageHero title="Sign In" />
      <Box
        sx={{
          my: 8,
          mx: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box component="form" noValidate sx={{ mt: 1, width: '400px' }}>
          <Typography component={'h1'} variant="h4" align="center" color={'primary'} gutterBottom>
            Sign In
          </Typography>
          <TextField margin="normal" required id="outlined-required" label="User Name" fullWidth />
          <TextField margin="normal" required id="outlined-required" label="Password" fullWidth />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
            labelPlacement="start"
          />
          <Button
            variant="contained"
            type="submit"
            startIcon={<SendIcon />}
            fullWidth
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>

          <Link to="/register">
            <Typography component={'span'} color={'primary'}>
              Don't have an account? Sign Up
            </Typography>
          </Link>
        </Box>
      </Box>
    </div>
  );
}
