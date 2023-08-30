import axios from 'axios';
import { envConfigs } from '../../configs/envConfigs';

const axiosInstance = axios.create({
	baseURL: `${envConfigs.BASE_API}/api/v1`,
	timeout: 30000,
});

axiosInstance.interceptors.request.use((config) => {
	const accessToken = localStorage.getItem('accessToken') || '';

	if (accessToken) {
		config.headers['x-access-token'] = accessToken;
	}

	return config;
});

export default axiosInstance;
