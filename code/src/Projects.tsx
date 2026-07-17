import loonImg from "./assets/images/loon.png";
import bijliImg from "./assets/images/bijli.png";

const projects = [
    {
        title: "Bijli",
        description: "A minimal electricity tracker that just works.",
        image: bijliImg,
        link: "https://github.com/Ravish-Vishwakarma/bijli",
    },
    {
        title: "Loon",
        description: "Lightweight notification daemon for the terminal.",
        image: loonImg,
        link: "https://github.com/Ravish-Vishwakarma/Loon",
    }
];

function ProjectsPage() {
    return (
        <div className="projects-page">
            <h1>projects</h1>
            <div className="projects-grid">
                {projects.map((project) => (
                    <a
                        key={project.title}
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-card"
                    >
                        <div className="project-image">
                            <img src={project.image} alt={project.title} />
                        </div>
                        <div className="project-info">
                            <h3>{project.title}</h3>
                            <p>{project.description}</p>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
}

export { ProjectsPage };
