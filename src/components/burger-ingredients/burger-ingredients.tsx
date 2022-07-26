import React, { useEffect, useMemo } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css';
import { useDispatch, useSelector } from '../../services/types/hooks';
import { useInView } from 'react-intersection-observer';
import IngredientCategory from '../burger-ingredients-category/burger-ingredients-category';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { CLOSE_INGREDIENT_MODAL } from '../../services/constants/modal';
import { IItemProps } from '../../types';
import { ETabs } from '../../enums';

export default function BurgerIngredients() {
    const { data, dataRequest, dataFailed } = useSelector(store => store.ingredients);
    const needModalOpen = useSelector(store => store.modal.data);
    const dispatch = useDispatch();

    const [bunsRef, inViewBuns] = useInView({
        threshold: 0,
    })
    const [fillingsRef, inViewFilling] = useInView({
        threshold: 0,
    })
    const [saucesRef, inViewSauces] = useInView({
        threshold: 0,
    })

    const buns = useMemo(
        () => data.filter((item: IItemProps) => item.type === "bun"),
        [data]
    );
    const fillings = useMemo(
        () => data.filter((item: IItemProps) => item.type === "main"),
        [data]
    );
    const sauces = useMemo(
        () => data.filter((item: IItemProps) => item.type === "sauce"),
        [data]
    );

    const tabs = useMemo(
        () => [
            { id: ETabs.BUN, name: "Булки", items: buns, ref: bunsRef, },
            { id: ETabs.FILLING, name: "Начинки", items: fillings, ref: fillingsRef, },
            { id: ETabs.SAUCE, name: "Соусы", items: sauces, ref: saucesRef, },
        ],
        [data]
    );

    const [currentTab, setCurrentTab] = React.useState('buns');

    useEffect(
        () => {
            if (inViewBuns) {
                setCurrentTab("bun");
            } else if (inViewSauces) {
                setCurrentTab("sauce");
            } else if (inViewFilling) {
                setCurrentTab("filling");
            }
        },
        [inViewBuns, inViewFilling, inViewSauces]
    )

    const closeModal = () => {
        dispatch({ type: CLOSE_INGREDIENT_MODAL });
    }

    const handleChangeTab = (tab: string) => {
        setCurrentTab(tab);
    }

    return (
        <section>
            <div style={{ display: 'flex' }}>
                {tabs.map(({ id, name }, index) =>
                    <Tab value={id} active={currentTab === id} onClick={handleChangeTab} key={index}>
                        {name}
                    </Tab>
                )}
            </div>
            <div className={styles.ingredientsListBlock + ' mt-10'}>
                {dataRequest && <span className="text text_type_main-default">Загрузка...</span>}
                {dataFailed && <span className="text text_type_main-default">Произошла ошибка при загрузке данных, перезагрузите страницу</span>}
                {!dataRequest && !dataFailed && tabs.map(({ id, name, items, ref }, index) =>
                    <IngredientCategory caption={name} captionID={id} items={items} ref={ref} key={index} />
                )}
            </div>
            {needModalOpen && <Modal caption="Детали ингредиента" toggle={closeModal}>
                <IngredientDetails/>
            </Modal>}
        </section>
    );
};