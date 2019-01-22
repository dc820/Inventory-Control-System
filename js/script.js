$(document).ready(function () {
    // Handler for .ready() called.
    console.log("doc is ready");
    $("nav > ul > li > a").click(function () {
        $(".active").removeClass("active");
        $(this).addClass("active");
        if ($("#InventoryButton").hasClass("active") == true) {
            console.log("Current Inventory Button Works");
            $("#OutgoingTable").toggle(true);
            $("#ProductsTable").toggle(true);
            $("#IncomingTable").toggle(true);
        }
        if ($("#IncomingButton").hasClass("active") == true) {
            console.log("Incoming Purchase Button Works");
            $("#IncomingTable").toggle(true);
            $("#ProductsTable").toggle(false);
            $("#OutgoingTable").toggle(false);
        }
        if ($("#OutgoingButton").hasClass("active") == true) {
            console.log("Outgoing Orders Button Works");
            $("#OutgoingTable").toggle(true);
            $("#ProductsTable").toggle(false);
            $("#IncomingTable").toggle(false);
        }
        if ($("#ReportsButton").hasClass("active") == true) {
            console.log("Not Sure What Report Button Does Yet");
        }
    });
});
