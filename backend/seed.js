require('dotenv').config();

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Product = require('./model/Product');
const User = require('./model/User');

const products = [
	{
		name: 'Classic White Sneakers',
		description: 'Comfortable everyday sneakers with a clean, classic design.',
		price: 2499,
		category: 'Footwear',
		stock: 25,
		images: ['https://placehold.co/600x600?text=White+Sneakers'],
		rating: 4.5,
		numReviews: 18
	},
	{
		name: 'Cotton Casual Shirt',
		description: 'Breathable cotton shirt suitable for casual and smart-casual outfits.',
		price: 1299,
		category: 'Clothing',
		stock: 40,
		images: ['https://placehold.co/600x600?text=Cotton+Shirt'],
		rating: 4.2,
		numReviews: 12
	},
	{
		name: 'Wireless Headphones',
		description: 'Wireless headphones with comfortable ear cushions and clear sound.',
		price: 3499,
		category: 'Electronics',
		stock: 15,
		images: ['https://placehold.co/600x600?text=Headphones'],
		rating: 4.7,
		numReviews: 31
	},
	{
		name: 'Everyday Backpack',
		description: 'Lightweight backpack with room for a laptop and daily essentials.',
		price: 1899,
		category: 'Accessories',
		stock: 20,
		images: ['https://placehold.co/600x600?text=Backpack'],
		rating: 4.4,
		numReviews: 9
	}
];

const seedDatabase = async () => {
	try {
		if (!process.env.MONGO_URI) {
			throw new Error('MONGO_URI is missing from .env');
		}

		await mongoose.connect(process.env.MONGO_URI);

		const password = await bcrypt.hash('Password123!', 10);
		await User.findOneAndUpdate(
			{ email: 'demo@example.com' },
			{
				name: 'Demo User',
				email: 'demo@example.com',
				password,
				role: 'user',
				verified: true
			},
			{ upsert: true, new: true, setDefaultsOnInsert: true }
		);

		for (const product of products) {
			await Product.findOneAndUpdate(
				{ name: product.name },
				product,
				{ upsert: true, new: true, setDefaultsOnInsert: true }
			);
		}

		console.log(`Seeded ${products.length} products and 1 demo user.`);
		console.log('Demo login: demo@example.com / Password123!');
	} catch (error) {
		console.error('Database seeding failed:', error.message);
		process.exitCode = 1;
	} finally {
		await mongoose.disconnect();
	}
};

seedDatabase();
