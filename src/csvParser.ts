import { parse } from '@fast-csv/parse';
import { Person } from './deduper';
import * as fs from 'fs';
import { writeToStream } from '@fast-csv/format';
import * as path from 'path';

export async function readCSV(location: string): Promise<Person[]> {
    return new Promise((resolve, reject) => {
        const personList: Person[] = [];
        fs.createReadStream(location)
        .pipe(
            parse<Person, Person>({ headers: true, strictColumnHandling: true })
        )
        .on('error', error => {
            console.error(error);
            reject;
        })
        .on('data', (row: Person) => {
            console.log(row);
            personList.push(row);
        })
        .on('data-invalid', (row, rowNumber) => {
            console.log(`Invalid entry at row number ${rowNumber} - row = ${JSON.stringify(row)}`);
        })
        .on('end', (rowCount: number) => { 
            console.log(`Parsed ${rowCount} entries`);
            resolve(personList);
        })
    })
}

export function writeCSV(persons: Person[]): void {
    const output = fs.createWriteStream(path.resolve(__dirname, '../dist/output.csv'));
    writeToStream(output, persons, { headers: ['FirstName', 'LastName', 'Email', 'Phone']})
    .on('error', (err: Error) => console.error(err))
    .on('finish', () => console.log('done'));
}

