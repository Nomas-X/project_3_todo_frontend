import React from 'react';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NotFound from './NotFound';
import Dashboard from './Dashboard';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { indigo } from '@mui/material/colors';

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
							<Dashboard />
						</Route>
						<Route path="*">
							<NotFound />
						</Route>
					</Switch>
					{/* <p>{this.state.apiResponse}</p> */}
				</Router>
			</ThemeProvider>
		);
	}
}

export default App;
