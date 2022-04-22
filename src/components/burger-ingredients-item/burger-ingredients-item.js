import React from 'react';
import styles from './burger-ingredients-item.module.css';
import {CurrencyIcon, Counter} from '@ya.praktikum/react-developer-burger-ui-components';
import {itemPropTypes} from '../../utils/ingredientPropTypes';
import { useDrag } from 'react-dnd';
import { PropTypes } from 'prop-types';

export default function BurgerIngredient({item, openModal, counter}){
    const  toggleModal = () => {
        openModal(item);
    }

    const [{opacity}, dragRef] = useDrag({
        type: "ingredient",
        item: item,
        collect: monitor => ({
            opacity: monitor.isDragging() ? 0.5 : 1
        })
    });

    return (
        <>
            <div className={styles.itemCard} onClick={toggleModal} ref={dragRef} style={{opacity}}>
                {counter && counter > 0 ? <Counter count={counter} size="default" /> : null}
                <img className={styles.itemImg + ' pl-4 pr-4'} src={item.image}/>
                <span className={styles.itemPrice + ' text text_type_main-default mt-1 mb-1'}>
                    {item.price} 
                    <CurrencyIcon type="primary" />
                </span>
                <span className={styles.itemName + ' text text_type_main-default'}>{item.name}</span>
            </div>
        </>
    );
}

BurgerIngredient.propTypes = {
    item: itemPropTypes.isRequired,
    openModal: PropTypes.func.isRequired,
    counter: PropTypes.number
}