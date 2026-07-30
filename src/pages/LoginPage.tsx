import { Button, Field, Input, Stack } from '@chakra-ui/react';
import { useFormik } from 'formik';
import { useLocation, useNavigate } from 'react-router';
import * as yup from 'yup';

import { useLoginMutation } from '../store/auth/api';
import { setAccessToken } from '../store/auth/authSlice';
import { useAppDispatch } from '../store/store';

const loginFormSchema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email field is required'),
    password: yup.string().required('Password field is required'),
});
const LoginPage = () => {
    const [login] = useLoginMutation();
    const dispatch = useAppDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const { values, errors, handleChange, resetForm, submitForm } = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: loginFormSchema,
        onSubmit: async ({ email, password }) => {
            try {
                const res = await login({
                    email,
                    password,
                }).unwrap();

                dispatch(setAccessToken({ accessToken: res.accessToken }));

                navigate(from, { replace: true });
            } catch (err) {
                console.error(err);
            } finally {
                resetForm();
            }
        },
    });

    const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/';

    return (
        <Stack
            gap="4"
            alignItems="center"
            minW="320px"
            maxW="500px"
            w="100%"
            as="form"
            onSubmit={submitForm}
            justifyItems="center"
        >
            <Field.Root invalid={Boolean(errors.email)} required>
                <Field.Label>
                    Email
                    <Field.RequiredIndicator />
                </Field.Label>
                <Input
                    name="email"
                    placeholder="me@example.com"
                    value={values.email}
                    onChange={handleChange}
                />
                <Field.ErrorText>{errors.email}</Field.ErrorText>
            </Field.Root>

            <Field.Root invalid={Boolean(errors.password)} required>
                <Field.Label>
                    Password
                    <Field.RequiredIndicator />
                </Field.Label>
                <Input
                    name="password"
                    placeholder="me@example.com"
                    value={values.password}
                    onChange={handleChange}
                />
                <Field.ErrorText>{errors.password}</Field.ErrorText>
            </Field.Root>

            <Button onClick={submitForm} width="100%">
                Login
            </Button>
        </Stack>
    );
};

export default LoginPage;
