import React, {
  Component
} from 'react';
import {
  Route,
  Switch
} from 'react-router-dom';
import LoginPage from './routes/LoginPage/LoginPage';
import RegistrationPage from './routes/RegistrationPage/RegistrationPage';
import FeedPage from './routes/FeedPage/FeedPage';
import NewFrenmoPage from './routes/NewFrenmoPage/NewFrenmoPage';
import NavMenu from './components/Header/NavMenu';
import PrivateRoute from './components/Utils/PrivateRoute';
import PublicOnlyRoute from './components/Utils/PublicOnlyRoute';
import FooterMenu from './components/FooterMenu/FooterMenu';
import FrenmoContext from './contexts/FrenmoContext';
import { FrenmoProvider } from './contexts/FrenmoContext';

import FrenmoListByCat from './routes/FrenmoListByCat/FrenmoListByCat';
import EditFrenmoPage from './routes/EditFrenmoPage/EditFrenmoPage';
import Friends from './routes/Friends/Friends';
import PendingFren from './components/PendingFren/PendingFren';
import FrenmoDashboard from './routes/FrenmoDashboard/FrenmoDashboard';
import './App.css';
import FrenmoDetail from './components/FrenmoDetail/FrenmoDetail';
import FrenmoApiService from './services/frenmo-api-service';
import Frenmo from './components/Frenmo/Frenmo';

class App extends Component {
  state = {
    hasError: false
  };

  static contextType = FrenmoContext;

  componentDidMount() {
    this.context.clearError();
    FrenmoApiService.getAllPublicFrenmos()
      .then(
        this.context.setPublicFrenmos
      )
      .catch(this.context.setError);
  }

  renderMainRoutes() {
    return (
      <>
        <Switch>
          <PublicOnlyRoute
            path={'/login'}
            component={LoginPage}
          />

          <PublicOnlyRoute
            path={'/register'}
            component={RegistrationPage}
          />

          <PrivateRoute
            path={'/pending'}
            component={PendingFren}
          />

          <PrivateRoute
            exact
            path={'/Friends'}
            component={Friends}
          />

          <PrivateRoute
            path={'/feed'}
            component={FeedPage}
          />

          <PrivateRoute
            exact
            path={'/send'}
            component={NewFrenmoPage}
          />
          <PrivateRoute
            exact
            path={`/frenmos`}
            component={FrenmoDashboard}
          />
          <PrivateRoute
            path={
              '/frenmos/category/:categoryId'
            }
            component={FrenmoListByCat}
          />

          <PrivateRoute
            exact
            path={`/frenmos/category/:categoryId/:outstandingId`}
            component={Frenmo}
          />

          <PrivateRoute
            exact
            path={`/frenmos/:outstandingId/edit`}
            component={EditFrenmoPage}
          />
        </Switch>
      </>
    );
  }

  render() {
    return (
      <div className="App">
        <NavMenu />
        <main className="App__container wrapper">
          {this.state.hasError && (
            <p className="red">
              Something went wrong.
              Please try again later.
            </p>
          )}

          <section className="App__main wrapper">
            <>
              {this.renderMainRoutes()}
            </>
          </section>
        </main>

        <FooterMenu />
      </div>
    );
  }
}

export default App;
