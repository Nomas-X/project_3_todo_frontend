import { useEffect } from "react";
import { useHistory } from "react-router-dom";

const Signout = () => {
	const history = useHistory();

	useEffect( () => {
		async function signout() {
			const res = await fetch("http://localhost:9000/signout", {
				method: "GET",
				withCredntials: true,
				mode: 'cors',
				credentials: 'include'
			})
			const data = await res.json();
			if (data === 'Signout Successful') {
				history.push('/');
			} else {
				history.push('/dashboard');
			}
		}
		signout();

	}, []);


	return (
		<div>Signing Out...</div>
	);
};

export default Signout;
