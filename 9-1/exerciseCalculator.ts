
function StringToNumber(input : string) : number {
    const num = Number(input);
    if (isNaN(num)) throw new Error("arguments must be numbers");
    return num;
}

function parseArguments(args : string[]) : number[]  {
    return args.map(arg => StringToNumber(arg));
}

interface Result {
    periodLength: number
    trainingDays: number
    success: boolean
    rating: number
    ratingDescription: string
    target: number
    average: number
}


function calculateExercises(hours : number[], target : number) : Result {
    const avg = hours.reduce((a,b)=>a + b,0)/hours.length;
    const rating = (() => {
        if (avg < target*0.75) return 1;
        else if (avg < target*0.85) return 2;
        else return 3;
    })();
    const ratingDescriptions = {1: "bad", 2: "okay", 3: "good"};
    return {
        average: avg,
        periodLength: hours.length,
        rating: rating,
        ratingDescription: ratingDescriptions[rating],
        success: avg > target,
        target: target,
        trainingDays: hours.filter(h => h !== 0).length
    };
}


/*if (process.argv.length <= 2) {
    console.log("incorrect amount of arguments");
    process.exit();
}

try {
    const [,,...args] = process.argv;
    const [target, ...hours] = parseArguments(args);
    console.log(calculateExercises(hours , target));
} catch (error) {
    console.log(error);
}*/

export {calculateExercises, parseArguments};