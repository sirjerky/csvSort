import assert, { AssertionError } from 'assert';
import {Person, dedupeList, SortInput, getSortInput} from '../src/deduper'

describe('Dedupe list of members', () => {
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

    it ('should read list from csv', () => {
        const testArray = [];
        assert.equal(testArray.length, 0, 'testArray is not correct')
    })

    it ('should dedupe list by emailAddress', () => {
        const testList = dedupeList(SortInput.email, testArray)
        assert.equal(testList.length, 2, 'did not dedupe')
    })

    it ('should dedupe list by phoneNumber', () => {
        const testList = dedupeList(SortInput.phone, testArray)
        assert.equal(testList.length, 2, 'did not dedupe')
    })

    it ('should dedupe list by both phoneNumber and emailAddress', () => {
        const testList = dedupeList(SortInput.both, testArray)
        assert.equal(testList.length, 4, 'did not dedupe')
    })

    it('should get correct sortInput', () => {
        assert.equal(getSortInput('email'), SortInput.email)
        assert.equal(getSortInput('phone'), SortInput.phone)
        assert.equal(getSortInput('both'), SortInput.both)
    }) 
})