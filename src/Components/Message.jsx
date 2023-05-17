import s from "./Main/Main.module.css";

let Message = (props) => {

    return <div className={props.belongUser ? [s.messageWrapper, s.belongMe].join(" ") : s.messageWrapper}>
        <div className={s.messageItem}>
            <div className={s.messageText}>{props.text}</div>
            <div className={s.messageTime}>{props.time}</div>
        </div>
    </div>
}

export default Message;

