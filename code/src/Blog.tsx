import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

const posts = [
    {
        slug: "hello-world",
        title: "hello world",
        date: "2026-07-16",
        excerpt: "my first blog post with code, math, and images.",
        path: "/blog/hello-world",
    },
];

function Blog() {
    const [query, setQuery] = useState("");

    const filteredPosts = useMemo(() => {
        const normalizedQuery = query.trim().toLowerCase();

        if (!normalizedQuery) {
            return posts;
        }

        return posts.filter((post) => {
            const haystack = `${post.title} ${post.excerpt} ${post.date}`.toLowerCase();
            return haystack.includes(normalizedQuery);
        });
    }, [query]);

    return (
        <div className="blog-page">
            <h1>blog</h1>
            <label className="blog-search" htmlFor="blog-search">
                <span className="sr-only">search blogs</span>
                <input
                    id="blog-search"
                    type="search"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="search posts"
                />
            </label>
            <div className="blog-list">
                {filteredPosts.length > 0 ? (
                    filteredPosts.map((post) => (
                        <Link key={post.slug} to={post.path} className="blog-list-item">
                            <span className="blog-list-date">{post.date}</span>
                            <div className="blog-list-info">
                                <h3>{post.title}</h3>
                                <p>{post.excerpt}</p>
                            </div>
                        </Link>
                    ))
                ) : (
                    <div className="blog-list-empty">no posts match your search.</div>
                )}
            </div>
        </div>
    );
}

export { Blog };
