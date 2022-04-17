import React from 'react';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';
export default function AppHeader() {
    return(
        <header className={styles.header + ' pt-4 pb-4'}>
            <div className={styles.headerContainer}>
                <div className={styles.headerButtonContainer}>
                    <a className={styles.headerButton + ' pl-5 pr-5 text text_type_main-default text_color_primary'} href="#">
                        <BurgerIcon type="primary" />
                        Конструктор
                    </a>
                    <a className={styles.headerButton + ' pl-5 pr-5 text text_type_main-default text_color_inactive'} href="#">
                        <ListIcon type="secondary" />
                        Лента заказов
                    </a>
                </div>
                <Logo />
                <a className={styles.headerButton + ' pl-5 pr-5 text text_type_main-default text_color_inactive'} href="#">
                    <ProfileIcon type="secondary" />
                    Личный кабинет
                </a>                
            </div>
        </header>
    );
};