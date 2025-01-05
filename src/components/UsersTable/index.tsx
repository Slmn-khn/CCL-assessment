import React from 'react';
import {
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Paper,
    Typography,
    CircularProgress,
    Box,
    TablePagination,
    Link,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import { SearchAndPaginationInhectedProps } from '../hoc/SearchAndPagination';

import { tableRowsPerPage } from '../../const'

const UserTable: React.FC<SearchAndPaginationInhectedProps> = ({
    data,
    loading,
    error,
    page,
    rowsPerPage,
    totalCount,
    handleChangePage,
    handleChangeRowsPerPage,
}) => {
    if (loading) {
        return (
            <Box display="flex" justifyContent="center" mt={5}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return <Typography color="error">Error: {error}</Typography>;
    }

    return (
        <Box>
            <TableContainer component={Paper} sx={{ mt: 3 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>First Name</TableCell>
                            <TableCell>Last Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Phone</TableCell>
                            <TableCell>Company</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.length > 0 ? (
                            data.map((user) => (
                                <TableRow hover key={user.id}>
                                    <TableCell>
                                        <Link
                                            component={RouterLink}
                                            to={`/users/${user.id}`}
                                            underline="hover"
                                        >
                                            {user.firstName}
                                        </Link>
                                    </TableCell>
                                    <TableCell>{user.lastName}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.phone}</TableCell>
                                    <TableCell>{user.company?.name}</TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5} align="center">
                                    No records found
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            {/*Pagination*/}
            <TablePagination
                component="div"
                count={totalCount}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={tableRowsPerPage}
            />
        </Box>
    );
};

export default UserTable;