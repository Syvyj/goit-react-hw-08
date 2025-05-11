import { NavLink } from 'react-router-dom';
import { Button, Box } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LoginIcon from '@mui/icons-material/Login';
import styles from './AuthNav.module.css';

const AuthNav = () => {
  return (
    <Box className={styles.wrapper}>
      <NavLink 
        to="/register" 
        className={({ isActive }) => 
          isActive ? `${styles.link} ${styles.active}` : styles.link
        }
      >
        <Button 
          variant="outlined" 
          color="primary"
          startIcon={<PersonAddIcon />}
          size="small"
        >
          Register
        </Button>
      </NavLink>
      <NavLink 
        to="/login" 
        className={({ isActive }) => 
          isActive ? `${styles.link} ${styles.active}` : styles.link
        }
      >
        <Button 
          variant="contained" 
          color="primary"
          startIcon={<LoginIcon />}
          size="small"
          disableElevation
        >
          Login
        </Button>
      </NavLink>
    </Box>
  );
};

export default AuthNav;
