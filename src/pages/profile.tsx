import { useEffect } from 'react';
import styles from './profile.module.css';
import { NavLink } from 'react-router-dom';
import { Input, Button, PasswordInput, EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { userLogOut, setProfileFormValue, userInfoPatch } from '../services/actions/user';
import { useDispatch, useSelector } from 'react-redux';
import { IState } from '../types';
import { SyntheticEvent } from 'react';

const Profile = () => {
    const dispatch = useDispatch();

    const nameInitial = useSelector((store: IState) => store.user.info.name);
    const emailInitial = useSelector((store: IState) => store.user.info.email);

    useEffect(() => {
        dispatch(setProfileFormValue("name", nameInitial));
        dispatch(setProfileFormValue("email", emailInitial));
        }, [nameInitial, emailInitial]
    );    

    const nameForPatch = useSelector((store: IState) => store.user.formProfile.name);
    const emailForPatch = useSelector((store: IState) => store.user.formProfile.email);
    const passwordForPatch = useSelector((store: IState) => store.user.formProfile.password);

    const { userInfoPatchRequest } = useSelector((store: IState) => store.user);

    const onFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setProfileFormValue(e.target.name, e.target.value))
    }

    const buttonLogOut = (e: SyntheticEvent<Element, Event>) => {
        dispatch(userLogOut)
    }

    const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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
                        <Button type="secondary" size="medium" onClick={buttonLogOut}>
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

export default Profile;