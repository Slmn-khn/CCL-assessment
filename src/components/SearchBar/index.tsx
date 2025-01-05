import React, { ChangeEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TextField, Box } from '@mui/material';

import {
    selectSearchQuery,
    setSearchQuery,
} from '../../utils/userOperations';
import { AppDispatch } from '../../store/store';

import { searchPlaceHolder } from '../../const'

const SearchBar: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const searchValue = useSelector(selectSearchQuery);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearchQuery(e.target.value));
    };

    return (
        <Box mt={2}>
            <TextField
                fullWidth
                label={searchPlaceHolder}
                variant="outlined"
                value={searchValue}
                onChange={handleChange}
            />
        </Box>
    );
};

export default SearchBar;