$(document).ready(function () {
    console.log("doc is ready");

    //VARIABLES
    var rowCount = 0;
    var status;
    var r;

    //Navigation Table Toggles  
    $("nav > ul > li > a").click(function () {
        $(".active").removeClass("active");
        $(this).addClass("active");
        if ($("#InventoryButton").hasClass("active") == true) {
            $("#Outgoing").toggle(true);
            $("#Products").toggle(true);
            $("#Incoming").toggle(true);
        }
        if ($("#IncomingButton").hasClass("active") == true) {
            $("#Incoming").toggle(true);
            $("#Products").toggle(false);
            $("#Outgoing").toggle(false);
        }
        if ($("#OutgoingButton").hasClass("active") == true) {
            $("#Outgoing").toggle(true);
            $("#Products").toggle(false);
            $("#Incoming").toggle(false);
        }
        if ($("#ReportsButton").hasClass("active") == true) {
            //Need to Determine Interesting Data to Report
        }
    });

    //Add Button on Inventory Table
    $("#Entry").click(function () {
        $("#EntryModal").modal();
        $("#ToggleRMA").toggle(false);
    });
    //Status Radio Buttons
    $("#PartSpare").click(function() {
        if($("#PartSpare").is(":checked")){
            $("#ToggleRMA").toggle(false);
            $("#FormRMA").val("");
            status = $('input[name=RadioPart]:checked').val(); 
        }
    });
    $("#PartRecycling").click(function() {
        if($("#PartRecycling").is(":checked")){
            $("#ToggleRMA").toggle(false);
            $("#FormRMA").val("");
            status = $('input[name=RadioPart]:checked').val();
        }
    });
    $("#PartReplacement").click(function() {
        if($("#PartReplacement").is(":checked")){
            $("#ToggleRMA").toggle(true);
            status = $('input[name=RadioPart]:checked').val();    
        }
    });

    //Adds New Row Defined by Form Input
    $("#SubmitButton").click(function() { 
        var device = new productObject(status, $("#FormType").val(), $("#FormManufacturer").val(), $("#FormModel").val(), $("#FormSerial").val(), $("#FormRMA").val());
        console.log(device);
        
        //Row Counter
        rowCount++;
        console.log("row count " + rowCount);

        $("#SubmitButton").submit(function () {
            //Data to submit here
        });
    });

    //Edit Button on Products Table
    $("#Edit").click(function () {
        $("#EditModal").modal();
        //Check Selected
    });

    //Delete Button on Products Table
    $("#Delete").click(function () {
        $("#DeleteModal").modal();
        //Check Selected
    });

    $("#ConfirmDelete").click(function () {
        //Delete Selected Table Rows
    });

    //Constructor for Devices
    function productObject(part, status, type, manufacturer, model, serial, rma) {
        this.part = part;  
        this.status = status;
        this.type = type;
        this.manufacturer = manufacturer; 
        this.model = model; 
        this.serial = serial;
        this.rma = rma;
    };
});
