import { ErrorMessage, Field, Form, Formik } from "formik";
import s from "./Login.module.css"
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { setAuthDataAC } from "../../Redux/authreducer";

const Login = (props) => {

    if (props.isAuth) {
        return <Navigate to={"/chat"} />
    }

    return <div className={s.wrapper}>
        <Formik
            initialValues={{ idInstance: '', apiTokenInstance: '' }}
            validate={values => {
                const errors = {};
                if (!values.idInstance) {
                    errors.idInstance = 'Поле не должно остаться пустым.';
                }

                if (!values.apiTokenInstance) {
                    errors.apiTokenInstance = 'Поле не должно остаться пустым.';
                }
                return errors;
            }}
            onSubmit={(values) => {
                props.setAuthDataAC(values.idInstance, values.apiTokenInstance, true);
            }}
        >
            {({ isSubmitting }) => (
                <Form className={s.form}>
                    <div>Введите idInstance:</div>
                    <Field name="idInstance" className={s.fields} />
                    <ErrorMessage name="idInstance" component="div" />
                    <div>Введите apiTokenInstance:</div>
                    <Field name="apiTokenInstance" className={s.fields} />
                    <ErrorMessage name="apiTokenInstance" component="div" />
                    <button type="submit" disabled={isSubmitting} className={s.btn}>
                        Войти
                    </button>
                </Form>
            )}
        </Formik>
    </div>
}

let mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth
    }
}

export default connect(mapStateToProps, { setAuthDataAC })(Login);