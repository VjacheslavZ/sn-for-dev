import React, { Component } from 'react';
import { connect } from 'react-redux';
import Spinner from '../common/Spiiner'
import PropTypes from 'prop-types';
import PostForm from './PostForm';

class Posts extends Component {
	render() {
		return (
			<div className='feed'>
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<PostForm />
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Posts.propTypes = {};

export default Posts;
