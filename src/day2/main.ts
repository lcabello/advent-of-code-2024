import { readDocument } from '../utils/document-reader.ts';

const parseData = (data: string) => {
  const lines = data.split('\n');
  const output = [];

  for (const line of lines) {
    const arrLine = line.split(' ');
    const arrOfNumbers = arrLine.map((item) => +item);
    output.push(arrOfNumbers);
  }

  return output;
}

const isNotSafe = (newValue: number, sign: number) => {
  const absResult = Math.abs(newValue);

  return !((Math.sign(newValue) !== sign) || (absResult < 1) || (absResult > 3));
}

const checkSafety = (data : number[][]) => {
  let saveCount = 0;
  for (const item of data) {
    const sign = Math.sign(item[0] - item[1]);

    const isSafe = item.every((value, index) => {
      if(item[index+1]) {
        const result = value - item[index+1];

        return isNotSafe(result, sign);
      }

      return true;
    });

    isSafe && saveCount++;
  }

  return saveCount;
}


(async function main () {
  const data = await readDocument("input.txt");

  if(!data) {
    console.error('No data found');
    return;
  }

  const parsedData = parseData(data);
  const output = checkSafety(parsedData);

  console.log(`Result: ${output}`);
})();