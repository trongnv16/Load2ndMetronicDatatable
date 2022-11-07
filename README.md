Load 2nd Metronic Datatable

Reduce datatable rendering time by rendering basic fields the first time and rendering fields that take a long time to compute from the server the second time

Using:

    DLoad2nd({
        elementId: "kt_datatable_product",
        rowNameGetId: "id",
        urlLoadMore: "/product-datatable-load-more",
    });
    
    $('#kt_datatable_product').KTDatatable({
        scrollX: true,
        data: {
            type: 'remote',
            source: {
                read: {
                    url: '/product-datatable',
                    method: 'GET',
                    map: function (raw) {
                        // sample data mapping
                        var dataSet = raw;
                        if (typeof raw.data !== 'undefined') {
                            dataSet = raw.data;
                        }
                    },
                },
            },
            pageSize: 10,
            serverPaging: true,
            serverFiltering: true,
            serverSorting: true,
        },

        // layout definition
        layout: {
            scroll: true,
            footer: false,
        },

        // column sorting
        sortable: true,
        pagination: true,

        // columns definition
        columns: [
        {
            field: 'index',
            title: '',
            width: 30,
            sortable: false,
            autoHide: false,
        },{
            field: 'name',
            title: 'Tên',
            sortable: false,
            autoHide: false,
        },{
            field: 'phoneNumber',
            title: 'Số ĐT',
            width: 90,
            autoHide: false,
        },{
            sortable: false,
            field: 'monthlyPerformance',
            width: 100,
            title: 'Hiệu suất tháng',
            autoHide: false,
            class: "nt-load-2nd",
        }
    });
