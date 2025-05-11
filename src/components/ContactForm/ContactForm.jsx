import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Box, Zoom } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import toast from 'react-hot-toast';
import { addContact } from '../../redux/contacts/operations';
import styles from './ContactForm.module.css';

const phoneRegExp = /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;

const validationSchema = Yup.object({
  name: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters')
    .required('Name is required'),
  number: Yup.string()
    .matches(phoneRegExp, 'Phone number is not valid')
    .required('Phone number is required'),
});

const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts.items);

  const handleSubmit = (values, { resetForm, setSubmitting, setFieldError }) => {
    const { name, number } = values;
    const isContactExist = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (isContactExist) {
      setFieldError('name', 'Contact with this name already exists');
      toast.error(`${name} is already in contacts`);
      setSubmitting(false);
      return;
    }

    dispatch(addContact({ name, number }))
      .unwrap()
      .then(() => {
        toast.success('Contact added successfully');
        resetForm();
      })
      .catch(() => {
        toast.error('Failed to add contact');
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <Box className={styles.formWrapper}>
      <Formik
        initialValues={{ name: '', number: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form className={styles.form}>
            <Field
              as={TextField}
              fullWidth
              name="name"
              label="Name"
              error={touched.name && Boolean(errors.name)}
              helperText={touched.name && errors.name}
              margin="normal"
              size="small"
              variant="outlined"
            />
            <Field
              as={TextField}
              fullWidth
              name="number"
              label="Phone Number"
              error={touched.number && Boolean(errors.number)}
              helperText={touched.number && errors.number}
              margin="normal"
              size="small"
              variant="outlined"
            />
            <Zoom in={true}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isSubmitting}
                className={styles.button}
                startIcon={<AddIcon />}
                disableElevation
              >
                Add contact
              </Button>
            </Zoom>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default ContactForm;
