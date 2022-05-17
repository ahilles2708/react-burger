import AppHeader from './components/app-header/app-header';
import { Switch, Route, useLocation, useHistory } from 'react-router-dom';
import { MainPage, LoginPage, ForgotPassword, ResetPassword, Profile, RegistrationPage, NotFound404 } from './pages';
import { useDispatch } from 'react-redux';

export default function App() {
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    const background = location.state && location.state.background;

    const closeModal = () => history.goBack();

    return (
        <>
            <AppHeader/>
            <Switch>
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
                <Route path='/profile/orders-feed' exact={true}>
                    test
                </Route>
                <Route path='/profile' exact={true}>
                    <Profile/>
                </Route>
                <Route>
                    <NotFound404/>
                </Route>
            </Switch>
        </>
    )
}