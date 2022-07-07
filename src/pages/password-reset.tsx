import React from "react";
import { Input, Button, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './form.module.css';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { passwordReset, setPasswordResetFormValue } from '../services/actions/user';
import { Link, useLocation, Redirect } from 'react-router-dom';
import { ILocationStateFrom, IState } from "../types";

const ResetPassword = () => {
    const {
        password,
        token,
    } = useSelector((store: IState) => store.user.formPasswordReset);

    const { isAuth, passwordResetRequest, passwordResetSuccess, passwordForgotSuccess } = useSelector((store: IState) => store.user);
    const { state } = useLocation<ILocationStateFrom>();
    const dispatch = useDispatch();
    const history = useHistory();

    const onFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setPasswordResetFormValue(e.target.name, e.target.value))
    }

    const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(passwordReset())
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
                <PasswordInput onChange={onFormChange} value={password} name={'password'} />
                <Input
                    type={'text'}
                    placeholder={'Введите код из письма'}
                    onChange={onFormChange}
                    icon={'CurrencyIcon'}
                    value={token}
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