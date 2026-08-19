import { useParams } from 'react-router';

export const useIdParams = () => {
    const params = useParams();

    return Object.entries(params).reduce<Record<string, number>>((acc, [key, value]) => {
        return { ...acc, [key]: Number(value) };
    }, {});
};
