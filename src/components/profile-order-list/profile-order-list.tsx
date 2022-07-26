import { useEffect } from "react";
import { wsProfileOrdersConnectionStart, wsProfileOrdersConnectionClosed } from "../../services/actions/wsOrders";
import { useDispatch, useSelector } from "../../services/types/hooks";
import OrderItem from "../order-item/order-item";
import styles from "./profile-order-list.module.css";

const ProfileOrderList = () => {
    const dispatch = useDispatch();

    const { wsProfileConnected, orders } = useSelector(store => store.profileOrders);

    useEffect(() => {
        if (!wsProfileConnected) {
            dispatch(wsProfileOrdersConnectionStart());
        }
        return () => {
            if (wsProfileConnected) {
                dispatch(wsProfileOrdersConnectionClosed());
            }
        }
    }, [dispatch, wsProfileConnected])

    return (
        <div className={styles.section}>
            <div className={styles.blockList}            >
                { !wsProfileConnected && <p className="text text_type_main-default pb-3">Загрузка...</p> }
                {
                    <div className={styles.cardGroup}>
                        {
                            wsProfileConnected && orders.slice(0).reverse().map(order => (
                                <OrderItem key={order._id} order={order} isStatusView={true} />
                            ))
                        }
                    </div>
                }
            </div>
        </div>
    );
};

export default ProfileOrderList