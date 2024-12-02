import React, { useEffect, useState } from 'react';

interface Blog {
	id: string;
	title: string;
	featured_image: string;
	summary: string;
}

const BlogList: React.FC = () => {
	const [blogs, setBlogs] = useState<Blog[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchBlogs = async () => {
			setLoading(true);
			try {
				const response = await fetch('https://jsonfakery.com/blogs/random/6');
				if (!response.ok) throw new Error('Failed to fetch blogs.');
				const data: Blog[] = await response.json(); // Ensure type is `Blog[]`
				setBlogs(data);
			} catch (err: unknown) {
				if (err instanceof Error) {
					setError(err.message);
				} else {
					setError('An unknown error occurred.');
				}
			} finally {
				setLoading(false);
			}
		};

		fetchBlogs();
	}, []);

	if (loading) {
		return (
			<div className="flex items-center justify-center min-h-screen">
				<p className="text-xl font-semibold text-gray-500">Loading...</p>
			</div>
		);
	}

	if (error) {
		return (
			<div className="flex items-center justify-center min-h-screen">
				<p className="text-xl font-semibold text-red-500">{error}</p>
			</div>
		);
	}

	return (
		<div className="bg-gray-100 py-10 mt-16">
			<div className="container mx-auto px-4">
				<h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Blog List</h1>
				<div className="space-y-8">
					{blogs.map((blog) => (
						<div
							key={blog.id}
							className="flex items-center bg-white shadow-lg rounded-lg overflow-hidden p-4">
							{/* Image on the Left */}
							<img src={blog.featured_image} alt={blog.title} className="w-1/4 h-48 object-cover" />

							{/* Title and Summary on the Right */}
							<div className="w-3/4 p-6">
								<h2 className="text-2xl font-semibold text-gray-800 mb-4">{blog.title}</h2>
								<p className="text-gray-600 line-clamp-3">{blog.summary}</p>
								<a
									href={`/blog/${blog.id}`}
									className="mt-4 inline-block text-blue-500 hover:text-blue-700">
									Read More →
								</a>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default BlogList;
