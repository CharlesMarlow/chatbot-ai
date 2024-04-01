import { Box, Typography, Button } from '@mui/material';
import { IoIosLogIn } from 'react-icons/io';
import { toast } from 'react-hot-toast';

import CustomInput from '../components/shared/CustomInput';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (auth?.user) {
      return navigate('/chat');
    }
  }, [auth]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    try {
      toast.loading('Signing in', { id: 'login' });
      auth?.login(email, password);
      toast.success('Logged in successfully', { id: 'login' });
    } catch (error) {
      console.log(error);
      toast.error('Failed to log in', { id: 'login' });
    }
  };

  return (
    <Box width={'100%'} height={'100%'} display={'flex'} flex={1}>
      <Box padding={8} mt={8} display={{ md: 'flex', sm: 'none', xs: 'none' }}>
        <img src='airobot.png' alt='AI robot' style={{ width: 400 }} />
      </Box>
      <Box
        display='flex'
        flex={{ xs: 1, md: 0.5 }}
        justifyContent={'center'}
        alignItems={'center'}
        padding={2}
        ml={'auto'}
        mt={16}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            margin: 'auto',
            padding: 30,
            boxShadow: '10px 10px 20px #000',
            borderRadius: 10,
            border: 'none',
          }}
        >
          <Box
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <Typography
              variant='h4'
              textAlign={'center'}
              padding={2}
              fontWeight={600}
            >
              Login
            </Typography>
            <CustomInput type='email' name='email' label='Email' />
            <CustomInput type='password' name='password' label='Password' />
            <Button
              type='submit'
              sx={{
                padding: 2,
                mt: 2,
                width: 428,
                borderRadius: 2,
                bgcolor: '#00fffc',
                ':hover': {
                  bgcolor: 'white',
                  color: 'black',
                },
              }}
              endIcon={<IoIosLogIn />}
            >
              Login
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Login;
