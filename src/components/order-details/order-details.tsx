import React from "react";
import styles from './order-details.module.css';
import CheckImg from '../../images/graphics.png';

export default function OrderDetails () {
    return(
        <div className={styles.orderContainer + ' mb-15'}>
            <span className={styles.orderNumber + ' text text_type_digits-large mb-8'}>034536</span>
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
        </div>
    )
}