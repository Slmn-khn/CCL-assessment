import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../store/store";
import { getUser, selectAllUsers } from "../../utils/userOperations";

//Data structure for wrapped component
//user object
export interface UserDetails {
    id: number;
    firstName: string;
    lastName: string;
    company?: {
        name: string;
    }
    phone: string;
    email: string;
}

export interface SearchAndPaginationInhectedProps {
    data: UserDetails[]; //filtered + paginated data
    loading: boolean; // loading state
    error: string | null | undefined; // error state
    page: number; // selected page index 
    rowsPerPage: number; // rows per page
    totalCount: number; // data after pagination and filter
    handleChangePage: (event: unknown, newPage: number) => void;
    handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

// Props of the wrapped component 
function withSearchAndPagination<P extends object>(
    WrappedComponent: React.ComponentType<P & SearchAndPaginationInhectedProps>
) {

    const HOC: React.FC<P> = (props) => {
        const dispatch = useDispatch<AppDispatch>();
        const allUsers = useSelector(selectAllUsers);     // All users in Redux
        const status = useSelector((state: RootState) => state.users.status);
        const error = useSelector((state: RootState) => state.users.error);
        const searchQuery = useSelector((state: RootState) => state.users.searchQuery);

        //Local pagination states
        const [page, setPage] = useState(0);
        const [rowsPerPage, setRowsPerPage] = useState(5);

        //Fetch data once if needed
        useEffect(() => {
            if (status === 'idle') {
                dispatch(getUser());
            }
        }, [status, dispatch]);

        //Filter the entire user list by search query
        const lowerQuery = searchQuery.toLowerCase();
        const filtered = allUsers.filter((user) => {
            const combinedString = [
                user.firstName,
                user.lastName,
                user.email,
                user.phone,
                user.company?.name ?? '',
            ]
                .join(' ')
                .toLowerCase();

            return combinedString.includes(lowerQuery);
        });

        //Paginate the filtered array
        const startIndex = page * rowsPerPage;
        const endIndex = startIndex + rowsPerPage;
        const paginatedData = filtered.slice(startIndex, endIndex);

        // TablePagination event handlers
        const handleChangePage = (_event: unknown, newPage: number) => {
            setPage(newPage);
        };

        const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
            setRowsPerPage(parseInt(event.target.value, 10));
            setPage(0); // Reset to first page when rowsPerPage changes
        };

        //final states
        const loading = status === 'loading';
        const totalCount = filtered.length; // For pagination

        //Render the wrapped component with injected props
        return (
            <WrappedComponent
                {...(props as P)}
                data={paginatedData}
                loading={loading}
                error={error}
                page={page}
                rowsPerPage={rowsPerPage}
                totalCount={totalCount}
                handleChangePage={handleChangePage}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
            />
        );
    }
    return HOC;
}

export default withSearchAndPagination;
