import React, { Component } from 'react';
import { reduxForm } from 'redux-form';

import * as actions from '../../actions';

class Signup extends Component {
	handleFormSubmit(formProps) {
		const { email, password } = formProps;
		console.log(email, password);
		this.props.signupUser({ email, password });
	}
	renderAlert() {
		if (this.props.errorMessage) {
			return (
				<div className="alert alert-danger">
					<strong>Oops!</strong> {this.props.errorMessage}
				</div>
			);
		}
	}
	render() {
		const { handleSubmit, fields: { email, password, confirmPassword } } = this.props;
		console.log(password);
		return (
			<form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
				<fieldset className="form-group">
					<label>Email:</label>
					<input {...email} type="text" className="form-control" />
					{ email.touched && email.error && <div className="error">{email.error}</div> }
				</fieldset>
				<fieldset className="form-group">
					<label>Password:</label>
					<input {...password} type="password" className="form-control" />
					{ password.touched && password.error && <div className="error">{password.error}</div> }
				</fieldset>
				<fieldset className="form-group">
					<label>Confirm Password:</label>
					<input {...confirmPassword} type="password" className="form-control" />
					{ confirmPassword.touched && confirmPassword.error && <div className="error">{confirmPassword.error}</div> }
				</fieldset>
				{this.renderAlert()}
				<button action="submit" className="btn btn-primary">Sign up!</button>
			</form>
		);
	}
}

const validate = (formProps) => {
	const errors = {};
	if (!formProps.email) {
		errors.email = 'PLease enter an Email';
	}
	if (!formProps.password) {
		errors.password = 'PLease enter a Password';
	}
	if (!formProps.confirmPassword) {
		errors.confirmPassword = 'PLease enter Confirm Password';
	}

	if (formProps.password != formProps.confirmPassword) {
		errors.password = 'Passwords must match';
	}
	return errors;
};

function mapStateToProps(state) {
	return { errorMessage: state.auth.error };
}

export default reduxForm({
	form: 'signup',
	fields: [ 'email', 'password', 'confirmPassword' ],
	validate
}, mapStateToProps, actions)(Signup);
