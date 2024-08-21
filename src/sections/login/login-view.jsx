import { Modal, message } from 'antd';
import { useState, useEffect } from 'react';
import { Link as RRLink } from 'react-router-dom';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks';

import { useUser } from 'src/hooks/useUser';
import { useLogin } from 'src/hooks/useAuth';

import { bgGradient } from 'src/theme/css';

import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function LoginView() {
  const { success, loading, error, login: perform_post } = useLogin();
  const { reset } = useUser();
  const theme = useTheme();

  const router = useRouter();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (error) {
      const error_msg = error?.non_field_errors?.[0];
      message.error(error_msg || "Something went wrong");
    } else if (success) {
      message.success("Login Successful")
      reset();
      router.push('/')
    }
  }, [success, error, reset, router])


  const handleChange = e => {
    setFormData(
      {
        ...formData,
        [e.target.name]: e.target.value
      }
    )
  }

  const handleClick = () => {
    perform_post(formData);
  };

  const handleKeyUp = e => {
    if (e.key === 'Enter') {
      handleClick();
    }
  }

  const renderForm = (
    <>
      <Stack spacing={3}>
        <TextField onChange={handleChange} name="email" label="Email address" />

        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          onChange={handleChange}
          onKeyUp={handleKeyUp}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }}>
        <Link onClick={() => setModalOpen(true)} variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        onClick={handleClick}
        disabled={loading}
      >
        Login
      </LoadingButton>
    </>
  );

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
        height: 1,
      }}
    >
      <Logo
        sx={{
          position: 'fixed',
          top: { xs: 16, md: 24 },
          left: { xs: 16, md: 24 },
        }}
      />

      <Modal
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        title="How to reset password?"
      >
        <Typography sx={{ my: 4 }}>
          Please use the <RRLink to="#">Password Reset</RRLink> option of the main site
        </Typography>
      </Modal>

      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          <Typography variant="h4" sx={{ mb: 3 }}>Sign in to HiFi Admin</Typography>

          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
}
