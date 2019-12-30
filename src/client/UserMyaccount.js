import React, { Component } from 'react';
import { Jumbotron, Table } from 'reactstrap';
import { USER } from '../shared/usertest.js';
import './UserMyaccount.css';
import Splash from './Splash';
import ReactFullpage from '@fullpage/react-fullpage';
import 'fullpage.js/vendors/scrolloverflow';
import {Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
class Myaccount extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: USER,
			width: 0,
			height: 0
		};
		this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
		this.images = ['https://cdn.dodowallpaper.com/full/433/mandala-wallpaper-desktop-4.jpg'];
	}
	componentDidMount() {
		this.updateWindowDimensions();
		window.addEventListener('resize', this.updateWindowDimensions);
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.updateWindowDimensions);
	}

	updateWindowDimensions() {
		this.setState({ width: window.innerWidth, height: window.innerHeight });
	}

	renderDetails(user) {
		var acc = user.accomodation;
		if (user.accomodation == false) {
			acc = 'no';
		} else {
			acc = 'yes';
		}
		return (
			<div>
				<Table className="pro words" borderless responsive>
					<thead>
						<tr colSpan={2}>
							<th>
								<h4>Personal Information</h4>
							</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>Blitz ID:</td>
							<td>blitz20@{this.state.user.blitzID}</td>
						</tr>
						<tr>
							<td>College ID:</td>
							<td>{this.state.user.collegeID}</td>
						</tr>
						<tr>
							<td>Email ID:</td>
							<td>{this.state.user.email}</td>
						</tr>
						<tr>
							<td>Phone Number:</td>
							<td> {this.state.user.mob}</td>
						</tr>
						<tr>
							<td>Accomodation needed:</td>
							<td>{acc}</td>
						</tr>
						{this.renderTransaction(this.state.user)}
					</tbody>
				</Table>
			</div>
		);
	}
	renderTransaction(user) {
		if (user.isMNIT == false) {
			var trans = user.transactionID;
			if (user.transactionID == null) {
				trans = 'not yet payed';
			}
			return (
				<tr>
					<td>Transaction ID:</td>
					<td>{trans}</td>
				</tr>
			);
		}
	}

	renderEventsPC(events) {
		if (events.length != 0) {
			return (
				<div className="eve">
					<h4>Participated Events</h4>
					<Table striped responsive>
						<thead>
							<tr>
								<th>Event</th>
								<th>Registeration ID</th>
							</tr>
						</thead>
						<tbody>
							{events.map((event) => {
								return (
									<tr key={event.teamId}>
										<td>{event.name} </td>
										<td> {event.teamId}</td>
									</tr>
								);
							})}
						</tbody>
					</Table>
				</div>
			);
		} else {
			return (
				<div className="p-5">
					<h4>No Participated Events</h4>
				</div>
			);
		}
	}
	renderComponent() {
		if (window.innerWidth > 760) {
			return (
				<div>
					<Jumbotron>
						<h1>My Account</h1>
						<div className="boxi green">{this.renderEventsPC(this.state.user.events)}</div>
					</Jumbotron>
					<div className="pro ">
						<h2 className="words">
							{this.state.user.firstName} {this.state.user.lastName}
						</h2>
						<p className="words">{this.state.user.college}</p>
					</div>
					<br></br>
					<div className="pro row words">{this.renderDetails(this.state.user)}</div>
				</div>
			);
		} else {
			return (
				<div>
					<Jumbotron>
						<h1>My Account</h1>
					</Jumbotron>
					<div>
						<h2 className="promob words">
							{this.state.user.firstName} {this.state.user.lastName}
						</h2>
						<p className="promob words">{this.state.user.college}</p>
					</div>
					<div className="promob words">{this.renderDetails(this.state.user)}</div>
					<div className="greenmob">{this.renderEventsPC(this.state.user.events)}</div>
				</div>
			);
		}
	}

	render() {
    if(!this.props.loggedIn)
    {
        return(<Redirect to="/login" />)
    }
		return (
			<div>
				<Splash images={this.images} />
				<ReactFullpage
					scrollOverflow={true}
					render={({ state, fullpageApi }) => {
						return (
							<ReactFullpage.Wrapper>
								<div className="section">{this.renderComponent()}</div>
							</ReactFullpage.Wrapper>
						);
					}}
				/>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		loggedIn: state.loggedIn
	};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Myaccount);