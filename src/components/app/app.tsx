import React, {useState, useEffect} from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/BurgerIngredients';
import BurgerConstructor from '../burger-constructor/BurgerConstructor';
import PropTypes from 'prop-types';
import { checkServerIdentity } from 'tls';

export default function App() {
  const apiURL = 'https://norma.nomoreparties.space/api/ingredients';

  const[state, setState] = useState({
    isLoading: false,
    hasError: false,
    data: [],
  });

  function checkResponce(res: any){
    if(res.ok){
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }

  useEffect(
    () => {
      const getData = () => {
        setState({...state, isLoading: true});
        fetch(apiURL)
          .then(checkResponce)
          .then(res => setState({...state, isLoading: false, data: res.data}))
          .catch(
            e => {
              setState({...state, isLoading: false, hasError: true});
            }
          )
      };
      getData();
    },
    []
  );

  return (
    <>
      <AppHeader />
      <section className={styles.mainContainer}>
        <div className={styles.mainCol}>
          <h1 className="mt-10 mb-5 text text_type_main-large">Соберите бургер</h1>
          {state.isLoading && (<span className="text text_type_main-default">Загрузка...</span>)}
          {state.hasError && (<span className="text text_type_main-default">Произошла ошибка, перезагрузите страницу</span>)}
          {!state.isLoading && !state.hasError && !!state.data.length && <BurgerIngredients data={state.data} />}
        </div>
        <div className={styles.mainCol}>
          {!state.isLoading && !state.hasError && !!state.data.length && <BurgerConstructor data={state.data} />}
        </div>
      </section>
    </>
  );
}