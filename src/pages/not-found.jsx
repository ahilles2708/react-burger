import styles from './form.module.css';
import { Link } from 'react-router-dom';

export function NotFound404() {
    return(
        <section className={styles.formContainer}>
            <p className="text text_type_main-large">
                Error 404
            </p>
            <p className="text text_type_main-default">Такой страницы нет, попробуйте перейти на <Link to='/'>Главную</Link>.</p>
        </section>
    );
}