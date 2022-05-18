import AppHeader from './components/app-header/app-header';
import { Switch, Route, useLocation, useHistory } from 'react-router-dom';
import { MainPage, LoginPage, ForgotPassword, ResetPassword, Profile, RegistrationPage, NotFound404, IngredientDetailPage } from './pages';
import { useDispatch } from 'react-redux';
import { ProtectedRoute } from './components/protected-route/protected-route';
import Modal from './components/modal/modal';
import IngredientDetails from './components/ingredient-details/ingredient-details';
import { useEffect } from 'react';
import { getIngredientsData } from './services/actions/burgerIngredients';

export default function App() {
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    const background = location.state && location.state.background;

    useEffect(() => {
        dispatch(getIngredientsData())
      }, [dispatch]);

    const closeModal = () => history.goBack();

    return (
        <>
            <AppHeader/>
            <Switch location={background || location}>
                <Route path='/' exact={true}>
                    <MainPage/>
                </Route>
                <Route path='/login' exact={true}>
                    <LoginPage/>
                </Route>
                <Route path='/register' exact={true}>
                    <RegistrationPage/>
                </Route>
                <Route path='/forgot-password' exact={true}>
                    <ForgotPassword/>
                </Route>
                <Route path='/reset-password' exact={true}>
                    <ResetPassword/>
                </Route>
                <Route path='/ingredients/:id' exact={true}>
                    <IngredientDetailPage/>
                </Route>
                <ProtectedRoute path='/profile/orders-feed' exact={true}>
                    <NotFound404/>
                </ProtectedRoute>
                <ProtectedRoute path='/profile' exact={true}>
                    <Profile/>
                </ProtectedRoute>
                <Route>
                    <NotFound404/>
                </Route>
            </Switch>

            {background && (
                <Route path={'/ingredients/:id'}>
                    <Modal
                    caption="Детали ингредиента"
                    toggle={closeModal}
                    >
                        <IngredientDetails />
                    </Modal>
                </Route>
            )}

        </>
    )
}