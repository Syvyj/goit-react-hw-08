import { useEffect, lazy, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { CircularProgress, Box, Fade } from '@mui/material';
import { refreshUser } from '../../redux/auth/operations';
import Layout from '../Layout/Layout';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import RestrictedRoute from '../RestrictedRoute/RestrictedRoute';

const HomePage = lazy(() => import('../../pages/Home/HomePage'));
const RegisterPage = lazy(() => import('../../pages/Register/RegisterPage'));
const LoginPage = lazy(() => import('../../pages/Login/LoginPage'));
const ContactsPage = lazy(() => import('../../pages/Contacts/ContactsPage'));

const App = () => {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(state => state.auth.isRefreshing);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return isRefreshing ? (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f5f5f5"
    >
      <CircularProgress />
    </Box>
  ) : (
    <Fade in={true} timeout={300}>
      <div>
        <Suspense
          fallback={
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              minHeight="100vh"
              bgcolor="#f5f5f5"
            >
              <CircularProgress />
            </Box>
          }
        >
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route
                path="/register"
                element={
                  <RestrictedRoute redirectTo="/contacts" component={<RegisterPage />} />
                }
              />
              <Route
                path="/login"
                element={
                  <RestrictedRoute redirectTo="/contacts" component={<LoginPage />} />
                }
              />
              <Route
                path="/contacts"
                element={
                  <PrivateRoute redirectTo="/login" component={<ContactsPage />} />
                }
              />
            </Route>
          </Routes>
        </Suspense>
      </div>
    </Fade>
  );
};

export default App;
