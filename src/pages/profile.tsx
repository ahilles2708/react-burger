import styles from './profile.module.css';
import { NavLink, Route, Switch, useHistory, useLocation } from 'react-router-dom';
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { userLogOut } from '../services/actions/user';
import { useDispatch } from "../services/types/hooks";
import { SyntheticEvent } from 'react';
import ProfileForm from '../components/profile-form/profile-form';
import { ILocationBackground } from '../types';
import ProfileOrderList from '../components/profile-order-list/profile-order-list';
import Modal from '../components/modal/modal';
import ProfileOrder from '../components/profile-order-detail/profile-order-detail';

const Profile = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation<ILocationBackground>();
    const background = location.state && location.state.background;

    const buttonLogOut = (e: SyntheticEvent<Element, Event>) => {
        dispatch(userLogOut)
    }

    const closeModal = () => history.goBack();

    return (
        <section className={styles.profileContainer}>
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
            <Switch location={background || location}>
                <Route path='/profile/orders' exact={true}>
                    <div className={styles.orderListBlock}>
                        <ProfileOrderList />
                    </div>
                </Route>
                <Route path='/profile' exact={true}>
                    <ProfileForm />
                </Route>
            </Switch>
            {background && (
                <Switch>
                    <Route path={'/profile/orders/:id'}>
                        <Modal
                            caption=""
                            toggle={closeModal}
                        >
                            <ProfileOrder/>
                        </Modal>
                    </Route>
                </Switch>
            )}
        </section>
    )
}

export default Profile;