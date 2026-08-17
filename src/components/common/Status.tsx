import type { ColorPalette } from '@chakra-ui/react';

import { Status as ChakraStatus } from '@chakra-ui/react';
import * as React from 'react';

type Status = 'success' | 'error' | 'warning' | 'info';

export interface StatusProps extends ChakraStatus.RootProps {
    status?: Status;
}

const statusMap: Record<Status, ColorPalette> = {
    success: 'green',
    error: 'red',
    warning: 'orange',
    info: 'blue',
};

export const Status = React.forwardRef<HTMLDivElement, StatusProps>(function Status(props, ref) {
    const { children, status = 'info', ...rest } = props;
    const colorPalette = rest.colorPalette ?? statusMap[status];
    return (
        <ChakraStatus.Root ref={ref} {...rest} colorPalette={colorPalette}>
            <ChakraStatus.Indicator />
            {children}
        </ChakraStatus.Root>
    );
});
