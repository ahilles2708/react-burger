import { FC } from "react";
import { TOrder } from "../../types";
import OrderItem from "../../components/order-item/order-item";
import styles from "./order-list.module.css";

interface IOrderListProps {
    isWsConnected: boolean;
    orders: Array<TOrder>
};

const OrderList: FC<IOrderListProps> = ({
    isWsConnected,
    orders,
}) => {

    return (
        <section className={styles.section}>
            <div>
                <div
                    className={styles.blockList + " mt-5"}
                >
                    { !isWsConnected && <p className="text text_type_main-default pb-3">Загрузка...</p> }
                    {
                        <div className={styles.cardGroup}>
                            {
                                isWsConnected && orders.map(order => (
                                    <OrderItem key={order._id} order={order} />
                                ))
                            }
                        </div>
                    }
                </div>
            </div>
        </section>
    );
};

export default OrderList;