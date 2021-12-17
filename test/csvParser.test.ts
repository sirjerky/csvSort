import assert from 'assert';
import { readCSV, writeCSV } from '../src/csvParser'
import * as path from 'path'
import { Person } from '../src/deduper'
import * as fs from 'fs';

describe('csvParser test suite', () => {
    const person: Person = {
        FirstName: 'Adam', 
        LastName: 'Brown',
        Email: 'adbrown@test.com', 
        Phone: '(253)797-9662'
    }

    const person2: Person = {
        FirstName: 'Adam', 
        LastName: 'Brown',
        Email: 'adbrown2@test.com', 
        Phone: '(253)797-9662'
    }

    const person3: Person = {
        FirstName: 'Adam', 
        LastName: 'Brown',
        Email: 'adbrown@test.com', 
        Phone: '(253)797-9663'
    }

    const person4: Person = {
        FirstName: 'Adam', 
        LastName: 'Brown',
        Email: 'adbrown2@test.com', 
        Phone: '(253)797-9663'
    }

    const testArray: Person[] = [person, person, person2, person3, person4]

    it('should parse given file', async () => {
        const location = path.resolve(__dirname, './test-resources/personList.csv')
        const personList: Array<Person> = await readCSV(location);
        assert(personList.length > 0)
    })
})