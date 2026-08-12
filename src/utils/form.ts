import { type FormikValues, type FormikConfig, useFormik } from 'formik';

export const useForm = <Values extends FormikValues>(config: FormikConfig<Values>) => {
    return useFormik({
        validateOnBlur: false,
        validateOnChange: false,
        ...config,
    });
};
