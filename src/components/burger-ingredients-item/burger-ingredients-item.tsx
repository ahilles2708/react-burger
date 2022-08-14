import { FC } from 'react';
import styles from './burger-ingredients-item.module.css';
import {CurrencyIcon, Counter} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag } from 'react-dnd';
import { useLocation, Link } from 'react-router-dom';
import { IItemProps } from '../../types';

type TBurgerIngredientProps = {
    item: IItemProps;
    counter: number;
}

const BurgerIngredient: FC<TBurgerIngredientProps> = ({item, counter}) => {
    const location = useLocation();

    const [{opacity}, dragRef] = useDrag({
        type: "ingredient",
        item: item,
        collect: monitor => ({
            opacity: monitor.isDragging() ? 0.5 : 1
        })
    });

    return (
        <>
            <div className={styles.itemCard} ref={dragRef} style={{opacity}}>
                <Link to={{pathname: `/ingredients/${item._id}`, state: { background: location }}}>
                    {counter && counter > 0 ? <Counter count={counter} size="default" /> : null}
                    <img className={styles.itemImg + ' pl-4 pr-4'} src={item.image}/>
                    <span className={styles.itemPrice + ' text text_type_main-default mt-1 mb-1'}>
                        {item.price} 
                        <CurrencyIcon type="primary" />
                    </span>
                    <span className={styles.itemName + ' text text_type_main-default'}>{item.name}</span>
                </Link>
            </div>
        </>
    );
}

export default BurgerIngredient;