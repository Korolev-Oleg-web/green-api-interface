import { Formik, Form, Field } from "formik"
import s from './SendMessageForm.module.css'

let SendMessageForm = (props) => {
    return <div className={s.formWrapper}><Formik
        initialValues={{ text: '' }}
        onSubmit={(values) => {

            props.sendMessage(props.activeChatId, values.text, true, props.idInstance, props.apiTokenInstance);
            values.text = '';
        }}
    >
        {() => (
            <Form>
                <Field name="text" placeholder="Введите сообщение" />
                <button type="submit">
                    Отправить
                </button>
            </Form>
        )}
    </Formik></div>
}

export default SendMessageForm;