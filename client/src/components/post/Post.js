import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPost } from '../../actions/postActions';
import Spinner from '../common/Spiiner';
import PropTypes from 'prop-types';
import PostItem from '../posts/PostItem';
import CommentForm from './CommentForm';
import CommentFeed from './CommentFeed';

class Post extends Component {
	componentDidMount() {
		this.props.getPost(this.props.match.params.id);
	}

	render() {
		const { post, loading } = this.props.post;
		console.log(post)
		let postContent;

		if(post === null || loading || Object.keys(post).length === 0) {
			postContent = <Spinner/>
		} else {
			postContent = (
				<div>
					<PostItem post={post} showActions={false}/>
					<CommentForm postId={post._id}/>
					<CommentFeed postId={post._id} comments={post.comment}/>
				</div>
			)
		}

		return (
			<div className='post'>
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<Link to='/feed' className='btn btn-light mb-3'>Back to feed</Link>
							{postContent}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Post.propTypes = {
	getPost: PropTypes.func.isRequired,
	post: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
	post: state.post
});

export default connect(mapStateToProps, { getPost })(Post);
