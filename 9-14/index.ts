import express from 'express';
import {calculateBmi} from "./bmiCalculator";
import {calculateExercises} from "./exerciseCalculator";
import bodyParser from "body-parser";

const app = express();

const jsonParser = bodyParser.json()

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const { height, weight } = req.query;
    const heightNum = Number(height);
    const weightNum = Number(weight);
    if (isNaN(heightNum) || isNaN(weightNum)) {
        res.json({
            error: "malformatted parameters"
        }).end();
        return;
    }
    res.send({
        height: heightNum,
        weight: weightNum,
        bmi: calculateBmi(heightNum, weightNum)
    });
});

app.post('/exercises', jsonParser, (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const {daily_exercises, target} = req.body;
    if (typeof daily_exercises === "undefined" || typeof target === "undefined") {
        return res.status(400).json({
            error: "parameters missing"
        }).end();

    }
    if (isNaN(parseFloat(target)) || !Array.isArray(daily_exercises) ||
        daily_exercises
            .map(entry => parseFloat(entry))
            .filter(entry => isNaN(entry)).length > 0) {
        return res.status(400).json({
            error: "malformatted parameters"
        }).end();
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const response = calculateExercises(daily_exercises, target);
    return res.json(response);
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});