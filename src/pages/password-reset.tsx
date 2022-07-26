import React from "react";
import { Input, Button, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './form.module.css';
import { useDispatch, useSelector } from "../services/types/hooks";
import { passwordReset, setPasswordResetFormValue } from '../services/actions/user';
import { Link, useLocation, Redirect } from 'react-router-dom';
import { ILocationStateFrom } from "../types";

const ResetPassword = () => {
    const { user } = useSelector(store => store);
    const { isAuth, passwordResetRequest, passwordResetSuccess, passwordForgotSuccess, formPasswordReset } = user;
    const { state } = useLocation<ILocationStateFrom>();
    const dispatch = useDispatch();

    const onFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setPasswordResetFormValue(e.target.name, e.target.value))
    }

    const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(passwordReset(user))
    }

    if (isAuth) {
        return (
          <Redirect to={ state?.from || '/' }/>
        );
    }

    if (!passwordForgotSuccess) {
        return (
            <Redirect to={'/forgot-password'}/>
        )
    }

    if (passwordResetSuccess) {
        return (
            <Redirect to={'/login'}/>
        )
    }

    return (
        <section className={styles.formContainer}>
            <form className={styles.loginForm} onSubmit={onFormSubmit}>
                <h1 className={styles.caption}>Восстановление пароля</h1>
                <PasswordInput onChange={onFormChange} value={formPasswordReset.password} name={'password'} />
                <Input
                    type={'text'}
                    placeholder={'Введите код из письма'}
                    onChange={onFormChange}
                    icon={'CurrencyIcon'}
                    value={formPasswordReset.token}
                    name={'token'}
                    error={false}
                    errorText={'Ошибка'}
                    size={'default'}
                />
                <Button type="primary" size="medium" disabled={passwordResetRequest}>
                    Сохранить
                </Button>
            </form>
            <div className={styles.additionalLinks}>
                <span className={styles.additionalLinkSpan}>Вспомнили пароль? <Link className={styles.additionalLinkA} to="/login">Войти</Link></span>
            </div>
        </section>
    );
}

export default ResetPassword;