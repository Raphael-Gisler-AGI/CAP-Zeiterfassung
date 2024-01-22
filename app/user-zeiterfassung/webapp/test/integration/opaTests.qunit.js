sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'userzeiterfassung/test/integration/FirstJourney',
		'userzeiterfassung/test/integration/pages/EntriesMain'
    ],
    function(JourneyRunner, opaJourney, EntriesMain) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('userzeiterfassung') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheEntriesMain: EntriesMain
                }
            },
            opaJourney.run
        );
    }
);