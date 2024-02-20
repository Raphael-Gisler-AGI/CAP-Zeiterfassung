using UserService as service from '../../srv/user-service';

annotate service.Entries with
@(
    UI: {
        SelectionFields: [
            description,
            startTime,
            endTime
        ],
        LineItem       : [
            {Value: description},
            {Value: to_project.description},
            {Value: startTime},
            {Value: endTime},
            {Value: to_ticket.description},
        ],
        Facets         : [{
            $Type               : 'UI.ReferenceFacet',
            Label               : 'General Information',
            Target              : '@UI.FieldGroup#DetailForm',
            ![@UI.PartOfPreview]: true
        }],
    },
    UI: {FieldGroup #DetailForm: {
        $Type: 'UI.FieldGroupType',
        Label: 'Entry Details',
        Data : [
            {Value: to_project.description},
            {Value: description},
            {Value: startTime},
            {Value: endTime},
        ]
    }}
) {
    description @(title: '{i18n>description}');
    startTime   @(title: '{i18n>startTime}');
    endTime     @(title: '{i18n>endTime}');
};

annotate service.Tickets with
@(

) {
    description @(title: '{i18n>ticketDescription}')
};
