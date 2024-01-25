using {sap.capire.zeiterfassung as my} from '../db/schema';

service UserService {
    entity Entries    as projection on my.Entries
                         order by
                             startTime desc;

    entity Templates  as projection on my.Templates;

    @readonly
    entity Projects   as projection on my.Projects;

    @readonly
    entity Tickets    as projection on my.Tickets;
}
