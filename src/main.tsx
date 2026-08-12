import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider as RTKProvider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router';

import { store } from './api/store.ts';
import { ProtectedRoute } from './components/auth/ProtectedRoute.tsx';
import { Provider as ChakraProvider } from './components/common/ChakraProvider.tsx';
import { Toaster } from './components/common/Toaster.tsx';
import Layout from './components/layout/Layout.tsx';
import AboutPage from './features/about/About.tsx';
import AdminPage from './features/admin/AdminPage.tsx';
import CartPage from './features/cart/Cart.tsx';
import ContactPage from './features/contact/Contact.tsx';
import LoginPage from './features/login/LoginPage.tsx';
import ProductPage from './features/product/ProductPage.tsx';
import ProfilePage from './features/profile/ProfilePage.tsx';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <RTKProvider store={store}>
            <ChakraProvider>
                <BrowserRouter>
                    <Routes>
                        <Route element={<Layout />}>
                            <Route index element={<ProductPage />} />
                            <Route path="/about" element={<AboutPage />} />
                            <Route path="/contact" element={<ContactPage />} />
                            <Route path="/login" element={<LoginPage />} />

                            <Route element={<ProtectedRoute />}>
                                <Route path="/profile" element={<ProfilePage />} />
                                <Route path="/cart" element={<CartPage />} />
                                <Route path="/admin" element={<AdminPage />} />
                            </Route>
                        </Route>
                    </Routes>
                </BrowserRouter>
                <Toaster />
            </ChakraProvider>
        </RTKProvider>
    </StrictMode>,
);
