import { readDocument } from '../utils/document-reader.ts';

const getMul = (data: string) => {
  let result = 0;
  data.match(/mul\(\d{1,3},\d{1,3}\)/gmi)?.map((match) => {
    const numbers = match.match(/\d{1,3}/gmi);

    if(numbers && numbers.length === 2) {
      result += Number.parseInt(numbers[0], 10) *  Number.parseInt(numbers[1], 10);
    }
  });

  return result;
};


(async function main() {
  const data = await readDocument("input.txt");
  if(!data) {
    console.error('No data found');
    return;
  }

  const output = getMul(data);

  console.log(`Result: ${output}`);
})()