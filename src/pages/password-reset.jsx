import React, { useEffect } from "react";
import { Input, Button, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './form.module.css';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { passwordReset, setPasswordResetFormValue } from '../services/actions/user';
import { Link } from 'react-router-dom';

export function ResetPassword() {
    const {
        password,
        token,
    } = useSelector(state => state.user.formPasswordForgot);

    const { passwordResetRequest } = useSelector(state => state.user);
    const { passwordResetSuccess } = useSelector(state => state.user);

    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(
        () => {
            if(passwordResetSuccess){
                history.replace({ pathname: '/login' })
            };
        }, [passwordResetSuccess]
    )

    const onFormChange = (e) => {
        dispatch(setPasswordResetFormValue(e.target.name, e.target.value))
    }

    const onFormSubmit = (e) => {
        e.preventDefault();
        dispatch(passwordReset(e.target.name, e.target.value))
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