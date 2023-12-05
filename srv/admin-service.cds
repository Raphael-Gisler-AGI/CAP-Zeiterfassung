using {sap.capire.zeiterfassung as my} from '../db/schema';

service AdminService @(requires: 'authenticated-user') {
    entity Entries       as
        select from my.Entries
        where
            Entries.isSaved;

    entity Customers     as projection on my.Customers;
    entity Tickets       as projection on my.Tickets;
    entity Categories    as projection on my.Categories;

    @readonly
    entity CategoryTypes as projection on my.CategoryTypes;
}
