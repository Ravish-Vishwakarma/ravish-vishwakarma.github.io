import penguin from "../assets/images/penguin.png";
import asperite from "../assets/images/asperite.png";
import ravish from "/ravish.gif";

function BadgeLinks() {

    return (
        <div className="badge-widget">
            <div className="badge-row">
                <a href="https://en.wikipedia.org/wiki/Nihilistic_penguin" target="_blank" rel="noopener noreferrer">
                    <img src={penguin} alt="Linux" width="88" height="31" />
                </a>
                <a href="https://www.aseprite.org/" target="_blank" rel="noopener noreferrer">
                    <img src={asperite} alt="Aseprite" width="88" height="31" />
                </a>
                <a href="https://ravish-vishwakarma.github.io/" target="_blank" rel="noopener noreferrer">
                    <img src={ravish} alt="Linux" width="88" height="31" />
                </a>
            </div>
        </div>
    );
}

export { BadgeLinks };
