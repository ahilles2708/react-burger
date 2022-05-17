import { useEffect } from 'react';
import styles from './profile.module.css';
import { NavLink } from 'react-router-dom';
import { Input, Button, PasswordInput, EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { userLogOut, setProfileFormValue, userInfoPatch } from '../services/actions/user';
import { useDispatch, useSelector } from 'react-redux';

export function Profile() {
    const dispatch = useDispatch();

    const nameInitial = useSelector(state => state.user.info.name);
    const emailInitial = useSelector(state => state.user.info.email);

    useEffect(() => {
        dispatch(setProfileFormValue("name", nameInitial));
        dispatch(setProfileFormValue("email", emailInitial));
        }, [nameInitial, emailInitial]
    );    

    const nameForPatch = useSelector(state => state.user.formProfile.name);
    const emailForPatch = useSelector(state => state.user.formProfile.email);
    const passwordForPatch = useSelector(state => state.user.formProfile.password);

    const { userInfoPatchRequest } = useSelector(state => state.user);

    const onFormChange = (e) => {
        dispatch(setProfileFormValue(e.target.name, e.target.value))
    }

    const buttonLogOut = (e) => {
        dispatch(userLogOut)
    }

    const onFormSubmit = (e) => {
        e.preventDefault();
        dispatch(userInfoPatch());
    }

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
                            to="/profile/orders-feed"
                            className={(isActive) => isActive ? styles.profileNavBarButton + ' text text_color_primary' : styles.profileNavBarButton + ' text text_color_inactive'}
                            exact>
                            История заказов
                        </NavLink>
                    </li>
                    <li>
                        <Button className={styles.logOutButton + ' text text_color_inactive'} type="secondary" size="medium" onClick={buttonLogOut}>
                            Выход
                        </Button>
                    </li>
                </ul>
                <p className={styles.profileNavBarText + ' text_color_inactive'}>В этом разделе вы можете<br />изменить свои персональные данные</p>
            </div>
            <form className={styles.userInfo + ''} onSubmit={onFormSubmit}>
                <Input
                    type={'text'}
                    placeholder={'Имя'}
                    onChange={onFormChange}
                    icon={'CurrencyIcon'}
                    value={nameForPatch}
                    name={'name'}
                    error={false}
                    errorText={'Ошибка'}
                    size={'default'}
                />
                <EmailInput onChange={onFormChange} value={emailForPatch} name={'email'} />
                <PasswordInput onChange={onFormChange} value={passwordForPatch} name={'password'} />
                <Button type="primary" size="medium" disabled={userInfoPatchRequest}>Сохранить</Button>
            </form>
        </section>
    )
}