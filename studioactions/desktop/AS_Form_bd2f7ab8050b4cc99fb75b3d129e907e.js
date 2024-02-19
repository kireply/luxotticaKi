function AS_Form_bd2f7ab8050b4cc99fb75b3d129e907e(eventobject) {
    var self = this;
    if ((this.getPreviousForm() === "frmDashboard") && this.navigationContext && this.navigationContext._meta_ && (this.navigationContext._meta_.widgetId === "segListUsers") && (this.navigationContext._meta_.eventName === "onRowClick")) {
        self.view.addoredituser.txtName = this.navigationContext.segListUsers_lblUserName;
        self.view.addoredituser.txtSurname = this.navigationContext.segListUsers_lblUserSurname;
        self.view.addoredituser.txtCompileUserEmail = this.navigationContext.segListUsers_lblUserUsername;
    }
}