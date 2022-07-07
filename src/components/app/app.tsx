import AppHeader from '../app-header/app-header';
import { Switch, Route, useLocation, useHistory } from 'react-router-dom';
import { MainPage, LoginPage, ForgotPassword, ResetPassword, Profile, RegistrationPage, NotFound404, IngredientDetailPage } from '../../pages';
import { useDispatch } from 'react-redux';
import ProtectedRoute from '../protected-route/protected-route';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { useEffect } from 'react';
import { getIngredientsData } from '../../services/actions/burgerIngredients';
import { userGetInfo } from '../../services/actions/user';
import { checkAccessToken } from '../../utils/utils';
import { ILocationBackground } from '../../types';

const App = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation<ILocationBackground>();

    const background = location.state && location.state.background;

    const isAccessToken = checkAccessToken();

    useEffect(() => {
        dispatch(getIngredientsData())
        if (isAccessToken){
            dispatch(userGetInfo());
        }
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

export default App;