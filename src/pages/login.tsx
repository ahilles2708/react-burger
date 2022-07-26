import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './form.module.css';
import { Link, useLocation, Redirect } from 'react-router-dom';
import { userLogIn, setLoginFormValue } from "../services/actions/user";
import { checkAccessToken } from "../utils/utils";
import { ILocationStateFrom } from "../types";
import { useDispatch, useSelector } from "../services/types/hooks";

const LoginPage = () => {
    const { user } = useSelector(store => store);
    const { isAuth, loginRequest, formLogin } = user;

    const isAccessToken = checkAccessToken();

    const dispatch = useDispatch();
    const { state } = useLocation<ILocationStateFrom>();

    const onFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setLoginFormValue(e.target.name, e.target.value))
    }

    const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(userLogIn(user));
    }

    if (isAuth && isAccessToken) {
        return (
            <Redirect to={ state?.from || '/' }/>
        );
    }

    return (
        <section className={styles.formContainer}>
            <form className={styles.loginForm} onSubmit={onFormSubmit}>
                <h1 className={styles.caption}>Вход</h1>
                <Input
                    type={'text'}
                    placeholder={'E-mail'}
                    onChange={onFormChange}
                    icon={'CurrencyIcon'}
                    value={formLogin.email}
                    name={'email'}
                    error={false}
                    errorText={'Ошибка'}
                    size={'default'}
                />
                <Input
                    type={'password'}
                    placeholder={'placeholder'}
                    onChange={onFormChange}
                    icon={'CurrencyIcon'}
                    value={formLogin.password}
                    name={'password'}
                    error={false}
                    errorText={'Ошибка'}
                    size={'default'}
                />
                <Button type="primary" size="medium" disabled={loginRequest}>
                    Войти
                </Button>
            </form>
            <div className={styles.additionalLinks}>
                <span className={styles.additionalLinkSpan}>Вы новый пользователь? <Link className={styles.additionalLinkA} to="/register">Зарегистрироваться</Link></span>
                <span className={styles.additionalLinkSpan}>Забыли пароль? <Link className={styles.additionalLinkA} to="/forgot-password">Восстановить пароль</Link></span>
            </div>
        </section>
    );
}

export default LoginPage;