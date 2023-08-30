import * as Yup from 'yup';

export const postSchemaValidation = Yup.object().shape({
	title: Yup.string().required(),
	content: Yup.string().required(),
	backgroundColor: Yup.string().optional(),
});
