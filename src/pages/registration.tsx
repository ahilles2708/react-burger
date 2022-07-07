import React from "react";
import { Input, Button, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './form.module.css';
import { useDispatch, useSelector } from "react-redux";
import { setRegistrationFormValue, userRegistration } from '../services/actions/user';
import { Link, useLocation, Redirect } from 'react-router-dom';
import { ILocation, ILocationBackground, ILocationStateFrom, IState } from "../types";

const RegistrationPage = () => {
    const {
        name,
        email,
        password,
    } = useSelector((store: IState) => store.user.formRegistration);

    const { isAuth, registrationRequest } = useSelector((store: IState) => store.user);

    const { state } = useLocation<ILocationStateFrom>();

    const dispatch = useDispatch();

    const onFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e);
        dispatch(setRegistrationFormValue(e.target.name, e.target.value))
    }

    const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(userRegistration());
    }

    if (isAuth) {
        return (
          <Redirect to={ state?.from || '/' }/>
        );
    }

    return(
        <section className={styles.formContainer}>
            <form className={styles.loginForm} onSubmit={onFormSubmit}>
                <h1 className={styles.caption}>Регистрация</h1>
                <Input
                    type={'text'}
                    placeholder={'Имя'}
                    onChange={onFormChange}
                    icon={'CurrencyIcon'}
                    value={name}
                    name={'name'}
                    error={false}
                    errorText={'Ошибка'}
                    size={'default'}
                />
                <Input
                    type={'text'}
                    placeholder={'E-mail'}
                    onChange={onFormChange}
                    icon={'CurrencyIcon'}
                    value={email}
                    name={'email'}
                    error={false}
                    errorText={'Ошибка'}
                    size={'default'}
                />
                <PasswordInput onChange={onFormChange} value={password} name={'password'} />
                <Button type="primary" size="medium" disabled={registrationRequest}>
                    Зарегистрироваться
                </Button>
            </form>
            <div className={styles.additionalLinks}>
                <span className={styles.additionalLinkSpan}>Уже зарегистрированы? <Link className={styles.additionalLinkA} to="/login">Войти</Link></span>
            </div>
        </section>
    );
}

export default RegistrationPage;