interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface InputValuesExercises {
  dailyExerciseHours: Array<number>;
  targetAmount: number;
}

const parseArgumentsExercises = (args: Array<string>): InputValuesExercises => {
  const argc = args.length;
  let isValid = true;

  for(let i = 2; i < argc; i++) {
    if(isNaN(Number(args[i]))) {
      console.log(args[i]);
      isValid = false;
      break;
    }
  }

  if(!isValid) {
    throw new Error("Provided values were not numbers!");
  }

  const tempDailyExerciseHours = [];
  const tempTargetAmount = Number(args[2]);

  for(let i = 0; i < argc - 3; i++) {
    tempDailyExerciseHours[i] = Number(args[i + 3]);
  }

  return {
    dailyExerciseHours: tempDailyExerciseHours,
    targetAmount: tempTargetAmount
  };
};

const calculateExercises = (dailyExerciseHours: Array<number>, targetAmount: number) : Result => {
  const tempPeriodLength = dailyExerciseHours.length;
  let tempTrainingDays = 0;
  let tempAverage = 0;
  let tempRating = 0;
  let tempRatingDescription = "";
  let tempSuccess = false;

  for (let i = 0; i < tempPeriodLength; i++) {
    const currentHours = dailyExerciseHours[i];
    if(currentHours > 0) {
      tempTrainingDays++;
      tempAverage += currentHours;
    }
  }

  tempAverage /= tempPeriodLength;

  if(tempAverage >= targetAmount) {
    tempSuccess = true;
    tempRating = 3;
    tempRatingDescription = "best rating possible";
  } else if(tempAverage >= targetAmount * 0.5) {
    tempRating = 2;
    tempRatingDescription = "not too bad but could be better";
  } else {
    tempRating = 1;
    tempRatingDescription = "needing some major improvements";
  }

  return {
    periodLength: tempPeriodLength,
    trainingDays: tempTrainingDays,
    success: tempSuccess,
    rating: tempRating,
    ratingDescription: tempRatingDescription,
    target: targetAmount,
    average: tempAverage
  };
};

try {
  const { dailyExerciseHours, targetAmount } = parseArgumentsExercises(process.argv);
  console.log(calculateExercises(dailyExerciseHours, targetAmount));
} catch(error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}