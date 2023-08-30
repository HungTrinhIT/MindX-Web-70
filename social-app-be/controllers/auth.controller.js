import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import UserModel from '../models/users.model.js';

const registerUser = asyncHandler(async (req, res) => {
	const { fullname, email, password } = req.body;

	if (!email || !fullname || !password) {
		res.status(400);
		throw new Error('Missing required keys');
	}

	const existingUser = await UserModel.findOne({ email });
	if (existingUser) {
		res.status(400);
		throw new Error('User has already exist');
	}

	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);

	const newUser = new UserModel({
		fullname,
		password: hashedPassword,
		email,
	});

	await newUser.save();

	res.status(201).json({ message: 'User create successfully' });
});

const loginUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) {
		res.status(400);
		throw new Error('Missing required keys');
	}

	const existingUser = await UserModel.findOne({ email });

	if (!existingUser) {
		res.status(400);
		throw new Error('Invalid email or password');
	}

	const isMatchPassword = await bcrypt.compare(password, existingUser.password);

	if (!isMatchPassword) {
		res.status(400);
		throw new Error('Invalid email or password');
	}

	const jwtPayload = {
		email: existingUser.email,
		id: existingUser.id,
		fullname: existingUser.fullname,
		fullname: existingUser.fullname,
	};

	const token = jwt.sign(jwtPayload, process.env.SECRET_KEY, {
		expiresIn: '1h',
	});

	res.json({
		accessToken: token,
		message: 'Login successfully',
	});
});

const getMe = asyncHandler(async (req, res) => {
	const { id: userId } = req.users;

	const existingUser = await UserModel.findById(userId).select('-password');
	return res.json(existingUser);
});

const AuthController = {
	registerUser,
	loginUser,
	getMe,
};

export default AuthController;
