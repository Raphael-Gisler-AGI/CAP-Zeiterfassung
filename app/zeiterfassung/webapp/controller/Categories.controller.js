sap.ui.define(["./BaseController"], function (BaseController) {
  "use strict";

  BaseController.extend("zeiterfassung.controller.Categories", {
    async onCreateCategory() {
      const tableItems = this.byId("categoriesTable").getBinding("items");
      this.getView().setBusy(true);
      const result = tableItems.create({
        name: "",
        categoryType: "",
      });
      await result.created();
      this.getView().setBusy(false);
      if (!this.categoryDialog) {
        this.categoryDialog = this.loadFragment({
          name: "zeiterfassung.fragment.Category",
        });
      }
      this.categoryDialog.then((dialog) => {
        dialog.bindElement(result.getPath());
        dialog.open();
      });
    },
    onCloseDialog() {
      this.byId("categoryDialog").close();
    },
    async onPressSaveCategory(oEvent) {
      const context = oEvent.getSource().getBindingContext();
      await this.getOwnerComponent()
        .getModel()
        .bindContext(
          `/Categories(ID=${context.getProperty(
            "ID"
          )},IsActiveEntity=false)/AdminService.draftActivate(...)`,
          context
        )
        .execute();
      this.onCloseDialog();
      this.refresh();
    },
  });
});
