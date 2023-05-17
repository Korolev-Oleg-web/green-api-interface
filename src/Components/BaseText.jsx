import pic from './../images/chat.png';
import s from './Main/Main.module.css';

const BaseText = () => {
    return <div className={s.baseText}>
        <img src={pic} alt="chat"/>
        <strong>Выберите один из чатов или создайте новый.</strong>
    </div>
}

export default BaseText;