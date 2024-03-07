function AS_FlexContainer_c8c6602e7e084ed89fd48fb8d7f29aa7(eventobject, context) {
    var self = this;
    /*
if (this.view.imgStatus.src === "green.png") {
  this.view.flxShowStandard.setVisibility(false);
  this.view.flxShowActive.setVisibility(true);
}
*/
    voltmx.print("### button hover event executed: " + context.eventType);
    if (this.view.imgStatus.src === "green.png") { //Entering Active Row
        if (context.eventType !== "leave") {
            this.view.flxShowStandard.setVisibility(false);
            this.view.flxShowActive.setVisibility(true);
        } else {
            this.view.flxShowActive.setVisibility(false);
            this.view.flxShowStandard.setVisibility(true);
        }
    } else { //Entering Archived or Draft Row
        if (context.eventType !== "leave") {
            this.view.flxShowStandard.setVisibility(false);
            this.view.flxShowArchivedOrDraft.setVisibility(true);
        } else {
            this.view.flxShowArchived.setVisibility(false);
            this.view.flxShowArchivedOrDraft.setVisibility(true);
        }
    }
    /*Entering Active Row
if (context.eventType !== "leave" && this.view.imgStatus.src === "green.png") {
  this.view.flxShowStandard.setVisibility(false);
  this.view.flxShowActive.setVisibility(true);
  voltmx.print("### HOVER IF: " + context.eventType);
} else {
  this.view.flxShowActive.setVisibility(false);
  this.view.flxShowStandard.setVisibility(true);
  voltmx.print("### HOVER ELSE: " + context.eventType);
}

// Entering Archived or Draft Row
if (context.eventType !== "leave" && this.view.imgStatus.src !== "green.png") {
  this.view.flxShowStandard.setVisibility(false);
  this.view.flxShowArchivedOrDraft.setVisibility(true);
} else {
  this.view.flxShowArchived.setVisibility(false);
  this.view.flxShowArchivedOrDraft.setVisibility(true);
}

*/
    /*Sample code to use onHover eventfunction 
function onHoverEventCallback(widget, context) {
 voltmx.print("button hover event executed" + context.eventType);
 if (context.eventType == constants.ONHOVER_MOUSE_ENTER) {
   this.view.flxShowStandard.setVisibility(false);
   this.view.flxShowActive.setVisibility(true);
 } else if (context.eventType == constants.ONHOVER_MOUSE_MOVE) {
  widget.skin = "yellow";
 } else if (context.eventType == constants.ONHOVER_MOUSE_LEAVE) {
  widget.skin = "blue";
 }
}

function addHoverEvent() {
 voltmx.print("registering hover events");
 form1.button1.onHover = onHoverEventCallback;
}

function removeHoverEvent() {
 voltmx.print("removing hover events");
 form1.button1.onHover = null;
}  
*/
    voltmx.print("### passato su hover");
}