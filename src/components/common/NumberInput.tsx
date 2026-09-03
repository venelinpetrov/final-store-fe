import { NumberInput as ChakraNumberInput } from '@chakra-ui/react';

export interface NumberInputProps {
    value: string | undefined;
    disabled?: boolean;
    name: string;
    min?: number;
    max?: number;
    width?: string;
    onChange: (value: string) => void;
}

export const NumberInput = ({
    value,
    disabled,
    name,
    min = 0,
    max = 50,
    width,
    onChange,
}: NumberInputProps) => {
    return (
        <ChakraNumberInput.Root
            width={width}
            value={value}
            min={min}
            max={max}
            name={name}
            disabled={disabled}
            onValueChange={(data) => onChange(data.value)}
        >
            <ChakraNumberInput.Input />
            <ChakraNumberInput.Control />
        </ChakraNumberInput.Root>
    );
};
