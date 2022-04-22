import React, {useState, useEffect} from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export default function App() {
  return (
    <>
      <AppHeader />
      <DndProvider backend={HTML5Backend}>
        <section className={styles.mainContainer}>
          <div className={styles.mainCol}>
            <h1 className="mt-10 mb-5 text text_type_main-large">Соберите бургер</h1>
            <BurgerIngredients/>
          </div>
          <div className={styles.mainCol}>
            <BurgerConstructor/>
          </div>
        </section>
      </DndProvider>
    </>
  );
}