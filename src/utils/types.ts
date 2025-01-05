export interface UserDetails {
    id: number;
    firstName: string;
    lastName: string;
    company: UserCompanyDetails;
    phone: string;
    email: string;
}

export interface UserDetailsState {
    list: UserDetails[];
    details: UserDetails | undefined | null;
    searchQuery: string;
    status: 'loading' | 'idle' | 'success' | 'failed';
    error: string | undefined | null;
}


export interface UserAddressDetails {
    address: string;
    city: string;
    postalCode: string;
    state: string;
}

export interface UserCompanyDetails {
    name: string;
    title: string;
    department: string;
    address: UserAddressDetails
}