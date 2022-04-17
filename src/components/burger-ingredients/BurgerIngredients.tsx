import React from 'react';
import PropTypes from 'prop-types';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerIngredientsItem from '../burger-ingredients-item/burger-ingredients-item';
import styles from './burger-ingredients.module.css';
import {itemPropTypes} from '../../utils/ingredientPropTypes';

export default function BurgerIngredients (items: any) {
    const [current, setCurrent] = React.useState('one');

    function filterIngredients(array: any, key: any, val: any){
        const result = [];
        for(let i = 0; i < array.length; i++){
            const arr = array[i];
            if (arr[key] === val){
                result.push(arr);
            }
        }
        return result;
    }

    const buns = filterIngredients(items.data, 'type', 'bun');
    const sauces = filterIngredients(items.data, 'type', 'sauce');
    const fillings = filterIngredients(items.data, 'type', 'main');

    return (
        <section>
            <div style={{ display: 'flex' }}>
                <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>
                    Булки
                </Tab>
                <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>
                    Соусы
                </Tab>
                <Tab value="filling" active={current === 'filling'} onClick={setCurrent}>
                    Начинки
                </Tab>
            </div>
            <div className={styles.ingredientsListBlock + ' mt-10'}>
                <span className={styles.typeCaption + ' mb-6 text text_type_main-medium'}>Булки</span>
                <ul className={styles.ingredientsList + ' pl-4 pr-4'}>
                    {
                        buns.map(
                            (item: any, index: any) => {
                            return(
                                <li className={styles.itemIngredient + ' mb-8'} key={item._id}>
                                    <BurgerIngredientsItem item={item}/>
                                </li>
                                
                            )}
                        )
                    }
                </ul>
                <span className={styles.typeCaption + ' mb-6 text text_type_main-medium'}>Соусы</span>
                <ul className={styles.ingredientsList + ' pl-4 pr-4'}>
                    {
                        sauces.map(
                            (item: any, index: any) => {
                            return(
                                <li className={styles.itemIngredient + ' mb-8'} key={index}>
                                    <BurgerIngredientsItem item={item}/>
                                </li>
                                
                            )}
                        )
                    }
                </ul>
                <span className={styles.typeCaption + ' mb-6 text text_type_main-medium'}>Начинка</span>
                <ul className={styles.ingredientsList + ' pl-4 pr-4'}>
                    {
                        fillings.map(
                            (item: any, index: any) => {
                            return(
                                <li className={styles.itemIngredient + ' mb-8'} key={index}>
                                    <BurgerIngredientsItem item={item}/>
                                </li>
                                
                            )}
                        )
                    }
                </ul>
            </div>

        </section>
    );
};

BurgerIngredients.propTypes = {
    data: PropTypes.arrayOf(itemPropTypes.isRequired).isRequired
}