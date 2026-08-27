import loonImg from "./assets/images/loon.png";
import bijliImg from "./assets/images/bijli.png";

const projects = [
    {
        title: "Bijli",
        description: "Extension launcher for your memes, local and fast!",
        image: bijliImg,
        link: "https://github.com/Ravish-Vishwakarma/bijli",
    },
    {
        title: "Loon",
        description: "A fast, local speech-to-text transcription app for Windows.",
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
                        rel="noopener"
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
