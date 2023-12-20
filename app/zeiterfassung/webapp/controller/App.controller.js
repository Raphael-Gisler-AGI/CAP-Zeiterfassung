sap.ui.define(["./BaseController"], function (BaseController) {
    "use strict";

    return BaseController.extend("zeiterfassung.controller.App", {
        async onInit() {
            this.getRouter().attachRouteMatched((oEvent) => {
                const route = oEvent.getParameter("name");
                this.byId("sideNavigation").setSelectedKey(route);
            });
            this.timerDialog ??= await this.loadFragment({
                name: "zeiterfassung.fragment.Timer",
            });
            this.draftsPopover ??= await this.loadFragment({
                name: "zeiterfassung.fragment.Drafts",
            });
        },
        onSelectNavigate(oEvent) {
            const route = oEvent.getParameter("item").getKey();
            this.getRouter().navTo(route);
        },
        async onPressCreateEntry() {
            const entries = this.getModel().bindList("/Entries");
            const result = entries.create({
                startTime: new Date(),
                endTime: new Date(),
            });
            this.getView().setBusy(true);
            await result.created();
            this.getView().setBusy(false);
            this.openEntryDialog(result);
        },
        async onPressTimer(oEvent) {
            this.timerDialog.openBy(oEvent.getSource());
        },

        // Timer
        onPressTimerToggle() { },

        // Drafts
        onPressDraftButton(oEvent) {
            this.draftsPopover.openBy(oEvent.getSource());
        },
        async onPressDraftPopoverEdit(oEvent) {
            const entry = oEvent.getSource().getBindingContext();
            const contextPath = this.getModel().bindContext(
                `/Entries(ID=${entry.getProperty("ID")},IsActiveEntity=false)`
            );
            this.openEntryDialog(contextPath);
        },
        onPressDraftPopoverDelete(oEvent) {
            const entry = oEvent.getSource().getBindingContext();
            this.deleteEntry(entry);
        },
    });
});
