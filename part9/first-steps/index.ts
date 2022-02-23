import express from "express";
import {calculateBmi} from "./bmiCalculator";

const app = express();

app.get("/", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi/", (req, res) => {
  const query = req.query;
  if(query.height === undefined || query.weight === undefined) {
    res.status(400).send("Undefined height or weight parameters!");
    return;
  }

  if(isNaN(Number(query.height)) || isNaN(Number(query.weight))) {
    res.status(400).send("Height or weight not a valid number!");
    return;
  }

  const weight = Number(query.weight);
  const height = Number(query.height);
  const bmi = calculateBmi(height, weight);

  res.send({
    weight,
    height,
    bmi
  });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});