import { AppBar, Toolbar } from '@mui/material';
import NavLink from './shared/NavLink';

import Logo from './shared/Logo';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const auth = useAuth();

  return (
    <AppBar
      sx={{
        bgcolor: 'transparent',
        position: 'static',
        boxShadow: 'none',
      }}
    >
      <Toolbar
        sx={{
          display: 'flex',
        }}
      >
        <Logo />
        <div>
          {auth?.isLoggedIn ? (
            <>
              <NavLink
                bg='#00fffc'
                to='/chat'
                text='Go To Chat'
                textColor='black'
              />
              <NavLink
                bg='#51538f'
                to='/'
                text='Log out'
                textColor='white'
                onClick={auth.logout}
              />
            </>
          ) : (
            <>
              <NavLink
                bg='#00fffc'
                to='/login'
                text='Login'
                textColor='black'
              />
              <NavLink
                bg='#51538f'
                to='/signup'
                text='Sign up'
                textColor='white'
              />
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
