export interface CustomerPaymentMethod {
    methodId: number;
    customerId: number;
    cardBrand: string;
    last4: string;
    expMonth: number;
    expYear: number;
    isDefault: boolean;
}
