import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, Paper, Fade, Alert } from '@mui/material';
import ContactForm from '../../components/ContactForm/ContactForm';
import ContactList from '../../components/ContactList/ContactList';
import Filter from '../../components/Filter/Filter';
import { fetchContacts } from '../../redux/contacts/operations';
import styles from './ContactsPage.module.css';

const ContactsPage = () => {
  const dispatch = useDispatch();
  const error = useSelector(state => state.contacts.error);
  const contacts = useSelector(state => state.contacts.items);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <Fade in={true} timeout={500}>
      <div className={styles.container}>
        <div className={styles.header}>
          <Typography variant="h4" component="h1" className={styles.title}>
            Phonebook
          </Typography>
        </div>

        <Paper elevation={0} className={styles.content}>
          <ContactForm />

          {error && (
            <Alert severity="error" className={styles.alert}>
              {error}
            </Alert>
          )}

          {contacts.length > 0 ? (
            <>
              <Filter />
              <ContactList />
            </>
          ) : !error && (
            <Typography 
              variant="body1" 
              color="text.secondary" 
              align="center"
              className={styles.noContacts}
            >
              No contacts yet. Add your first contact using the form above.
            </Typography>
          )}
        </Paper>
      </div>
    </Fade>
  );
};

export default ContactsPage;
