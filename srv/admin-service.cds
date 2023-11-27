using {sap.capire.zeiterfassung as my} from '../db/schema';

service AdminService {
    @odata.draft.enabled
    entity Entries    as projection on my.Entries;

    @odata.draft.enabled
    entity Categories as projection on my.Categories;
}
