import { useSelector } from 'react-redux';
import { Route, Redirect, useLocation } from 'react-router-dom';
import { IProtectedRouteProps, IState } from '../../types';
import { checkAccessToken } from '../../utils/utils';

const ProtectedRoute: React.FC<IProtectedRouteProps> = ({ path, exact, children }) => {

    const {
        isAuth,
    } = useSelector((store: IState) => store.user);
    const isAccessToken = checkAccessToken();

    return (
        <Route
          path={path}
          exact={exact}
          render={({ location }) =>
            (isAuth && isAccessToken) ? (
              children
            ) : (
              <Redirect
                to={{
                  pathname: '/login',
                  state: { from: location }
                }}
              />
            )
          }
        />
    );
}

export default ProtectedRoute;