import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const filePath = join(__dirname, '../DB/players.json');





export async function write(data) {
    try {
        await writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
        return true;
    } catch (error) {
        console.error('Error writing to file:', error.message);
    }
}

export async function read() {
    try {
        const data = await readFile(filePath, 'utf-8');
        if (!data) return []
        const content = JSON.parse(data);
        return content
    }
    catch (error) {
        console.error('Error:', error)
        return []
    }
}
