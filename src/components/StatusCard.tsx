import { Zap, Code2 } from "lucide-react";

function StatusCard() {
    return (
        <div className="status-card">
            <div className="status-card-header">
                <span className="status-card-title">right now</span>
            </div>
            <div className="status-card-body">
                <div className="status-row">
                    <Code2 size={12} />
                    <span>working on <b>profile</b></span>
                </div>
                <div className="status-row">
                    <Zap size={12} />
                    <span>exploring <b>rust</b></span>
                </div>
            </div>
        </div>
    );
}

export { StatusCard };
