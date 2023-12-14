using {sap.capire.zeiterfassung as my} from '../db/schema';

@impl: './admin-service.js'
service AdminService {
    entity Entries       as
        select from my.Entries
        where
            Entries.isSaved;

    entity Categories    as projection on my.Categories {
        *
    } actions {
        action saveCategory();
    };

    entity Tickets       as projection on my.Tickets;

    @readonly
    entity Customers     as projection on my.Customers;

    @readonly
    entity Employees     as projection on my.Employees;
}
