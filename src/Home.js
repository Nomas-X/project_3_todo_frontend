import { useRef, useState } from "react";

const Home = () => {
	const [first_name, setfirst_name] = useState('');
	const [last_name, setlast_name] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isPending, setIsPending] = useState('');

	const panel_mover = useRef(null);
	const signup_form = useRef(null);
	const first_name_value = useRef(null);
	const last_name_value = useRef(null);
	const email_value = useRef(null);
	const password_value = useRef(null);
	const name_pattern = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]{3,15}$/;
	const password_pattern = /^[A-Za-z\d@$!%*#?&]{8,}$/;

	const validator = (e) => {
		let result = name_pattern.test(e.target.value);

		if (e.target.name === "first_last_name_signup") {
			result = name_pattern.test(e.target.value);
		} else if (e.target.name === "password_signup") {
			result = password_pattern.test(e.target.value);
		}

		if (result === false) {
			e.target.classList.add("unaccepted_pattern");
		} else {
			e.target.classList.remove("unaccepted_pattern");
		}
	};

	const move_panel = () => {
		if (panel_mover.current.className === "container") {
			panel_mover.current.classList.add("right-panel-active");
		} else {
			panel_mover.current.classList.remove("right-panel-active");
		}
	};

	const handleSignup = (e) => {
		e.preventDefault();
		const signup_details = { first_name, last_name, email, password };
		
		setIsPending(true);
		fetch("http://localhost:9000/signup", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(signup_details)
		}).then(() => {
			console.log("New uesr added");

			setIsPending(false);
		})
	};

	const handleSignin = (e) => {
		e.preventDefault();
		const Signin_details = { email, password };
		
		setIsPending(true);

		fetch("http://localhost:9000/authRoutes", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(Signin_details)
		}).then(() => {
			console.log("User logged in");
			
			setIsPending(false);
		})
	};

	return (
		<section>
			<h2>Welcome to Nomas Todo</h2>
			<div className={"container"} id="container" ref={panel_mover}>
				<div className="form-container sign-up-container">
					<form onSubmit={handleSignup} ref={signup_form}>
						<h1>Create Account</h1>
						<span>Do not share this information with anyone!</span>
						<input type="text" placeholder="First Name" name="first_last_name_signup" onChange={(e) => {setfirst_name(e.target.value)}} ref={first_name_value} value={first_name} required/>
						<input type="text" placeholder="Last Name" name="first_last_name_signup" onChange={(e) => {setlast_name(e.target.value)}} ref={last_name_value} value={last_name} required/>
						<input type="email" placeholder="Email" name="email_signup" onChange={(e) => {setEmail(e.target.value);}} ref={email_value} value={email} required/>
						<input type="password" placeholder="Password" name="password_signup" onChange={(e) => {setPassword(e.target.value)}} ref={password_value} value={password} required/>
						{!isPending && <button>Sign Up</button>}
						{isPending && <button disabled>Signing up</button>}
					</form>
				</div>
				<div className="form-container sign-in-container">
					<form onSubmit={handleSignin}>
						<h1>Sign in</h1>
						<span></span>
						<input type="email" placeholder="Email" name="email_signin" required/>
						<input type="password" placeholder="Password" name="password_signin" required/>
						<a href="forgotpassword">Forgot your password?</a>
						{!isPending && <button>Signing</button>}
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