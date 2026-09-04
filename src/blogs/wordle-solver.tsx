import { MathBlock } from "../components/MathBlock";
import { useState } from "react";

type WordleRow = string[];

function WordleSolverBlog() {
    const letters = [
        { letter: "S", color: "#6aaa64" },
        { letter: "T", color: "#c9b458" },

        { letter: "A", color: "#787c7e" },
        { letter: "R", color: "#6aaa64" },
    ];

    const [green, setGreen] = useState<string[]>(
        ["A", "", "", "B", ""]
    );

    // Every row represents one yellow guess.


    const [yellowRows, setYellowRows] = useState<WordleRow[]>([
        ["", "C", "", "", "D"],
    ]);

    const [results, setResults] = useState<string[][]>([]);
    const [hasGenerated, setHasGenerated] =
        useState(false);

    function updateGreen(
        index: number,
        value: string
    ): void {
        const next = [...green];

        next[index] = value
            .slice(-1)
            .toUpperCase();

        setGreen(next);
    }

    function updateYellow(
        rowIndex: number,
        position: number,
        value: string
    ): void {
        const next = yellowRows.map(
            (row: string[]) => [...row]
        );

        next[rowIndex][position] = value
            .slice(-1)
            .toUpperCase();

        setYellowRows(next);
    }

    function addYellowRow(): void {
        setYellowRows([
            ...yellowRows,
            ["", "", "", "", ""],
        ]);
    }

    function removeYellowRow(
        rowIndex: number
    ): void {
        if (yellowRows.length === 1) return;

        setYellowRows(
            yellowRows.filter(
                (_, index: number) =>
                    index !== rowIndex
            )
        );
    }

    function generateCombinations(): void {
        /*
         * Collect ALL yellow letters from ALL rows.
         *
         * Example:
         *
         * Row 1: _ _ C _ D
         * Row 2: _ C _ _ D
         *
         * Required yellow letters:
         * C + D
         */
        const yellowLetters: string[] = [];

        yellowRows.forEach((row: string[]) => {
            row.forEach((letter: string) => {
                if (letter !== "") {
                    yellowLetters.push(letter);
                }
            });
        });

        /*
         * Store positions where yellow letters
         * are NOT allowed.
         *
         * Example:
         *
         * _ _ C _ D
         *
         * C cannot be position 2
         * D cannot be position 4
         */
        const forbiddenPositions: Set<string> =
            new Set();

        yellowRows.forEach((row: string[]) => {
            row.forEach(
                (letter: string, position: number) => {
                    if (letter !== "") {
                        forbiddenPositions.add(
                            `${letter}-${position}`
                        );
                    }
                }
            );
        });

        const combinations: string[][] = [];

        /*
         * Start with the green letters.
         */
        const base: string[] = green.map(
            (letter: string) =>
                letter || ""
        );

        /*
         * Generate every permutation of ALL
         * yellow letters together.
         */
        function generate(
            position: number,
            current: string[],
            remaining: string[]
        ): void {
            if (position === 5) {
                /*
                 * Every yellow letter MUST have
                 * been used.
                 */
                if (remaining.length === 0) {
                    combinations.push([...current]);
                }

                return;
            }

            /*
             * Green position is fixed.
             */
            if (green[position] !== "") {
                generate(
                    position + 1,
                    current,
                    remaining
                );

                return;
            }

            /*
             * Try every remaining yellow letter
             * in this position.
             */
            for (
                let i = 0;
                i < remaining.length;
                i++
            ) {
                const letter = remaining[i];

                /*
                 * This yellow letter was already
                 * found in this position, so it
                 * cannot be here.
                 */
                if (
                    forbiddenPositions.has(
                        `${letter}-${position}`
                    )
                ) {
                    continue;
                }

                const next = [...current];
                next[position] = letter;
                const nextRemaining =
                    remaining.filter(
                        (_, index: number) =>
                            index !== i
                    );

                generate(
                    position + 1,
                    next,
                    nextRemaining
                );
            }

            /*
             * Also allow the position to contain
             * an unknown letter.
             *
             * This means the result can still have
             * empty boxes.
             */
            generate(
                position + 1,
                [...current.slice(0, position), "", ...current.slice(position + 1)],
                remaining
            );
        }

        generate(
            0,
            [...base],
            [...yellowLetters]
        );

        /*
         * Remove duplicate results.
         */
        const uniqueResults: string[][] =
            Array.from(
                new Map(
                    combinations.map(
                        (word: string[]) => [
                            word.join("|"),
                            word,
                        ]
                    )
                ).values()
            );

        setResults(uniqueResults);
        setHasGenerated(true);
    }

    const tileStyle: React.CSSProperties = {
        width: "58px",
        height: "58px",
        boxSizing: "border-box",
        textAlign: "center",
        fontSize: "30px",
        fontWeight: "bold",
        textTransform: "uppercase",
    };

    const rowStyle: React.CSSProperties = {
        display: "flex",
        gap: "6px",
        margin: "10px 0",
    };

    return (
        <div className="blog-page">
            <style>{`
    .wordle-possibilities {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin: 12px 0;
    }

    .wordle-possibility {
        display: flex;
        gap: 2px;
    }

    .wordle-possibility .tile {
        width: 28px;
        height: 28px;
        border: 1px solid #3a3a3a;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 13px;
        font-weight: 700;
    }
`}</style>
            <header className="blog-header">
                <h1>How to solve wordle</h1>
                <span className="blog-date">
                    2026-09-04
                </span>
            </header>

            <article className="blog-content">

                {/* Your existing article content */}
                <p>
                    In this I will show you how to
                    solve a wordle game
                </p>

                <h2>
                    Go To The{" "}
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://www.nytimes.com/games/wordle/index.html"
                    >
                        Wordle Game
                    </a>
                </h2>

                <p>
                    You will see boxes like this:
                </p>

                <div style={rowStyle}>
                    {[...Array(5)].map(
                        (_, i: number) => (
                            <div
                                key={i}
                                style={{
                                    ...tileStyle,
                                    border:
                                        "2px solid #d3d6da",
                                }}
                            />
                        )
                    )}
                </div>

                <p>
                    Enter some letters in them,
                    like:
                </p>

                <div style={rowStyle}>
                    {letters.map(
                        (
                            item: {
                                letter: string;
                                color: string;
                            },
                            i: number
                        ) => (
                            <div
                                key={i}
                                style={{
                                    ...tileStyle,
                                    display: "flex",
                                    alignItems:
                                        "center",
                                    justifyContent:
                                        "center",
                                    backgroundColor:
                                        item.color,
                                    color: "white",
                                    border:
                                        "2px solid transparent",
                                }}
                            >
                                {item.letter}
                            </div>
                        )
                    )}
                </div>

                <p>
                    Here,
                    <br />
                    <li>
                        The green color means the
                        letter is in its correct
                        position.
                    </li>
                    <li>
                        The yellow color means the
                        letter exists in the word
                        but it's not in the correct
                        position.
                    </li>
                    <li>
                        The grey color means the
                        letter doesn't exist in the
                        word.
                    </li>
                </p>

                <p>
                    Now try again by guessing a
                    word in which the green color
                    letters stay in the same
                    position, the yellow color
                    letters appear in different
                    positions, and in place of grey
                    letters use different letters.
                </p>
                <br />
                <hr />

                <h1>The Strategy</h1>

                <p style={{ marginBottom: 0 }}>
                    Choose a 5 letter word which
                    contains no duplicate letters
                    and contains more than 1 vowel
                    (a, e, i, o, u) and some common
                    consonants. Like:
                </p>

                <ul>
                    <li>CRATE</li>
                    <li>TRACE</li>
                    <li>STARE</li>
                    <li>ARISE</li>
                    <li>SLATE</li>
                </ul>

                <br />
                <hr />
                <h1>Wordle Combinations</h1>

                <p>
                    <b>Enter</b> the green letters in
                    their correct positions.
                </p>

                {/* GREEN */}
                <h3>Green letters</h3>

                <div style={rowStyle}>
                    {green.map(
                        (
                            letter: string,
                            index: number
                        ) => (
                            <input
                                key={index}
                                maxLength={1}
                                value={letter}
                                onChange={(e) =>
                                    updateGreen(
                                        index,
                                        e.target.value
                                    )
                                }
                                style={{
                                    ...tileStyle,
                                    backgroundColor:
                                        letter
                                            ? "#6aaa64"
                                            : "white",
                                    color: letter
                                        ? "white"
                                        : "black",
                                    border:
                                        letter
                                            ? "2px solid #6aaa64"
                                            : "2px solid #d3d6da",
                                }}
                            />
                        )
                    )}
                </div>

                {/* YELLOW */}
                <h3>
                    Yellow letters
                </h3>

                <p>
                    Add all yellow letters from
                    your guesses. Add another row if
                    you have another yellow guess.
                </p>

                {yellowRows.map(
                    (
                        row: string[],
                        rowIndex: number
                    ) => (
                        <div
                            key={rowIndex}
                            style={{
                                display: "flex",
                                alignItems:
                                    "center",
                                gap: "10px",
                                marginBottom: "8px",
                            }}
                        >
                            <div style={rowStyle}>
                                {row.map(
                                    (
                                        letter: string,
                                        position: number
                                    ) => (
                                        <input
                                            key={
                                                position
                                            }
                                            maxLength={1}
                                            value={letter}
                                            onChange={(
                                                e
                                            ) =>
                                                updateYellow(
                                                    rowIndex,
                                                    position,
                                                    e
                                                        .target
                                                        .value
                                                )
                                            }
                                            style={{
                                                ...tileStyle,
                                                backgroundColor:
                                                    letter
                                                        ? "#c9b458"
                                                        : "white",
                                                color: letter
                                                    ? "white"
                                                    : "black",
                                                border:
                                                    letter
                                                        ? "2px solid #c9b458"
                                                        : "2px solid #d3d6da",
                                            }}
                                        />
                                    )
                                )}
                            </div>

                            {yellowRows.length >
                                1 && (
                                    <button
                                        onClick={() =>
                                            removeYellowRow(
                                                rowIndex
                                            )
                                        }
                                        style={{
                                            border: "none",
                                            background:
                                                "transparent",
                                            color: "#777",
                                            cursor:
                                                "pointer",
                                            fontSize:
                                                "20px",
                                        }}
                                    >
                                        ×
                                    </button>
                                )}
                        </div>
                    )
                )}

                <button
                    onClick={addYellowRow}
                    style={{
                        marginTop: "5px",
                        marginBottom: "15px",
                        padding:
                            "8px 14px",
                        border:
                            "1px solid #d3d6da",
                        borderRadius: "5px",
                        background:
                            "white",
                        cursor: "pointer",
                        fontWeight: "bold",
                    }}
                >
                    + Add yellow row
                </button>

                <br />

                <button
                    onClick={
                        generateCombinations
                    }
                    style={{
                        padding:
                            "12px 22px",
                        background:
                            "#333",
                        color: "white",
                        border: "none",
                        borderRadius:
                            "5px",
                        fontSize:
                            "16px",
                        fontWeight:
                            "bold",
                        cursor:
                            "pointer",
                    }}
                >
                    Generate
                </button>

                {/* RESULTS */}
                {hasGenerated && (
                    <div
                        style={{
                            marginTop:
                                "30px",
                        }}
                    >
                        <h2>
                            Possible
                            combinations (
                            {
                                results.length
                            }
                            )
                        </h2>

                        {results.length === 0 ? (
                            <p>
                                No combinations match these constraints.
                            </p>
                        ) : (
                            <div
                                style={{
                                    display:
                                        "flex",
                                    flexDirection:
                                        "column",
                                    gap: "6px",
                                    alignItems:
                                        "flex-start",
                                }}
                            >
                                {results.map(
                                    (
                                        word: string[],
                                        wordIndex: number
                                    ) => (
                                        <div
                                            key={
                                                wordIndex
                                            }
                                            style={
                                                rowStyle
                                            }
                                        >
                                            {word.map(
                                                (
                                                    letter: string,
                                                    index: number
                                                ) => {
                                                    const isGreen =
                                                        green[
                                                        index
                                                        ] !==
                                                        "" &&
                                                        green[
                                                        index
                                                        ] ===
                                                        letter;

                                                    const isYellow =
                                                        !isGreen &&
                                                        letter !==
                                                        "";

                                                    return (
                                                        <div
                                                            key={
                                                                index
                                                            }
                                                            style={{
                                                                ...tileStyle,
                                                                display:
                                                                    "flex",
                                                                alignItems:
                                                                    "center",
                                                                justifyContent:
                                                                    "center",
                                                                backgroundColor:
                                                                    isGreen
                                                                        ? "#6aaa64"
                                                                        : isYellow
                                                                            ? "#c9b458"
                                                                            : "white",
                                                                color:
                                                                    isGreen ||
                                                                        isYellow
                                                                        ? "white"
                                                                        : "black",
                                                                border:
                                                                    isGreen
                                                                        ? "2px solid #6aaa64"
                                                                        : isYellow
                                                                            ? "2px solid #c9b458"
                                                                            : "2px solid #d3d6da",
                                                            }}
                                                        >
                                                            {
                                                                letter
                                                            }
                                                        </div>
                                                    );
                                                }
                                            )}
                                        </div>
                                    )
                                )}
                            </div>
                        )}
                    </div>
                )}
                <br />
                <hr />
                <h1>The Math Behind The Possibilities</h1>

                <p>
                    Suppose we have green letters as <b>[A,_,_,B,_]</b> and yellow letters
                    as <b>[_,C,_,_,D]</b>
                </p>

                <p>
                    Looking at the green letters we get to know that there are 3 positions
                    where we can put other letters. We know that we have 2 letters
                    <b>C</b> and <b>D</b> to put on those places. Which makes the
                    possibilities using the{" "}
                    <a
                        href="https://en.wikipedia.org/wiki/Permutation"
                        rel="noopener noreferrer"
                        target="_blank"
                    >
                        Permutation
                    </a>{" "}
                    formula:
                </p>

                <MathBlock math="^nP_r = \frac{n!}{(n-r)!}" />

                <MathBlock math="^3P_2 = \frac{3!}{(3-2)!} = 6" />

                <p>
                    So there are <b>6</b> possibilities, but in Wordle the yellow color
                    indicates that the letter doesn't belong to that place.
                </p>

                <p>
                    For example, <b>C</b> was yellow in the second position. This means
                    that we know <b>C</b> exists somewhere in the word, but it cannot be
                    placed in position 2.
                </p>

                <p>
                    Likewise, <b>D</b> was yellow in the fifth position, so <b>D</b> must
                    be somewhere else.
                </p>

                <p>
                    Before applying these restrictions, the 6 possible arrangements are:
                </p>

                <div className="wordle-possibilities">
                    {[
                        "ACDB_",
                        "AC_BD",
                        "ADCB_",
                        "AD_BC",
                        "A_CBD",
                        "A_DBC",
                    ].map((word, index) => (
                        <div className="wordle-possibility" key={index}>
                            {word.split("").map((letter, position) => (
                                <div className="tile" key={position}>
                                    {letter === "_" ? "" : letter}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
                <p>
                    But now we remove any arrangement where <b>C</b> lands in position 2
                    or <b>D</b> lands in position 5, because those positions are not
                    allowed. That rules out <b>ACDB_</b> and <b>AC_BD</b> (both have C
                    in position 2), and also <b>A_CBD</b> (which has D in position 5) —
                    three arrangements removed in total.
                </p>

                <p>
                    After applying these restrictions, exactly three combinations remain:
                </p>

                <div className="wordle-possibilities">
                    {[
                        "ADCB_",
                        "AD_BC",
                        "A_DBC",
                    ].map((word, index) => (
                        <div className="wordle-possibility" key={index}>
                            {word.split("").map((letter, position) => (
                                <div className="tile" key={position}>
                                    {letter === "_" ? "" : letter}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>

                <p>
                    These are <b>ADCB_</b>, <b>AD_BC</b>, and <b>A_DBC</b>. Each one
                    satisfies both the green and yellow constraints.
                </p>
            </article>
        </div>
    );
}

export { WordleSolverBlog };