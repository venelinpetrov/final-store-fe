import { Status } from '../../../components/common/Status';

export const StockIndicator = ({ quantityInStock }: { quantityInStock: number | undefined }) => {
    if (typeof quantityInStock === 'undefined') {
        return null;
    }
    return quantityInStock > 0 ? (
        <Status status="success">In Stock</Status>
    ) : (
        <Status status="error">Out of stock</Status>
    );
};
