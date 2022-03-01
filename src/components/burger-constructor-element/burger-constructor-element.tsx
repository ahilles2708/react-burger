import React from 'react';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor-element.module.css';
import PropTypes from 'prop-types';
import {itemPropTypes} from '../../utils/ingredientPropTypes';

export default function BurgerConstructorElement (props: any) {
    return(
        <div className={styles.fillingItem}>
            {!props.isLocked && <DragIcon type="primary"/>}
            <ConstructorElement 
                type={props.isTop ? 'top' : props.isBottom ? 'bottom' : undefined} 
                isLocked={props.isLocked ? true : false} 
                thumbnail={props.item.image} 
                text={props.isTop ? props.item.name + ' верх' : props.isBottom ? props.item.name + ' низ' : props.item.name} 
                price={props.item.price}
            />
        </div>
    )
}

BurgerConstructorElement.propTypes = {
    item: itemPropTypes.isRequired,
    isTop: PropTypes.bool,
    isBottom: PropTypes.bool,
    isLocked: PropTypes.bool
}