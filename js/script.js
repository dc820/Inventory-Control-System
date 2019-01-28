$(document).ready(function () {
    console.log("doc is ready");

    //VARIABLES
    var rowCount = 0;
    var status;

    function productObject(part, status, type, manufacturer, model, serial, rma) {
        this.part = part;  
        this.status = status;
        this.type = type;
        this.manufacturer = manufacturer; 
        this.model = model; 
        this.serial = serial;
        this.rma = rma;
    };

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

    //Add Button on Products Table
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
        //Sample Code for Testing
    /*  rowCount++;
        console.log("row count " + rowCount);
        $(".addNewRow").append(
            '<tr id="tableRow' + rowCount + '"><td><div class="custom-control custom-checkbox"><input type="checkbox" class="custom-control-input" id="CheckRow' + rowCount + '"><label class="custom-control-label" for="CheckRow' + rowCount + '">Cisco Router</label></div></td><td>10x</td><td>Cisco Router- 10X</td><td>45</td><td>143</td><td>76</td><td>86</td><td>88</td></tr>'
        );*/
        $("#SubmitButton").submit(function () {

        });
    });

    //Edit Button on Products Table
    $("#Edit").click(function () {
        $("#EditModal").modal();
    });

    //Delete Button on Products Table
    $("#Delete").click(function () {
        $("#DeleteModal").modal();
    });

    $("#ConfirmDelete").click(function () {
        //Delete Selected Table Rows
    });
});
