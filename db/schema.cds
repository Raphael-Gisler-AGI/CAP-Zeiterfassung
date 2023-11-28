using {
    managed,
    sap
} from '@sap/cds/common';

namespace sap.capire.zeiterfassung;

entity Entries : managed {
    key ID          : UUID;
        description : String not null;
        category    : Association to Categories not null;
        startTime   : DateTime not null;
        endTime     : DateTime not null;
}

entity Categories {
    key ID           : UUID;
        name         : String not null;
        categoryType : CategoryTypes not null;
        entries      : Association to many Entries
                           on entries.category = $self;
}

type CategoryTypes : String enum {
    Project    = 'Project';
    NonProject = 'Non-Project';
    NotWork    = 'Not-Work';
}
