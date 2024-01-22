using UserService as service from '../../srv/user-service';

annotate service.Entries with
@(UI: {
    SelectionFields: [
        description,
        startTime,
        endTime
    ],
    LineItem       : [
        {Value: description},
        {Value: startTime},
        {Value: endTime}
    ],
}) {
    description @(title: '{i18n>description}');
    startTime   @(title: '{i18n>startTime}');
    endTime     @(title: '{i18n>endTime}');
};
