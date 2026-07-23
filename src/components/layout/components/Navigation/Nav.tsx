import { HStack, Separator } from '@chakra-ui/react';
import { NavItem } from './NavLink';

const links = [
    { to: '/', label: 'Home' },
    { to: '/contact', label: 'Contact us' },
    { to: '/about', label: 'About us' },
    { to: '/admin', label: 'Admin' },
];

export const Nav = () => (
    <HStack
        className="nav"
        as="nav"
        gap={4}
        separator={<Separator orientation="vertical" size="md" height="4" />}
    >
        {links.map((link) => (
            <NavItem key={link.to} to={link.to}>
                {link.label}
            </NavItem>
        ))}
    </HStack>
);
