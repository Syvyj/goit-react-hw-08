import { useDispatch, useSelector } from 'react-redux';
import { Button, Avatar, Box, Typography } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { logout } from '../../redux/auth/operations';
import styles from './UserMenu.module.css';

const UserMenu = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Box className={styles.wrapper}>
      <Box className={styles.userInfo}>
        <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
          {user.name.charAt(0).toUpperCase()}
        </Avatar>
        <Typography variant="body1" className={styles.username}>
          {user.name}
        </Typography>
      </Box>
      <Button
        variant="outlined"
        color="inherit"
        onClick={handleLogout}
        startIcon={<LogoutIcon />}
        size="small"
      >
        Logout
      </Button>
    </Box>
  );
};

export default UserMenu;
