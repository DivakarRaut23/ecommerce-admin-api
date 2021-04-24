import CategorySchema from "./Category.schema.js";

export const insertCategory = catObj => {
	return new Promise(async (resolve, reject) => {
		try {
			const result = await CategorySchema(catObj).save();

			resolve(result);
		} catch (error) {
			reject(error);
		}
	});
};

export const getCategories = catObj => {
	return new Promise(async (resolve, reject) => {
		try {
			const result = await CategorySchema.find();

			resolve(result);
		} catch (error) {
			reject(error);
		}
	});
};

<<<<<<< HEAD
export const updateCategory = ({ _id, ...catData }) => {
	return new Promise(async (resolve, reject) => {
		try {
			const result = await CategorySchema.findByIdAndUpdate(
				{ _id },
				{ $set: catData },
				{
					new: true,
				}
			);
=======
export const updateCategories = ({_id, ...catData}) => {
	return new Promise(async (resolve, reject) => {
		try {
			const result = await CategorySchema.findByIdAndUpdate({_id}),
			{_id},
			$set: catData
>>>>>>> 4a2ee307f487d6c82906d9fbd40155e6d1234140

			resolve(result);
		} catch (error) {
			reject(error);
		}
	});
};

export const deleteCategories = catArg => {
	return new Promise(async (resolve, reject) => {
		try {
			const result = await CategorySchema.deleteMany({
				_id: {
					$in: catArg,
				},
			});

			resolve(result);
		} catch (error) {
			reject(error);
		}
	});
};