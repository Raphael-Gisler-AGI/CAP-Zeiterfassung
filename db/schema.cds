using {
    managed,
    sap
} from '@sap/cds/common';

namespace sap.capire.zeiterfassung;

entity Entries : managed {
    key ID          : Integer;
        description : localized String(111) not null;
        category    : Association to Categories;
        startTime   : DateTime not null;
        endTime     : DateTime not null;
}

entity Categories {
    key ID           : UUID;
        name         : String(111) not null;
        categoryType : CategoryTypes;
        entries      : Association to many Entries
                           on entries.category = $self;
}

type CategoryTypes : String enum {
    Project    = 'Project';
    NonProject = 'Non-Project';
    NotWork    = 'Not-Work';
}
