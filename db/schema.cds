using {
    managed,
    cuid,
    sap
} from '@sap/cds/common';

namespace sap.capire.zeiterfassung;

// Kunden -> Projekte
// - Budget / Ohne Budget
// Mitarbeiter-Pensum
// Favorites / Templates
// Tickets
// Leistungsarten - activ / inactive
// Zeiten / Timer


entity Customers : cuid {
    name     : String;
    category : Association to many Categories
                   on category.customer = $self;
}

entity Tickets : cuid {
    isCompleted : Boolean default false;
    number      : Integer;
    description : String;
    category    : Association to one Categories;
    entry       : Association to many Entries
                      on entry.tickets = $self;
}

entity Entries : cuid {
    description : String;
    category    : Association to one Categories;
    startTime   : DateTime;
    endTime     : DateTime;
    isAllDay    : Boolean default false;
    isTimer     : Boolean default false;
    isSaved     : Boolean default false;
    status      : String enum {
        InProgress = 'In Progress';
        Approved;
        Rejected;
    } default 'InProgress';
    tickets     : Association to many Tickets;
}

entity Templates : cuid {}

entity Categories : cuid {
    name         : String;
    isActive     : Boolean default true;
    selectedType : Association to one CategoryTypes;
    customer     : Association to one Customers;
    tickets      : Association to many Tickets
                       on tickets.category = $self;
    entries      : Association to many Entries
                       on entries.category = $self;
}

entity CategoryTypes : cuid {
    option : String enum {
        Project;
        NonProject = 'Non-Project';
        NotWork    = 'Not-Work';
    };
}
