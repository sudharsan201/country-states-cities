import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import CountryManage from "./Components/CountryManage";
import StateManage from "./Components/StateManage";
import CityManage from "./Components/CityManage";
import {Provider} from "react-redux";
import store from "./store";
import Home from "./Components/Home";
import spin from "./spin.gif";
import Main from "./Components/Main";
import Logo from "./images/logo.png";

export default function App() {
    return (
        <div className="App" style={{
            backgroundImage: "url(" + spin + ")",
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundColor: 'black',
            fontFamily: "Arial",

        }}>
            <Provider store={store}>
                <Router>

                    <div>
                        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
                            <ul className="navbar-nav mr-auto">
                                <li><Link to={'/'} className="navbar-brand">
                                    <img src={Logo} width="80px" height="auto" alt={"logo"}/>
                                </Link></li>
                                <li><Link to={'/Home'} className="nav-link">
                                    <button type="submit" className='btn  m-1 text-white'>Home</button>
                                </Link></li>
                                <li><Link to={'/Country'} className="nav-link">
                                    <button type="submit" className='btn  m-1 text-white'>Countries</button>
                                </Link></li>
                                <li><Link to={'/State'} className="nav-link">
                                    <button type="submit" className='btn m-1 text-white'>States</button>
                                </Link></li>
                                <li><Link to={'/City'} className="nav-link">
                                    <button type="submit" className='btn m-1 text-white'>Cities</button>
                                </Link></li>
                            </ul>
                        </nav>

                        <hr/>
                        <Switch>
                            <Route exact path='/' component={Main}/>
                            <Route path='/Home' component={Home}/>
                            <Route path='/Country' component={CountryManage}/>
                            <Route path='/State' component={StateManage}/>
                            <Route path='/City' component={CityManage}/>

                        </Switch>
                    </div>

                </Router>

            </Provider>
        </div>
    );
}