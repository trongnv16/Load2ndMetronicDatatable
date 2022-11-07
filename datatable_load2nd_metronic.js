/**
 * Load 2nd datatable
 * 
 * Reduce datatable rendering time by rendering basic fields the first time 
 * and rendering fields that take a long time to compute from the server the second time
 * 
 * 
 * @author TrongNV
 * https://github.com/trongnv16
 * 
 * @param {object} option 
 * elementId datatable Id
 * urlLoadMore url load more datatable
 * rowNameGetId field to compare with load more
 * 
 */
 DLoad2nd = function (option) {
    let l2ndElementId   = option.elementId;
    let l2ndUrlLoadMore = option.urlLoadMore;
    let l2ndRowNameGetId    = option.rowNameGetId;
    
    $("#" + l2ndElementId).on("datatable-on-init", function(event, data) {
        $("#" + l2ndElementId).find("tbody .nt-load-2nd span").html(ntLoadingHtml);
    })

    $("#" + l2ndElementId).on("datatable-on-ajax-done", function(event, data) {
        let rowIdArr = [];
        data.forEach(element => {
            rowIdArr.push(element[l2ndRowNameGetId]);
        });

        $.ajax({
            url: l2ndUrlLoadMore, 
            method: "GET",
            data: {
                rowId: rowIdArr.toString()
            },
            success: function(result) {
                if (result.length > 0) {
                    result.forEach((row, index) => {
                        for (const fieldName in row) {
                            $("p:nth-child(3)")
                            let tdHasFieldname = $("#" + l2ndElementId + " tbody tr:nth-child(" + (index + 1) + ")").find("[data-field=" + fieldName + "]");
                            if (tdHasFieldname.hasClass("nt-load-2nd")) {
                                tdHasFieldname.find("span").text(row[fieldName]);
                            }
                        }
                    });
                }
    
                $(".loading").html("");
            },
            error: function() {
                $("#" + l2ndElementId).find("tbody .nt-load-2nd span").html("");
            }
        });
    });
}

const ntLoadingHtml = '<div class="spinner-border spinner-border-sm text-secondary" role="status"><span class="sr-only">Loading...</span></div>';
