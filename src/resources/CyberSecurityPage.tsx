import { Link } from "react-router-dom";

const sources = [
    {
        name: "TryHackMe",
        description: "Hands-on learning paths for networking, web security, and defensive practice.",
        url: "https://tryhackme.com/",
    },
    {
        name: "OverTheWire",
        description: "Classic beginner-friendly challenges that build real security instincts.",
        url: "https://overthewire.org/wargames/",
    },
    {
        name: "OWASP Top 10",
        description: "A practical overview of the most common application security risks.",
        url: "https://owasp.org/www-project-top-ten/",
    },
];

function CyberSecurityPage() {
    return (
        <div className="resource-detail-page">
            <Link to="/resources" className="resource-back-link">
                ← back to resources
            </Link>
            <h1>Cyber Security</h1>
            <p>
                Cyber security is easiest to learn by combining fundamentals with practical exercises.
                These sources help you build both conceptual understanding and hands-on confidence.
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

export { CyberSecurityPage };