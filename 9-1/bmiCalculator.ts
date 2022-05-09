function calculateBmi(height: number, weight: number) : string {
    const heightInMeters = height/100;
    const bmi = weight/(heightInMeters*heightInMeters);
    if (bmi < 18.5) return "Underweight (Unhealthy)";
    else if (bmi < 23) return "Normal range (Healthy)";
    else if (bmi < 25) return "Overweight I (At risk)";
    else if (bmi < 30) return "Overweight II (Moderately obese)";
    else return "Overweight III (Severely obese)";
}

/*if (process.argv.length !== 4) {
    console.log("incorrect amount of arguments")
    process.exit()
}

const height = Number(process.argv[2])
const weight = Number(process.argv[3])

if (isNaN(weight) || isNaN(height)) {
    console.log("arguments must be numbers")
    process.exit()
}
*/
export {calculateBmi};

// console.log(calculateBmi(height, weight));
