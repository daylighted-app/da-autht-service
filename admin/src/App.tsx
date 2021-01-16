import React, { useCallback, useContext } from "react";
import { Route, Switch, useHistory, Link, NavLink } from "react-router-dom";
import Navigation from "./Navigation";
import Login from "./Login";
import { Credentials, setCredentials, removeCredentials } from "./auth";
import {
  Menu,
  MainLayout,
  Page,
  CircleBadge,
  Breadcrumbs,
} from "@amplication/design-system";
import BreadcrumbsContext from "./components/breadcrumbs/BreadcrumbsContext";
import BreadcrumbsProvider from "./components/breadcrumbs/BreadcrumbsProvider";
import useBreadcrumbs from "./components/breadcrumbs/use-breadcrumbs";
import PrivateRoute from "./components/PrivateRoute";
import { DaFeelingIndex } from "./daFeeling/DaFeelingIndex";
import { DaDepictionIndex } from "./daDepiction/DaDepictionIndex";
import { UserIndex } from "./user/UserIndex";
import { DaRepeatableIndex } from "./daRepeatable/DaRepeatableIndex";
import { DaTimingIndex } from "./daTiming/DaTimingIndex";
import { DaylightIndex } from "./daylight/DaylightIndex";
import { DelightIndex } from "./delight/DelightIndex";

const App = (): React.ReactElement => {
  const history = useHistory();
  const handleLogin = useCallback(
    (credentials: Credentials) => {
      setCredentials(credentials);
      history.push("/");
    },
    [history]
  );

  return (
    <BreadcrumbsProvider>
      <MainLayout>
        <Switch>
          <Route path="/login" render={() => <Login onLogin={handleLogin} />} />
          <PrivateRoute path="/" component={AppLayout} />
        </Switch>
      </MainLayout>
    </BreadcrumbsProvider>
  );
};

export default App;

/**@todo: move to a separate template file */
const AppLayout = (): React.ReactElement => {
  const history = useHistory();
  useBreadcrumbs("/", "Daylighted");
  const breadcrumbsContext = useContext(BreadcrumbsContext);

  const signOut = useCallback(() => {
    removeCredentials();
    history.push("/login");
  }, [history]);

  // Use navLink for breadcrumbs to prevent page reload
  const ItemLink = ({ href, ...rest }: { href: string }) => (
    <NavLink {...rest} to={href} />
  );

  return (
    <>
      <Menu
        onSignOutClick={signOut}
        logoContent={
          <Link to="/">
            <CircleBadge name={"Daylighted"} />
          </Link>
        }
      ></Menu>
      <MainLayout.Content>
        <Breadcrumbs>
          {}
          {breadcrumbsContext.breadcrumbsItems.map((item, index, items) => (
            <Breadcrumbs.Item
              as={ItemLink}
              key={index}
              selected={index + 1 === items.length}
              href={item.url}
            >
              {item.name}
            </Breadcrumbs.Item>
          ))}
        </Breadcrumbs>
        <Page>
          <Switch>
            <PrivateRoute exact path="/" component={Navigation} />
            <PrivateRoute path="/da-feelings" component={DaFeelingIndex} />
            <PrivateRoute path="/da-depictions" component={DaDepictionIndex} />
            <PrivateRoute path="/users" component={UserIndex} />
            <PrivateRoute
              path="/da-repeatables"
              component={DaRepeatableIndex}
            />
            <PrivateRoute path="/da-timings" component={DaTimingIndex} />
            <PrivateRoute path="/daylights" component={DaylightIndex} />
            <PrivateRoute path="/delights" component={DelightIndex} />
          </Switch>
        </Page>
      </MainLayout.Content>
    </>
  );
};
