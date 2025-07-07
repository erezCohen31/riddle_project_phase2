import { console } from "inspector";
import { readFile, writeFile } from 'node:fs/promises';


export async function write(filePath, data) {
    try {
        await writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
        return true;
    } catch (error) {
        console.error('Error writing to file:', error.message);
    }
}

export async function read(filePath) {
    try {
        const data = await readFile(filePath, 'utf-8');
        if (!data) return []
        const content = JSON.parse(data);
        return content
    }
    catch (error) {
        console.error(error)
        return []
    }
}
