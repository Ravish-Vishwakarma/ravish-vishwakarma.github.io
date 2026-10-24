import { MermaidChart } from "../components/MermaidChart"
import { useState } from 'react';
import type { CSSProperties } from 'react';
function CheckLeapYear() {
    return <>
        <div className="blog-page">
            <header className="blog-header">
                <h1>How to check a year is a leap year</h1>
                <span className="blog-date">2026-10-24</span>
            </header>
            <article className="blog-content">
                <MermaidChart
                    chart={`flowchart TD
Y(YEAR) --> d4(Divisible by 4)
d4 -->|no| not(Not a leap year)
d4 -->|yes| d100(Divisible by 100)
d100 -->|yes| d400(Divisible by 400)
d100 -->|no| yes
d400 -->|no| not
d400 -->|yes| yes
yes(Its a leap year)`}
                />
                <p>You can also check if your year is a leap year or not here:</p>
                <CheckLeapYearWidget />
            </article>
        </div>
    </>
}




function CheckLeapYearWidget() {
    const [year, setYear] = useState<number>(2000);
    const [result, setResult] = useState<string>('');

    const checkLeapYear = () => {
        if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
            setResult(`🎉 ${year} is a leap year!`);
        } else {
            setResult(`❌ ${year} is not a leap year.`);
        }
    };

    const styles: Record<string, CSSProperties> = {
        container: {
            fontFamily: 'var(--font-main)',
            padding: '20px',
            borderRadius: '8px',
            backgroundColor: 'var(--surface)',
            border: 'var(--border-strong)',
            maxWidth: '340px',
            margin: '20px auto',
            textAlign: 'center',
            color: 'var(--text)'
        },
        input: {
            fontFamily: 'var(--font-main)',
            height: "40px",
            fontSize: "20px",
            margin: "5px",
            padding: "5px 10px",
            width: "120px",
            borderRadius: "4px",
            backgroundColor: 'var(--bg)',
            color: 'var(--text)',
            border: "var(--border)",
            textAlign: "center"
        },
        button: {
            fontFamily: 'var(--font-main)',
            height: "42px",
            fontSize: "18px",
            padding: "0 15px",
            backgroundColor: "var(--primary)",
            color: "var(--bg)",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontWeight: "bold",
            marginLeft: "10px"
        },
        result: {
            marginTop: '15px',
            fontSize: '16px',
            fontWeight: '600',
            color: 'var(--text)'
        }
    };

    return (
        <div style={styles.container}>
            <h3 style={{ margin: '0 0 15px 0', fontSize: '18px' }}>Leap Year Checker</h3>
            <input
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
                type="number"
                style={styles.input}
            />
            <button onClick={checkLeapYear} style={styles.button}>
                Check
            </button>
            {result && <div style={styles.result}>{result}</div>}
        </div>
    );
}


export { CheckLeapYear }