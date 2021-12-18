import { dedupeList, Person, getSortInput } from "./deduper";
import { readCSV, writeCSV } from './csvParser';
import * as prompt from 'prompt';
import * as path from 'path';

const prompts = [
    {
        description: 'Enter filename for dedupe',
        type: 'string',
        name: 'file',
        required: true
    },
    {
        description: 'Enter type of sort (email, phone or both)',
        name: 'sort',
        validator: /\bemail\b|\bphone\b|\bboth\b/,
        warning: 'sort must be only email, phone or both'
    }
    
];

async function run() {
    let fileName;
    let sortType;

    prompt.start();

    const {file, sort} = await prompt.get(prompts)
    
    if (!file) {
        throw new Error('Error with command prompt');
    }
    fileName = path.resolve(__dirname, file);
    try {
        sortType = getSortInput(sort);
    } catch(err) {
        console.error(err);
    }
    
    console.log(`file: ${file}`)
    console.log(` sort: ${sort}`)
    
    
    const personList: Person[] = await readCSV(fileName)
    const finalList: Person[] = dedupeList(sortType, personList)
    console.log('list', finalList);
    writeCSV(finalList);
    
}

run();