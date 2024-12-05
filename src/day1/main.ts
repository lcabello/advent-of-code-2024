import { readDocument } from '../utils/document-reader.ts';

const leftColumn: number[] = [];
const rightColumn: number[] = [];

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

  const left = leftArray.pop() || 0;
  const right = rightArray.pop() || 0;

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
  console.log(`Result: ${output}`);
})();