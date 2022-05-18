import { useSelector } from 'react-redux';
import { Route, Redirect, useLocation } from 'react-router-dom';
import { checkAccessToken } from '../../utils/utils';
import PropTypes from 'prop-types';

export function ProtectedRoute({ path, exact, children }) {
    const location = useLocation();

    const {
        isAuth,
    } = useSelector(state => state.user);

    if(!checkAccessToken()){
        return (
            <Redirect to={{pathname: "/login", state: { from: location }}}/>
        )
    }

    return (
        <Route
          path={path}
          exact={exact}
          render={({ location }) =>
            isAuth ? (
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

ProtectedRoute.propTypes = {
    path: PropTypes.string.isRequired,
    exact: PropTypes.bool,
    children: PropTypes.node.isRequired
};