// Buttons are WiP
import { useRef, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const Home = () => {
	const [first_name, setfirst_name] = useState('');
	const [last_name, setlast_name] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [first_name_error, setfirst_name_error] = useState('');
	const [last_name_error, setlast_name_error] = useState('');
	const [email_error, setemail_error] = useState('');
	const [password_error, setpassword_error] = useState('');
	const [isPending, setIsPending] = useState('');

	const panel_mover = useRef(null);
	const signup_form = useRef(null);
	const first_name_value = useRef(null);
	const last_name_value = useRef(null);
	const email_value = useRef(null);
	const password_value = useRef(null);

	const history = useHistory();

	// RegEx
	const name_pattern = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð'-]{3,15}$/;
	const password_pattern = /^[A-Za-z\d@$!%*#?&]{8,}$/;

	useEffect( () => {
		setIsPending(true);
		async function signcheck() {
			const res = await fetch("http://localhost:9000/signcheck", {
				method: "GET",
				withCredntials: true,
				mode: 'cors',
				credentials: 'include'
			})
			setIsPending(false);
			const data = await res.json();
			console.log(data);
			if (data === 'Authentication successful') {
				history.push('/dashboard')
			} else {
				console.log('user not logged in');
			}
		}
		signcheck();

	}, []);

	const validator = (e) => {
		let result = false;

		if (e.target.name === "first_name_signup") {
			result = name_pattern.test(e.target.value);
			setfirst_name(e.target.value);
		} else if (e.target.name === "last_name_signup") {
			result = name_pattern.test(e.target.value);
			setlast_name(e.target.value);
		} else if (e.target.name === "email_signup") {
			result = true;
			setEmail(e.target.value);
		} else if (e.target.name === "password_signup") {
			result = password_pattern.test(e.target.value);
			setPassword(e.target.value);
		} else if (e.target.name === "email_signin") {
			result = true;
			setEmail(e.target.value);
		} else if (e.target.name === "password_signin") {
			result = true;
			setPassword(e.target.value);
		} 

		if (result === false) {
			e.target.classList.add("unaccepted_pattern");
		} else {
			e.target.classList.remove("unaccepted_pattern");
		}
	};

	const move_panel = () => {
		setfirst_name_error("");
		setlast_name_error("");
		setemail_error("");
		setpassword_error("");
		setfirst_name("");
		setlast_name("");
		setEmail("");
		setPassword("");

		if (panel_mover.current.className === "container") {
			panel_mover.current.classList.add("right-panel-active");
		} else {
			panel_mover.current.classList.remove("right-panel-active");
		}
	};

	const handleSignup = async (e) => {
		e.preventDefault();
		const signup_details = { first_name, last_name, email, password };
		setIsPending(true);
		setfirst_name_error("");
		setlast_name_error("");
		setemail_error("");
		setpassword_error("");

		try {
			const res =  await fetch("http://localhost:9000/signup", {
				method: "POST",
				withCredntials: true,
				mode:'cors',
				credentials: 'include',
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(signup_details)
			})
			console.log("New uesr added");
			setIsPending(false);
			const data = await res.json();
			console.log(data);
			if (data.errors) {
				setfirst_name_error(data.errors.first_name);
				setlast_name_error(data.errors.last_name);
				setemail_error(data.errors.email);
				setpassword_error(data.errors.password);
			}
			if (data.user) {
				//history.push('/dashboard');
			}
			
		} 
		catch (err) {
			console.log(err);
		}
	};

	const handleSignin = async (e) => {
		e.preventDefault();
		const signin_details = { email, password };
		setIsPending(true);
		setemail_error("");
		setpassword_error("");

		try {
			const res =  await fetch("http://localhost:9000/signin", {
				method: "POST",
				withCredntials: true,
				mode:'cors',
				credentials: 'include',
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(signin_details)
			})
			console.log("User has signed in");
			setIsPending(false)
			const data = await res.json();
			console.log(data);
			if (data.errors) {
				setemail_error(data.errors.email);
				setpassword_error(data.errors.password);
			}
			if (data.user) {
				//history.push('/dashboard');
			}
			
		} 
		catch (err) {
			console.log(err);
		}
	};

	return (
		<section>
			<h2>Welcome to Nomas Todo</h2>
			<div className={"container"} id="container" ref={panel_mover}>
				<div className="form-container sign-up-container">
					<form onSubmit={handleSignup} ref={signup_form}>
						<h1 className="sign">Create Account</h1>
						<span>Do not share your information with anyone!</span>
						<input type="text" placeholder="First Name" name="first_name_signup" onChange={validator} ref={first_name_value} value={first_name} required/>
						<div className="formerror">{first_name_error}</div>
						<input type="text" placeholder="Last Name" name="last_name_signup" onChange={validator} ref={last_name_value} value={last_name} required/>
						<div className="formerror">{last_name_error}</div>
						<input type="email" placeholder="Email" name="email_signup" onChange={validator} ref={email_value} value={email} required/>
						<div className="formerror">{email_error}</div>
						<input type="password" placeholder="Password" name="password_signup" onChange={validator} ref={password_value} value={password} required/>
						<div className="formerror">{password_error}</div>
						{!isPending && <button>Sign Up</button>}
						{isPending && <button disabled>Sign up</button>}
					</form>
				</div>
				<div className="form-container sign-in-container">
					<form onSubmit={handleSignin}>
						<h1 className="sign">Sign in</h1>
						<span></span>
						<input type="email" placeholder="Email" name="email_signin" required onChange={validator} value={email}/>
						<div className="formerror">{email_error}</div>
						<input type="password" placeholder="Password" name="password_signin" required onChange={validator} value={password}/>
						<div className="formerror">{password_error}</div>
						<a href="forgotpassword">Forgot your password?</a>
						{!isPending && <button>Sign in</button>}
						{isPending && <button disabled>Signing in</button>}
					</form>
				</div>
				<div className="overlay-container">
					<div className="overlay">
						<div className="overlay-panel overlay-left">
							<h1>Welcome Back!</h1>
							<p>To access your todo list please sign-in with your personal info</p>
							<button className="ghost" id="signIn" onClick={() => move_panel()}>Sign In</button>
						</div>
						<div className="overlay-panel overlay-right">
							<h1>Well, hello there? </h1>
							<p>If you'd like to utilize our services, you needto sign-up!</p>
							<button className="ghost" id="signUp" onClick={() => move_panel()}>	Sign Up</button>
						</div>
					</div>
				</div>
			</div>
			<footer>
				<p>
					Original version of the sign-in/sign-up page created by
					<a href="https://florin-pop.com"> Florin Pop</a>
				</p>
			</footer>
		</section>
	);
};

export default Home;
