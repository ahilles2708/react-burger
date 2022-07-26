import { useEffect } from "react";
import { useDispatch, useSelector } from "../services/types/hooks";
import { wsFeedConnectionClosed, wsFeedConnectionStart } from '../services/actions/wsFeed';
import OrderList from '../components/order-list/order-list';
import OrdersInfo from '..//components/order-info/order-info';
import styles from './feed.module.css';

const FeedPage = () => {
    const dispatch = useDispatch();
    const { wsConnected, orders, total, totalToday, orderBoard } = useSelector(store => store.feed);

    useEffect(() => {
        if (!wsConnected) {
            dispatch(wsFeedConnectionStart());
        }
        return () => {
          if (wsConnected) {
            dispatch(wsFeedConnectionClosed());
          }
        }
    }, [dispatch, wsConnected])
    
    return (
        <section className={styles.feedContainer}>
          <h1 className="text text_type_main-large mt-10 mb-5">Лента заказов</h1>
          <div className={styles.feedColsContainer}>
            <div className={styles.mainCol}>
              <OrderList orders={orders} isWsConnected={wsConnected} />
            </div>
            <div className={styles.mainCol}>
              <OrdersInfo orderBoard={orderBoard} total={total} totalToday={totalToday} />
            </div>
          </div>
        </section>
      );
}

export default FeedPage;