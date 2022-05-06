import React, { useMemo, forwardRef } from "react";
import { useSelector } from "react-redux";
import BurgerIngredientsItem from '../burger-ingredients-item/burger-ingredients-item';
import styles from './burger-ingredients-category.module.css';

const IngredientCategory = forwardRef(({
    caption,
    captionID,
    items,
    onItemClick,
}, ref) => {

    const burgerConstructor = useSelector(store => store.burgerConstructor);

    const itemsCounter = useMemo(() => {
        const { bun, items } = burgerConstructor;
        const counters = {};

        items.forEach((item) => {
            if (!counters[item._id]){
                counters[item._id] = 1;
            } else {
                counters[item._id]++;
            }
        })
        if (bun) {
            counters[bun._id] = 2;
        };
        return counters;
    }, [burgerConstructor]);

    return (
        <>
            <span className={styles.typeCaption + ' mb-6 text text_type_main-medium'} id={captionID}>{caption}</span>
            <ul className={styles.ingredientsList + ' pl-4 pr-4'} ref={ref}>
                {
                    items.map(
                        (item) => {
                            return(
                                <li className={styles.itemIngredient + ' mb-8'} key={item._id}>
                                    <BurgerIngredientsItem key={item._id} item={item} openModal={onItemClick} counter={itemsCounter[item._id]}/>
                                </li>
                            )}
                    )
                }
            </ul>
        </>
    )
})

export default IngredientCategory;