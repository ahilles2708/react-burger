import { FC } from "react";
import styles from "./orders-info.module.css";

interface IOrdersBoardColumnProps {
    title: string;
    numbers: Array<number>;
    isDone?: boolean;
}

const OrdersBoardColumn: FC<IOrdersBoardColumnProps> = ({
    title,
    numbers,
    isDone = false
}) => {

    const rowsCount = 5;
    const columnCount = Math.ceil(numbers.length / rowsCount);
    const indexArray = Array.from(Array(columnCount).keys());

    return (
        <div className={styles.ordersBoardCol}>
            <h5 className="text text_type_main-medium mb-6">{title}</h5>
            <div className={isDone && numbers.length > 0 ? styles.done : undefined}>
                { numbers.length === 0 ?
                (
                    <p className="text text_type_digits-default">--</p>
                ) : (
                    <>
                        {indexArray.map(index => 
                            <div key={index} className={styles.numberList}>
                                {
                                    numbers.filter((item, i) => Math.floor(i / rowsCount) === index).map(item => {
                                        return (
                                            <p key={item} className="text text_type_digits-default">
                                                {item}
                                            </p>
                                        )
                                    })
                                }
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default OrdersBoardColumn