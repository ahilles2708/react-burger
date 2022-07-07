import React, { useEffect } from "react";
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './form.module.css';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { passwordForgot, setPasswordForgotFormValue } from '../services/actions/user';
import { Link, useLocation, Redirect } from 'react-router-dom';
import { ILocationStateFrom, IState } from "../types";

const ForgotPassword = () => {

    const {
        email,
    } = useSelector((store: IState) => store.user.formPasswordForgot);
    const { isAuth, passwordForgotRequest, passwordForgotSuccess } = useSelector((store: IState) => store.user);
    const { state } = useLocation<ILocationStateFrom>();
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(
        () => {
            if(passwordForgotSuccess){
                history.replace({ pathname: '/reset-password' })
            };
        }, [passwordForgotSuccess]
    )

    const onFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setPasswordForgotFormValue(e.target.name, e.target.value))
    }

    const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(passwordForgot())
    }

    if (isAuth) {
        return (
            <Redirect to={ state?.from || '/' }/>
        );
    }
    
    return (
        <section className={styles.formContainer}>
            <form className={styles.loginForm} onSubmit={onFormSubmit}>
                <h1 className={styles.caption}>Восстановление пароля</h1>
                <Input
                    type={'text'}
                    placeholder={'Укажите e-mail'}
                    onChange={onFormChange}
                    icon={'CurrencyIcon'}
                    value={email}
                    name={'email'}
                    error={false}
                    errorText={'Ошибка'}
                    size={'default'}
                />
                <Button type="primary" size="medium" disabled={passwordForgotRequest}>
                    Восстановить
                </Button>
            </form>
            <div className={styles.additionalLinks}>
                <span className={styles.additionalLinkSpan}>Вспомнили пароль? <Link className={styles.additionalLinkA} to="/login">Войти</Link></span>
            </div>
        </section>
    );
}

export default ForgotPassword;