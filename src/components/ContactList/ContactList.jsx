import { useSelector, useDispatch } from 'react-redux';
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Paper,
  Tooltip,
  Zoom,
  Typography,
  Slide,
  Box,
  CircularProgress,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';
import { deleteContact, editContact } from '../../redux/contacts/operations';
import toast from 'react-hot-toast';
import styles from './ContactList.module.css';
import React from 'react';

const SlideTransition = React.forwardRef((props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
));

const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts.items);
  const filter = useSelector(state => state.filters);
  const isLoading = useSelector(state => state.contacts.isLoading);
  const error = useSelector(state => state.contacts.error);
  const [deleteDialog, setDeleteDialog] = useState({
    open: false,
    contactId: null,
    contactName: '',
  });
  const [editDialog, setEditDialog] = useState({ open: false, contact: null });
  const [editedName, setEditedName] = useState('');
  const [editedNumber, setEditedNumber] = useState('');

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(
      contact =>
        contact.name.toLowerCase().includes(normalizedFilter) ||
        contact.number.includes(filter)
    );
  };

  const handleDeleteClick = (id, name) => {
    setDeleteDialog({ open: true, contactId: id, contactName: name });
  };

  const handleDeleteConfirm = () => {
    dispatch(deleteContact(deleteDialog.contactId))
      .unwrap()
      .then(() => {
        toast.success('Contact deleted successfully');
      })
      .catch(() => {
        toast.error('Failed to delete contact');
      });
    setDeleteDialog({ open: false, contactId: null, contactName: '' });
  };

  const handleDeleteCancel = () => {
    setDeleteDialog({ open: false, contactId: null, contactName: '' });
  };

  const handleEditClick = contact => {
    setEditDialog({ open: true, contact });
    setEditedName(contact.name);
    setEditedNumber(contact.number);
  };

  const handleEditConfirm = () => {
    const editedContact = {
      name: editedName,
      number: editedNumber,
    };

    dispatch(editContact({ id: editDialog.contact.id, contact: editedContact }))
      .unwrap()
      .then(() => {
        toast.success('Contact updated successfully');
        setEditDialog({ open: false, contact: null });
      })
      .catch(() => {
        toast.error('Failed to update contact');
      });
  };

  const handleEditCancel = () => {
    setEditDialog({ open: false, contact: null });
    setEditedName('');
    setEditedNumber('');
  };

  const visibleContacts = getVisibleContacts();

  return (
    <>
      {isLoading && (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress />
        </Box>
      )}

      {!isLoading && !error && (
        <List className={styles.list}>
          {visibleContacts.map(({ id, name, number }, index) => (
            <Slide
              direction="right"
              in={true}
              timeout={300 + index * 100}
              key={id}
              mountOnEnter
              unmountOnExit
            >
              <ListItem
                className={styles.listItem}
                secondaryAction={
                  <div className={styles.actions}>
                    <Tooltip 
                      title="Edit contact" 
                      placement="left"
                      TransitionComponent={Zoom}
                      arrow
                    >
                      <IconButton
                        edge="end"
                        aria-label="edit"
                        onClick={() => handleEditClick({ id, name, number })}
                        color="primary"
                        className={styles.actionButton}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip 
                      title="Delete contact" 
                      placement="right"
                      TransitionComponent={Zoom}
                      arrow
                    >
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => handleDeleteClick(id, name)}
                        color="error"
                        className={styles.actionButton}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </div>
                }
              >
                <ListItemText
                  primary={
                    <Typography variant="subtitle1" component="div">
                      {name}
                    </Typography>
                  }
                  secondary={
                    <Typography variant="body2" color="text.secondary">
                      {number}
                    </Typography>
                  }
                />
              </ListItem>
            </Slide>
          ))}
        </List>
      )}

      <Dialog
        open={deleteDialog.open}
        onClose={handleDeleteCancel}
        TransitionComponent={SlideTransition}
        PaperProps={{
          elevation: 2,
          className: styles.dialog
        }}
      >
        <DialogTitle>
          <Typography variant="h6" component="div">
            Delete Contact
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete <strong>{deleteDialog.contactName}</strong>?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={handleDeleteCancel}
            color="inherit"
            variant="outlined"
          >
            Cancel
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            color="error"
            variant="contained"
            disableElevation
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={editDialog.open}
        onClose={handleEditCancel}
        TransitionComponent={SlideTransition}
        PaperProps={{
          elevation: 2,
          className: styles.dialog
        }}
      >
        <DialogTitle>
          <Typography variant="h6" component="div">
            Edit Contact
          </Typography>
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            variant="outlined"
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Phone Number"
            type="text"
            fullWidth
            value={editedNumber}
            onChange={(e) => setEditedNumber(e.target.value)}
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={handleEditCancel}
            color="inherit"
            variant="outlined"
          >
            Cancel
          </Button>
          <Button
            onClick={handleEditConfirm}
            color="primary"
            variant="contained"
            disableElevation
            autoFocus
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ContactList;
