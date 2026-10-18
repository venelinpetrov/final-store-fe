import { Grid, GridItem } from '@chakra-ui/react';
import { useImperativeHandle } from 'react';
import * as yup from 'yup';

import { useForm } from '../../utils/form';
import { TextInput } from './TextInput';

const addressFormValidationSchema = yup.object().shape({
    fullName: yup.string().required(),
    country: yup.string().required(),
    state: yup.string().required(),
    city: yup.string().required(),
    street: yup.string().required(),
    postalCode: yup.string().required(),
    floor: yup.string().required(),
    apartmentNo: yup.string().required(),
    isDefault: yup.boolean(),
});

export interface AddressFormValues {
    fullName: string;
    country: string;
    state: string;
    city: string;
    street: string;
    postalCode: string;
    floor: string;
    apartmentNo: string;
    isDefault: boolean;
}

export interface AddressFormRef {
    validate: () => Promise<boolean>;
    getValues: () => AddressFormValues;
}

export interface AddressFormProps {
    ref: React.Ref<AddressFormRef>;
}

export const AddressForm = ({ ref }: AddressFormProps) => {
    const { values, errors, handleChange, validateForm } = useForm<AddressFormValues>({
        initialValues: {
            fullName: '',
            country: '',
            state: '',
            city: '',
            street: '',
            postalCode: '',
            floor: '',
            apartmentNo: '',
            isDefault: false,
        },
        validationSchema: addressFormValidationSchema,
        onSubmit: async () => {},
    });

    useImperativeHandle(
        ref,
        () => ({
            validate: async () => {
                const errors = await validateForm();
                return Object.keys(errors).length === 0;
            },
            getValues: () => values,
        }),
        [validateForm, values],
    );

    return (
        <Grid templateColumns="repeat(6, 1fr)" gap={4}>
            <GridItem colSpan={6}>
                <TextInput
                    value={values.fullName}
                    name="fullName"
                    label="fullName"
                    onChange={handleChange}
                    error={errors.fullName}
                    autoFocus
                />
            </GridItem>
            <GridItem colSpan={2}>
                <TextInput
                    value={values.country}
                    name="country"
                    label="country"
                    onChange={handleChange}
                    error={errors.country}
                />
            </GridItem>
            <GridItem colSpan={2}>
                <TextInput
                    value={values.city}
                    name="city"
                    label="city"
                    onChange={handleChange}
                    error={errors.city}
                />
            </GridItem>
            <GridItem colSpan={2}>
                <TextInput
                    value={values.state}
                    name="state"
                    label="state"
                    onChange={handleChange}
                    error={errors.state}
                />
            </GridItem>
            <GridItem colSpan={6}>
                <TextInput
                    value={values.street}
                    name="street"
                    label="street"
                    onChange={handleChange}
                    error={errors.street}
                />
            </GridItem>
            <GridItem colSpan={2}>
                <TextInput
                    value={values.postalCode}
                    name="postalCode"
                    label="postalCode"
                    onChange={handleChange}
                    error={errors.postalCode}
                />
            </GridItem>
            <GridItem colSpan={2}>
                <TextInput
                    value={values.floor}
                    name="floor"
                    label="floor"
                    onChange={handleChange}
                    error={errors.floor}
                />
            </GridItem>
            <GridItem colSpan={2}>
                <TextInput
                    value={values.apartmentNo}
                    name="apartmentNo"
                    label="apartmentNo"
                    onChange={handleChange}
                    error={errors.apartmentNo}
                />
            </GridItem>
        </Grid>
    );
};
