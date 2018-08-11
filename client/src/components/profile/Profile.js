import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getProfileByHandle, getProfileByHendle } from '../../actions/profileActions';
import ProfileHeader from './ProfileHeader';
import ProfileAbout from './ProfileAbout';
import ProfileCreds from './ProfileCreds';
import ProfileGitHub from './ProfileGitHub';
import Spiiner from '../common/Spiiner';
import PropTypes from 'prop-types';

class Profile extends Component {
	componentDidMount(){
		if(this.props.match.params.handle) {
			this.props.getProfileByHandle(this.props.match.params.handle)
		}
	}

	render() {
		return (
			<div>
				<ProfileHeader />
				<ProfileAbout />
				<ProfileCreds />
				<ProfileGitHub />
			</div>
		);
	}
}

Profile.propTypes = {
	getProfileByHandle: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	profile: state.profile
});

export default connect(mapStateToProps, { getProfileByHandle })(Profile);