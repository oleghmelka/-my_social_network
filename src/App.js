import './App.css';
import Header from './components/Header/Header';
import Profile from './components/Profile/Profile';
import { BrowserRouter, Route } from 'react-router-dom';
import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import NavbarContainer from './components/Navbar/NavbarContainer';




const App = (props) => {
  return (
    <BrowserRouter>
      <div className='app-wrapper'>
        <Header />
        <NavbarContainer />
        <div className='app-wrapper-content'>
          <Route exact path='/profile' render={ () => <Profile />} />
          <Route exact path='/dialogs' render={ () => <DialogsContainer /> } />
          <Route exact path='/news' render={ () => <News/> } />
          <Route exact path='/music' render={ () => <Music/> } />

          <Route exact path='/settings' render={ () => <Settings/> } />
        </div>
        
      </div>
    </BrowserRouter>
  );
}


export default App;
 