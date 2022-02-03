// Preware App kind and main window.
/*jslint sloppy: true */
/*global enyo, onyx, preware, $L, device, PalmServiceBridge */

//to reload changes on device: luna-send -n 1 palm://com.palm.applicationManager/rescan {}

enyo.kind({
    name: "App",
    components: [
        {
            kind: "Signals",
            onbackbutton: "handleBackGesture",
            onCoreNaviDragStart: "handleCoreNaviDragStart",
            onCoreNaviDrag: "handleCoreNaviDrag",
            onCoreNaviDragFinish: "handleCoreNaviDragFinish",
            onLaunchedWithInstallRequest: "handleLaunchInstallRequest"
        },
        {name: "AppPanels", kind: "AppPanels"},
        {kind: "CoreNavi", fingerTracking: true},
        {name: "SettingsDialog", kind: "SettingsDialog"},
        {name: "ManageFeedsDialog", kind: "ManageFeedsDialog"},
        {name: "InstallPackageDialog", kind: "InstallPackageDialog"},
        {
            kind: "AppMenu", //onSelect: "appMenuItemSelected",
            style: "overflow: hidden;",
            components: [
                { kind: "enyo.AppMenuItem", content: $L("Reload list"), ontap: "reloadPackageList"},
                { kind: "enyo.AppMenuItem", content: $L("Install Package"), ontap: "showInstallPackageDialog"},
                { kind: "enyo.AppMenuItem", content: $L("Preferences"), ontap: "showSettingsDialog" },
                { kind: "enyo.AppMenuItem", content: $L("Manage Feeds"), ontap: "showManageFeedsDialog" }
            ]
        }
    ],
    //Handlers
    handleBackGesture: function (inSender, inEvent) {
        if (this.$.ManageFeedsDialog.get('showing')) {
            this.$.AppPanels.doReloadList();
        }
        //hide possible open dialogs on back gesture?
        this.$.SettingsDialog.hide();
        this.$.ManageFeedsDialog.hide();
        inEvent.preventDefault();
    },
    handleCoreNaviDragStart: function (inSender, inEvent) {
        this.$.AppPanels.dragstartTransition(this.$.AppPanels.draggable === false ? this.reverseDrag(inEvent) : inEvent);
    },
    handleCoreNaviDrag: function (inSender, inEvent) {
        this.$.AppPanels.dragTransition(this.$.AppPanels.draggable === false ? this.reverseDrag(inEvent) : inEvent);
    },
    handleCoreNaviDragFinish: function (inSender, inEvent) {
        this.$.AppPanels.dragfinishTransition(this.$.AppPanels.draggable === false ? this.reverseDrag(inEvent) : inEvent);
    },
    reloadPackageList: function (inSender, inEvent) {
        this.$.AppPanels.doReloadList();
    },
    handleLaunchInstallRequest: function (inSender, inEvent) {
        //enyo.info("Handling launch with install request on: " + this.name + " for " + inEvent.params);
        this.showInstallPackageDialog();
        this.$.InstallPackageDialog.doInstall(inEvent.params);
    },
    showSettingsDialog: function (inSender, inEvent) {
        this.$.SettingsDialog.updateValues();
        this.$.SettingsDialog.show();
    },
    showManageFeedsDialog: function (inSender, inEvent) {
        this.$.ManageFeedsDialog.show();
    },
    showInstallPackageDialog: function (inSender, inEvent) {
        this.$.InstallPackageDialog.show();
    },
    //Utility Functions
    reverseDrag: function (inEvent) {
        inEvent.dx = -inEvent.dx;
        inEvent.ddx = -inEvent.ddx;
        inEvent.xDirection = -inEvent.xDirection;
        return inEvent;
    }
});
