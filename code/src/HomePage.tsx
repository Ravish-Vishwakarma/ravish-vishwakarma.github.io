import { Pin } from "lucide-react";
import { GameOfLife } from "./components/GameOfLife";
import { StatusCard } from "./components/StatusCard";
import { BadgeLinks } from "./components/BadgeLinks";
import { TimeCard } from "./components/TimeCard";
import { SocialCard } from "./components/SocialCard";

function Home() {
    return (
        <div className="home-layout">
            <div className="home-main">
                <header className="home-header">
                    <div className="home-header-top">
                        <div className="home-profile">
                            <img
                                src="/profile.png"
                                alt="Ravish"
                                className="home-profile-image"
                            />
                            <span className="home-profile-name">Ravish Vishwakarma</span>
                        </div>
                    </div>
                    <div className="home-tagline">
                        <p>Hi, I am Ravish, I like to build things (by things I mean anything which seems cool to me)</p>
                    </div>
                    <div className="home-tagline">
                        <p>I Just Love Automation And Good Asthetics</p>
                    </div>
                    <div className="home-tagline">
                        <p>Open To Talk To Everyone</p>
                    </div>
                    <div>
                        <p className="" style={{}}>I Mostly Build Things Which Saves My Time And <b>Looks Good</b> Like: <a href="https://github.com/Ravish-Vishwakarma/bijli" target="_blank">BIJLI</a> & <a href="https://github.com/Ravish-Vishwakarma/Loon" target="_blank">LOON</a></p>
                    </div>
                </header>
                <div className="home-card-area">
                    <StatusCard />
                    <TimeCard />
                    <SocialCard />
                </div>
                <section className="home-thoughts">
                    <h2>Random Thoughts</h2>
                    <div className="thoughts-list">
                        <div className="thought-item">
                            <span className="thought-date" style={{ display: "flex", alignItems: "center", gap: "4px" }}><Pin size={11} style={{ padding: 0 }} /> 1 Jan 2026</span>
                            <p><i>"Doing The Thing Is The Only Way To Do The Thing"</i>, thinking about the task, planing about how will you do the task, thinking about how much praise will you get once you finished the task doesn't comes under doing the task.</p>
                        </div>
                        <div className="thought-item">
                            <span className="thought-date">16 July 2026</span>
                            <p>I guess teaching a topic which get used in everydays life should come with a example which peolple can tell others to show off their knowledge, I guess people always remember those things more than the topic itself.</p>
                        </div>
                    </div>
                </section>
            </div>
            <aside className="home-sidebar">
                <GameOfLife />
                <BadgeLinks />
            </aside>
        </div>
    );
}

export { Home };
