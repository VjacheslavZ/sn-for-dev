import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from "classnames";


class TextFieldCroupState extends Component {
	constructor(props) {
		super(props);

		this.state = {
			value: ''
		};

		this.onChange = this.onChange.bind(this);
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value })
	}

	render() {
		const {
			type, error, placeholder, name, value, disabled, info,
		} = this.props;

		return (
			<div className="form-group">
				<input type={type}
				       className={classnames('form-control form-control-lg', {'is-invalid': error})}
				       placeholder={placeholder}
				       name={name}
				       value={value}
				       disabled={disabled}
				       onChange={this.onChange}
				/>
				{info && <small className='form-text text-muted'>{info}</small>}
				{error && (<div className='invalid-feedback'>{error}</div>)}
			</div>
		)
	}
}

export default TextFieldCroupState;