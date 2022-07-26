
import { useParams } from 'react-router-dom';
import { useSelector } from '../../services/types/hooks';
import { getBurgerStructure, dateFormatConverter } from "../../utils/utils";
import { IItemProps, TOrder } from "../../types";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerStructure from '../burger-structure/burger-structure';
import styles from "./profile-order.module.css";

const statusValue = (status: 'done' | 'created' | 'pending') => {
    const style: any = {};
    let text = '';

    switch (status) {
        case 'done':
            text = 'Выполнен';
            style.color = '#00CCCC';
            break;
        case 'created':
            text = 'Создан';
            break;
        case 'pending':
            text = 'Готовится';
            break;
        default:
    }

    return (
        <p className='text text_type_main-default' style={style}>{text}</p>
    );
}

const ProfileOrder = () => {

    const { id } = useParams<{ id: string }>();

    const { orders } = useSelector(store => store.profileOrders);
  
    const { data } = useSelector(store => store.ingredients);

    const viewedOrder = orders.find((order: TOrder) => order._id === id);

    let orderIngredients: Array<IItemProps> = [];

    viewedOrder?.ingredients.forEach(number => {
        const ingredient = data.find(ingredient => ingredient._id === number);
        if (ingredient)
            orderIngredients.push(ingredient);
    });

    const burgerStructure = getBurgerStructure(orderIngredients);

    return (
        <div className={styles.orderBlock}>
            {!viewedOrder ? (
                <div className={"mb-10 mt-5"}>
                    <p className="text text_type_main-default">Загрузка...</p>
                </div>
            ) : (
                <>
                    <div className={styles.blockNumber + " mb-10"}>
                        <h5 className="text text_type_digits-default">{`#${viewedOrder.number}`}</h5>
                    </div>
                    <div className={styles.blockName + " mb-15"}>
                            <h3 className="text text_type_main-medium mb-3">{viewedOrder.name}</h3>
                            {statusValue(viewedOrder.status)}
                    </div>
                    <div className={styles.blockBody + " mb-10"}>
                            <h3 className="text text_type_main-medium mb-6">Состав:</h3>
                            <BurgerStructure {...burgerStructure} />
                    </div>
                    <div className={styles.blockFooter}>
                        <div>
                            <p className="text text_type_main-default text_color_inactive">{dateFormatConverter(viewedOrder.createdAt)}</p>
                        </div>
                        <div className={styles.blockPrice}>
                                <div className={"text text_type_digits-default mr-2"}>
                                    {burgerStructure.totalValue}
                                </div>
                                <CurrencyIcon type="primary" />
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default ProfileOrder