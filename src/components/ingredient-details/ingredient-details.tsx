import React from 'react';
import styles from './ingredient-details.module.css';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IParams, IState } from '../../types';

const IngredientDetails = () => {

    const { id } = useParams<IParams>();

    const { data, dataFailed } = useSelector((store: IState) => store.ingredients);

    const ingredientToShow = data.find(ingredient => ingredient._id === id);

    return(
        !ingredientToShow ? (
            <span className="text text_type_main-default">Загрузка...</span>
        ) : dataFailed ? (
            <span className="text text_type_main-default">Произошла ошибка при загрузке данных, перезагрузите страницу</span>
        ) : (
            <div className={styles.detailsContainer}>
                <img className={styles.detailsImg + ' mb-4'} src={ingredientToShow.image_large}/>
                <span className={' mb-8 text text_type_main-medium'}>{ingredientToShow.name}</span>
                <ul className={styles.detailsTreasure}>
                    <li className={styles.detailsTreasureItem}>
                        <span className={'text text_type_main-default text_color_inactive mb-2'}>Калории, ккал</span>
                        <span className={'text text_type_digits-default text_color_inactive'}>{ingredientToShow.calories}</span>
                    </li>
                    <li className={styles.detailsTreasureItem}>
                        <span className={'text text_type_main-default text_color_inactive mb-2'}>Белки, г</span>
                        <span className={'text text_type_digits-default text_color_inactive'}>{ingredientToShow.proteins}</span>
                    </li>
                    <li className={styles.detailsTreasureItem}>
                        <span className={'text text_type_main-default text_color_inactive mb-2'}>Жиры, г</span>
                        <span className={'text text_type_digits-default text_color_inactive'}>{ingredientToShow.fat}</span>
                    </li>
                    <li className={styles.detailsTreasureItem}>
                        <span className={'text text_type_main-default text_color_inactive mb-2'}>Углеводы, г</span>
                        <span className={'text text_type_digits-default text_color_inactive'}>{ingredientToShow.carbohydrates}</span>
                    </li>
                </ul>
            </div>
        )
    )
}

export default IngredientDetails;