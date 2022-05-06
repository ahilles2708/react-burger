import React from 'react';
import styles from './ingredient-details.module.css';
import {itemPropTypes} from '../../utils/ingredientPropTypes';

export default function IngredientDetails(props){
    return(
        <div className={styles.detailsContainer}>
            <img className={styles.detailsImg + ' mb-4'} src={props.data.image_large}/>
            <span className={' mb-8 text text_type_main-medium'}>{props.data.name}</span>
            <ul className={styles.detailsTreasure}>
                <li className={styles.detailsTreasureItem}>
                    <span className={'text text_type_main-default text_color_inactive mb-2'}>Калории, ккал</span>
                    <span className={'text text_type_digits-default text_color_inactive'}>{props.data.calories}</span>
                </li>
                <li className={styles.detailsTreasureItem}>
                    <span className={'text text_type_main-default text_color_inactive mb-2'}>Белки, г</span>
                    <span className={'text text_type_digits-default text_color_inactive'}>{props.data.proteins}</span>
                </li>
                <li className={styles.detailsTreasureItem}>
                    <span className={'text text_type_main-default text_color_inactive mb-2'}>Жиры, г</span>
                    <span className={'text text_type_digits-default text_color_inactive'}>{props.data.fat}</span>
                </li>
                <li className={styles.detailsTreasureItem}>
                    <span className={'text text_type_main-default text_color_inactive mb-2'}>Углеводы, г</span>
                    <span className={'text text_type_digits-default text_color_inactive'}>{props.data.carbohydrates}</span>
                </li>
            </ul>
        </div>
    )
}

IngredientDetails.propTypes = {
    data: itemPropTypes.isRequired
}