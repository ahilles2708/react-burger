import React from 'react';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerConstructorElement from '../burger-constructor-element/burger-constructor-element';
import styles from './burger-constructor.module.css';
import PropTypes from 'prop-types';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import {itemPropTypes} from '../../utils/ingredientPropTypes';


export default function BurgerConstructor (props: any) {
    
    const bun = props.data[0];
    const filling = props.data;

    const [open, setOpen] = React.useState(false);
    const  toggleModal = () => {
        setOpen(!open);
    }

    function totalCost(tocalcBun: any, tocalcFilling: any){
        let total = 0;
        total += tocalcBun.price;
        for(let i = 0; i < tocalcFilling.length; i++){
            total += tocalcFilling[i].price
        }
        return total;
    }

    return (
        <section className={' mt-25'}>
            <ul className={styles.fillingList + ' mb-10'}>
                <li className={styles.fillingItem + ' mb-4 pl-8'}>
                    <BurgerConstructorElement  item={bun} isTop={true} isBottom={false} isLocked={true}/>
                </li>
                <li className={styles.fillingItem + ' mb-4'}>
                    <ul className={styles.fillingInnerList}>
                        {filling.map(
                            (item: any, index: any) => {
                                if(item.type !== "bun"){
                                    return (
                                        <li key={index} className={styles.fillingItem + ' mb-4'}>
                                            <BurgerConstructorElement item={item} />
                                        </li>
                                    )
                                }
                            }
                        )}
                    </ul>
                </li>
                <li className={styles.fillingItem + ' mb-4 pl-8'}>
                    <BurgerConstructorElement  item={bun} isTop={false} isBottom={true} isLocked={true}/>
                </li>
            </ul>
            <div className={styles.counting + ' mr-4'}>
                <p className={'mr-10'}>
                    <span className="text text_type_main-large mr-2">{totalCost(bun, filling)}</span>
                    <CurrencyIcon type="primary" />
                </p>
                <Button type="primary" size="medium" onClick={toggleModal}>
                    Оформить заказ
                </Button>
            </div>
            {open && <Modal caption="" toggle={toggleModal}>
                        <OrderDetails/>
                    </Modal>}
        </section>
    );
};

BurgerConstructor.propTypes = {
    data: PropTypes.arrayOf(itemPropTypes.isRequired).isRequired
}