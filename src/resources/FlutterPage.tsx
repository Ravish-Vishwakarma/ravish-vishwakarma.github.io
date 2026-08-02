import { Link } from "react-router-dom";

const sources = [
    {
        name: "Flutter Official Docs",
        description: "The main reference for widgets, layout, navigation, and platform integration.",
        url: "https://docs.flutter.dev/",
    },
    {
        name: "Flutter Codelabs",
        description: "Hands-on tutorials that walk through real app features step by step.",
        url: "https://codelabs.developers.google.com/?product=flutter",
    },
    {
        name: "Riverpod Docs",
        description: "A practical resource for modern state management in Flutter apps.",
        url: "https://riverpod.dev/",
    },
];

function FlutterPage() {
    return (
        <div className="resource-detail-page">
            <Link to="/resources" className="resource-back-link">
                ← back to resources
            </Link>
            <h1>Flutter</h1>
            <p>
                Flutter is ideal for building polished mobile and web UIs from a single codebase.
                These resources focus on getting productive with the framework and building good
                habits early.
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

export { FlutterPage };