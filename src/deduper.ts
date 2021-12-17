export interface Person {
    FirstName: string,
    LastName: string,
    Email: string,
    Phone: string
}

export interface TrackingKey {
    emailAddress?: string,
    phoneNumber?: string
}

export enum SortInput {
    'email' = 'EMAIL',
    'phone' = 'PHONE',
    'both' = 'BOTH'
}

export function dedupeList (input: SortInput, list: Array<Person>): Array<Person> {
    const dupeMap:Map<string, Person> = new Map()

    return list.filter((person: Person): Person => {
        let trackingKey: TrackingKey = {}
        trackingKey.emailAddress = input === 'PHONE' ? '' : person.Email;
        trackingKey.phoneNumber = input === 'EMAIL' ? '' : person.Phone;
        const key = JSON.stringify(trackingKey);
        if (!dupeMap.has(key)) {
            dupeMap.set(key, person)
            return person
        }
    })
}

export function getSortInput(sortType: string): string {
    if (SortInput[sortType]) return SortInput[sortType]
    throw new Error('No sort input found');
}

