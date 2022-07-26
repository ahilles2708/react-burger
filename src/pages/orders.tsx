import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink } from 'react-router-dom';
import ProfileOrderList from '../components/profile-order-list/profile-order-list';
import { useDispatch } from '../services/types/hooks';
import styles from './profile.module.css';
import { userLogOut } from '../services/actions/user';
import { SyntheticEvent } from 'react';

const ProfileOrders = () => {
    const dispatch = useDispatch();
    const buttonLogOut = (e: SyntheticEvent<Element, Event>) => {
        dispatch(userLogOut)
    }
    
    return (
        <section className={styles.profileOrdersContainer}>
            <div className={styles.profileNavBarContainer}>
                <ul className={styles.profileNavBar}>
                    <li>
                        <NavLink
                            to="/profile"
                            className={(isActive) => isActive ? styles.profileNavBarButton + ' text text_color_primary' : styles.profileNavBarButton + ' text_color_inactive'}
                            exact>
                            Профиль
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/profile/orders"
                            className={(isActive) => isActive ? styles.profileNavBarButton + ' text text_color_primary' : styles.profileNavBarButton + ' text text_color_inactive'}
                            exact>
                            История заказов
                        </NavLink>
                    </li>
                    <li>
                        <Button type="secondary" size="medium" onClick={buttonLogOut}>
                            Выход
                        </Button>
                    </li>
                </ul>
                <p className={styles.profileNavBarText + ' text_color_inactive'}>В этом разделе вы можете<br />изменить свои персональные данные</p>
            </div>
            <div className={styles.orderListBlock}>
                <ProfileOrderList />
            </div>
        </section>
    );
};

export default ProfileOrders