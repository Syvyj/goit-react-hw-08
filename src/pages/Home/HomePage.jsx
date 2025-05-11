import { Typography, Box, Container, Button, Fade } from '@mui/material';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from './HomePage.module.css';

const HomePage = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  return (
    <Container>
      <Box className={styles.container}>
        <Fade in={true} timeout={500}>
          <Box className={styles.content}>
            <ContactPhoneIcon className={styles.icon} />
            <Typography variant="h3" component="h1" gutterBottom>
              Welcome to Phonebook
            </Typography>
            <Typography variant="h6" color="text.secondary" paragraph>
              Your personal contact manager. Keep all your contacts organized and accessible in one place.
            </Typography>
            {!isLoggedIn && (
              <Box sx={{ mt: 4 }}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => navigate('/register')}
                  sx={{ mr: 2 }}
                >
                  Get Started
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => navigate('/login')}
                >
                  Sign In
                </Button>
              </Box>
            )}
            {isLoggedIn && (
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate('/contacts')}
                sx={{ mt: 4 }}
              >
                View Contacts
              </Button>
            )}
          </Box>
        </Fade>
      </Box>
    </Container>
  );
};

export default HomePage;
