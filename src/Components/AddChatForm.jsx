import s from './Main/Main.module.css'
import { Formik, Form, Field } from "formik";

let AddChatForm = (props) => {
    return <div className={props.activeMenu ? [s.chatFormWrapper, s.activeForm].join(" ") : s.chatFormWrapper}>
        <Formik
            initialValues={{ chatId: '', chatName: '' }}
            onSubmit={(values) => {
                let pattern = /7\d\d\d\d\d\d\d\d\d\d/;
                if (!pattern.test(values.chatId) || values.chatName == '') {
                    alert('Проверьте правильность введенных данных');
                }
                else {
                    let id = values.chatId + "@c.us";
                    props.addNewChat(values.chatName,id );
                    props.setActiveMenu(false);
                    values.chatId = "";
                    values.chatName = "";
                }

            }}
        >
            {() => (
                <Form className={s.addChatForm}>
                    <label htmlFor="chatId">Введите номер телефона в указанном формате:</label>
                    <Field name="chatId" placeholder="79771683455" className={s.addChatField} />
                    <label htmlFor="chatName">Введите название чата:</label>
                    <Field name="chatName" placeholder="Название чата" className={s.addChatField} />
                    <button type="submit">
                        Добавить
                    </button>
                </Form>
            )}
        </Formik>
    </div>
}

export default AddChatForm;