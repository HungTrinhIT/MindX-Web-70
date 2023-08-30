const ENVIROMENTS = {
	DEV: 'development',
	PRODUCTION: 'production',
};

let NODE_ENV = process.env.NODE_ENV;
let env = '';

switch (NODE_ENV) {
	case ENVIROMENTS.DEV:
		env = ENVIROMENTS.DEV;
		break;
	case ENVIROMENTS.PRODUCTION:
		env = ENVIROMENTS.PRODUCTION;
		break;
	default:
		env = ENVIROMENTS.PRODUCTION;
}

export const envConfigs = {
	canonicalUrl: 'http://localhost:3000',
	BASE_API:
		env === ENVIROMENTS.DEV
			? 'http://localhost:3001'
			: process.env.REACT_APP_SERVER_BASE_SERVER_DOMAIN,
};
