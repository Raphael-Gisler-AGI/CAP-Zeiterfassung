using {sap.capire.zeiterfassung as my} from '../db/schema';

service AdminService {
    entity Entries    as
        select from my.Entries
        where
            Entries.isSaved;

    entity Categories as projection on my.Categories;

    @readonly
    entity Tickets    as projection on my.Tickets;

    @readonly
    entity Customers  as projection on my.Customers;

    @readonly
    entity Employees  as projection on my.Employees;

    @readonly
    entity WBSElements as projection on my.WBSElements;

    @readonly
    entity Projects as projection on my.Projects;
}
