import type { CustomerAddress } from '../types/customer';

export const addressToString = (address: CustomerAddress): string => {
    return [
        address.street,
        address.apartmentNo && `Apt. ${address.apartmentNo}`,
        address.floor && `Floor ${address.floor}`,
        address.city,
        address.state,
        address.postalCode,
        address.country,
    ]
        .filter(Boolean)
        .join(', ');
};
