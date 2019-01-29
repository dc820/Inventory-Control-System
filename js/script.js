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
        var device = new deviceObject(status, $("#FormType").val(), $("#FormManufacturer").val(), $("#FormModel").val(), $("#FormSerial").val(), $("#FormRMA").val());
        console.log(device);
        
        //Row Counter
        rowCount++;
        console.log("row count " + rowCount);

        //Append HTML
        $(".tableBody").append("<tr id='TableRow" + rowCount + "'><td><div class='custom-control custom-checkbox'><input type='checkbox' class='custom-control-input' id='CheckRow" + rowCount + "'><label class='custom-control-label' for='CheckRow" + rowCount + "'>Cisco Router</label></div></td></tr>")

        $("#SubmitButton").submit(function () {
            //Data to submit here
        });
    });

    //Edit Button on Inventory Table
    $("#Edit").click(function () {
        $("#EditModal").modal();
        checkSelected();
    });

    //Delete Button on Inventory Table
    $("#Delete").click(function () {
        $("#DeleteModal").modal();
        checkSelected();
    });

    $("#ConfirmDelete").click(function () {
        $(".selected").remove();
    });

    //Constructor for Devices
    function deviceObject(part, status, type, manufacturer, model, serial, rma) {
        this.part = part;  
        this.status = status;
        this.type = type;
        this.manufacturer = manufacturer; 
        this.model = model; 
        this.serial = serial;
        this.rma = rma;
    };
    //Adds Class "selected" to table row using row counter - Probably need to find another way to edit/delete selections later
    function checkSelected(){
        console.log("example row:" + $("#CheckRow").prop("checked"));
        for(r=1;r<=rowCount;r++){
            if($("#CheckRow"+r).prop("checked") == true){
                $("#TableRow"+r).addClass("selected");
                console.log(true)
            } else {
                $("#TableRow"+r).removeClass("selected");
                console.log(false)
            }
        }
    }
});

//Need to Create Object Group for Holding Same Kinds of Items