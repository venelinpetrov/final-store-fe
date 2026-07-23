import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider as RTKProvider } from 'react-redux';
import { store } from './store/store.ts';
import { BrowserRouter, Route, Routes } from 'react-router';
import Layout from './components/layout/Layout.tsx';
import HomePage from './pages/HomePage.tsx';
import ProfilePage from './pages/ProfilePage.tsx';
import AdminPage from './pages/AdminPage.tsx';
import { Provider as ChakraProvider } from './components/ui/provider';
import AboutPage from './pages/About.tsx';
import ContactPage from './pages/Contact.tsx';
import CartPage from './pages/Cart.tsx';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <RTKProvider store={store}>
            <ChakraProvider>
                <BrowserRouter>
                    <Routes>
                        <Route element={<Layout />}>
                            <Route index element={<HomePage />} />
                            <Route path="/profile" element={<ProfilePage />} />
                            <Route path="/about" element={<AboutPage />} />
                            <Route path="/contact" element={<ContactPage />} />
                            <Route path="/cart" element={<CartPage />} />
                            <Route path="/admin" element={<AdminPage />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </ChakraProvider>
        </RTKProvider>
    </StrictMode>,
);
