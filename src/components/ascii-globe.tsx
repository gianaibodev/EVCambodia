import { useState, useEffect } from 'react';

// Actually let's use a more complex ASCII globe
const rotatingGlobe = [
    "       .---.       \n      /     \\      \n     |       |     \n      \\     /      \n       '---'       ",
    "       .---.       \n      / .   \\      \n     | . .   |     \n      \\ .   /      \n       '---'       ",
    "       .---.       \n      / . .  \\     \n     | . . .  |    \n      \\ . .  /     \n       '---'       ",
    "       .---.       \n      /  . . \\     \n     |  . . . |    \n      \\  . . /     \n       '---'       ",
    "       .---.       \n      /   .  \\     \n     |   . .  |    \n      \\   .  /     \n       '---'       "
];

export const AsciiGlobe = () => {
    const [frame, setFrame] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setFrame((f) => (f + 1) % rotatingGlobe.length);
        }, 200);
        return () => clearInterval(interval);
    }, []);

    return (
        <pre className="font-mono text-[10px] leading-tight text-[#ef233c] opacity-50 select-none pointer-events-none">
            {rotatingGlobe[frame]}
        </pre>
    );
};
