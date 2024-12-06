import { readDocument } from '../utils/document-reader.ts';

const getMul = (data: string) => {
  let result = 0;
  const matches = data.match(/mul\(\d{1,3},\d{1,3}\)/gmi);
  if (matches) {
    for (const match of matches) {
      const numbers = match.match(/\d{1,3}/gmi);

      if (numbers && numbers.length === 2) {
        result += Number.parseInt(numbers[0], 10) * Number.parseInt(numbers[1], 10);
      }
    }
  }

  return result;
};


const getMul2 = (data: string) => {
  let isDoPhase = true;
  let result = 0;

  const matches = data.match(/(don\'t\(\))|(do\(\))|mul\(\d{1,3},\d{1,3}\)*/gmi);
  if (matches) {
    for (const match of matches) {
      if (match === 'do()') {
        isDoPhase = true;
      }

      if (match === 'don\'t()') {
        isDoPhase = false;
      }

      if (match.match(/mul\(\d+,\d+\)/) && isDoPhase ) {
        const numbers = match.match(/\d{1,3}/gmi) || ['1', '1'];
        result += Number.parseInt(numbers[0], 10) * Number.parseInt(numbers[1], 10);
      }
    }
  }

  return result;
};

(async function main() {
  const data = await readDocument("input-part2.txt");
  if(!data) {
    console.error('No data found');
    return;
  }

  // Part1
  //const output = getMul(data);

  // Part2
  const output = getMul2(data);

  console.log(`Result: ${output}`);
})()