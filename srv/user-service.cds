using {sap.capire.zeiterfassung as my} from '../db/schema';

service UserService {
    @odata.draft.enabled
    entity Entries       as projection on my.Entries;

    @odata.draft.enabled
    entity Templates     as projection on my.Templates;

    @readonly
    entity Categories    as projection on my.Categories;

    @readonly
    entity CategoryTypes as projection on my.CategoryTypes;

    @readonly
    entity Tickets       as projection on my.Tickets;
}
