import { Link } from '@chakra-ui/react';
import type { ReactNode } from 'react';
import { NavLink as ReactRouterNavLink } from 'react-router';

type NavLinkProps = {
    to: string;
    children: ReactNode;
};

export const NavItem = ({ to, children }: NavLinkProps) => {
    return (
        <ReactRouterNavLink to={to}>
            {({ isActive }) => (
                <Link
                    colorPalette="blue"
                    color={isActive ? 'colorPalette.solid' : 'fg.muted'}
                    _hover={{ color: 'colorPalette.fg' }}
                >
                    {children}
                </Link>
            )}
        </ReactRouterNavLink>
    );
};
