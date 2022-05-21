import { NavLink, useRouteMatch } from 'react-router-dom';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';

export default function AppHeader() {
    const isMainPage = !!useRouteMatch({'path': '/', exact: true});
    const isProfile = !!useRouteMatch('/profile');
    const isOrders = !!useRouteMatch('/orders-feed');

    return(
        <header className={styles.header + ' pt-4 pb-4'}>
            <div className={styles.headerContainer}>
                <div className={styles.headerButtonContainer}>
                    <NavLink
                        to="/"
                        className={(isActive) => isActive ? styles.headerButton + ' pl-5 pr-5 text_color_primary' : styles.headerButton + ' pl-5 pr-5 text_color_inactive'}
                        exact>
                        <BurgerIcon type={isMainPage ? "primary" : "secondary"} />
                        <p className={' text text_type_main-default'}>Конструктор</p>
                    </NavLink>
                    <NavLink
                        to="/profile/orders-feed"
                        className={(isActive) => isActive ? styles.headerButton + ' pl-5 pr-5 text_color_primary' : styles.headerButton + ' pl-5 pr-5 text_color_inactive'}
                        exact>
                        <ListIcon type={isOrders ? "primary" : "secondary"} />
                        <p className={' text text_type_main-default'}>Лента заказов</p>
                    </NavLink>
                </div>
                <Logo />
                <NavLink
                    to="/profile"
                    className={(isActive) => isActive ? styles.headerButton + ' pl-5 pr-5 text_color_primary' : styles.headerButton + ' pl-5 pr-5 text_color_inactive'}
                    exact>
                    <ProfileIcon type={isProfile ? "primary" : "secondary"} />
                    <p className={' text text_type_main-default'}>Личный кабинет</p>
                </NavLink>
            </div>
        </header>
    );
};