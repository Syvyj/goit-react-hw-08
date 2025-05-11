import { useDispatch, useSelector } from 'react-redux';
import { TextField, InputAdornment, Fade } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';
import { setFilter } from '../../redux/filters/slice';
import styles from './Filter.module.css';

const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(state => state.filters);

  const handleChange = (event) => {
    dispatch(setFilter(event.target.value));
  };

  const handleClear = () => {
    dispatch(setFilter(''));
  };

  return (
    <Fade in={true} timeout={500}>
      <TextField
        fullWidth
        size="small"
        label="Find contacts by name or number"
        variant="outlined"
        value={filter}
        onChange={handleChange}
        className={styles.filter}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="action" />
            </InputAdornment>
          ),
          endAdornment: filter && (
            <InputAdornment position="end">
              <IconButton
                aria-label="clear search"
                onClick={handleClear}
                edge="end"
                size="small"
                className={styles.clearButton}
              >
                <ClearIcon fontSize="small" />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Fade>
  );
};

export default Filter;
