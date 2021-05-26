import { Redirect, Route } from 'react-router-dom';
import { isLoggedIn } from '../auth';
import { jsx as _jsx } from "react/jsx-runtime";

const ProtectedRoute = ({
  allowed,
  redirectTo,
  component: Component,
  render,
  children,
  ...rest
}) => /*#__PURE__*/_jsx(Route, { ...rest,
  render: props => {
    if (allowed) {
      if (Component) {
        return /*#__PURE__*/_jsx(Component, { ...props
        });
      } else if (render) {
        return render(props);
      } else {
        return children;
      }
    }

    return /*#__PURE__*/_jsx(Redirect, {
      to: redirectTo
    });
  }
});

export const PrivateRoute = props => /*#__PURE__*/_jsx(ProtectedRoute, { ...props,
  allowed: isLoggedIn(),
  redirectTo: "/login"
});
export const PublicRoute = props => /*#__PURE__*/_jsx(ProtectedRoute, { ...props,
  allowed: !isLoggedIn(),
  redirectTo: "/login"
});