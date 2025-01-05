import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Button, Card, CardContent, Typography, CircularProgress } from '@mui/material';

import {
    getUserById,
    selectUserDetail,
} from '../../utils/userOperations';
import { AppDispatch, RootState } from '../../store/store';



const UserDetails: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const user = useSelector(selectUserDetail);
    const status = useSelector((state: RootState) => state.users.status);

    useEffect(() => {
        if (id) {
            dispatch(getUserById(Number(id)));
        }
    }, [dispatch, id]);

    if (status === 'loading') {
        return (
            <Box display="flex" justifyContent="center" mt={5}>
                <CircularProgress />
            </Box>
        );
    }

    if (!user) {
        return (
            <Box>
                <Button variant="contained" onClick={() => navigate('/')}>
                    Back to List
                </Button>
                <Typography mt={2}>No user data available.</Typography>
            </Box>
        );
    }

    return (
        <Box>
            <Button variant="contained" sx={{ mb: 2 }} onClick={() => navigate('/')}>
                Back to list
            </Button>
            <Card>
                <CardContent>
                    <Typography variant="h5" gutterBottom>
                        {user.firstName} {user.lastName}
                    </Typography>
                    <Typography variant="body1">
                        <strong>Email:</strong> {user.email}
                    </Typography>
                    <Typography variant="body1">
                        <strong>Phone:</strong> {user.phone}
                    </Typography>
                    <Typography variant="body1">
                        <strong>Company:</strong> {user.company?.name}
                    </Typography>
                    <Typography variant="body1">
                        <strong>Department:</strong> {user.company?.department}
                    </Typography>
                    <Typography variant="body1">
                        <strong>Title:</strong> {user.company?.title}
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    );
};

export default UserDetails;