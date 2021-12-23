$(document).ready(function() {
    var baseURL = $(location).attr("origin") + "/cryologistics_new";
    var table = $("#filter_table");
    var optionVal = "";
    var optionTxt = "";
    var optionName = "";
    var template = "";
    var tempColumn = "";
    var tempNum = 0;

    $("#add_filter_select").on("change", function() {
        tempNum++;
        var dataType = $(this)
            .find("option:selected")
            .data("type");
        $(this)
            .find("option:selected")
            .attr("disabled", "disabled");
        optionTxt = $(this)
            .find("option:selected")
            .text();
        optionVal = $(this)
            .find("option:selected")
            .val();
        optionName = $(this)
            .find("option:selected")
            .attr("name");

        template = `
                <tr class="filter" id="${optionVal}_${tempNum}">
                    <td class="field py-0 w-40" id="field_${optionVal}">
                        <input checked="checked" id="cb_${optionVal}" name="f[]" value="${optionVal}" type="checkbox">
                        <label for="cb_${optionVal}">${optionTxt}</label>
                    </td>
                    ${
                        dataType == "txt"
                            ? `<td class="operator py-0 w-10">
                        <select id="operators_${optionVal}" name="op[${optionVal}]" w-50" required>
                            <option value="=" selected="selected">is</option>
                            <option value="!=">is not</option>
                            <option value="*">any</option>
                        </select>
                    </td>`
                            : `<td class="operator py-0 w-10">
                        <select id="operators_${optionVal}" name="op[${optionVal}]" w-50" required>
                            <option value="=" selected="selected">is</option>
                            <option value="!=">is not</option>
                            <option value=">=">> =</option>
                            <option value="<=">< =</option>
                            <option value="*">any</option>
                        </select>
                    </td>`
                    }

                    ${
                        dataType == "txt"
                            ? `<td class="values py-0  w-50">
                        <span style="display: inline;">
                            <select class="value w-75"
                                id="select${optionName.toLowerCase()}" name="v[${optionVal}][]" size="1" required>
                                <option value="" selected disable>Select ${optionTxt}</option>
                            </select>

                            <span class="toggle-multiselect pointer" style="font-size: 14px;">
                                <i class="fas fa-plus-square"></i>
                            </span>
                            <span class="d-none text-danger errormsg">This field is required.</span>
                        </span>
                    </td>`
                            : `
                    <td class="values py-0  w-50">
                        <span style="display: inline;">
                            <input type="date" name="v[${optionVal}][]" required style="width:213px"/>
                            <span class="d-none text-danger errormsg">This field is required.</span>
                        </span>
                    </td>`
                    }
                </tr>`;

        $(table)
            .find("tbody")
            .append(template);
        $(this).val("");
    });

    $(document).on("change", 'input[checked="checked"]', function() {
        var id = $(this)
            .parents("tr")
            .attr("id");
        var parent = $(this).parents("tr");
        var currTD = $(this).closest("td");

        if (!this.checked) {
            $(parent)
                .children()
                .not(".field")
                .remove();
        } else {
            $(parent).append(`
            <td class="operator py-0 w-25">
                    <select id="operators_${$(this).val()}" name="op[${$(
                this
            ).val()}]" w-50" required>
                        <option value="=" selected="selected">is</option>
                        <option value="!=">is not</option>
                        <option value="like">any</option>
                    </select>
                </td>
                <td class="values py-0  w-50">
                    <span style="display: inline;">
                        <select class="value w-75"
                            id="select${$(this)
                                .siblings()
                                .text()
                                .toLowerCase()}" name="v[${$(
                this
            ).val()}][]" size="1" required>
                            <option value="" selected disable>Select ${$(this)
                                .siblings()
                                .text()}</option>
                        </select>

                        <span class="toggle-multiselect pointer" style="font-size: 14px;">
                            <i class="fas fa-plus-square"></i>
                        </span>
                        <span class="d-none text-danger errormsg">This field is required.</span>
                    </span>
                </td>`);
        }
    });

    $(document).on("click", ".toggle-multiselect", function() {
        var $select = $(this)
            .parents(".values")
            .find(".value");
        $select.attr("multiple")
            ? $select.removeAttr("multiple")
            : $select.attr("multiple", "multiple");
        $select.attr("multiple")
            ? $select.css("height", "100px")
            : $select.removeAttr("style");
    });

    $(document).on(
        "click",
        "#selectmodel,#selectserial,#selectstatus,#selectcustomer,#selectactionuser,#selecteserial,#selectlocation",
        function() {
            var select = $(this);
            var optionExists = 0;
            var dataSource = "";
            var IDAttr = $(this).attr("id");
            var routes = $("#frmFilter").data("routes");
            var command = $("#frmFilter").data("id");

            $.ajax({
                url: routes, //baseURL + "/equipment",
                type: "GET",
                dataType: "json",
                success: function(data) {
                    var response = data;
                    // console.log(response);
                    for (var i = 0; i < response.length; i++) {
                        if (IDAttr == "selectmodel") {
                            optionExists = $(select).children(
                                "option[value=" + response[i].emodel.id + "]"
                            ).length;
                            if (!optionExists) {
                                $(select).append(
                                    $("<option>", {
                                        value: response[i].emodel.id,
                                        text: response[i].emodel.name
                                    })
                                );
                            }
                        } else if (IDAttr == "selectserial") {
                            optionExists = $(select).children(
                                "option[value=" + response[i].id + "]"
                            ).length;
                            if (!optionExists) {
                                $(select).append(
                                    $("<option>", {
                                        value: response[i].equip_serial,
                                        text: response[i].equip_serial
                                    })
                                );
                            }
                        } else if (IDAttr == "selectstatus") {
                            optionExists = $(select).children(
                                "option[value=" + response[i].status_id + "]"
                            ).length;
                            if (!optionExists) {
                                $(select).append(
                                    $("<option>", {
                                        value: response[i].status_id,
                                        text: response[i].estatus.name
                                    })
                                );
                            }
                        } else if (IDAttr == "selectcustomer") {
                            optionExists = $(select).children(
                                "option[value=" + response[i].customer_id + "]"
                            ).length;
                            if (!optionExists) {
                                $(select).append(
                                    $("<option>", {
                                        value: response[i].customer_id,
                                        text: response[i].ecustomer.name
                                    })
                                );
                            }
                        } else if (IDAttr == "selectactionuser") {
                            optionExists = $(select).children(
                                "option[value=" + response[i].user_id + "]"
                            ).length;
                            if (!optionExists) {
                                $(select).append(
                                    $("<option>", {
                                        value: response[i].user_id,
                                        text: response[i].action_user.name
                                    })
                                );
                            }
                        } else if (IDAttr == "selecteserial") {
                            optionExists = $(select).children(
                                "option[value=" + response[i].equip_serial + "]"
                            ).length;
                            if (!optionExists) {
                                $(select).append(
                                    $("<option>", {
                                        value: response[i].equip_serial,
                                        text: response[i].equipment.equip_serial
                                    })
                                );
                            }
                        } else if (IDAttr == "selectlocation") {
                            optionExists = $(select).children(
                                "option[value=" + response[i].location_id + "]"
                            ).length;
                            if (!optionExists) {
                                $(select).append(
                                    $("<option>", {
                                        value: response[i].location_id,
                                        text: response[i].location.name
                                    })
                                );
                            }
                        }
                    }
                },
                error: function(error) {
                    //    console.log(error.statusText)
                    swal(
                        "Error! " + error.status,
                        "Something went wrong. Try again!",
                        "error"
                    );
                }
            });
        }
    );

    $("#frmFilter").on("submit", function(e) {
        e.preventDefault();
        var formData = $(this).serialize();
        var input = $(".value").val();
        var isAdmin = $('input[name="is_admin"]').val();
        var formAction = $(this).attr("action");
        var formName = $(this).data("id");

        $.ajax({
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
            },
            url: formAction, //baseURL + "/equipment/filter",
            type: "POST",
            data: formData,
            dataType: "JSON",
            success: function(data) {
                // console.log(data);
                var dt = $("#example1");
                var dtTemplate = "";
                $(dt)
                    .DataTable()
                    .clear()
                    .destroy();
                for (var i = 0; i < data.length; i++) {
                    if (formName == "equipment") {
                        dtTemplate += `<tr role="row">
                        <td></td>
                        <td>${
                            data[i].emodel.name ? data[i].emodel.name : ""
                        }</td>
                        <td>${
                            data[i].equip_serial ? data[i].equip_serial : ""
                        }</td>
                        <td>${
                            data[i].ecustomer.name ? data[i].ecustomer.name : ""
                        }</td>
                        <td>${
                            data[i].customer_po ? data[i].customer_po : ""
                        }</td>
                        <td>${
                            data[i].ecustomer_po
                                ? data[i].ecustomer_po.name
                                : ""
                        }</td>
                        <td>${
                            data[i].customer_unit ? data[i].customer_unit : ""
                        }</td>
                        <td>${
                            data[i].service_date ? data[i].service_date : ""
                        }</td>
                        <td>${data[i].estatus ? data[i].estatus.name : ""}</td>
                        <td>${
                            data[i].warranty_start ? data[i].warranty_start : ""
                        }</td>
                        <td>${
                            data[i].warranty_end ? data[i].warranty_end : ""
                        }</td>
                        <td>${
                            data[i].s_contract_start
                                ? data[i].s_contract_start
                                : ""
                        }</td>
                        <td>${
                            data[i].s_contract_end ? data[i].s_contract_end : ""
                        }</td>
                        <td>${
                            data[i].ematerial_num
                                ? data[i].ematerial_num.name
                                : ""
                        }</td>
                        <td>${
                            data[i].change_config ? data[i].change_config : ""
                        }</td>
                        <td>${
                            data[i].location_id ? data[i].location.name : ""
                        }</td>
                        <td>${
                            data[i].created_at ? data[i].created_at : ""
                        }</td>
                        <td>
                        <a href="equipment/${data[i].id}/edit"
                            class="btn btn-sm btn-warning e-update"
                            data-id=${data[i].id}>
                            <i class="far fa-eye"></i>
                        </a>
                        <a href="equipment/${data[i].id}"
                        class="btn btn-sm btn-danger btn-edit ${
                            isAdmin == 1 ? "visible" : "d-none"
                        }">
                        <i class="far fa-trash-alt"></i>
                    </a>
                    </td>
                </tr> `;
                    } else if(formName == 'serviceitems'){
                        dtTemplate += `<tr role="row">
                        <td></td>
                        <td>${data[i].status_id ? data[i].status.name : ""}</td>
                        <td>${data[i].user_id ? data[i].action_user.name : ""}</td>
                        <td>${data[i].customer_id ? data[i].customer.name : ""}</td>
                        <td>${data[i].location_id ? data[i].location.name : ""}</td>
                        <td>${data[i].equip_serial ? data[i].equipment.equip_serial : ""}</td>
                        <td>${data[i].description ? data[i].description : ""}</td>
                        <td>${data[i].issue_date ? data[i].issue_date : ""}</td>
                        <td>
                            <a href="serviceitems/${data[i].id}/edit"
                                class="btn btn-sm btn-warning e-update"
                                data-id=${data[i].id}>
                                <i class="far fa-eye"></i>
                            </a>
                            <a href="serviceitems/${data[i].id}"
                            class="btn btn-sm btn-danger btn-edit ${
                                isAdmin == 1 ? "visible" : "d-none"
                            }">
                            <i class="far fa-trash-alt"></i>
                            </a>
                        </td>
                        </tr>`;
                    }
                }
                $(dt)
                    .find("tbody")
                    .append(dtTemplate);
                // Data Table
                var script = document.createElement("script");
                script.src =
                    baseURL + "/public/customs-asset/dataTables.export.js";
                document.head.appendChild(script);
            },
            error: function(error) {
                console.log(error);
            }
        });
    });
});
