import { Link } from "react-router-dom";

const ForgotPassword = () => {
	return (
		<div className="not-found">
			<h2>Sorry</h2>
			<p>This page is not functional</p>
			<Link to="/">Back to the homepage....</Link>
		</div>
	);
}

export default ForgotPassword;