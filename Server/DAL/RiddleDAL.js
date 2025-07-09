import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const filePath = join(__dirname, '../DB/riddles.json');




export async function write(data) {
    try {
        await writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
        return true;
    } catch (error) {
        console.error('Error writing to file:', error.message);
        return false;
    }
}

export async function read() {
    try {
        // Lire le contenu du fichier
        const data = await readFile(filePath, 'utf-8');
        
        // Check if the file is empty
        if (!data || data.trim() === '') {
            console.log('File is empty, returning empty array');
            return [];
        }
        
        // Parser le contenu JSON
        const content = JSON.parse(data);
        
        // Vérifier que le contenu est un tableau
        if (!Array.isArray(content)) {
            console.error('File content is not a valid array');
            return [];
        }
        
        return content;
    } catch (error) {
        // If the file doesn't exist, return an empty array
        if (error.code === 'ENOENT') {
            console.log('File does not exist, creating a new array');
            return [];
        }
        
        console.error('Error reading file:', error.message);
        return [];
    }
}




















