using {
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

entity Employees : cuid {
    firstname     : String;
    lastname      : String;
    email         : String;
    isAdmin       : Boolean default false;
    to_categories : Composition of many Employees2Categories
                        on to_categories.employee = $self;
    to_entries    : Association to many Entries
                        on to_entries.employee = $self;
}

entity Customers : cuid {
    name          : String;
    to_tickets    : Association to many Tickets
                        on to_tickets.customer = $self;
    to_categories : Association to many Categories
                        on to_categories.customer = $self;
}

entity Tickets : cuid {
    isCompleted : Boolean default false;
    number      : Integer;
    description : String;
    customer    : Association to one Customers;
    to_entries  : Association to many Entries
                      on to_entries.ticket = $self;
}

entity Entries : cuid {
    description : String;
    startTime   : DateTime;
    endTime     : DateTime;
    isAllDay    : Boolean default false;
    isSaved     : Boolean default false;
    status      : Integer enum {
        Pending  = 0;
        Approved = 1;
        Rejected = -1;
    } default 0;
    category    : Association to one Categories;
    ticket      : Association to one Tickets;
    employee    : Association to one Employees;
}

entity Timer : cuid {
    startTime   : DateTime;
    description : String;
    category    : Association to one Categories;
    employee    : Association to one Employees;
}

entity Templates : cuid {}

entity Categories : cuid {
    name         : String;
    isActive     : Boolean default true;
    type         : String enum {
        Project;
        NonProject = 'Non-Project';
        NotWork    = 'Not-Work';
    };
    customer     : Association to one Customers;
    to_entries   : Association to many Entries
                       on to_entries.category = $self;
    to_employees : Association to many Employees2Categories
                       on to_employees.category = $self;
}

entity Employees2Categories : cuid {
    employee : Association to one Employees;
    category : Association to one Categories;
}
