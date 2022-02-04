import React from 'react';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NotFound from './NotFound';
import Dashboard from './Dashboard';

class App extends React.Component {
	constructor(props){
		super(props);
		this.state = { apiResponse: "" };
	}

	CallAPI(){
		fetch("http://localhost:9000/testAPI")
		.then(res => res.text())
		.then(res => this.setState({ apiResponse: res }));
	}

	componentWillMount(){
		this.CallAPI();
	}

	render(){
		return (
			<Router>
			<div className="App">
				<div className="content">
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
				</div>
				<p>{this.state.apiResponse}</p>
			</div>
		</Router>
		);
	}
}

export default App;
