import React, { FC } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from '../../services/types/hooks';
import { IItemProps, TOrder } from "../../types";
import { getBurgerStructure, dateFormatConverter } from "../../utils/utils";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./order-item.module.css";

interface IOrderItemProps {
    order: TOrder;
    isStatusView?: boolean;
}

interface IImageBlockProps {
    ingredient: IItemProps | null;
    className?: string;
    style?: React.CSSProperties;
}

const statusValue = (status: 'done' | 'created' | 'pending') => {
    const style: React.CSSProperties = {};
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
        <div className='text text_type_main-default' style={style}>{text}</div>
    );
}

export const ImageBlock = ({ingredient, style = {}, className}: IImageBlockProps) => {
    return (
        ingredient ? (
            <div className={styles.imageBlock + ` ${className}`} style={style}>
                <img
                    className={styles.imageBackground}
                    src={ingredient.image_mobile}
                    alt={ingredient.name}
                />
            </div>
        ) : null
    );
};

const OrderItem: FC<IOrderItemProps> = ({ order, isStatusView = false }) => {
    const location = useLocation();

    const { data } = useSelector(store => store.ingredients);

    let orderIngredients: Array<IItemProps> = [];

    order?.ingredients.forEach(number => {
        const ingredient = data.find(ingredient => ingredient._id === number);
        if (ingredient)
        orderIngredients.push(ingredient);
    });

    const {
        bun,
        ingredients: burgerIngredients,
        totalValue
    } = getBurgerStructure(orderIngredients);

    const zIndex = 10;
    const isItemsMore = (bun ? 1 : 0) + (Object.keys(burgerIngredients).length) > 6;
    const restItemsValue = (bun ? 1 : 0) + (Object.keys(burgerIngredients).length) - 6;
    const maxIngredients = 6 - (bun ? 1 : 0);

    return (
        <Link to={{
                pathname: `${location.pathname}/${order._id}`,
                state: { background: location }
            }}
        >
            <div className={styles.card + " mb-6 mr-2"}>
                <div className={styles.cardHeader}>
                        <p className={styles.colorWhite + " text text_type_digits-default"}>{`#${order.number}`}</p>
                        <p className="text text_type_main-default text_color_inactive">{dateFormatConverter(order.createdAt)}</p>
                </div>
                <div className={styles.cardName}>
                        <p className={styles.colorWhite + " text text_type_main-medium"}>
                            {order.name}
                        </p>
                    { isStatusView && (
                        <div>
                            {statusValue(order.status)}
                        </div>
                    )}
                </div>
                <div className={styles.cardBody}>
                    <div className={styles.imageList}>
                            {
                                bun && (
                                    <ImageBlock
                                        ingredient={bun}
                                        style={{zIndex: zIndex}}
                                    />
                                )
                            }
                            {
                                Object.keys(burgerIngredients).sort().slice(0, maxIngredients).map((item, index) => (
                                    <ImageBlock
                                        key={item}
                                        ingredient={burgerIngredients[item].ingredient}
                                        style={{zIndex: (zIndex - (bun ? 1 : 0)) - index}}
                                        className={`${index === (maxIngredients - 1) && isItemsMore && styles.imageOpacity}`}
                                    />
                                ))
                            }
                            {isItemsMore && 
                                <div className={`text text_type_main-default ${styles.restItems}`}>+{restItemsValue}</div>
                            }
                        </div>
                        <span className={styles.priceBlock}>
                            <div className={styles.colorWhite + " text text_type_digits-default mr-2"}>
                                {totalValue}
                            </div>
                            <CurrencyIcon type="primary" />
                        </span>
                </div>
            </div>
        </Link>
    );
};

export default OrderItem