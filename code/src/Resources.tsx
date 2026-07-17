import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

const resources = [
    {
        title: "Python",
        description: "A practical collection of Python notes, patterns, and tooling for everyday development.",
        tags: ["language", "automation", "data"],
        path: "/resources/python",
    },
    {
        title: "Flutter",
        description: "Cross-platform UI notes covering widgets, state management, and app architecture.",
        tags: ["mobile", "dart", "ui"],
        path: "/resources/flutter",
    },
    {
        title: "Cyber Security",
        description: "Focused resources on networking, security fundamentals, and defensive habits.",
        tags: ["networking", "defense", "ops"],
        path: "/resources/cyber-security",
    },
];

function ResourcesPage() {
    const [query, setQuery] = useState("");

    const filteredResources = useMemo(() => {
        const normalizedQuery = query.trim().toLowerCase();

        if (!normalizedQuery) {
            return resources;
        }

        return resources.filter((resource) => {
            const haystack = `${resource.title} ${resource.description} ${resource.tags.join(" ")}`.toLowerCase();
            return haystack.includes(normalizedQuery);
        });
    }, [query]);

    return (
        <div className="resources-page">
            <h1>resources</h1>
            <label className="blog-search" htmlFor="resource-search">
                <span className="sr-only">search resources</span>
                <input
                    id="resource-search"
                    type="search"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="search resources"
                />
            </label>
            <div className="resources-grid">
                {filteredResources.length > 0 ? (
                    filteredResources.map((resource) => (
                        <Link key={resource.title} to={resource.path} className="resource-card">
                            <div className="resource-header">
                                <h3>{resource.title}</h3>
                            </div>
                            <p>{resource.description}</p>
                            <div className="resource-tags">
                                {resource.tags.map((tag) => (
                                    <span key={tag} className="resource-tag">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </Link>
                    ))
                ) : (
                    <div className="blog-list-empty">no resources match your search.</div>
                )}
            </div>
        </div>
    );
}

export { ResourcesPage };