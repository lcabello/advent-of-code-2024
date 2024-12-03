const leftColumn: number[] = [];
const rightColumn: number[] = [];


const readDocument = async (documentName: string) => {
  try {
    const data = await Deno.readTextFile(documentName);
    return data;
  } catch (err) {
    console.error(`Error reading file: ${err}`);
    return '';
  }
}

const parseData = (data: string) => {
  const lines = data.split('\n');
  for (const line of lines) {
    const [left, right] = line.split('   ');
    leftColumn.push(Number.parseInt(left, 10));
    rightColumn.push(Number.parseInt(right, 10));
  }
}

const calculateDistance = (leftArray: number[], rightArray: number[]): number => {
  if(leftArray.length === 0 || rightArray.length === 0) {
    return 0;
  }

  const left = leftArray.shift() || 0;
  const right = rightArray.shift() || 0;

  return Math.abs(left - right) + calculateDistance(leftArray, rightArray);
}

(async function main() {
  const data = await readDocument("input.txt");

  if(!data) {
    console.error('No data found');
    return;
  }
  parseData(data);
  leftColumn.sort((a, b) => a - b);
  rightColumn.sort((a, b) => a - b);

  const output = calculateDistance(leftColumn, rightColumn);
  console.log(output);
})();