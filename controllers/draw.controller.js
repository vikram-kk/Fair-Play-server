import User from "../models/User.js";


const generateDrawNumbers = () => {
    const numbers = new Set();

    while (numbers.size < 5) {
        numbers.add(Math.floor(Math.random() * 45) + 1);
    }

    return Array.from(numbers);
};

export const runDraw = async (req, res) => {
    try {
        const drawNumbers = generateDrawNumbers();

        const users = await User.find();

        const winners = [];

        users.forEach(user => {
            const userScores = user.scores.map(s => s.value);

            const matches = userScores.filter(score =>
                drawNumbers.includes(score)
            ).length;

            if (matches >= 3) {
                let matchType = "";

                if (matches === 5) matchType = "5-match";
                else if (matches === 4) matchType = "4-match";
                else if (matches === 3) matchType = "3-match";
                winners.push({
                    userId: user._id,
                    matches,
                    matchType
                });
            }
        });

        res.json({
            drawNumbers,
            winners
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};