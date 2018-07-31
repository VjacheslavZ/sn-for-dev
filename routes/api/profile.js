const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

//Load validation
const validateProfileInput = require('../../validation/profile');
//Load Profile Model
const Profile = require('../../models/Profile');
//Load User profile.js
const User = require('../../models/User');

//@Route   GET api/test
//@desc    Tests profile.js route
//@access  Public
router.get('/test', (req, res) => res.json({msg: 'Profile Works'}));









//@Route   GET api/profile.js
//@desc    Get current users profile.js
//@access  Private
router.get(
	'/',
	passport.authenticate('jwt', {session: false}),
	(req, res) => {
		const errors ={};

	Profile.findOne({ user: req.user.id })
		.populate('user', ['name', 'avatar'])
		.then(profile => {
			if(!profile){
				errors.noprofile = 'There is no profile.js for this user';
				return res.status(400).json(errors);
			}
			res.json(profile);
		})
		.catch(err => res.status(404).json(err))
	}
);


//@Route   POST api/profile.js
//@desc    Create or edit user profile.js
//@access  Private
router.post(
	'/',
	passport.authenticate('jwt', {session: false}),
	(req, res) => {
		const { errors, isValid } = validateProfileInput(req.body);
		//Check Validation
		if(!isValid) {
			//Return any errors with 400 status
			return res.status(400).json(errors);
		}

		//Get fields
		const profileFields ={};
		profileFields.user = req.user.id;
		if(req.body.handle) profileFields.handle = req.body.handle;
		if(req.body.company) profileFields.company = req.body.company;
		if(req.body.website) profileFields.website = req.body.website;
		if(req.body.location) profileFields.location = req.body.location;
		if(req.body.bio) profileFields.bio = req.body.bio;
		if(req.body.status) profileFields.status = req.body.status;
		if(req.body.githubusername) profileFields.githubusername = req.body.githubusername;
		//Skills - split into array
		if(req.body.skills !== 'undefined') {
			profileFields.skills = req.body.skills.split(',');
		};
		//Social
		profileFields.social = {};
		if(req.body.youtube) profileFields.social.youtube = req.body.youtube;
		if(req.body.twitter) profileFields.social.twitter = req.body.twitter;
		if(req.body.facebook) profileFields.social.facebook = req.body.facebook;
		if(req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
		if(req.body.instagram) profileFields.social.instagram = req.body.instagram;

		Profile.findOne({ user: req.user.id })
			.then(profile => {
				//Update
				if(profile){
					Profile.findOneAndUpdate({
						user: req.user.id},
						{$set: profileFields},
						{new:true}
					).then(profile => res.json(profile))
				} else {
					//Create

					//Check if handle exists
					Profile.findOne({ handle: profileFields.handle }).then(profile => {
						if(profile){
							errors.handle = 'That handle already exists';
							res.status(400).json(errors);
						}

						//Save Profile
						new Profile(profileFields).save().then(profile => res.json(profile))
					})
				}
			})
	}
);

module.exports = router;