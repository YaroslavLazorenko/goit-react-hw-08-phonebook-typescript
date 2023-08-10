import { useEffect, lazy, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, Navigate } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
import { ToastContainer } from 'react-toastify';
import { ROUTES, SPINNER } from './consts';
import { authOperations, authSelectors } from 'redux/auth';
import { phonebookSelectors } from 'redux/phonebook';
import showMessage from 'services/showMessage';
import AppBar from './components/AppBar';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from 'components/PublicRoute';
import './App.css';

const RegisterPage = lazy(() =>
  import('./pages/RgisterPage' /* webpackChunkName: "register-page" */),
);
const LoginPage = lazy(() => import('./pages/LoginPage' /* webpackChunkName: "login-page" */));
const ContactsPage = lazy(() =>
  import('./pages/ContactsPage' /* webpackChunkName: "contacts-page" */),
);

const App = () => {
  const dispatch = useDispatch();

  const isRefreshingUser = useSelector(authSelectors.getIsRefreshingUser);
  const isAuthLoading = useSelector(authSelectors.getIsAuthLoading);
  const phonebookError = useSelector(phonebookSelectors.getError);
  const authError = useSelector(authSelectors.getError);

  useEffect(() => {
    dispatch(authOperations.refreshUser());
  }, [dispatch]);

  if (phonebookError) {
    showMessage('Contacts handling error. ' + phonebookError);
  }
  if (authError) {
    showMessage('Authorization error. ' + authError);
  }

  return (
    <div className="App">
      {isRefreshingUser ? (
        <div>
          <ClipLoader color={SPINNER.COLOR} loading={isRefreshingUser} size={SPINNER.SIZE} />
        </div>
      ) : (
        <>
          <AppBar />
          <main>
            <ToastContainer autoClose={3000} />
            <Suspense
              fallback={
                <div>
                  <ClipLoader color={SPINNER.COLOR} loading={true} size={SPINNER.SIZE} />
                </div>
              }
            >
              <Routes>
                <Route
                  path={ROUTES.REGISTER}
                  element={
                    <PublicRoute redirectTo={ROUTES.CONTACTS} restricted>
                      <RegisterPage />
                    </PublicRoute>
                  }
                />
                <Route
                  path={ROUTES.LOGIN}
                  element={
                    <PublicRoute redirectTo={ROUTES.CONTACTS} restricted>
                      <LoginPage />
                    </PublicRoute>
                  }
                />
                <Route
                  path={ROUTES.CONTACTS}
                  element={
                    <PrivateRoute redirectTo={ROUTES.LOGIN}>
                      <ContactsPage />
                    </PrivateRoute>
                  }
                />
                <Route path="/*" element={<Navigate to={ROUTES.LOGIN} replace />} />
              </Routes>
            </Suspense>
            <div>
              <ClipLoader color={SPINNER.COLOR} loading={isAuthLoading} size={SPINNER.SIZE} />
            </div>
          </main>
        </>
      )}
    </div>
  );
};

export default App;
