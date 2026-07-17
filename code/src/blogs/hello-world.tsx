import { CodeBlock } from "../components/CodeBlock";
import { MathBlock } from "../components/MathBlock";
import { BlogImage } from "../components/BlogImage";
import { MermaidChart } from "../components/MermaidChart";
import testImg from "../assets/images/1024.png";

function HelloWorld() {
    return (
        <div className="blog-page">
            <header className="blog-header">
                <h1>hello world</h1>
                <span className="blog-date">2026-07-16</span>
            </header>
            <article className="blog-content">
                <p>
                    this is a sample blog post to test out the components. here we
                    have code blocks, math, and images all working together.
                </p>

                <h2>code</h2>
                <p>here's a simple rust function:</p>
                <CodeBlock
                    language="rust"
                    code={`fn fibonacci(n: u32) -> u64 {
    match n {
        0 => 0,
        1 => 1,
        _ => fibonacci(n - 1) + fibonacci(n - 2),
    }
}

fn main() {
    for i in 0..10 {
        println!("fib({}) = {}", i, fibonacci(i));
    }
}`}
                />

                <h2>math</h2>
                <p>
                    the fibonacci sequence has a closed form known as binet's
                    formula: <MathBlock math="F_n = \frac{\phi^n - \psi^n}{\sqrt{5}}" display={false} />
                </p>
                <p>
                    for example, the golden ratio is <MathBlock math="\phi = \frac{1 + \sqrt{5}}{2}" display={false} />.
                </p>
                <p>where:</p>
                <MathBlock math="\phi = \frac{1 + \sqrt{5}}{2}, \quad \psi = \frac{1 - \sqrt{5}}{2}" />

                <h2>mermaid</h2>
                <p>and here's a simple flowchart:</p>
                <MermaidChart
                    chart={`flowchart TD
    A[Start] --> B{Is it working?}
    B -->|Yes| C[Ship it]
    B -->|No| D[Debug]
    D --> A`}
                />

                <h2>image</h2>
                <p>and here's an image:</p>
                <BlogImage src={testImg} alt="a test image" />
            </article>
        </div>
    );
}

export { HelloWorld };
