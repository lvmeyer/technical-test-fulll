const arg = process.argv[2]

if (!arg) {
    throw new Error("Usage: npm start <number>");
}

if (!Number(arg)) {
    throw new Error('Please provide a number')
}

const fizzBuss = (number: number) => {
    console.info(`Starting FizzBuzz with number: ${number}\n`)

    if (number % 3 === 0 && number % 5 === 0) {
        console.log('FizzBuzz')
    } else if (number % 3 === 0) {
        console.log('Fizz')
    } else if (number % 5 === 0) {
        console.log('Buzz')
    } else {
        console.log(number)
    }
}


fizzBuss(Number(arg))
