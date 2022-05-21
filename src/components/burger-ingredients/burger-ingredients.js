import React, { useEffect, useMemo } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { useInView } from 'react-intersection-observer';
import IngredientCategory from '../burger-ingredients-category/burger-ingredients-category';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { CLOSE_INGREDIENT_MODAL, OPEN_INGREDIENT_MODAL } from '../../services/actions/modal';

export default function BurgerIngredients () {
    const {data, dataRequest, dataFailed} = useSelector(store => store.ingredients);
    const needModalOpen = useSelector(store => store.modal.data);
    const dispatch = useDispatch();
  
    const buns = useMemo(
        () => data.filter((item) => item.type === "bun"),
        [data]
    );
    const fillings = useMemo(
        () => data.filter((item) => item.type === "main"),
        [data]
    );
    const sauces = useMemo(
        () => data.filter((item) => item.type === "sauce"),
        [data]
    );

    const [currentTab, setCurrentTab] = React.useState('buns');

    const [bunsRef, inViewBuns] = useInView({
        threshold: 0,
    })
    const [fillingsRef, inViewFilling] = useInView({
        threshold: 0,
    })
    const [saucesRef, inViewSauces] = useInView({
        threshold: 0,
    })

    useEffect(
        () => {
            if (inViewBuns) {
                setCurrentTab("buns");
            } else if (inViewSauces) {
                setCurrentTab("sauces");
            } else if (inViewFilling) {
                setCurrentTab("fillings");
            }
        },
        [inViewBuns, inViewFilling, inViewSauces]
    )

    const closeModal = () => {
        dispatch({type: CLOSE_INGREDIENT_MODAL});
    }
    const openModal = (item) => {
        dispatch({type: OPEN_INGREDIENT_MODAL, item: item});
    }

    return (
        <section>
            <div style={{ display: 'flex' }}>
                <Tab value="bun" active={currentTab === 'buns'}>
                    Булки
                </Tab>
                <Tab value="filling" active={currentTab === 'fillings'}>
                    Начинки
                </Tab>
                <Tab value="sauce" active={currentTab === 'sauces'}>
                    Соусы
                </Tab>
            </div>
            <div className={styles.ingredientsListBlock + ' mt-10'}>
                {dataRequest ? (
                    <span className="text text_type_main-default">Загрузка...</span>
                ) : dataFailed ? (
                    <span className="text text_type_main-default">Произошла ошибка при загрузке данных, перезагрузите страницу</span>
                ) : (
                    <>
                        <IngredientCategory caption="Булки" captionID="buns" items={buns} onItemClick={openModal} ref={bunsRef}/>
                        <IngredientCategory caption="Начинки" captionID="fillings" items={fillings} onItemClick={openModal} ref={fillingsRef}/>
                        <IngredientCategory caption="Соусы" captionID="sauces" items={sauces} onItemClick={openModal} ref={saucesRef}/>
                    </>
                )}
            </div>
            {needModalOpen && <Modal caption="Детали ингредиента" toggle={closeModal}>
                        <IngredientDetails data={needModalOpen}/>
                    </Modal>}
        </section>
    );
};