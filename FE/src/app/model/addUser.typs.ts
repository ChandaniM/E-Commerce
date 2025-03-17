export interface User {
    username: string;
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    phone_number: string;
    country: string;
    place: string;
    address: string;
    postal_code: string;
    date_of_birth: string;
    profile_picture?: string; // Optional
    wallet_balance: number;
    is_active: boolean;
    role: string;
  }
  