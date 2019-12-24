import React from 'react';
import ReactFullpage from '@fullpage/react-fullpage';
// import 'fullpage.js/vendors/scrolloverflow';
import Splash from './Splash';
import './Login.css';
import { Form, Button, Card, Col, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
const registerDetailsTemplate = {
	firstName: '',
	lastName: '',
	email: '',
	mob: '',
	college: '',
	collegeID: '',
	blitzPIN: '',
	isMNIT: false,
	accomodation: false
};
const loginDetailsTemplate = {
	blitzID: '',
	blitzPIN: ''
};
class Login extends React.Component {
	state = {
		whichForm: true,
		registerDetails: {
			firstName: '',
			lastName: '',
			email: '',
			mob: '',
			college: '',
			collegeID: '',
			blitzPIN: '',
			isMNIT: false,
			accomodation: false
		},
		loginDetails: {
			blitzID: '',
			blitzPIN: ''
		}
	};
	images = ['https://cdn.dodowallpaper.com/full/433/mandala-wallpaper-desktop-4.jpg'];
	changeForm = () => {
		this.setState({
			whichForm: !this.state.whichForm,
			registerDetails: {
				firstName: '',
				lastName: '',
				email: '',
				mob: '',
				college: '',
				collegeID: '',
				blitzPIN: '',
				isMNIT: false,
				accomodation: false
			},
			loginDetails: {
				blitzID: '',
				blitzPIN: ''
			}
		});
	};
	componentDidMount() {
		// this.changeForm();
	}
	componentDidUpdate() {
		// console.log(this.state.registerDetails);
	}
	handleRegisterChange = (e) => {
		let newDetails = this.state.registerDetails;
		// const value = e.target.type === 'radio' ? e.target.checked : e.target.value;
		let value = e.target.value;
		if (e.target.type === 'radio') {
			if (value === 'true') value = true;
			else value = false;
		}
		// console.log(e.target.id + ': ' + value);
		// console.log(typeof value);
		newDetails[e.target.id] = value;
		this.setState({ registerDetails: newDetails });
	};
	handleRegisterSubmit = () => {
		const { registerDetails } = this.state;
		console.log(registerDetails);
		this.setState({
			registerDetails: {
				firstName: '',
				lastName: '',
				email: '',
				mob: '',
				college: '',
				collegeID: '',
				blitzPIN: '',
				isMNIT: false,
				accomodation: false
			}
		});
	};
	handleLoginChange = (e) => {
		let newDetails = this.state.loginDetails;
		const value = e.target.type === 'checkbox' ? (e.target.checked === 'true' ? true : false) : e.target.value;
		newDetails[e.target.id] = value;
		this.setState({ loginDetails: newDetails });
	};
	handleLoginSubmit = () => {
		const { loginDetails } = this.state;
		console.log(loginDetails);
		this.setState({
			loginDetails: {
				blitzID: '',
				blitzPIN: ''
			}
		});
		this.props.LOGIN({ blitzID: loginDetails.blitzID });
	};
	render() {
		if (this.props.loggedIn) {
			return <Redirect to="/myaccount" />;
		}
		const { registerDetails, loginDetails } = this.state;
		const registerForm = (
			<div className="section coverlogin fp-auto-height-responsive">
				<div className="formwrapper">
					<h1 className="heading">Register</h1>
					<Card>
						<Card.Body>
							<Form>
								<Form.Group>
									<Form.Control
										onChange={() => {
											this.handleRegisterChange(event);
										}}
										value={registerDetails.firstName}
										id="firstName"
										type="text"
										placeholder="First Name"
									/>
								</Form.Group>
								<Form.Group>
									<Form.Control
										onChange={() => {
											this.handleRegisterChange(event);
										}}
										value={registerDetails.lastName}
										id="lastName"
										type="text"
										placeholder="Last Name"
									/>
								</Form.Group>
								<Form.Group>
									<Form.Control
										onChange={() => {
											this.handleRegisterChange(event);
										}}
										value={registerDetails.email}
										id="email"
										type="email"
										placeholder="Email"
									/>
								</Form.Group>
								<Form.Group>
									<Form.Control
										onChange={() => {
											this.handleRegisterChange(event);
										}}
										value={registerDetails.mob}
										id="mob"
										type="phone"
										placeholder="Mobile Number"
									/>
								</Form.Group>
								<Form.Group>
									<Form.Control
										onChange={() => {
											this.handleRegisterChange(event);
										}}
										value={registerDetails.college}
										id="college"
										type="text"
										placeholder="College Name"
									/>
								</Form.Group>
								<Form.Group>
									<Form.Control
										onChange={() => {
											this.handleRegisterChange(event);
										}}
										value={registerDetails.collegeID}
										id="collegeID"
										type="text"
										placeholder="College ID"
									/>
								</Form.Group>
								<Form.Group>
									<Form.Control
										value={registerDetails.blitzPIN}
										onChange={() => {
											this.handleRegisterChange(event);
										}}
										id="blitzPIN"
										type="password"
										placeholder="4 digit PIN"
									/>
								</Form.Group>
								<fieldset>
									<Form.Group>
										<Form.Label>Are you a student of MNIT/IIITK/NIT UK?</Form.Label>
										<Form.Check
											onChange={() => {
												// console.log('yes');
												this.handleRegisterChange(event);
											}}
											checked={registerDetails.isMNIT}
											value={true}
											type="radio"
											id="isMNIT"
											label="Yes"
										/>
										<Form.Check
											onChange={() => {
												console.log('no');
												this.handleRegisterChange(event);
											}}
											checked={!registerDetails.isMNIT}
											value={false}
											type="radio"
											id="isMNIT"
											label="No"
										/>
									</Form.Group>
								</fieldset>
								<fieldset>
									<Form.Group>
										<Form.Label>Do you need Accomodation?</Form.Label>
										<Form.Check
											onChange={() => {
												this.handleRegisterChange(event);
											}}
											checked={registerDetails.accomodation}
											value={true}
											type="radio"
											id="accomodation"
											label="Yes"
										/>
										<Form.Check
											onChange={() => {
												this.handleRegisterChange(event);
											}}
											checked={!registerDetails.accomodation}
											value={false}
											type="radio"
											id="accomodation"
											label="No"
										/>
									</Form.Group>
								</fieldset>
								<Row>
									<Col>
										<Button
											onClick={() => {
												this.handleRegisterSubmit();
											}}
											variant="success"
										>
											Submit
										</Button>
									</Col>
								</Row>
								<Row>
									<Col>
										<a className="changeform" href="#" onClick={() => this.changeForm()}>
											Already have an account?
										</a>
									</Col>
								</Row>
							</Form>
						</Card.Body>
					</Card>
				</div>
			</div>
		);
		const loginForm = (
			<div className="section coverlogin fp-auto-height-responsive">
				<div className="formwrapper">
					<h1 className="heading">Login</h1>
					<Card>
						<Card.Body>
							<Form>
								<Form.Group>
									<Form.Control
										onChange={() => {
											this.handleLoginChange(event);
										}}
										value={loginDetails.blitzID}
										id="blitzID"
										type="text"
										placeholder="Blitz ID"
									/>
								</Form.Group>
								<Form.Group>
									<Form.Control
										onChange={() => {
											this.handleLoginChange(event);
										}}
										value={loginDetails.blitzPIN}
										id="blitzPIN"
										type="password"
										placeholder="4 digit PIN"
									/>
								</Form.Group>
								<Row>
									<Col>
										<Button
											onClick={() => {
												this.handleLoginSubmit();
											}}
											variant="success"
										>
											Submit
										</Button>
									</Col>
								</Row>
								<Row />
								<Row>
									<Col>
										<a className="changeform" href="#" onClick={() => this.changeForm()}>
											Create new account
										</a>
									</Col>
								</Row>
							</Form>
						</Card.Body>
					</Card>
				</div>
			</div>
		);
		const { whichForm } = this.state;
		return (
			<div className="scrollit">
				<Splash images={this.images} />
				<ReactFullpage
					responsiveHeight="800"
					verticalCentered={true}
					render={({ state, fullpageApi }) => {
						return <ReactFullpage.Wrapper>{whichForm ? loginForm : registerForm}</ReactFullpage.Wrapper>;
					}}
				/>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		loggedIn: state.loggedIn,
		user: state.user
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		LOGIN: (user) => {
			dispatch({ type: 'LOGIN', payload: { user: user } });
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
