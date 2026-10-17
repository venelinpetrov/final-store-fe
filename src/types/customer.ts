export interface CustomerAddress {
    addressId: number;
    customerId: number;
    country: string;
    countryCode: string;
    state: string;
    city: string;
    street: string;
    postalCode: string;
    floor: string;
    apartmentNo: string;
    addressTypeId: number;
    addressTypeName: string;
    isDefault: boolean;
}
