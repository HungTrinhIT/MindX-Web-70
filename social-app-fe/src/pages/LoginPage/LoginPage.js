import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import authAPI from '../../services/apis/authAPI';
import { Navigate, useNavigate } from 'react-router-dom';
import AuthContext from '../../contexts/AuthContext/AuthContext';
import LayoutWrapper from '../../layouts/LayoutWrapper/LayoutWrapper';

const initialValues = {
	email: '',
	password: '',
};

const LoginPage = () => {
	const [loginLoading, setLoginLoading] = useState(false);
	const [loginError, setLoginErorr] = useState('');

	const {
		handleLogin,
		auth: { isAuthenticated },
	} = useContext(AuthContext);

	const navigate = useNavigate();

	const form = useFormik({
		initialValues,
		onSubmit: async (values) => {
			try {
				setLoginLoading(true);
				const response = await authAPI.login(values);
				const data = response.data;
				localStorage.setItem('accessToken', data.accessToken);
				await handleLogin();
				navigate('/');
			} catch (error) {
				console.log('🚀 ~ error:', error);
				setLoginErorr(error.response.data.message);
			} finally {
				setLoginLoading(false);
			}
		},
	});

	const { handleSubmit, isValid, values, handleChange } = form;

	if (isAuthenticated) {
		return <Navigate to="/" />;
	}

	return (
		<LayoutWrapper>
			<div className="flex justify-center items-center mt-[40px] md:mt-[100px]">
				<div className="w-full max-w-md">
					<form
						className="bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4"
						onSubmit={handleSubmit}
					>
						<h2 className="text-2xl text-center mb-6">Login</h2>
						<div className="mb-4">
							<label
								className="block text-gray-700 text-sm font-bold mb-2"
								htmlFor="email"
							>
								Email
							</label>
							<input
								className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
								id="email"
								name="email"
								type="text"
								placeholder="Enter your email"
								onChange={handleChange}
							/>
						</div>
						<div className="mb-6">
							<label
								className="block text-gray-700 text-sm font-bold mb-2"
								htmlFor="password"
							>
								Password
							</label>
							<input
								className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
								id="password"
								name="password"
								type="password"
								placeholder="Enter your password"
								onChange={handleChange}
							/>
						</div>

						{loginError && (
							<p className="text-red-500 text-xs mb-4">{loginError}</p>
						)}
						<div className="flex items-center justify-between">
							<button
								className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
								type="submit"
							>
								{loginLoading ? 'Submitting...' : 'Submit'}
							</button>
							<a
								className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
								href="#"
							>
								Forgot Password?
							</a>
						</div>
					</form>
					<p className="text-center text-gray-500 text-xs">
						&copy; 2023 Your Company. All rights reserved.
					</p>
				</div>
			</div>
		</LayoutWrapper>
	);
};

export default LoginPage;
