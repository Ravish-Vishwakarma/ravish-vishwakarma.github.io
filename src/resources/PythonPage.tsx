import { Link } from "react-router-dom";

const sources = [
    {
        name: "Python Official Tutorial",
        description: "A solid beginner-friendly guide from the language maintainers.",
        url: "https://docs.python.org/3/tutorial/",
    },
    {
        name: "Automate the Boring Stuff",
        description: "Great for practical automation, scripting, and everyday Python use.",
        url: "https://automatetheboringstuff.com/",
    },
    {
        name: "Real Python",
        description: "A large library of tutorials, articles, and project-based lessons.",
        url: "https://realpython.com/",
    },
];

function PythonPage() {
    return (
        <div className="resource-detail-page">
            <Link to="/resources" className="resource-back-link">
                ← back to resources
            </Link>
            <h1>Python</h1>
            <p>
                Python is a great fit for scripting, automation, data work, and quick
                prototyping. These sources are a strong starting point if you want to build
                practical skill without getting lost in theory.
            </p>

            <section className="resource-section">
                <h2>common sources to learn from</h2>
                <ul className="resource-list">
                    {sources.map((source) => (
                        <li key={source.name}>
                            <a href={source.url} target="_blank" rel="noopener noreferrer">
                                {source.name}
                            </a>
                            <span> — {source.description}</span>
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
}

export { PythonPage };