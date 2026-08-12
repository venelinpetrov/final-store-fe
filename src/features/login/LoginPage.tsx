import { Button, Field, Input, Stack } from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router';
import * as yup from 'yup';

import { useLoginMutation } from '../../api/auth/api';
import { setAccessToken } from '../../api/auth/authSlice';
import { useAppDispatch } from '../../api/store';
import { toaster } from '../../components/common/Toaster';
import { isFetchBaseQueryError } from '../../utils/errorTypeGuards';
import { useForm } from '../../utils/form';

const loginFormSchema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email field is required'),
    password: yup.string().required('Password field is required'),
});

const LoginPage = () => {
    const [login] = useLoginMutation();
    const dispatch = useAppDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const { values, errors, handleChange, resetForm, handleSubmit } = useForm({
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

                await navigate(from, { replace: true });
            } catch (err) {
                if (isFetchBaseQueryError(err) && err.status === 401) {
                    toaster.create({
                        title: 'Bad credentials',
                        type: 'error',
                    });
                }
            } finally {
                resetForm();
            }
        },
    });

    const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/';

    return (
        <form onSubmit={handleSubmit} noValidate>
            <Stack
                gap="4"
                alignItems="center"
                minW="320px"
                maxW="500px"
                w="100%"
                justifyItems="center"
            >
                <Field.Root invalid={Boolean(errors.email)} required>
                    <Field.Label>
                        Email
                        <Field.RequiredIndicator />
                    </Field.Label>
                    <Input
                        autoFocus
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
                        type="password"
                        name="password"
                        placeholder="me@example.com"
                        value={values.password}
                        onChange={handleChange}
                    />
                    <Field.ErrorText>{errors.password}</Field.ErrorText>
                </Field.Root>

                <Button type="submit" width="100%">
                    Login
                </Button>
            </Stack>
        </form>
    );
};

export default LoginPage;
