import React from 'react';
import SearchBar from '../SearchBar';
import UserTable from './index';
import withSearchAndPagination from '../hoc/SearchAndPagination';

// Wrap table component with the HOC
const EnhancedUserTable = withSearchAndPagination(UserTable);

const UserList: React.FC = () => {
    return (
        <>
            <SearchBar />
            <EnhancedUserTable />
        </>
    );
};

export default UserList;