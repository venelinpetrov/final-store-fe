import { Field, Input, type ColorPalette } from '@chakra-ui/react';

export interface TextInputProps {
    value: string;
    name: string;
    label: string;
    error?: string | undefined;
    autoFocus?: boolean;
    placeholder?: string;
    colorPalette?: ColorPalette;
    required?: boolean;
    onChange: React.ChangeEventHandler<HTMLInputElement, HTMLInputElement>;
}

export const TextInput = ({
    value,
    label,
    error,
    required = false,
    colorPalette = 'gray',
    autoFocus,
    name,
    placeholder,
    onChange,
}: TextInputProps) => {
    return (
        <Field.Root invalid={Boolean(error)} required={required} colorPalette={colorPalette}>
            <Field.Label>
                {label}
                <Field.RequiredIndicator />
            </Field.Label>
            <Input
                autoFocus={autoFocus}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
            <Field.ErrorText>{error}</Field.ErrorText>
        </Field.Root>
    );
};
