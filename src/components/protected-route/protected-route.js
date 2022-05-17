import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

export function ProtectedRoute({ children, ...rest }) {

    const {
        isAuth,
    } = useSelector(state => state.user);

    return (
      <Route
        {...rest}
        render={({ location }) => (
            isAuth ? (
                children
            ) : (
                <Redirect to={{pathname: '/login', state: { from: location }}}/>
            )            
          )
        }
      />
    );
  }