interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (dailyExerciseHours: number[], targetAmount: number) : Result => {
  let tempPeriodLength = dailyExerciseHours.length;
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
  }
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));