import { useDispatch } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Container, Button, TextField, Typography, Paper, Box } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import { login } from '../../redux/auth/operations';
import styles from './LoginPage.module.css';

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(7, 'Password must be at least 7 characters')
    .required('Password is required'),
});

const LoginPage = () => {
  const dispatch = useDispatch();

  const handleSubmit = (values, { setSubmitting }) => {
    dispatch(login(values))
      .unwrap()
      .catch(() => {
        // Error handling is managed by the auth slice
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <Container maxWidth="sm" className={styles.container}>
      <Paper elevation={3} className={styles.paper}>
        <Box className={styles.iconWrapper}>
          <LoginIcon color="primary" sx={{ fontSize: 40 }} />
        </Box>
        <Typography variant="h4" component="h1" gutterBottom align="center" color="primary">
          Login
        </Typography>
        <Typography variant="body1" color="text.secondary" align="center" gutterBottom>
          Please sign in to continue
        </Typography>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form className={styles.form}>
              <Field
                as={TextField}
                fullWidth
                name="email"
                label="Email"
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
                margin="normal"
                size="small"
              />
              <Field
                as={TextField}
                fullWidth
                name="password"
                type="password"
                label="Password"
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
                margin="normal"
                size="small"
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isSubmitting}
                fullWidth
                size="large"
                className={styles.submitButton}
                disableElevation
              >
                Login
              </Button>
            </Form>
          )}
        </Formik>
      </Paper>
    </Container>
  );
};

export default LoginPage;
