using {sap.capire.zeiterfassung as my} from '../db/schema';

service AdminService {
    entity Entries    as
        select from my.Entries
        where
            Entries.isSaved;

    @readonly
    entity WBSElements as projection on my.WBSElements;

    @readonly
    entity Projects as projection on my.Projects;
}
