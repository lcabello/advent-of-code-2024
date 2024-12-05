export const readDocument = async (documentName: string) => {
  try {
    const data = await Deno.readTextFile(documentName);
    return data;
  } catch (err) {
    console.error(`Error reading file: ${err}`);
    return '';
  }
}