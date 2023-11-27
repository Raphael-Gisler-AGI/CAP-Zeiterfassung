using {sap.capire.zeiterfassung as my} from '../db/schema';

service EntriesService @(path: '/browse') {
    @readonly
    entity Entries    as
        select from my.Entries {
            *,
            category.name as category
        }
        excluding {
            createdBy,
            modifiedBy
        };

    @requires: 'authenticated-user'
    action createEntry(entry : Entries:ID);
}
