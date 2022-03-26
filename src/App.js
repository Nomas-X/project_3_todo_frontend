import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { indigo } from '@mui/material/colors';
import Home from './Pages/Home';
import Dashboard from './Pages/Dashboard';
import Create from './Pages/Create';
import NotFound from './Pages/NotFound';
import Signout from './Pages/Signout';
import ForgotPassword from './Pages/Forgotpassword';
import Layout from './Components/Layout';

const theme = createTheme({
	palette: {
	  primary: {
		main: '#fefefe'
	  },
	  secondary: indigo
	}
  })

class App extends React.Component {

	render(){
		return (
			<ThemeProvider theme={theme}>
				<Router>
					<Switch>
						<Route exact path="/">
							<Home />
						</Route>
						<Route path="/dashboard">
							<Layout>
								<Dashboard />
							</Layout>
						</Route>
						<Route path="/create">
							<Layout>
								<Create />
							</Layout>
						</Route>
						<Route path="/signout">
							<Layout>
								<Signout />
							</Layout>
						</Route>
						<Route path="/forgotpassword">
							<Layout>
								<ForgotPassword />
							</Layout>
						</Route>
						<Route path="*">
							<Layout>
								<NotFound />
							</Layout>
						</Route>
					</Switch>
				</Router>
			</ThemeProvider>
		);
	}
}

export default App;
