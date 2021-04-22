import React from 'react';
import './App.css';
import { Route, withRouter } from 'react-router-dom';
import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import NavbarContainer from './components/Navbar/NavbarContainer';
import UsersContainer from './components/Users/UsersContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import LoginPage from './components/Login/Login';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { initializeApp } from './redux/app-reducer';
import Preloader from './components/common/Preloader/Preloader';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from './redux/redux-store';





class App extends React.Component {

  componentDidMount(){
    this.props.initializeApp();
  }

  render () {

      if (!this.props.initialized) {
          return <Preloader />
      }
      

      return (
          <div className='app-wrapper'>
            <HeaderContainer />
            <NavbarContainer />
            <div className='app-wrapper-content'>
              <Route path='/profile/:userId?' render={ () => <ProfileContainer />} />
              <Route exact path='/dialogs' render={ () => <DialogsContainer /> } />
              <Route exact path='/users' render={ () => <UsersContainer /> } />
              <Route exact path='/news' render={ () => <News/> } />
              <Route exact path='/music' render={ () => <Music/> } />
              <Route exact path='/settings' render={ () => <Settings/> } />
              <Route exact path='/login' render={ () => <LoginPage/> } />
            </div>
          </div>
      );
  }

}

const mapStateToProps = (state) => ({
    initialized: state.app.initialized
})

const AppContainer = compose (
    withRouter,
    connect (mapStateToProps, { initializeApp })
) (App);

const SocialNetworkApp = (props) => {
  return   <BrowserRouter>
                <Provider store={store}>
                    <AppContainer />
                </Provider>
            </BrowserRouter>
}

export default SocialNetworkApp;