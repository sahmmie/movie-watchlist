import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

// Components
import Home from './components/home';
import Search from './components/search';
import Watchlist from './components/watchlist';
import Favorites from './components/favorites';
import Page404 from './components/page404';
import Login from './components/login';
import Signup from './components/signup';
import Navbar from './components/shared/navbar';
import { ToastContainer } from 'react-toastify';

// Styles
import 'react-toastify/dist/ReactToastify.min.css';

// Authentication module
import Auth from './auth';

class AppRoutes extends React.Component {
	render() {
		return(
			<div>
				<Navbar />
				
				<section className="section">
					<div className="container">
						<Switch>
							<Route exact path="/home" component={Home} />
							<Route exact path="/" component={Home} />
							<Route exact path="/search" component={Search} />
							<Route exact path="/watchlist" component={Watchlist} />
							<Route exact path="/favorites" component={Favorites} />
							<Route exact path="/login" component={Login} />
							<Route exact path="/signup" component={Signup} />
							<Route exact path="/logout" render={() => {
								Auth.deauthenticateUser(); 
								return <Redirect to="/" />
							}} />
							<Route component={Page404} />
						</Switch>
					</div>
				</section>

				<ToastContainer 
					position="top-center"
					type="default"
					autoClose={3000}
					hideProgressBar
					newestOnTop={false}
					closeOnClick
					pauseOnHover
				/>
			</div>
		);
	}
}

export default AppRoutes;
