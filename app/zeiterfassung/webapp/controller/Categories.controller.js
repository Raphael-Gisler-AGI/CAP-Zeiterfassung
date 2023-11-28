sap.ui.define(
  ["./BaseController", "sap/ui/model/Filter", "sap/m/MessageBox"],
  function (BaseController, Filter, MessageBox) {
    "use strict";

    BaseController.extend("zeiterfassung.controller.Categories", {
      onInit() {
        this.byId("categoriesTable").bindItems({
          path: "/Categories",
          template: this.byId("categoriesItemTemplate"),
          filters: new Filter({
            filters: this.getDraftFilters(),
            and: false,
          }),
        });
      },
      async onPressEditCategory(oEvent) {
        const context = oEvent.getSource().getBindingContext();
        if (context.getProperty("IsActiveEntity")) {
          await this.getOwnerComponent()
            .getModel()
            .bindContext(
              `/Categories(ID=${context.getProperty(
                "ID"
              )},IsActiveEntity=true)/AdminService.draftEdit(...)`,
              context
            )
            .execute();
        }
        this.onOpenCategoryDialog(context);
      },
      async onPressDeleteCategory(oEvent) {
        MessageBox.confirm("Are you sure you want to delete this category?", {
          title: "Delete",
          onClose: async (response) => {
            if (response === "OK") {
              await oEvent.getSource().getBindingContext().delete();
              this.refresh();
            }
          },
        });
      },
      async onPressCreateCategory() {
        const tableItems = this.byId("categoriesTable").getBinding("items");
        this.getView().setBusy(true);
        const result = tableItems.create({
          name: "",
          categoryType: "",
        });
        await result.created();
        this.getView().setBusy(false);
        this.onOpenCategoryDialog(result);
      },
      onOpenCategoryDialog(context) {
        if (!this.categoryDialog) {
          this.categoryDialog = this.loadFragment({
            name: "zeiterfassung.fragment.Category",
          });
        }
        this.categoryDialog.then((dialog) => {
          dialog.bindElement(context.getPath());
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
  }
);
