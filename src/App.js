import React from 'react';
import Home from './Pages/Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NotFound from './Pages/NotFound';
import Dashboard from './Pages/Dashboard';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { indigo } from '@mui/material/colors';
import Layout from './Components/Layout';
import Create from './Pages/Create';
import Signout from './Pages/Signout';
import ForgotPassword from './Pages/Forgotpassword';

const theme = createTheme({
	palette: {
	  primary: {
		main: '#fefefe'
	  },
	  secondary: indigo
	}
  })

class App extends React.Component {
	constructor(props){
		super(props);
		this.state = { apiResponse: "" };
	}

	CallAPI(){
		fetch("http://localhost:9000/testAPI", {
			withCredntials: true,
			credentials: 'include'
		})
		.then(res => res.text())
		.then(res => this.setState({ apiResponse: res }));
	}

	componentDidMount(){
		this.CallAPI();
	}

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
					{/* <p>{this.state.apiResponse}</p> */}
				</Router>
			</ThemeProvider>
		);
	}
}

export default App;
