$(document).ready(function() {  
    $('#frmFilter').on('submit',function(e){
        e.preventDefault();
        $("#example1").DataTable().destroy();
        var monthNo = $('#month_no').find(":selected").val();
        var yearNo = $('#year_no').find(":selected").val();
        var api_url = `http://103.36.103.63/BATAMOBILE/bata/getAttendaceList?secretKey=Bata@WeB&yearNo=${yearNo}&monthNo=${monthNo}`;
        if(monthNo > 0 && yearNo > 0){            
            var table = $("#example1")            
                .DataTable({                    
                    // processing: true,
                    ajax:
                    {
                        type:'GET',
                        url: api_url,
                        contentType:'application/json; charset=utf-8',
                        dataType:'json',           
                        dataSrc : function(json) {
                            var allData = json.content;
                            var temp, item, data = [];
                            for (var i = 0; i < allData.length; i++) {                   
                                data.push({
                                    'EmployeeCode': allData[i].EmployeeCode,
                                    'WorkDate': new Date(allData[i].WorkDate).toLocaleDateString(),
                                    'ShiftName': allData[i].ShiftName,
                                    'ShiftInTime': new Date(allData[i].ShiftInTime).toLocaleTimeString(),
                                    'ShiftOutTime': new Date(allData[i].ShiftOutTime).toLocaleTimeString(),
                                    'InTime': new Date(allData[i].InTime).toLocaleTimeString(),
                                    'OutTime': new Date(allData[i].OutTime).toLocaleTimeString(),
                                    'DayStatusName': allData[i].DayStatusName,
                                    'DayStatusDescription': allData[i].DayStatusDescription,
                                    'PayHour': allData[i].PayHour,
                                    'PayMinute': allData[i].PayMinute,
                                    'OTMinute': allData[i].OTMinute
                                });
                            }
                            
                            return data 
                        }
                    },
                    columns:
                    [   
                        { data: 'EmployeeCode' },
                        { data: 'WorkDate' },
                        { data: 'ShiftName' },
                        { data: 'ShiftInTime' },
                        { data: 'ShiftOutTime' },
                        { data: 'InTime' },
                        { data: 'OutTime' },
                        { data: 'DayStatusName' },
                        { data: 'DayStatusDescription' },
                        { data: 'PayHour' },
                        { data: 'PayMinute' },
                        { data: 'OTMinute' },
                    
                    ],           
                    pageLength : 10,
                    orderCellsTop: false,
                    orderable: false,
                    fixedHeader: false,
                    // responsive: true,
                    lengthChange: false,
                    autoWidth: false,
                    searching: true,               
                    // dom: "Blfrtip",
                    dom: 'Bfrtip',                
                    buttons: [
                        "excel",
                        "csv"                   
                    ],
                    select: true,
                    // scrollY: "300px",
                    // scrollX: true,
                    scrollCollapse: true,
                    paging: true,
                    // columnDefs: [
                    //     {
                    //         orderable: false,
                    //         className: "select-checkbox",
                    //         targets: 0
                    //     }
                    // ],
                    select: {
                        style: "os",
                        selector: "td:first-child",
                        style: "multi"
                    },
                    order: [[1, "asc"]],
                    fixedColumns: true,
                    
                    
                });
    
            table
                .buttons()
                .container()
                .appendTo("#example1_filter .col-md-6:eq(0)");
    
            // Column search hide for table resize
            // $('#example1 thead tr').clone(true).appendTo('#example1 thead');
            $("#example1 thead tr:eq(1) th").each(function(i) {
                var title = $(this).text();
                $(this).html(
                    '<input type="text" placeholder="Search ' + title + '" />'
                );
    
                $("input", this).on("keyup change", function() {
                    if (table.column(i).search() !== this.value) {
                        table
                            .column(i)
                            .search(this.value)
                            .draw();
                    }
                });
            });
    
            // Select All Rows
            $("#selectbox").on("click", function() {
                if (this.checked) {
                    table.rows().select();
                } else {
                    table.rows().deselect();
                }
            });
        } else {
            alert("Please select parameters");
        }
    })      
   
    
});
