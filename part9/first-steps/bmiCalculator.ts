interface InputValuesBmi {
  height: number;
  weight: number;
}

const parseArgumentsBmi = (args: Array<string>): InputValuesBmi => {
  if(args.length != 4) throw new Error("Invalid argument count");

  if(!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    }
  } else {
    throw new Error("Provided values were not numbers!");
  }
}

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

try {
  const { height, weight } = parseArgumentsBmi(process.argv);
  console.log(calculateBmi(height, weight));
} catch(error: unknown) {
  let errorMessage = "Something bad happened."
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}