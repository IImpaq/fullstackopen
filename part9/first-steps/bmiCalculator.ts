const calculateBmi = (height: number, weight: number) : string => {
  const bmi = weight / ((height / 100) ** 2);

  if(bmi <= 18.4) {
    return "Underweight (unhealthy weight)";
  } else if(bmi <= 24.9) {
    return "Normal (healthy weight)";
  } else {
    return "Overweight (unhealthy weight)";
  }
}

console.log(calculateBmi(180, 74));