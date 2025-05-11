import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button, Box } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import styles from './Navigation.module.css';

const Navigation = () => {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  return (
    <Box component="nav" className={styles.nav}>
      <NavLink 
        to="/" 
        className={({ isActive }) => 
          isActive ? `${styles.link} ${styles.active}` : styles.link
        }
      >
        <Button 
          color="inherit" 
          startIcon={<HomeIcon />}
          sx={{ 
            transition: 'all 0.2s ease-in-out',
            '&:hover': { transform: 'translateY(-2px)' }
          }}
        >
          Home
        </Button>
      </NavLink>
      {isLoggedIn && (
        <NavLink 
          to="/contacts" 
          className={({ isActive }) => 
            isActive ? `${styles.link} ${styles.active}` : styles.link
          }
        >
          <Button 
            color="inherit" 
            startIcon={<ContactPhoneIcon />}
            sx={{ 
              transition: 'all 0.2s ease-in-out',
              '&:hover': { transform: 'translateY(-2px)' }
            }}
          >
            Contacts
          </Button>
        </NavLink>
      )}
    </Box>
  );
};

export default Navigation;
