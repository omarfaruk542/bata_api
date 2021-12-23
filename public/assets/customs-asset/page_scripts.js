$(document).ready(function() {
    $(".select2").select2();

    var baseURL = $(location).attr('origin');
    var customerId = $("#customer").data("customer");


    // Customer List Dropdown
    $.ajax({
        url: baseURL+"/company",
        type: "GET"
    }).then(function(data) {
        for (var i = 0; i < data.length; i++) {
            if (data[i].id === customerId) {
                var option = new Option(data[i].name, data[i].id, false, true);
            } else {
                var option = new Option(data[i].name, data[i].id, false, false);
            }
            $("#company")
                .append(option)
                .trigger("change");
        }
    });

});
