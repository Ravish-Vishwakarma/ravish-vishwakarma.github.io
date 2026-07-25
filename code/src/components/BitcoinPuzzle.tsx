import { useState, useCallback } from "react";

const SOLVED_PUZZLES: Record<number, string> = {
    71: "f6f5431d25bbf7b12e8add9af5e3475c44a0a5b8",
    72: "bf7413e8df4e7a34ce9dc13e2f2648783ec54adb",
    73: "105b7f253f0ebd7843adaebbd805c944bfb863e4",
    74: "9f1adb20baeacc38b3f49f3df6906a0e48f2df3d",
    76: "86f9fea5cdecf033161dd2f8f8560768ae0a6d14",
    77: "783c138ac81f6a52398564bb17455576e8525b29",
    78: "35003c3ef8759c92092f8488fca59a042859018c",
    79: "67671d5490c272e3ab7ddd34030d587738df33da",
    81: "351e605fac813965951ba433b7c2956bf8ad95ce",
    82: "20d28d4e87543947c7e4913bcdceaa16e2f8f061",
    83: "24cef184714bbd030833904f5265c9c3e12a95a2",
    84: "7c99ce73e19f9fbfcce4825ae88261e2b0b0b040",
    86: "c60111ed3d63b49665747b0e31eb382da5193535",
    87: "fbc708d671c03e26661b9c08f77598a529858b5e",
    88: "38a968fdfb457654c51bcfc4f9174d6ee487bb41",
    89: "5c3862203d1e44ab3af441503e22db97b1c5097e",
    91: "9978f61b92d16c5f1a463a0995df70da1f7a7d2a",
    92: "6534b31208fe6e100d29f9c9c75aac8bf06fbb38",
    93: "463013cd41279f2fd0c31d0a16db3972bfffac8d",
    94: "c6927a00970d0165327d0a6db7950f05720c295c",
    96: "2da63cbd251d23c7b633cb287c09e6cf888b3fe4",
    97: "578d94dc6f40fff35f91f6fba9b71c46b361dff2",
    98: "7eefddd979a1d6bb6f29757a1f463579770ba566",
    99: "c01bf430a97cbcdaedddba87ef4ea21c456cebdb",
    101: "7c1a77205c03b9909663b2034faa0b544e6bc96b",
    102: "f72b812932f6d7102233971d65cec0a22b89e136",
    103: "695fd6dcf33f47166b25de968b2932b351b0afc4",
    104: "93022af9a38f3ebb0c3f15dd1c83f8fadaf64e74",
    106: "505aaa63a5e209dfb90cee683a8e227a8c278e47",
    107: "2e644e46b042ffa86da35c54d7275f1abe6d4911",
    108: "b166c44f12c7fc565f37ff6288ee64e0f0ec9a0b",
    109: "aeb0a0197442d4ade8ef41442d557b0e22b85ac0",
    111: "4cfc43fe12a330c8164251e38c0c0c3c84cf86f6",
    112: "4e81efec43c5195aeca0e3877664330418b8e48e",
    113: "ed673389e4b12925316f9166d56d701829e53cf8",
    114: "42773005f9594cd16b10985d428418acb7f352ec",
    116: "e3f381c34a20da049779b44cae0417c7fb2898d0",
    117: "c97f9591e28687be1c4d972e25be7c372a3221b4",
    118: "f4a4e1c11a5bbbd2fc139d221825407c66e0b8b4",
    119: "ae6804b35c82f47f8b0a42d8c5e514fe5ef0a883",
    121: "a6e4818537e42f7b3f021daa810367dad4dda16f",
    122: "e263b62ea294b9650615a13b926e75944c823990",
    123: "7fa4515066ba6905f894b2078f9af7b1379169cf",
    124: "75f74467ce7214f1767406d5ed12012aa523c48e",
    126: "683ea8a1ef06eada90556017d44323b5c04e00f1",
    127: "a58708aa98ad35c889bb36d8049bf9e9cacfd02a",
    128: "e170ef514689d7230da362a0c121a07723550512",
    129: "ba4c2748360a6b66263e11d1dc8658463ca5ff18",
    131: "41b4b36a6c036568972380177eca2916cacd71de",
    132: "cecd3ca4319651bd3afd1e23ab66e111ed38d16d",
    133: "014e15e4ea6da460cc7835e262676baa37988e4f",
    134: "17a5ebfaf62e73f149e33ba674836801f13a80b9",
    135: "3b6f58a75a54bfd85d1bc6c51180fdc732992326",
    136: "05257be4b57ee43fc09762d5d3a9ad4a6e1a0364",
    137: "3482f8986e13c018692053a784481c63a3554c9c",
    138: "692a8e583866fc9056f5c61a45969fb9d868a08c",
    139: "a45dae9cd5d3fde21e5aa9a95367d107267b3b8a",
    140: "ffbb35a7bb9bbe16c1aa2534f7ff11d59c8e3d1a",
    141: "7af50f73fd580f1713af3a6f9c5de49643ec6fc6",
    142: "2fcea55e6d027a2ba7c7ebe95eedf47766730fe2",
    143: "19ed3e03d19ddcedd5fa86543be820b3a7951650",
    144: "ed87120066e244ff5331d5f8625873d7a3acc39c",
    145: "5abf369388deb8072741b4eb43ef10fa9388a729",
    146: "dca7ebfb78ce21884300f133d89244bc4b1b756f",
    147: "5318b9d7fcc93873f768725eb68ba2c924bb07ee",
    148: "a3e3612e586fd206efb8eee6ccd58318e182829a",
    149: "7e827e3b90da24c2a15f7b67e3bbece39955a5d0",
    150: "e08c4d3bc9cf2b3e2cb88de2bfaa4fe8c7aa3f24",
    151: "1a4fb632f0de0c53a0a31d57f840a19e56c645ee",
    152: "da56cd815fa2f0d6a4ce6d25ed7b1a01d9f9bc6b",
    153: "4ccf94a1b0efd63cddeee0ef5eee5ebe720cfcbf",
    154: "edd2e206825fa8949d1304cd82c08d64b222f2eb",
    155: "6b8b7830f73c5bf9e8beb9f161ad82b3bde992e4",
    156: "9ea3f29aaedf7da10b1488934c50a39e271b0b64",
    157: "242d790e5a168043c76f0539fd894b73ee67b3b3",
    158: "628dacebb0faa7f81670e174ca4c8a95a7e37029",
    159: "2ac1295b4e54b3f15bb0a99f84018d2082495645",
    160: "e84818e1bf7f699aa6e28ef9edfb582099099292",
};

async function sha256(message: string): Promise<string> {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

function BitcoinPuzzle() {
    const [passkey, setPasskey] = useState("");
    const [status, setStatus] = useState<"idle" | "checking" | "done">("idle");
    const [progress, setProgress] = useState(0);
    const [foundPuzzle, setFoundPuzzle] = useState<number | null>(null);

    const generateAndCheck = useCallback(async () => {
        const randomBytes = new Uint8Array(32);
        crypto.getRandomValues(randomBytes);
        const hex = Array.from(randomBytes)
            .map((b) => b.toString(16).padStart(2, "0"))
            .join("");

        setPasskey(hex);
        setStatus("checking");
        setProgress(0);
        setFoundPuzzle(null);

        const ids = Object.keys(SOLVED_PUZZLES).map(Number);

        for (let i = 0; i < ids.length; i++) {
            const id = ids[i];
            const expected = SOLVED_PUZZLES[id];
            const generated = await sha256(hex + ":" + id);

            if (generated === expected) {
                setFoundPuzzle(id);
            }

            setProgress(Math.floor(((i + 1) / ids.length) * 100));
        }

        setStatus("done");
    }, []);

    const passkeyClass = `btc-passkey${status === "done" ? (foundPuzzle !== null ? " btc-passkey-found" : " btc-passkey-miss") : ""}`;

    return (
        <div className="btc-widget">
            <div className="btc-header">
                <span className="btc-title">btc puzzle</span>
                <a
                    className="btc-link"
                    href="https://privatekeys.pw/puzzles/bitcoin-puzzle-tx"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    1000 BTC
                </a>
            </div>

            {passkey && (
                <div className="btc-passkey-row">
                    <code className={passkeyClass}>
                        {passkey.slice(0, 32) + "\n" + passkey.slice(32)}
                    </code>
                </div>
            )}

            <div className="btc-controls">
                <button
                    className="btc-btn"
                    onClick={generateAndCheck}
                    disabled={status === "checking"}
                >
                    {status === "checking" ? `scanning ${progress}%` : "generate & scan"}
                </button>
            </div>

            {status === "checking" && (
                <div className="btc-progress">
                    <div className="btc-progress-bar" style={{ width: `${progress}%` }} />
                </div>
            )}

            {status === "done" && foundPuzzle !== null && (
                <div className="btc-result btc-found">
                    found puzzle #{foundPuzzle}
                </div>
            )}

            {status === "done" && foundPuzzle === null && (
                <div className="btc-result btc-miss">you didn't get lucky</div>
            )}
        </div>
    );
}

export { BitcoinPuzzle };
