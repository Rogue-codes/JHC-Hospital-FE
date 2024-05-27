import { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AppWrapper from "./layout/AppWrapper";
import AppOutlet from "./layout/AppOutlet";
import { paths } from "./routes/paths";
import routes from "./routes";
import PreLoader from "./components/Preloader";
import PublicOutlet from "./layout/guard/publicRoute/PublicOutlet";
import Login from "./views/auth/Login";

function App() {
  return (
    <AppWrapper>
      <Routes>
        <Route element={<AppOutlet />}>
          <Route index element={<Navigate to={paths.DASHBOARD} />} />

          {routes.map(({ component: Component, path, children }) => (
            <Route
              path={path}
              key={path}
              element={
                <Suspense fallback={<PreLoader />}>
                  <Component />
                </Suspense>
              }
            >
              {children &&
                children.map(
                  ({ path: childPath, component: ChildComponent }) => (
                    <Route
                      path={childPath}
                      key={childPath}
                      element={
                        <Suspense fallback={<PreLoader />}>
                          <ChildComponent />
                        </Suspense>
                      }
                    />
                  )
                )}
            </Route>
          ))}
        </Route>

        <Route element={<PublicOutlet />}>
          <Route index element={<Navigate to={paths.LOGIN} />} />
          <Route
            path={paths.LOGIN}
            element={
              <Suspense fallback={<PreLoader />}>
                <Login />
              </Suspense>
            }
          />
        </Route>

        {/* <Route index element={<NoMatch />} /> */}
      </Routes>
    </AppWrapper>
  );
}

export default App;
