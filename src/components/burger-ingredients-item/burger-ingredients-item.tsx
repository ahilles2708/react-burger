import React from 'react';
import styles from './burger-ingredients-item.module.css';
import {CurrencyIcon, Counter} from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import {itemPropTypes} from '../../utils/ingredientPropTypes';

export default function BurgerIngredient(props: any){
    const [open, setOpen] = React.useState(false);
    const  toggleModal = () => {
        setOpen(!open);
    }
    return (
        <>
            <div className={styles.itemCard} onClick={toggleModal}>
                <Counter count={1} size="default" />
                <img className={styles.itemImg + ' pl-4 pr-4'} src={props.item.image}/>
                <span className={styles.itemPrice + ' text text_type_main-default mt-1 mb-1'}>
                    {props.item.price} 
                    <CurrencyIcon type="primary" />
                </span>
                <span className={styles.itemName + ' text text_type_main-default'}>{props.item.name}</span>
            </div>
            {open && <Modal caption="Детали ингредиента" toggle={toggleModal}>
                        <IngredientDetails data={props.item}/>
                    </Modal>}
        </>
    );
}

BurgerIngredient.propTypes = {
    item: itemPropTypes.isRequired
}