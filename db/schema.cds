using {cuid} from '@sap/cds/common';
using {API_PROJECT_V3 as api} from '../srv/external/API_PROJECT_V3';

namespace sap.capire.zeiterfassung;

// Kunden -> Projekte
// - Budget / Ohne Budget
// Mitarbeiter-Pensum
// Favorites / Templates
// Tickets
// Leistungsarten - activ / inactive
// Zeiten / Timer

// entity Employees : cuid {
//     firstname     : String;
//     lastname      : String;
//     email         : String;
//     isAdmin       : Boolean default false;
//     to_categories : Composition of many Employees2Categories
//                         on to_categories.employee = $self;
//     to_entries    : Association to many Entries
//                         on to_entries.employee = $self;
// }

// entity Customers : cuid {
//     name          : String;
//     to_tickets    : Association to many Tickets
//                         on to_tickets.customer = $self;
//     to_categories : Association to many Categories
//                         on to_categories.customer = $self;
// }

entity Tickets : cuid {
    isCompleted : Boolean default false;
    number      : Integer;
    description : String;
    to_entries  : Association to many Entries
                      on to_entries.to_ticket = $self;
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
    to_project  : Association to one Projects;
    to_ticket   : Association to one Tickets;
}

entity Timer : cuid {
    startTime   : DateTime;
    description : String;
}

entity Templates : cuid {}


entity WBSElements as
    projection on api.WBSElement {
        key WBSElementExternalID as ID,
            WBSDescription       as description
    }

entity Projects    as
    projection on api.Project {
        key ProjectExternalID  as ID,
            ProjectDescription as description,
            to_WBSElement : Association to one WBSElements on to_WBSElement.ID = $self.ID
    }
