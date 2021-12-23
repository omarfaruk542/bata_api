$(document).ready(function(){

    var table = $('#example1').DataTable( {       
        destroy:true,
        responsive:true,
        processing: true,
        ajax:
        {
            type:'GET',
            url:'http://103.36.103.63/BATAMOBILE/bata/getAttendaceList?secretKey=Bata@WeB&yearNo=2021&monthNo=11',
            contentType:'application/json; charset=utf-8',
            dataType:'json',           
            dataSrc : function(json) {
                var allData = json.content;
                var temp, item, data = [];
                for (var i = 0; i < allData.length; i++) {                   
                    data.push(allData[i]);
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
        pageLength: 6,
        orderCellsTop: false,
        orderable: false,
        fixedHeader: false,
        responsive: true,
        lengthChange: false,
        autoWidth: false,
        searching: true,
        buttons: ["excel", "pdf", "print"],
        select: true,
        // scrollY: "300px",
        // scrollX: true,
        scrollCollapse: true,
        paging: true,
        columnDefs: [
          {
            orderable: false,
            className: "select-checkbox",
            targets: 0,
          }
        ],
        select: {
          style: "os",
          selector: "td:first-child",
          style: "multi",
        },
        order: [[1, "asc"]],
        fixedColumns: true   
        
    } );
    table.buttons().container().appendTo("#example1_wrapper .col-md-6:eq(0)");
    $("#example1 thead tr:eq(1) th").each(function (i) {
        var title = $(this).text();
        $(this).html('<input type="text" placeholder="Search ' + title + '" />');
    
        $("input", this).on("keyup change", function () {
          if (table.column(i).search() !== this.value) {
            table.column(i).search(this.value).draw();
          }
        });
      });
    

    // $.ajax({
    //     type: "GET",
    //     url:'http://103.36.103.63/BATAMOBILE/bata/getAttendaceList?secretKey=Bata@WeB&yearNo=2021&monthNo=11',      
    //     cache: false,
    //     processData: false,
    //     dataType:"json",
    //     beforeSend:function(){
    //         $('#resultloader').show();
    //     },
    //     success: function(data){
    //         $('#resultloader').hide(500);
    //         var allData = data.content;            
    //         // console.log(allData)
    //         var html = "";
    //         for(var i = 0; i < allData.length; i++){                
    //             // console.log(allData[i])
    //             var WorkDate = new Date(allData[i].WorkDate);
    //             var ShiftInTime = new Date(allData[i].ShiftInTime);
    //             var ShiftOutTime = new Date(allData[i].ShiftOutTime);
    //             var InTime = new Date(allData[i].InTime);
    //             var OutTime = new Date(allData[i].OutTime);
    //             // console.log(allData[i].EmployeeCode);
    //             html += `
    //                 <tr>
    //                     <td></td>
    //                     <td>`+allData[i].EmployeeCode+`</td>
    //                     <td>`+WorkDate.toLocaleDateString()+`</td>
    //                     <td>`+ShiftInTime.toLocaleTimeString()+`</td>
    //                     <td>`+ShiftOutTime.toLocaleTimeString()+`</td>
    //                     <td>`+allData[i].ShiftName+`</td>
    //                     <td>`+InTime.toLocaleTimeString()+`</td>
    //                     <td>`+OutTime.toLocaleTimeString()+`</td>
    //                     <td>`+allData[i].DayStatusName+`</td>
    //                     <td>`+allData[i].DayStatusDescription+`</td>
    //                     <td>`+allData[i].PayHour+`</td>
    //                     <td>`+allData[i].PayMinute+`</td>
    //                     <td>`+allData[i].OTMinute+`</td>
    //                 </tr>                
    //             `
    //         }
    //         $('.json-data').append(html);
            
    //     },
    //     error: function(err){
    //         console.log(err)
    //     }
    // })

});