import styles from './order-details.module.css';
import CheckImg from '../../images/graphics.png';
import { useSelector } from '../../services/types/hooks';

const OrderDetails = () => {

    const { orderRequest, orderFailed, orderNew } = useSelector(store => store.order);

    return(
        <div className={styles.orderContainer + ' mb-15'}>
            {orderRequest ? (
                <span className={styles.orderDescr + ' text text_type_main-default mb-2'}>Заказ оформляется...</span>
            ) : orderFailed ? (
                <span className={styles.orderDescr + ' text text_type_main-default mb-2'}>Что-то пошло не так... Попробуйте еще раз!</span>
            ) : (
                <>
                    <span className={styles.orderNumber + ' text text_type_digits-large mb-8'}>{orderNew && orderNew.number}</span>
                    <span className={styles.orderNumberHint + ' text text_type_main-medium mb-15'}>идентификатор заказа</span>
                    <div className={styles.orderCheck + ' mb-15'}>
                        <img src={CheckImg}/>
                    </div>
                    <span className={styles.orderDescr + ' text text_type_main-default mb-2'}>
                        Ваш заказ начали готовить
                    </span>
                    <span className={styles.orderDescr + ' text text_type_main-default text_color_inactive'}>
                        Дождитесь готовности на орбитальной станции
                    </span>
                </>
            )}

        </div>
    )
}

export default OrderDetails;