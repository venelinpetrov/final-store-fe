import type { ReactNode } from 'react';

import { Link } from '@chakra-ui/react';
import { NavLink } from 'react-router';

interface NavItem {
    to: string;
    children: ReactNode;
}

export const NavItem = ({ to, children }: NavItem) => {
    return (
        <NavLink to={to}>
            {({ isActive }) => (
                <Link
                    as="span"
                    colorPalette="blue"
                    color={isActive ? 'colorPalette.solid' : 'fg.muted'}
                    _hover={{ color: 'colorPalette.fg' }}
                >
                    {children}
                </Link>
            )}
        </NavLink>
    );
};
