import { FC } from "react";
import OrdersBoardCol from "./order-board-col";
import { TOrderBoard } from "../../types";
import styles from "./orders-info.module.css";

interface IOrdersInfoProps {
    orderBoard: TOrderBoard,
    total: number;
    totalToday: number;
}

const OrdersInfo: FC<IOrdersInfoProps> = ({ orderBoard, total, totalToday }) => {

    const lastDoneNumbers = orderBoard.done.slice(0, 10);
    const lastPendingNumbers = orderBoard.pending.slice(0, 10);

    return (
        <section className={styles.section}>
            <div>
                <div className={styles.blockList + " mt-5"}>
                    <div className={styles.ordersBoard}>
                        <OrdersBoardCol title={"Готовы:"} numbers={lastDoneNumbers} isDone={true} />
                        <OrdersBoardCol title={"В работе:"} numbers={lastPendingNumbers} />
                    </div>
                    <div>
                        <div>
                            <h3 className="text text_type_main-medium title">Выполнено за все время:</h3>
                        </div>
                        <div>
                            <p className={styles.textShadow + " text text_type_digits-large"}>{total}</p>
                        </div>
                    </div>
                    <div>
                        <div>
                            <h3 className="text text_type_main-medium title">Выполнено за сегодня:</h3>
                        </div>
                        <div>
                            <p className={styles.textShadow + " text text_type_digits-large"}>{totalToday}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OrdersInfo