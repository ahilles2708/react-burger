import AppHeader from '../app-header/app-header';
import { Switch, Route, useLocation, useHistory } from 'react-router-dom';
import { MainPage, LoginPage, ForgotPassword, ResetPassword, Profile, RegistrationPage, NotFound404, IngredientDetailPage, FeedPage, FeedOrderPage, ProfileOrderPage } from '../../pages';
import { useDispatch } from '../../services/types/hooks';
import ProtectedRoute from '../protected-route/protected-route';
import Modal from '../modal/modal';
import FeedOrder from '../feed-detail/feed-detail';
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
                <ProtectedRoute path='/profile/orders/:id' exact={true}>
                    <ProfileOrderPage/>
                </ProtectedRoute>
                <ProtectedRoute path='/profile'>
                    <Profile/>
                </ProtectedRoute>
                <Route path='/feed/:id' exact={true}>
                    <FeedOrderPage />
                </Route>
                <Route path='/feed' exact={true}>
                    <FeedPage />
                </Route>
                <Route>
                    <NotFound404/>
                </Route>
            </Switch>

            {background && (
                <Switch>
                    <Route path={'/ingredients/:id'}>
                        <Modal
                            caption="Детали ингредиента"
                            toggle={closeModal}
                        >
                            <IngredientDetails />
                        </Modal>
                    </Route>
                    <Route path={'/feed/:id'}>
                        <Modal
                            caption=""
                            toggle={closeModal}
                        >
                            <FeedOrder isModal={true}/>
                        </Modal>
                    </Route>
                </Switch>
                
            )}

        </>
    )
}

export default App;