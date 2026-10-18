import GithubIcon from "../assets/icons/github.svg";
// import InstagramIcon from "../assets/icons/instagram.svg";
// import LinkedinIcon from "../assets/icons/linkedin.svg";
// import XIcon from "../assets/icons/x.svg";

function SocialCard() {
    return (
        <div className="status-card social-card">
            <div className="status-social">
                <a href="https://github.com/Ravish-Vishwakarma" target="_blank">
                    <img src={GithubIcon} alt="Github" width="20" height="20" className="status-icon" />
                </a>
            </div>
        </div>
    );
}

export { SocialCard };
