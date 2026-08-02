import { useState } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-rust";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-css";
import "prismjs/components/prism-python";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-json";
import "prismjs/components/prism-markdown";

interface CodeBlockProps {
    code: string;
    language?: string;
}

function CodeBlock({ code, language }: CodeBlockProps) {
    const [copied, setCopied] = useState(false);
    const grammar = language ? Prism.languages[language] : undefined;
    const highlighted = grammar
        ? Prism.highlight(code, grammar, language as string)
        : Prism.highlight(code, Prism.languages.markup, "markup");

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(code);
            setCopied(true);
            window.setTimeout(() => setCopied(false), 1200);
        } catch {
            setCopied(false);
        }
    };

    return (
        <div className="code-block">
            <div className="code-block-toolbar">
                {language && <span className="code-block-lang">{language}</span>}
                <button type="button" className="code-block-copy" onClick={handleCopy}>
                    {copied ? "Copied" : "Copy"}
                </button>
            </div>
            <pre>
                <code
                    className={language ? `language-${language}` : ""}
                    dangerouslySetInnerHTML={{ __html: highlighted }}
                />
            </pre>
        </div>
    );
}

export { CodeBlock };
