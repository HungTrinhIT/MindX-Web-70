import axiosInstance from './axiosInstance';

const authAPI = {
	login: (authValues) => {
		return axiosInstance.post('/auth/login', authValues);
	},
	register: (registerValues) => {
		return axiosInstance.post('/auth/register', registerValues);
	},
	authInfo: () => {
		return axiosInstance.get('/auth/me');
	},
};

export default authAPI;
