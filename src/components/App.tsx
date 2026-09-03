import { BrowserRouter, Route, Routes } from 'react-router';

import AboutPage from '../features/about/About.tsx';
import AdminPage from '../features/admin/AdminPage.tsx';
import CartPage from '../features/cart/CartPage.tsx';
import ContactPage from '../features/contact/Contact.tsx';
import LoginPage from '../features/login/LoginPage.tsx';
import ProductDetailPage from '../features/product/ProductDetailPage.tsx';
import ProductPage from '../features/product/ProductPage.tsx';
import ProfilePage from '../features/profile/ProfilePage.tsx';
import { ProtectedRoute } from './auth/ProtectedRoute.tsx';
import { Provider as ChakraProvider } from './common/ChakraProvider.tsx';
import { Toaster } from './common/Toaster.tsx';
import Layout from './layout/Layout.tsx';

const App = () => {
    return (
        <ChakraProvider>
            <BrowserRouter>
                <Routes>
                    <Route element={<Layout />}>
                        <Route index element={<ProductPage />} />
                        <Route path="/products/:productId" element={<ProductDetailPage />} />
                        <Route path="/about" element={<AboutPage />} />
                        <Route path="/contact" element={<ContactPage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/cart" element={<CartPage />} />
                        <Route element={<ProtectedRoute />}>
                            <Route path="/profile" element={<ProfilePage />} />
                            <Route path="/admin" element={<AdminPage />} />
                        </Route>
                    </Route>
                </Routes>
            </BrowserRouter>
            <Toaster />
        </ChakraProvider>
    );
};

export default App;
