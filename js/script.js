$(document).ready(function () {
  console.log("doc is ready");

  //VARIABLES
  var rowCount = 0;
  var r;

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

    //Code for Add to Table Button Here
    $("#AddToTable").click(function(){
        $("#AddModal").modal();
    });

    $("#ModalAddButton").click(function(){
        rowCount++;
        console.log("row count " + rowCount);
        $(".addNewRow").append(
            '<tr id="tableRow'+rowCount+'"><td><div class="custom-control custom-checkbox"><input type="checkbox" class="custom-control-input" id="CheckRow' + rowCount + '"><label class="custom-control-label" for="CheckRow'+ rowCount +'">Cisco Router</label></div></td><td>10x</td><td>Cisco Router- 10X</td><td>45</td><td>143</td><td>76</td><td>86</td><td>88</td></tr>'
        );
    });

    //Code for Edit Button Here
    $("#Edit").click(function(){
        $("#EditModal").modal();
    });

    //Code for Refresh Button Here
    $("#Delete").click(function(){
        $("#DeleteModal").modal();
    });
    
    $("#ConfirmDelete").click(function(){
        checkSelection();
        console.log($(".selected"));
        $(".selected").remove();
    });

    
    function checkSelection() {     //Something wrong with selection. First checkbox selects all html table rows
        for(r=1; r<=rowCount; r++){
            if($("input[type=checkbox]").prop('checked') == true){
                $("#tableRow"+r).addClass("selected");
            } else if ($("input[type=checkbox]").prop('checked') == false){ 
                $("#tableRow"+r).removeClass("selected") 
            } else {
                return;
            }
        }
    }
});
