/**************|Parameter|**************/
var width1 = "300px";
var width2 = "148px";
var AjaxConfig = {
    timeout: 60 * 60000
}
var kd = {
    km: "kendoMultiSelect"
    , kdp: "kendoDatePicker"
    , kdtp: "kendoDateTimePicker"
    , kdrl: "kendoDropDownList"
    , kts: "kendoTabStrip"
    , kg: "kendoGrid"
    , kbtn: "kendoButton"
    , kntb: "kendoNumericTextBox"
    , error: "KendoControlError"
    , kv: "kendoValidator"
    , kpb: "kendoPanelBar"
    , kw: "kendoWindow"
    , klv: "kendoListView"
    , ku: "kendoUpload"
    , kmtb: "kendoMaskedTextBox"
}
var KendoDatePickerTextAll = {
    date: { start: "month", depth: "month", format: "dd/MM/yyyy", sqlFormat: "yyyy.MM.dd" }
    , month: { start: "year", depth: "year", format: "MM/yyyy", sqlFormat: "yyyy.MM.01" }
}
var KendoDateTimePickerTextAll = {
    datetime: { format: "dd/MM/yyyy hh:mm tt", sqlFormat: "yyyy.MM.dd HH:mm:ss" }
}
var KendoMultiSelectTextAll = {
    li1Class: "li.k-state-selected"
    , li0Class: "li:not(.k-state-selected)"
    , chkFind: "input[type='checkbox']"
    , itemSelectAll: { text: "Tất cả", value: -9999 }
}
var KendoNumericTextBoxTextAll = {
    spinners: false
    , format: "n0"
    , min: 0
    , decimals: 0
}
var KendoGridTextAll = {
    format: { int: "n0", float: "n3", percent: "n2", date: "dd/MM/yyyy", dateTime: "dd/MM/yyyy HH:mm:ss", tfInt: "{0:n0}", tfFloat: "{0:n3}" }
    , numberTypes: ["int", "float", "percent"]
    , specialPercent: {
        value: -9999
        , text: "N/A"
    }
    , specialDate: {
        value: -62135596800000
    }
    , aggregate: ["count", "sum", "average", "max", "min"]
    , imgSrc: {
        expand: "../../../Content/images/icons/plus.png"
        , collapse: "../../../Content/images/icons/minus.png"
        , none: "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
    }
    , tbExpCol: "" +
        "<table id=\"tbExpCol\" class=\"tbExpColAll\">" +
            "<tr>" +
                "<td><button id=\"btnColAll\"><<</button></td>" +
                "<td><button id=\"btnColOne\"><</button></td>" +
                "<td><button id=\"btnExpOne\">></button></td>" +
                "<td><button id=\"btnExpAll\">>></button></td>" +
            "</tr>" +
        "</table>"
    , tbExportExcel: "" +
        "<table id=\"tbExportExcel\" class=\"tbExportExcel\">" +
            "<tr>" +
                "<td><button id=\"btnExportExcel\" class=\"btnExportExcel\" title=\"Xuất Excel\"></button></td>" +
                "<td><label id=\"lblExportExcelStatus\" class=\"lblExportExcelStatus\"></label></td>" +
            "</tr>" +
        "</table>"
    , tbDrawChart: "" +
        "<table id=\"tbDrawChart\">" +
            "<tr>" +
                "<td><button id=\"btnDrawChart\" class=\"btnDrawChart\" title=\"Vẽ biểu đồ\"></button></td>" +
            "</tr>" +
        "</table>"
    , tbDrawChartFilter: "" +
        "<table id=\"tbDrawChartFilter\" class=\"tbFilter\">" +
            "<tr>" +
                "<td>Vẽ theo cột</td>" +
                "<td><div id=\"cbbDrawColumn\"></div></td>" +
            "</tr>" +
            "<tr>" +
                "<td>Vẽ theo loại chart</td>" +
                "<td><div id=\"cbbDrawTypeChart\"></div></td>" +
            "</tr>" +
        "</table>"
    , dfUrlLoadData: "/PartialView/v2PartialView/LoadData"
    , dfUrlExportExcel: "/PartialView/v2PartialView/ExportExcel"
}
var KendoWindowTextAll = {
    actions: ["Pin", "Minimize", "Maximize", "Close"]
};
var KendoUploadTextAll = {
    fileExtensions: {
        images: ["gif", "jpg", "jpeg", "png"]
        , excel: ["xlsx"]
    }
    , maxSize: 1024 * 1024 * 2/*|2Mb|*/
}
var sms = {
    error: "<span class=\"lblExportExcelStatus\">Lỗi dữ liệu</span>"
    , disable: "Chức năng bị khóa vì nghi vấn hack!"
};
var ExportExcelTextAll = {
    jsonStringMaxLength: 2000000
    , fileUploadMaxLength: 5 * 1024
    , isDeleteFileAfterDownloaded: true
}
var UCNotsave = ["btnAlertOk", "btnConfirmCancel", "btnConfirmOk", "gridMenu_btnColAll", "gridMenu_btnColOne", "gridMenu_btnExpAll", "gridMenu_btnExpOne"];

$(document).ready(function () {
    UC = {};
    createSMS();
    createMenu();
});

/**************|OverWrites Find Contain in Jquery|**************/
$.expr[":"].contains = $.expr.createPseudo(function (arg) {
    return function (elem) {
        return $(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;
    };
});

jQuery.fn.extend({
    enable: function (IsEnable) {
        if (arguments.callee.caller == null) { return sms.disable; }
        if (IsEnable == null) {
            IsEnable = (this.attr("disabled") == "disabled") ? false : true;
            return IsEnable;
        }
        if (IsEnable) {
            this.removeAttr("disabled");
        } else {
            this.attr("disabled", "disabled");
        }
    }
    , error: function (IsError) {
        var classError = kd.error;
        if (IsError == null) {
            IsError = this.hasClass(classError);
            return IsError;
        };
        var o = this;
        var dataRole = this.attr("data-role");
        if (dataRole == "numerictextbox") {
            o = this.prev();
        };
        if (IsError) {
            o.focus();
            this.addClass(classError);
        } else {
            this.removeClass(classError);
        }
    }
    , checked: function (IsChecked) {
        if (IsChecked == null) {
            IsChecked = this.prop("checked");
            return IsChecked;
        }
        this.prop("checked", IsChecked);
    }
});

/**************|Kendo TabStrip|**************/
function createKendoTabStrip(allData) {
    var ctrID = allData.ctrID;
    var ctrID2 = "#" + ctrID;
    var onActive = allData.onActive;
    var kts = $(ctrID2).kendoTabStrip({
        animation: false
        , activate: onActive
    }).data(kd.kts);
    kts.UC = {
        enable: function (index, isEnable) {
            var tSelect = kts.tabGroup.children().eq(index);
            kts.enable(tSelect, isEnable);
        }
    };
    UC[ctrID] = kts;
}

/**************|Kendo MultiSelect|**************/
function createKendoMultiSelect(allData) {
    var t = KendoMultiSelectTextAll;
    var ctrID = allData.ctrID;
    var ctrID2 = "#" + ctrID;
    var dataTextField = allData.dataTextField;
    var dataValueField = allData.dataValueField;
    var placeholder = allData.placeholder;
    var maxSelectedItems = allData.maxSelectedItems;
    var onSelect = allData.onSelect;
    var onChange = allData.onChange;
    var onDataBound = allData.onDataBound;
    var onSuccess = allData.onSuccess;
    var width = allData.width;
    var k = allData.k;
    var itemTemplate = "<input type=\"checkbox\" class=\"KendoMultiSelect_CheckBox\" value=\"#:data[\"" + dataValueField + "\"]#\" />";
    itemTemplate += "<label>#:" + dataTextField + "#</label>";

    KendoMultiSelectReset({ ctrID: ctrID, ctrWidth: allData.ctrWidth });
    var km = $(ctrID2).kendoMultiSelect({
        dataTextField: dataTextField
        , dataValueField: dataValueField
        , placeholder: placeholder
        , itemTemplate: itemTemplate
        , filter: "contains"
        , autoClose: false
        , maxSelectedItems: maxSelectedItems
        , select: onSelect
        , change: function (e) {
            KendoMultiSelectRefig({ e: e });
            if (onChange != null) {
                onChange(e);
            }
        }
        , filtering: function (e) {
            e.preventDefault();
            var txtFilter = e.filter.value.toLowerCase();
            var km = e.sender;
            var ul = km.ul;
            var li1 = ul.find("li:contains('" + txtFilter + "')");
            var li0 = ul.find("li:not(:contains('" + txtFilter + "'))");
            li1.css("display", "");
            li0.css("display", "none");
        }
        , dataBound: function (e) {
            var km = e.sender;
            var dataSource = km.dataSource;
            if (km.UC == null) { return; }
            if (km.UC["FirstTime"]) {
                var data = deepCopy({ data: dataSource.data() });
                var values = [];
                data = data.filter(function (obj) {
                    obj["IsChecked"] = false;
                    values.push(obj[dataValueField]);
                    return obj;
                });
                var isAddAll = false;
                if (maxSelectedItems != null) {
                    if (maxSelectedItems == 1) {
                        km.UC["MaxSelectedItems"] = maxSelectedItems;
                    } else {
                        km.UC["MaxSelectedItems"] = maxSelectedItems;
                        isAddAll = true;
                    }
                } else {
                    km.UC["MaxSelectedItems"] = values.length;
                    isAddAll = true;
                }

                if (isAddAll) {
                    var itemSelectAll = new Object();
                    itemSelectAll[dataTextField] = t.itemSelectAll.text;
                    itemSelectAll[dataValueField] = t.itemSelectAll.value;
                    data.splice(0, 0, itemSelectAll);
                }
                km.UC["Values"] = values;
                km.UC["FirstTime"] = false;
                km.UC["IsAddAll"] = isAddAll;

                var newDataSource = createKendoDataSource({ data: data, kind: 2 });
                km.setDataSource(newDataSource);
            } else {
                KendoMultiSelectRefig({ e: e });
            }
            if (onDataBound != null) {
                onDataBound(e);
            }
        }
    }).data(kd.km);
    km.list.width(width);

    km.UC = {
        ctrID: ctrID
        , k: k
        , data: allData.data
        , url: allData.url
        , filter: allData.filter
        , dataTextField: dataTextField
        , dataValueField: dataValueField
        , filterField: allData.filterField
        , Refig: function () {
            KendoMultiSelectRefig({ e: { sender: km } });
        }
        , value: function (values) {
            var vType = jQuery.type(values);
            //'null','undefined','string','object','array'
            switch (vType) {
                case "undefined":
                    var valueReturn = getKendoMultiSelectValue({ ctrID: ctrID });
                    return valueReturn;
                    break;
                case "object":
                    values.ctrID = ctrID;
                    var valueReturn = getKendoMultiSelectValue(values);
                    return valueReturn;
                    break;
                default:
                    KendoMultiSelectSetValue({ ctrID: ctrID, values: values });
                    break;
            }
        }
        , refresh: function () {
            KendoMultiSelectRefresh(km.UC);
        }
        , onSuccess: onSuccess
        , arrConcat: allData.arrConcat
        , cascadings: allData.cascadings
    };
    UC[ctrID] = km;
    KendoMultiSelectRefresh(allData);
}

function getKendoMultiSelectValue(allData) {
    var ctrID = allData.ctrID;
    var ctrID2 = "#" + ctrID;
    var valueField = allData.valueField;
    var format = allData.format;

    var km = $(ctrID2).data(kd.km);
    var dataValueField = km.options.dataValueField;
    var values = km.value();

    if (valueField != null) {
        var dataItems = km.dataItems();
        values = [];
        switch (format) {
            case "string":
                dataItems.filter(function (obj) {
                    values.push("'" + obj[valueField] + "'");
                });
                break;
            default:
                dataItems.filter(function (obj) {
                    values.push(obj[valueField]);
                });
                break;
        }
    }
    values += "";

    return values;
}

function KendoMultiSelectCreateDataSource(allData) {
    var data = allData.data;
    var values = allData.values;
    var km = allData.km;
    km.UC["FirstTime"] = true;
    var dataSource = createKendoDataSource({ data: data, kind: 2 });
    km.setDataSource(dataSource);
    KendoMultiSelectSetValue({ ctrID: km.UC.ctrID, values: values });
}

function KendoMultiSelectReset(allData) {
    var ctrID = allData.ctrID;
    var ctrID2 = "#" + ctrID;
    $(ctrID2).attr("id", ctrID + "_temp");
    $(ctrID2 + "_temp").before("<select id=\"" + ctrID + "\"></select>");
    $(ctrID2 + "_temp").remove();
    $(ctrID2).addClass("KendoControl");
    $(ctrID2).addClass("KendoMultiSelect");
    $(ctrID2).css("width", allData.ctrWidth);
}

function KendoMultiSelectRefig(allData) {
    var t = KendoMultiSelectTextAll;
    var ta = t.itemSelectAll;

    var e = allData.e;
    var km = e.sender;
    var kmInput = km.input[0];
    var kmValues = km.UC["Values"];
    var ul = km.ul;
    var liAll = ul.find("li:eq(0)");
    var chkAll = liAll.find(t.chkFind);

    var values = km.value();
    var isCheckAll = (values.indexOf(ta.value) != -1);
    var n = values.length;
    var m = kmValues.length;
    var checkedType = "";
    var placeholder = km.options.placeholder;
    if (isCheckAll) {
        if (n > m) {
            checkedType = "none";
            values = [];
        } else {
            checkedType = "all";
            values = kmValues;
        }
    } else {
        switch (n) {
            case 0:
                checkedType = "none";
                break;
            case m:
                checkedType = "all";
                break;
            default:
                checkedType = "default";
                break;
        }
    }

    km.value([]);
    km.value(values);

    var li1 = ul.find(t.li1Class);
    var li0 = ul.find(t.li0Class);
    var chk1 = li1.find(t.chkFind);
    var chk0 = li0.find(t.chkFind);
    chk1.prop("checked", true);
    chk0.prop("checked", false);

    switch (checkedType) {
        case "all":
            liAll.removeClass();
            liAll.addClass("k-item k-stae-selected");
            chkAll.prop("indeterminate", false);
            chkAll.prop("checked", true);
            placeholder = "Bạn đã chọn hết";
            break;
        case "none":
            chkAll.prop("indeterminate", false);
            chkAll.prop("checked", false);
            break;
        default:
            var isAddAll = km.UC["IsAddAll"];
            if (isAddAll) {
                chkAll.prop("indeterminate", true);
                placeholder = "Bạn đã chọn " + n + "/" + km.UC["MaxSelectedItems"];
            } else {
                placeholder = "Chỉ chọn 1, nhấn backspace để chọn lại";
            }
            break;
    }
    kmInput.placeholder = placeholder;
}

function KendoMultiSelectSetValue(allData) {
    var ctrID = allData.ctrID;
    var ctrID2 = "#" + ctrID;
    var values = allData.values;
    var km = $(ctrID2).data(kd.km);
    km.value([]);
    km.value(values);
    km.UC.Refig();
}

function KendoMultiSelectRefresh(allData) {
    var ctrID = allData.ctrID;
    var ctrID2 = "#" + ctrID;
    var values = allData.values;

    var onSuccess = allData.onSuccess;
    var km = $(ctrID2).data(kd.km);

    if (allData.data == null) {
        getAjaxCallObject({
            url: allData.url
            , filter: allData.filter
            , onSuccess: function (data) {
                if (data == null || jQuery.type(data) == "string") { alert({ title: sms.error, message: data }); return; }
                if (allData.arrConcat != null) {
                    data = data.concat(allData.arrConcat);
                }
                KendoMultiSelectCreateDataSource({ data: data, km: km, values: values });
                if (onSuccess != null) {
                    onSuccess(data);
                }
            }
        });
    } else {
        KendoMultiSelectCreateDataSource({ data: allData.data, km: km, values: values });
        if (onSuccess != null) {
            onSuccess(allData.data);
        }
    }
}

/**************|Kendo DropDownList|**************/
function createKendoDropDownList(allData) {
    var d = allData;
    var ctrID = d.ctrID;
    var ctrID2 = "#" + ctrID;
    var onSuccess = allData.onSuccess;
    var index = allData.index;
    $(ctrID2).addClass("KendoControl");
    $(ctrID2).css("width", d.ctrWidth);

    if (d.cascadings != null && d.onChange == null) {
        d.onChange = cbbDefaultChange;
    };
    var kdrl = $(ctrID2).kendoDropDownList({
        dataTextField: d.dataTextField
        , dataValueField: d.dataValueField
        , change: d.onChange
        , select: d.onSelect
        , optionLabel: d.optionLabel
        , enable: d.enable
        , filter: d.search || "none"
    }).data(kd.kdrl);
    kdrl.list.width(d.width);

    kdrl.UC = {
        ctrID: d.ctrID
        , k: d.k
        , data: d.data
        , url: d.url
        , filter: d.filter
        , dataTextField: d.dataTextField
        , dataValueField: d.dataValueField
        , filterField: d.filterField
        , index: index
        , value: function (value) {
            var vType = jQuery.type(value);
            switch (vType) {
                case "undefined":
                    var valueReturn = getKendoDropDownListValue({ ctrID: ctrID });
                    return valueReturn;
                    break;
                case "object":
                    value.ctrID = ctrID;
                    var valueReturn = getKendoDropDownListValue(value);
                    return valueReturn;
                    break;
                default:
                    KendoDropDownListSetValue({ ctrID: ctrID, value: value });
                    break;
            }
        }
        , error: function (isError) {
            KendoDropDownListSetError({ ctrID: ctrID, isError: isError });
        }
        , refresh: function () {
            KendoDropDownListRefresh(kdrl.UC);
        }
        , onSuccess: onSuccess
        , arrConcat: d.arrConcat
        , cascadings: d.cascadings
    };
    UC[ctrID] = kdrl;
    KendoDropDownListRefresh(d);
}

function getKendoDropDownListValue(allData) {
    var ctrID = allData.ctrID;
    var ctrID2 = "#" + ctrID;
    var valueField = allData.valueField;
    var format = allData.format;

    var kdrl = $(ctrID2).data(kd.kdrl);
    var dataValueField = kdrl.options.dataValueField;
    var values = kdrl.value() + "";

    if (valueField != null && valueField != dataValueField && kdrl.dataItem() != null) {
        var dataItem = kdrl.dataItem();
        values = dataItem[valueField] + "";
    }
    if (format == "string") {
        values = "'" + values + "'";
    }

    return values;
}

function KendoDropDownListCreateDataSource(allData) {
    var ctrID = allData.ctrID;
    var ctrID2 = "#" + ctrID;
    var data = allData.data;
    var value = allData.value;
    var index = allData.index;

    var kdrl = $(ctrID2).data(kd.kdrl);
    var dataSource = createKendoDataSource({ data: data, kind: 2 });
    kdrl.setDataSource(dataSource);
    KendoDropDownListSetValue({ ctrID: ctrID, value: value });
    //kdrl.UC["data"] = data;
    if (index != null && value == null) { kdrl.select(index); }
}

function KendoDropDownListSetValue(allData) {
    var ctrID = allData.ctrID;
    var ctrID2 = "#" + ctrID;
    var value = allData.value;
    $(ctrID2).val("");

    var kdrl = $(ctrID2).data(kd.kdrl);
    kdrl.value("");
    kdrl.value(value);
}

function KendoDropDownListSetError(allData) {
    var ctrID = allData.ctrID;
    var ctrID2 = "#" + ctrID;
    var isError = allData.isError;

    var cbb = $(ctrID2);
    var kdrl = $(ctrID2).data(kd.kdrl);
    var prevCbb = cbb.prev();
    if (isError) {
        prevCbb.addClass(kd.error);
        kdrl.focus();
    } else {
        prevCbb.removeClass(kd.error);
    }
}

function KendoDropDownListRefresh(allData) {
    var ctrID = allData.ctrID;
    var value = allData.value;
    if (jQuery.type(value) == "function") {
        value = allData.defaultValue;
    }
    var onSuccess = allData.onSuccess;
    var index = allData.index;

    if (allData.data == null) {
        getAjaxCallObject({
            url: allData.url
            , filter: allData.filter
            , onSuccess: function (data) {
                if (data == null || jQuery.type(data) == "string") { alert({ title: sms.error, message: data }); return; }
                if (allData.arrConcat != null) {
                    data = data.concat(allData.arrConcat);
                }
                KendoDropDownListCreateDataSource({ ctrID: ctrID, data: data, value: value, index: index });
                if (onSuccess != null) {
                    onSuccess(data);
                }
            }
        });
    } else {
        KendoDropDownListCreateDataSource({ ctrID: ctrID, data: allData.data, value: value, index: index });
        if (onSuccess != null) {
            onSuccess(allData.data);
        }
    }
}

/******|Kendo NumericTextBox: spinners: nút tăng giảm ; format: định dạng|******/
function createKendoNumericTextBox(allData) {
    var t = KendoNumericTextBoxTextAll;
    var ctrID = allData.ctrID;
    var ctrID2 = "#" + ctrID;
    var spinners = allData.spinners;
    var format = allData.format;
    var max = allData.max;
    var min = allData.min;
    var decimals = allData.decimals;
    var value = allData.value;
    var width = allData.width;
    $(ctrID2).addClass("KendoControl stt");
    if (width != null) {
        $(ctrID2).width(width);
    }

    spinners = spinners || t.spinners;
    format = format || t.format;
    min = min || t.min;
    decimals = decimals || t.decimals;

    var kntb = $(ctrID2).kendoNumericTextBox({
        spinners: spinners
        , format: format
        , max: max
        , min: min
        , decimals: decimals
        , value: value
    }).data(kd.kntb);
    UC[ctrID] = kntb;
}

/**************|Kendo Grid|**************/
function createKendoGrid(allData) {
    var ctrID = allData.ctrID;
    var ctrID2 = "#" + ctrID;
    var tabstrip = allData.tabstrip;
    var panelbar = allData.panelbar;
    var reportTitle = allData.reportTitle;
    var gridType = allData.gridType;
    var editable = allData.editable;
    if (tabstrip != null) { selectTab(tabstrip); }
    if (panelbar != null) { selectPanelbar(panelbar); }
    if (reportTitle != null) { setLabelText(reportTitle); }
    KendoGridReset({ ctrID: ctrID, height: allData.height });

    var f = {};
    var d = {};
    switch (gridType) {
        case "GridLevel":
            d = KendoGridLevelGetData(allData);
            break;
        default:
            gridType = "";
            d = KendoGridDefaultGetData(allData);
            break;
    }

    /***********************|GridEdit|***********************/
    if (editable != null) {
        f.edit = allData.onEdit || KendoGridOnEdit;
        f.save = function (e) {
            var container = e.container;
            var item = e.model;
            var input = container.find("input");
            var fieldName = input.attr("name");
            item.dirtyFields[fieldName] = true;
        }
    }

    /******************|Create Empty Grid|*******************/
    var columns = d.Columns;
    if (d.GroupHeader != null) { columns = d.GroupHeader };
    f.dataSource = d.DataSource;
    f.columns = columns;
    f.columnMenu = d.ColumnMenu;
    f.selectable = d.Selectable;
    f.filterable = d.FilterAble;
    f.sortable = d.SortAble;
    f.pageable = d.PageAble;
    f.dataBound = allData.onDataBound;
    f.dataBinding = allData.onDataBinding;
    f.filterMenuInit = d.FilterMenuInit;
    f.editable = d.Editable;
    d.GridType = gridType;
    d.filter = allData.filter;
    d.Export = function (dataExport) {
        dataExport = dataExport || { exportType: "xlsx" };
        var exportType = dataExport.exportType;
        KendoGridExportExcel({ ctrID: ctrID });
    }
    var kg = $(ctrID2).kendoGrid(f).data(kd.kg);
    kg.UC = d;
    UC[ctrID] = kg;
    KendoLoadAjax({ ctrID: ctrID, isLoad: true });

    if (allData.data == null) {
        /****|Dữ liệu lấy từ database|****/
        getAjaxCallObject({
            url: allData.url
            , filter: d.filter
            , onSuccess: function (data) {
                KendoGridRefresh({ ctrID: ctrID, data: data, exportExcel: allData.exportExcel, drawChart: allData.drawChart, onSuccess: allData.onSuccess });
            }
        });
    } else {
        /****|Dữ liệu coder truyền vào|****/
        KendoGridRefresh({ ctrID: ctrID, data: allData.data, exportExcel: allData.exportExcel, drawChart: allData.drawChart, onSuccess: allData.onSuccess });
    }
}

function KendoGridRefresh(allData) {
    var ctrID = allData.ctrID;
    var ctrID2 = "#" + ctrID;
    var kg = $(ctrID2).data(kd.kg);
    var gridType = kg.UC.GridType;
    var data = allData.data;

    if (data == null || jQuery.type(data) == "string") {
        console.log(data);
        alert({ title: sms.error, message: "Đã có lỗi xảy ra, vui lòng liên hệ ISC" });
        return;
    }
    kg.UC["Data"] = data;
    switch (gridType) {
        case "GridLevel":
            KendoGridLevelRefig({ ctrID: ctrID });
            break;
        default:
            KendoGridDefaultRefig({ ctrID: ctrID });
            break
    }
    /*****************|Add table Export Excel|*****************/
    KendoGridCreateTbExportExcel({ ctrID: ctrID, exportExcel: allData.exportExcel });

    /*****************|Add table Draw Chart|*****************/
    KendoGridCreateTbDrawChart({ ctrID: ctrID, drawChart: allData.drawChart });

    if (allData.onSuccess != null) { allData.onSuccess(data); }
}

function KendoGridReset(allData) {
    var ctrID = allData.ctrID;
    var ctrID2 = "#" + ctrID;
    if (UC[ctrID] != null) { UC[ctrID].destroy(); }
    $(ctrID2).css("height", allData.height);
    var kg = $(ctrID2);
    kg.addClass("KendoGrid");
    kg[0].innerHTML = "";
}

function KendoLoadAjax(allData) {
    var ctrID = allData.ctrID;
    var ctrID2 = "#" + ctrID;
    var isLoad = allData.isLoad;
    var kg = $(ctrID2).data(kd.kg);
    kendo.ui.progress($(ctrID2), isLoad);
}

function KendoGridRePercent(allData) {
    var t = KendoGridTextAll;
    var tf = t.format;
    var tsp = t.specialPercent;

    var value = allData.value;
    if (value == tsp.value || value == null || isNaN(value) || value == Infinity) {
        value = tsp.text;
    } else {
        value = kendo.format("{0:" + tf.percent + "}%", value);
    }

    return value;
}

function KendoGridReDate(allData) {
    var t = KendoGridTextAll;
    var ts = t.specialDate;
    var tf = t.format;
    var format = allData.format || tf.date;
    var spDate = new Date(ts.value);

    var value = allData.value;
    var vType = jQuery.type(value);

    /************|Convert Json Date to Javascript Date|************/
    if (vType == "string") {
        value = kendo.parseDate(value);
    }
    var a = value + "";
    var b = spDate + "";
    if (a == b || value == null) {
        return "";
    }
    var text = kendo.format("{0:" + format + "}", value);

    return text;
}

function KendoGridReDirtyField(allData) {
    var data = allData.data;
    var fieldName = allData.fieldName;
    data.dirtyFields = data.dirtyFields || {};
    if (data.dirty && data.dirtyFields[fieldName]) {
        return "<span class=\"k-dirty\"></span>";
    }
    else {
        return "";
    }
}

function KendoGridGetChecked(allData) {
    var value = allData.value;
    var text = "";
    if (value) {
        text = "checked";
    }
    return text;
}

function KendoGridGroupHeader(allData) {
    var groupHeader = allData.groupHeader;
    var columns = allData.columns;
    var parentHeader = allData.parentHeader;
    var exportExcel = allData.exportExcel;
    var groupHeaderType = jQuery.type(groupHeader);

    switch (groupHeaderType) {
        case "object":
            if (groupHeader.field == null && groupHeader.columns == null) { return groupHeader; }

            /**********************|Line|*********************/
            var line = 1;
            if (parentHeader != null) { line = parentHeader.line + 1; }
            exportExcel.groupHeader[line - 1] = exportExcel.groupHeader[line - 1] || [];
            columns.filter(function (obj) {
                if (obj.field == groupHeader.field && obj.field != null) {
                    groupHeader = obj;
                }
            });

            /*******************|Lưu dữ liệu|******************/
            var listColumns = exportExcel.groupHeader[line - 1];
            var n = listColumns.length;
            groupHeader.line = line;
            listColumns.push({
                field: groupHeader.field
                , title: groupHeader.title
                , line: line
                , mergeCol: 1
            });

            if (groupHeader.field != null) {
                /*******************|Là một column|******************/
                for (var l = line - 2; l >= 0; l--) {
                    var previousColumns = exportExcel.groupHeader[l];
                    if (listColumns.length > previousColumns.length) {
                        var mergeCol = previousColumns[previousColumns.length - 1].mergeCol;
                        if (mergeCol > 0) {
                            mergeCol = -1;
                        } else {
                            mergeCol -= 1;
                        }
                        previousColumns.push({
                            title: ""
                            , line: l + 1
                            , mergeCol: mergeCol
                        });
                        var parentColumn = previousColumns[n - Math.abs(mergeCol)];
                        parentColumn.mergeCol += 1;
                    }
                }
            } else {
                /*******************|Là một group column|******************/
                exportExcel.groupHeader[line] = exportExcel.groupHeader[line] || [];
                var nextColumns = exportExcel.groupHeader[line];
                var m = nextColumns.length;
                var add = n - m;
                for (var k = 0; k < add; k++) {
                    nextColumns.push({ title: "", line: line + 1 });
                }
                groupHeader.columns = KendoGridGroupHeader({ groupHeader: groupHeader.columns, columns: columns, exportExcel: exportExcel, parentHeader: groupHeader });
            }
            break;
        case "array":
            /***************|Danh sách các column|***************/
            for (var i = 0; i < groupHeader.length; i++) {
                groupHeader[i] = KendoGridGroupHeader({ groupHeader: groupHeader[i], columns: columns, exportExcel: exportExcel, parentHeader: parentHeader });
            }
            break;
        default:
            break;
    }

    return groupHeader;
}

/**************|Kendo Grid Level|**************/
function KendoGridLevelGetData(allData) {
    var t = KendoGridTextAll;
    var tf = t.format;
    var ta = t.aggregate;

    var ctrID = allData.ctrID;
    var ctrID2 = "#" + ctrID;
    var groupHeader = allData.groupHeader;
    var columns = allData.columns;
    var aggregate = [{ field: "Level", aggregate: "max" }];
    var columns2 = [{
        title: "", width: "50px"
        , template: "<img src=\"#=KendoGridLevelExpColImgSrc({ctrID:'" + ctrID + "',index:index})#\" onclick=\"KendoGridLevelExpColItem({ctrID:'" + ctrID + "',index:#:index#})\" />"
        , attributes: { "class": "expCol" }
    }];
    var isLocked = false;
    $(ctrID2).addClass("GridLevel");
    
    for (var i = 0; i < columns.length; i++) {
        var col = columns[i];
        var colType = col.type;
        var colTemplate = col.template;
        var colAttributes = col.attributes || {};
        var colOnClick = col.onClick;
        var colFooterTemplate = col.footerTemplate;
        var colFooterAttributes = col.footerAttributes || {};
        var isNumber = false;
        colAttributes["class"] = colAttributes["class"] || "";
        colAttributes["class"] += " Level#:Level#";
        colAttributes["data-content"] = "#:" + col.field + "#";

        /***********************|Column Type|***********************/
        switch (colType) {
            case "int":
                isNumber = true;
                colTemplate = colTemplate || ("#:" + col.field + "==null? '':kendo.format(\"{0:" + tf.int + "}\"," + col.field + ")#");
                break;
            case "float":
                isNumber = true;
                colTemplate = colTemplate || ("#:" + col.field + "==null? '':kendo.format(\"{0:" + tf.float + "}\"," + col.field + ")#");
                break;
            case "percent":
                isNumber = true;
                colTemplate = colTemplate || ("#=KendoGridRePercent({value: " + col.field + "})#");
                break;
            case "boolean":
                isNumber = false;
                var getChecked = "#=KendoGridGetChecked({value:" + col.field + "})#";
                colTemplate = colTemplate || ("<input type=\"checkbox\" disabled " + getChecked + " />");
                break;
            case "date":
                isNumber = false;
                colTemplate = colTemplate || ("#=KendoGridReDate({value:" + col.field + "})#");
                break;
            default:
                isNumber = false;
                colType = "string";
                colTemplate = colTemplate || ("#:" + col.field + "==null? '':" + col.field + "#");
                break;
        }
        if (isNumber) { colAttributes["class"] += " stt"; }
        colAttributes["class"] = colAttributes["class"].trim();

        /***********************|Column OnClick|***********************/
        if (colOnClick != null) {
            var aO = "<a href=\"javascript:;\" onClick=\"" + colOnClick + "\" >";
            var aC = "</a>";
            colTemplate = aO + colTemplate + aC;
        }

        /***********************|Column Footer|***********************/
        if (colFooterTemplate != null && colFooterTemplate.indexOf("#") != -1) {
            /**************|Add Aggregate|**************/
            ta.filter(function (obj) {
                var k = colFooterTemplate.indexOf(obj);
                if (k != -1) {
                    aggregate.push({ field: col.field, aggregate: obj });
                }
            });
            /**************|Calculate Level 1 Only|**************/
            var fdData = colFooterTemplate.match(/#:(.*?)#/g, "");
            for (var j = 0; j < fdData.length; j++) {
                var fd = fdData[j];
                fd = fd.substring(2, fd.length - 1);
                var fd2 = "#=KendoGridLevelReSum({ctrID:\"" + ctrID + "\",field:\"" + col.field + (j + 1) + "\",value:" + fd + "})#";

                var res = fdData[j];
                res = escapeRegExp(res);
                res = new RegExp(res, "g");
                colFooterTemplate = colFooterTemplate.replace(res, fd2);

                var fd3 = fd2.substring(2, fd2.length - 1);
            }
            colFooterTemplate = "<span class=\"stt\">" + colFooterTemplate + "</span>";
            colFooterAttributes["data-content"] = "";
        }

        /***********************|Column Edit|***********************/
        var colEditor = null;
        if (col.edit != null) {
            var colEdit = col.edit;
            colEditor = colEdit.editor;
            if (colEditor == null) {
                switch (colType) {
                    case "date":
                        colEditor = function (container, options) {
                            KendoGridEditorDate({ ctrID: ctrID, container: container, options: options });
                        }
                    default:
                        break;
                }
            }
            var getDirtyStyle = "#=KendoGridReDirtyField({data:data,fieldName:\"" + col.field + "\"})#";
            colTemplate = getDirtyStyle + colTemplate;
        }

        /***********************|Add Column|***********************/
        var col2 = {
            field: col.field
            , title: col.title
            , width: col.width
            , type: colType
            , template: colTemplate
            , attributes: colAttributes
            , footerTemplate: colFooterTemplate
            , footerAttributes: colFooterAttributes
            /******Col Edit******/
            , edit: col.edit
            , editor: colEditor
            , locked: col.locked
        };
        if (col.locked) { isLocked = true; }
        columns2.push(col2);
    }
    columns2[0].locked = isLocked;
    columns2[1].attributes["class"] += " Name";
    
    /***************|Group Header|***************/
    var exportExcel = { groupHeader: null };
    if (groupHeader != null) {
        groupHeader.splice(0, 0, columns2[0]);
        exportExcel.groupHeader = [];
        KendoGridGroupHeader({ groupHeader: groupHeader, columns: columns2, exportExcel: exportExcel });
        exportExcel.groupHeader = KendoGridExportExcelGroupHeaderRefig({ groupHeader: exportExcel.groupHeader });
    }

    /*********|Return Value|*********/
    var dataSource = createKendoDataSource({ data: [], kind: 2, columns: columns2, aggregate: aggregate });
    var d = {
        ctrID: ctrID
        , Kind: 2
        , Columns: columns2
        , GroupHeader: groupHeader
        , Data: null
        , DataSource: dataSource
        , FilterMenuInit: null
        , FilterAble: false
        , SortAble: false
        , PageAble: false
        , Selectable: "row"
        , Editable: allData.editable
        , ExportExcel: exportExcel
        , LoadAjax: function (isLoad) {
            KendoLoadAjax({ ctrID: ctrID, isLoad: isLoad });
        }
        , PendingChanges: function () {
            return KendoGridPendingChanges({ ctrID: ctrID });
        }
    }

    return d;
}

function KendoGridLevelRefig(allData) {
    var t = KendoGridTextAll;
    var ctrID = allData.ctrID;
    var ctrID2 = "#" + ctrID;
    var kg = $(ctrID2).data(kd.kg);
    var data = kg.UC["Data"];
    var kind = kg.UC["Kind"];

    /******|Create table expand collapse|******/
    var tb = {
        tbExpColID: ctrID + "_tbExpCol"
        , btnColAllID: ctrID + "_btnColAll"
        , btnColOneID: ctrID + "_btnColOne"
        , btnExpOneID: ctrID + "_btnExpOne"
        , btnExpAllID: ctrID + "_btnExpAll"
    };
    kg.UC["TbExpCol"] = tb;
    var tb1 = $("#" + tb.tbExpColID);
    if (tb1.length > 0) { tb1.remove(); }
    var htmlText = t.tbExpCol;
    htmlText = htmlText.replace("id=\"tbExpCol\"", "id=\"" + tb.tbExpColID + "\"");
    htmlText = htmlText.replace("id=\"btnColAll\"", "id=\"" + tb.btnColAllID + "\"");
    htmlText = htmlText.replace("id=\"btnColOne\"", "id=\"" + tb.btnColOneID + "\"");
    htmlText = htmlText.replace("id=\"btnExpOne\"", "id=\"" + tb.btnExpOneID + "\"");
    htmlText = htmlText.replace("id=\"btnExpAll\"", "id=\"" + tb.btnExpAllID + "\"");
    $(ctrID2).before(htmlText);
    KendoGridLevelCreateTbExpCol({
        ctrID: ctrID
        , ctrID1: tb.btnColAllID
        , ctrID2: tb.btnColOneID
        , ctrID3: tb.btnExpOneID
        , ctrID4: tb.btnExpAllID
    });

    /******************************************/

    /**********|Cấu hình lại dữ liệu|**********/
    for (var i = 0; i < data.length; i++) {
        var c = data[i];
        c["index"] = i;
        var view1 = [];
        var view2 = [];
        data.filter(function (p) {
            if (p.AutoID == c.ParentID) {
                view1.push(p);
            }
            if (p.ParentID == c.AutoID) {
                view2.push(p);
            }
        });
        if (view2.length == 0) {
            c["ExpCol"] = t.imgSrc.none;
        }

        var ParentLevel = new Object();
        var ParentLevelName = "ParentLevel" + (c.Level - 1);
        if (view1.length > 0) {
            var temp = view1[0]["ParentLevel"];
            for (var key in temp) {
                ParentLevel[key] = temp[key];
            }
        }
        if (c.Level != 1) { ParentLevel[ParentLevelName] = c.ParentID; }
        c["ParentLevel"] = ParentLevel;
    }
    /******************************************/

    var dataSource = createKendoDataSource({
        data: data
        , kind: kind
        , aggregate: kg.dataSource.aggregate()
        , columns: kg.UC["Columns"]
    });
    var aggregates = dataSource.aggregates();
    var aggLevel = dataSource.aggregates()["Level"];
    var LevelMax = aggLevel.max;
    kg.UC["LevelMax"] = LevelMax;
    dataSource.filter({ logic: "or", filters: [{ field: "ParentID", operator: "eq", value: -1 }] });
    kg.UC["DataSource"] = dataSource;
    kg.setDataSource(dataSource);
    KendoGridLevelDisableTbExpCol({ ctrID: ctrID });
    KendoLoadAjax({ ctrID: ctrID, isLoad: false });
}

function KendoGridLevelReSum(allData) {
    var value = allData.value;
    var field = allData.field;
    var ctrID = allData.ctrID;
    var ctrID2 = "#" + ctrID;

    var kg = $(ctrID2).data(kd.kg);
    if (kg.UC == null) { return ""; }
    kg.UC["SumData"] = kg.UC["SumData"] || {};

    var t = KendoGridTextAll;
    var tsp = t.specialPercent;
    if (kg.UC.SumData[field] == null) {
        var tValue = value + "";
        if (tValue == "null") { value = ""; }
        if (tValue.indexOf("Infinity") != -1) { value = tsp.text; }
        kg.UC.SumData[field] = value;
    } else {
        value = kg.UC.SumData[field];
    }
    
    return value;
}

function KendoGridLevelCreateTbExpCol(allData) {
    var ctrID = allData.ctrID;
    var ctrID1 = allData.ctrID1;
    var ctrID2 = allData.ctrID2;
    var ctrID3 = allData.ctrID3;
    var ctrID4 = allData.ctrID4;
    createKendoButton({ ctrID: ctrID1, onClick: function (e) { KendoGridLevelColAll({ ctrID: ctrID, e: e }); } });
    createKendoButton({ ctrID: ctrID2, onClick: function (e) { KendoGridLevelColOne({ ctrID: ctrID, e: e }); } });
    createKendoButton({ ctrID: ctrID3, onClick: function (e) { KendoGridLevelExpOne({ ctrID: ctrID, e: e }); } });
    createKendoButton({ ctrID: ctrID4, onClick: function (e) { KendoGridLevelExpAll({ ctrID: ctrID, e: e }); } });
}

function KendoGridLevelColAll(allData) {
    var t = KendoGridTextAll;
    var tImgSrc = t.imgSrc;
    var ctrID = allData.ctrID;
    var ctrID2 = "#" + ctrID;
    var kg = $(ctrID2).data(kd.kg);
    var dataSource = kg.dataSource;
    var data = kg.UC["Data"];
    var filter = { logic: "or", filters: [{ field: "Level", operator: "eq", value: 1 }] };
    data.filter(function (obj) {
        if (obj["ExpCol"] != tImgSrc.none) {
            obj["ExpCol"] = tImgSrc.expand;
        }
        return obj
    });
    dataSource.filter(filter);
    KendoGridLevelDisableTbExpCol({ ctrID: ctrID });
}

function KendoGridLevelColOne(allData) {
    var t = KendoGridTextAll;
    var tImgSrc = t.imgSrc;
    var ctrID = allData.ctrID;
    var ctrID2 = "#" + ctrID;
    var kg = $(ctrID2).data(kd.kg);
    var dataSource = kg.dataSource;
    var data = kg.UC["Data"];
    var aggLevel = dataSource.aggregates()["Level"];
    var LevelCurrent = aggLevel.max;
    var LevelCollapse = LevelCurrent - 1;

    var filter = {
        logic: "or"
        , filters: [{ field: "Level", operator: "eq", value: 1 }]
    }
    data.filter(function (obj) {
        if (obj["Level"] <= LevelCollapse) {
            if (obj["Level"] == LevelCollapse) {
                if (obj["ExpCol"] != tImgSrc.none) {
                    obj["ExpCol"] = tImgSrc.expand;
                }
            } else {
                obj["ExpCol"] = tImgSrc.collapse;
                var AutoID = obj["AutoID"];
                var index = AutoID - 1;
                var Level = obj["Level"];
                var ParentLevel = obj["ParentLevel"];

                var ParentLevelName = "ParentLevel" + Level;
                var field = "ParentLevel[\"" + ParentLevelName + "\"]";
                var newFilter = {
                    logic: "and"
                    , index: index
                    , filters: [{ field: "Level", operator: "eq", value: Level + 1 }]
                };
                for (var key in ParentLevel) {
                    newFilter.filters.push({ field: "ParentLevel[\"" + key + "\"]", operator: "eq", value: ParentLevel[key] });
                }
                newFilter.filters.push({ field: field, operator: "eq", value: AutoID });
                filter.filters.push(newFilter);
            }
        }
        return obj;
    });
    dataSource.filter(filter);
    KendoGridLevelDisableTbExpCol({ ctrID: ctrID });
}

function KendoGridLevelExpOne(allData) {
    var t = KendoGridTextAll;
    var tImgSrc = t.imgSrc;
    var ctrID = allData.ctrID;
    var ctrID2 = "#" + ctrID;
    var kg = $(ctrID2).data(kd.kg);
    var dataSource = kg.dataSource;
    var data = kg.UC["Data"];
    var view = dataSource.view();
    var aggLevel = dataSource.aggregates()["Level"];
    var LevelCurrent = aggLevel.max;
    var LevelMax = kg.UC["LevelMax"];

    /***|So sánh SL obj trong view và trong data|***/
    var data2 = data.filter(function (obj) {
        if (obj["Level"] == LevelCurrent) {
            return obj;
        }
    });
    var view2 = view.filter(function (obj) {
        if (obj["Level"] == LevelCurrent) {
            return obj;
        }
    });
    var LevelExpand = LevelCurrent;
    var n = data2.length;
    var m = view2.length;
    if (n == m) {
        LevelExpand = LevelCurrent + 1;
    }
    /***********************************************/

    var filter = { logic: "or", filters: [{ field: "Level", operator: "eq", value: 1 }] };
    data.filter(function (obj) {
        if (obj["Level"] < LevelExpand) {
            if (obj["ExpCol"] != tImgSrc.none) {
                obj["ExpCol"] = tImgSrc.collapse;
            }
            var AutoID = obj["AutoID"];
            var index = AutoID - 1;
            var Level = obj["Level"];
            var ParentLevel = obj["ParentLevel"];

            var ParentLevelName = "ParentLevel" + Level;
            var field = "ParentLevel[\"" + ParentLevelName + "\"]";
            var newFilter = {
                logic: "and"
                , index: index
                , filters: [{ field: "Level", operator: "eq", value: Level + 1 }]
            };
            for (var key in ParentLevel) {
                newFilter.filters.push({ field: "ParentLevel[\"" + key + "\"]", operator: "eq", value: ParentLevel[key] });
            }
            newFilter.filters.push({ field: field, operator: "eq", value: AutoID });
            filter.filters.push(newFilter);
        }

        return obj
    });
    dataSource.filter(filter);
    KendoGridLevelDisableTbExpCol({ ctrID: ctrID });
}

function KendoGridLevelExpAll(allData) {
    var t = KendoGridTextAll;
    var tImgSrc = t.imgSrc;
    var ctrID = allData.ctrID;
    var ctrID2 = "#" + ctrID;
    var kg = $(ctrID2).data(kd.kg);
    var dataSource = kg.dataSource;
    var data = kg.UC["Data"];
    var LevelMax = kg.UC["LevelMax"];

    var filter = { logic: "or", filters: [{ field: "Level", operator: "eq", value: 1 }] };
    data.filter(function (obj) {
        if (obj["Level"] < LevelMax) {
            if (obj["ExpCol"] != tImgSrc.none) {
                obj["ExpCol"] = tImgSrc.collapse;
            }
            var AutoID = obj["AutoID"];
            var index = AutoID - 1;
            var Level = obj["Level"];
            var ParentLevel = obj["ParentLevel"];

            var ParentLevelName = "ParentLevel" + Level;
            var field = "ParentLevel[\"" + ParentLevelName + "\"]";
            var newFilter = {
                logic: "and"
                , index: index
                , filters: [{ field: "Level", operator: "eq", value: Level + 1 }]
            };
            for (var key in ParentLevel) {
                newFilter.filters.push({ field: "ParentLevel[\"" + key + "\"]", operator: "eq", value: ParentLevel[key] });
            }
            newFilter.filters.push({ field: field, operator: "eq", value: AutoID });
            filter.filters.push(newFilter);
        }

        return obj;
    });
    dataSource.filter(filter);
    KendoGridLevelDisableTbExpCol({ ctrID: ctrID });
}

function KendoGridLevelExpColImgSrc(allData) {
    var imgSrc = "";
    var t = KendoGridTextAll;
    var tImgSrc = t.imgSrc;
    var ctrID = allData.ctrID;
    var ctrID2 = "#" + ctrID;
    var kg = $(ctrID2).data(kd.kg);
    var data = kg.UC["Data"];
    var dataItem = data[allData.index];
    var LevelMax = kg.UC["LevelMax"];
    var Level = dataItem["Level"];
    var ExpCol = dataItem["ExpCol"];

    switch (Level) {
        case LevelMax:
            imgSrc = tImgSrc.none;
            break;
        default:
            if (ExpCol == null) {
                imgSrc = tImgSrc.expand;
            } else {
                imgSrc = ExpCol;
            }
            break;
    }

    return imgSrc;
}

function KendoGridLevelExpColItem(allData) {
    var t = KendoGridTextAll;
    var tImgSrc = t.imgSrc;
    var ctrID = allData.ctrID;
    var ctrID2 = "#" + ctrID;
    var index = allData.index;
    var kg = $(ctrID2).data(kd.kg);
    var dataSource = kg.dataSource;
    var data = kg.UC["Data"];
    var dataItem = data[index];

    var filter = dataSource.filter();
    var AutoID = dataItem["AutoID"];
    var Level = dataItem["Level"];
    var ExpCol = dataItem["ExpCol"];
    var ParentLevelName = "ParentLevel" + Level;
    var field = "ParentLevel[\"" + ParentLevelName + "\"]";

    filter.logic = "or";
    switch (ExpCol) {
        case tImgSrc.collapse:
            dataItem["ExpCol"] = tImgSrc.expand;
            filter.filters = filter.filters.filter(function (f) {
                if (f.logic != "and" || f.filters == null) {
                    return f;
                } else {
                    var isExist = false;
                    for (var i = 0; i < f.filters.length; i++) {
                        var f2 = f.filters[i];
                        var field2 = f2["field"];
                        var operator2 = f2["operator"];
                        var value2 = f2["value"];
                        if (field2 == field && operator2 == "eq" && value2 == AutoID) {
                            isExist = true;
                            data[f.index]["ExpCol"] = tImgSrc.expand;
                            break;
                        }
                    }
                    if (!isExist) {
                        return f;
                    }
                }
            });
            break;
        default:
            dataItem["ExpCol"] = tImgSrc.collapse;
            var ParentLevel = dataItem["ParentLevel"];
            var newFilter = {
                logic: "and"
                , index: index
                , filters: [{ field: "Level", operator: "eq", value: Level + 1 }]
            };
            for (var key in ParentLevel) {
                newFilter.filters.push({ field: "ParentLevel[\"" + key + "\"]", operator: "eq", value: ParentLevel[key] });
            }
            newFilter.filters.push({ field: field, operator: "eq", value: AutoID });
            filter.filters.push(newFilter);
            break;
    }

    dataSource.filter(filter);
    KendoGridLevelDisableTbExpCol({ ctrID: ctrID });
}

function KendoGridLevelDisableTbExpCol(allData) {
    var ctrID = allData.ctrID;
    var ctrID2 = "#" + ctrID;
    var kg = $(ctrID2).data(kd.kg);
    var dataSource = kg.dataSource;
    var data = kg.UC["Data"];
    var LevelMax = kg.UC["LevelMax"];
    var tb = kg.UC["TbExpCol"];

    var view = dataSource.view();
    var aggLevel = dataSource.aggregates()["Level"];
    var LevelCurrent = aggLevel.max;
    var LevelType = 2;

    if (LevelCurrent <= 1) {
        LevelType = 1;
    } else {
        if (data.length == view.length) {
            LevelType = 3;
        }
    }
    var btnColAll = $("#" + tb.btnColAllID).data(kd.kbtn);
    var btnColOne = $("#" + tb.btnColOneID).data(kd.kbtn);
    var btnExpOne = $("#" + tb.btnExpOneID).data(kd.kbtn);
    var btnExpAll = $("#" + tb.btnExpAllID).data(kd.kbtn);

    if (data.length == 0) {
        LevelType = 0;
    }
    switch (LevelType) {
        case 0:
            btnColAll.enable(false);
            btnColOne.enable(false);
            btnExpOne.enable(false);
            btnExpAll.enable(false);
            break;
        case 1:
            btnColAll.enable(false);
            btnColOne.enable(false);
            btnExpOne.enable(true);
            btnExpAll.enable(true);
            break;
        case 3:
            btnColAll.enable(true);
            btnColOne.enable(true);
            btnExpOne.enable(false);
            btnExpAll.enable(false);
            break;
        default:
            btnColAll.enable(true);
            btnColOne.enable(true);
            btnExpOne.enable(true);
            btnExpAll.enable(true);
            break;
    }
}

/**************|Kendo Grid Default|**************/
function KendoGridDefaultGetData(allData) {
    /*******Basic Info*******/
    var t = KendoGridTextAll;
    var tf = t.format;
    var ta = t.aggregate;
    var ta2 = (ta + "").replace(/,/g, "|");
    var ctrID = allData.ctrID;
    var ctrID2 = "#" + ctrID;
    var groupHeader = allData.groupHeader;
    var columns = allData.columns;
    var aggregate = [];
    var columns2 = [{
        title: "STT", field: "STT"
        , type: "int", width: "90px"
        , template: "#:STT#"
        , attributes: { "class": "stt" }
        , footerTemplate: " "
    }];

    var kind = 1;
    var pageAble = {
        refresh: true
        , pageSizes: true
        , buttonCount: 5
        , messages: {
            display: "Hiển thị {0}-{1} / {2:n0}"
            , empty: "Không tìm thấy dữ liệu"
            , itemsPerPage: "dòng / trang"
            , first: "Trang đầu"
            , previous: "Trang trước"
            , next: "Trang sau"
            , last: "Trang cuối"
        }
    };

    /******Kendo Group******/
    var group = allData.group;
    var sort = allData.sort;
    var groupCollapseAll = null;
    var isLocked = false;

    /*******Column Loop*******/
    for (var i = 0; i < columns.length; i++) {
        var col = columns[i];
        var colType = col.type;
        var colTemplate = col.template;
        var colAttributes = col.attributes || {};
        var colOnClick = col.onClick;
        var colFooterTemplate = col.footerTemplate;
        var colFooterAttributes = col.footerAttributes || {};
        var colValidation = col.validation;
        var isNumber = false;
        colAttributes["class"] = colAttributes["class"] || "";
        colAttributes["data-content"] = "#:" + col.field + "#";

        /******Kendo Group******/
        var hidden = col.hidden;
        var groupHeaderTemplate = col.groupHeaderTemplate;

        /***********************|Column Type|***********************/
        switch (colType) {
            case "int":
                isNumber = true;
                colTemplate = colTemplate || ("#:" + col.field + "==null? '':kendo.format(\"{0:" + tf.int + "}\"," + col.field + ")#");
                break;
            case "float":
                isNumber = true;
                colTemplate = colTemplate || ("#:" + col.field + "==null? '':kendo.format(\"{0:" + tf.float + "}\"," + col.field + ")#");
                break;
            case "percent":
                isNumber = true;
                colTemplate = colTemplate || ("#=KendoGridRePercent({value: " + col.field + "})#");
                break;
            case "boolean":
                isNumber = false;
                var getChecked = "#=KendoGridGetChecked({value:" + col.field + "})#";
                colTemplate = colTemplate || ("<input type=\"checkbox\" disabled " + getChecked + " />");
                break;
            case "date":
                isNumber = false;
                colTemplate = colTemplate || ("#=KendoGridReDate({value:" + col.field + "})#");
                break;
            case "dateTime":
                isNumber = false;
                var dtFormat = KendoGridTextAll.format.dateTime;
                colTemplate = colTemplate || ("#=KendoGridReDate({value:" + col.field + ",format:\"" + dtFormat + "\"})#");
                break;
            default:
                isNumber = false;
                colType = "string";
                colTemplate = colTemplate || ("#:" + col.field + "==null? '':" + col.field + "#");
                break;
        }
        if (isNumber) { colAttributes["class"] += " stt"; }
        colAttributes["class"] = colAttributes["class"].trim();
        /***********************|Column OnClick|***********************/
        if (colOnClick != null) {
            var aO = "<a href=\"javascript:;\" onClick=\"" + colOnClick + "\" >";
            var aC = "</a>";
            colTemplate = aO + colTemplate + aC;
        }

        /***********************|Column Footer|***********************/
        if (colFooterTemplate != null && colFooterTemplate.indexOf("#") != -1) {
            /*************|Match Kendo Format|*************/
            var fttp = colFooterTemplate;
            var fdData1 = fttp.match(/#:kendo[.]format[(]\"{(.*?)[)]#/g, "");
            //if (fdData1 == null) { continue; }
            for (var n1 = 0; n1 < fdData1.length; n1++) {
                /***********|Kendo Format Value|***********/
                var fd1 = fdData1[n1] + "";
                var fdData2 = fd1.match(/,(.*?)[)]#/g, "");
                var fd2 = fdData2[0] + "";
                var fd2 = fd2.substring(1, fd2.length - 2);

                /*********|Kendo Format Operator|*********/
                var r3 = new RegExp("data[.](.*?)[.](" + ta2 + ")", "g");
                var fdData3 = fd2.match(r3, "");
                if (fdData3 == null) { continue; }
                for (var n2 = 0; n2 < fdData3.length; n2++) {
                    var fd3 = fdData3[n2] + "";
                    var x = fd3.indexOf(".");
                    var y = fd3.lastIndexOf(".");
                    var colName = fd3.substring(x + 1, y);
                    var colOperator = fd3.substring(y + 1, fd3.length);
                    var fn = 0;
                    aggregate.filter(function (obj) {
                        if (obj.field == colName && obj.aggregate == colOperator) {
                            fn += 1;
                        }
                    })
                    if (fn > 0) { continue; }
                    aggregate.push({ field: colName, aggregate: colOperator });
                }

                /*************|Resum Value|*************/
                var r2 = new RegExp(escapeRegExp(fd2), "g");
                fttp = fttp.replace(r2, "KendoGridDefaultReSum({ctrID:\"" + ctrID + "\",value:" + fd2 + "})");
            }
            fttp = "<span class=\"stt\">" + fttp + "</span>";
            colFooterTemplate = fttp;
            colFooterAttributes["data-content"] = "#:" + col.field + "#";
        }

        /***********************|Column Edit|***********************/
        var colEditor = null;
        if (col.edit != null) {
            var colEdit = col.edit;
            colEditor = colEdit.editor;
            if (colEditor == null) {
                switch (colType) {
                    case "date":
                        colEditor = function (container, options) {
                            KendoGridEditorDate({ ctrID: ctrID, container: container, options: options });
                        }
                    default:
                        break;
                }
            }
            var getDirtyStyle = "#=KendoGridReDirtyField({data:data,fieldName:\"" + col.field + "\"})#";
            colTemplate = getDirtyStyle + colTemplate;
        }

        /***********************|Add Column|***********************/
        var col2 = {
            field: col.field
            , title: col.title
            , width: col.width
            , type: colType
            , template: colTemplate
            , attributes: colAttributes
            , footerTemplate: colFooterTemplate
            , footerAttributes: colFooterAttributes
            /******Col Edit******/
            , edit: col.edit
            , editor: colEditor
            , validation: colValidation
            /******Kendo Group******/
            , hidden: hidden
            , groupHeaderTemplate: groupHeaderTemplate

            , command: col.command
            , locked: col.locked
        };
        if (col.locked) { isLocked = true; }
        columns2.push(col2);
    }
    columns2[0].locked = isLocked;

    /***************|Group Header|***************/
    var exportExcel = { groupHeader: null };
    if (groupHeader != null) {
        groupHeader.splice(0, 0, columns2[0]);
        exportExcel.groupHeader = [];
        KendoGridGroupHeader({ groupHeader: groupHeader, columns: columns2, exportExcel: exportExcel });
        exportExcel.groupHeader = KendoGridExportExcelGroupHeaderRefig({ groupHeader: exportExcel.groupHeader });
    }
    /******Kendo Group******/
    if (group != null) {
        pageAble = false;
        kind = 2;
        groupCollapseAll = function () {
            KendoGridGroupCollapseAll({ ctrID: ctrID });
        }
    }

    /*********|Return Value|*********/
    var dataSource = createKendoDataSource({ data: [], kind: kind, columns: columns2, aggregate: aggregate, group: group, sort: sort });
    var d = {
        ctrID: ctrID
        , Kind: kind
        , Columns: columns2
        , ColumnMenu: allData.columnMenu
        , GroupHeader: groupHeader
        , Data: null
        , DataSource: dataSource
        , FilterAble: {
            messages: { and: "và", or: "hoặc", filter: "Lọc", clear: "Hủy lọc", info: "", isTrue: "Đúng", isFalse: "Sai" }
            , operators: {
                string: { eq: "Bằng", neq: "Khác", startswith: "Bắt đầu từ", contains: "Chứa", doesnotcontain: "Không chứa", endswith: "Kết thúc bằng" }
                , number: { eq: "=", neq: "!=", gte: ">=", gt: ">", lte: "<=", lt: "<" }
                , date: { neq: "!=", gte: ">=", gt: ">", lte: "<=", lt: "<" }
            }
        }
        , SortAble: true
        , PageAble: pageAble
        , Selectable: "row"
        , Editable: allData.editable
        , ExportExcel: exportExcel
        , LoadAjax: function (isLoad) {
            KendoLoadAjax({ ctrID: ctrID, isLoad: isLoad });
        }
        , PendingChanges: function () {
            return KendoGridPendingChanges({ ctrID: ctrID });
        }
        /******Kendo Group******/
        , Group: group
        , Sort: sort
        , GroupCollapseAll: groupCollapseAll
    }

    return d;
}

function KendoGridDefaultRefig(allData) {
    var ctrID = allData.ctrID;
    var ctrID2 = "#" + ctrID;
    var kg = $(ctrID2).data(kd.kg);
    var data = kg.UC["Data"];
    var kind = kg.UC["Kind"];
    var columns = kg.UC["Columns"];
    var aggregate = kg.dataSource.aggregate();
    var group = kg.dataSource.group();
    var sort = kg.dataSource.sort();

    for (var i = 0; i < data.length; i++) {
        data[i]["STT"] = i + 1;
    }
    var dataSource = createKendoDataSource({
        data: data
        , kind: kind
        , aggregate: aggregate
        , columns: columns
        , group: group
        , sort: sort
    });
    kg.UC["DataSource"] = dataSource;
    kg.setDataSource(dataSource);
    if (group.length > 0) {
        KendoGridGroupCreateTbExpCol({ ctrID: ctrID });
    } else {
        var tbExpColID = $(ctrID2 + "_tbExpCol");
        if (tbExpColID.length > 0) { tbExpColID.remove(); }
    }
    KendoLoadAjax({ ctrID: ctrID, isLoad: false });
}

function KendoGridGroupCollapseAll(allData) {
    var ctrID = allData.ctrID;
    var ctrID2 = "#" + ctrID;
    var kg = $(ctrID2).data(kd.kg);
    kg.tbody.find("tr.k-grouping-row").each(function (index) {
        kg.collapseGroup(this);
    });
    KendoGridGroupDisableTbExpCol({ ctrID: ctrID });
}

function KendoGridGroupExpandAll(allData) {
    var ctrID = allData.ctrID;
    var ctrID2 = "#" + ctrID;
    var kg = $(ctrID2).data(kd.kg);
    kg.tbody.find("tr.k-grouping-row").each(function (index) {
        kg.expandGroup(this);
    });
    KendoGridGroupDisableTbExpCol({ ctrID: ctrID });
}

function KendoGridGroupCreateTbExpCol(allData) {
    var t = KendoGridTextAll;
    var ctrID = allData.ctrID;
    var ctrID2 = "#" + ctrID;
    var kg = $(ctrID2).data(kd.kg);
    var tb = {
        tbExpColID: ctrID + "_tbExpCol"
       , btnColAllID: ctrID + "_btnColAll"
       , btnColOneID: ctrID + "_btnColOne"
       , btnExpOneID: ctrID + "_btnExpOne"
       , btnExpAllID: ctrID + "_btnExpAll"
    };
    kg.UC["TbExpCol"] = tb;
    var tb1 = $("#" + tb.tbExpColID);
    if (tb1.length > 0) { tb1.remove(); }
    var htmlText = t.tbExpCol;
    htmlText = htmlText.replace("id=\"tbExpCol\"", "id=\"" + tb.tbExpColID + "\"");
    htmlText = htmlText.replace("id=\"btnColAll\"", "id=\"" + tb.btnColAllID + "\"");
    htmlText = htmlText.replace("<td><button id=\"btnColOne\"><</button></td>", "");
    htmlText = htmlText.replace("<td><button id=\"btnExpOne\">></button></td>", "");
    htmlText = htmlText.replace("id=\"btnExpAll\"", "id=\"" + tb.btnExpAllID + "\"");
    $(ctrID2).before(htmlText);
    createKendoButton({ ctrID: tb.btnColAllID, onClick: function (e) { KendoGridGroupCollapseAll({ ctrID: ctrID }) } });
    createKendoButton({ ctrID: tb.btnExpAllID, onClick: function (e) { KendoGridGroupExpandAll({ ctrID: ctrID }) } });
    KendoGridGroupDisableTbExpCol({ ctrID: ctrID });
    var ctrID3 = ctrID2 + " tbody";
    $(ctrID3).on('click', '.k-i-expand', function () {
        KendoGridGroupDisableTbExpCol({ ctrID: ctrID, x: 1 });
    })
    $(ctrID3).on("click", ".k-i-collapse", function () {
        KendoGridGroupDisableTbExpCol({ ctrID: ctrID, y: 1 });
    })
}

function KendoGridGroupDisableTbExpCol(allData) {
    var ctrID = allData.ctrID;
    var ctrID2 = "#" + ctrID;
    var x = allData.x;
    var y = allData.y;
    x = x || 0;
    y = y || 0;

    var kg = $(ctrID2).data(kd.kg);
    var tdExpand = kg.tbody.find("td[aria-expanded=\"true\"]");
    var tdCollapse = kg.tbody.find("td[aria-expanded=\"false\"]");
    var n = x + tdExpand.length - y;
    var m = y + tdCollapse.length - x;
    var tb = kg.UC["TbExpCol"];
    var btnColAll = $("#" + tb.btnColAllID).data(kd.kbtn);
    var btnExpAll = $("#" + tb.btnExpAllID).data(kd.kbtn);
    if (n == 0) {
        btnColAll.enable(false);
        btnExpAll.enable(true);
    }
    if (m == 0) {
        btnColAll.enable(true);
        btnExpAll.enable(false);
    }
}

function KendoGridDefaultReSum(allData) {
    var value = allData.value;
    var ctrID = allData.ctrID;
    var ctrID2 = "#" + ctrID;
    var kg = $(ctrID2).data(kd.kg);
    if (kg.UC == null) { return ""; }
    var t = KendoGridTextAll;
    var tsp = t.specialPercent;

    var tValue = value + "";
    if (tValue == "null") { value = ""; }
    if (tValue.indexOf("Infinity") != -1) { value = tsp.text; }

    return value;
}

/**************|Kendo Grid Edit|**************/
function KendoGridOnEdit(e) {
    var kg = e.sender;
    var editable = kg.UC["Editable"];

    var fieldName = e.container.find("input").attr("name");
    var colAllowEdit = editable["colAllowEdit"];
    var item = e.model;
    var allowEdit = item[colAllowEdit];
    if (!allowEdit) {
        kg.closeCell();
    }
    //item.dirtyFields = item.dirtyFields || {};
    //item.dirtyFields[fieldName] = true;
}

function KendoGridPendingChanges(allData) {
    var ctrID = allData.ctrID;
    var ctrID2 = "#" + ctrID;
    var kg = $(ctrID2).data(kd.kg);
    var dataSource = kg.dataSource;
    var data = dataSource.data();
    var pendingChanges = [];
    data.filter(function (obj) {
        if (obj.dirty) {
            pendingChanges.push(obj);
        }
    });

    return pendingChanges;
}

function KendoGridEditorDate(allData) {
    var t = KendoGridTextAll;
    var tf = t.format;

    var ctrID = allData.ctrID;
    var ctrID2 = "#" + ctrID;
    var container = allData.container;
    var options = allData.options;

    var kg = $(ctrID2).data(kd.kg);
    var columns = kg.UC["Columns"];
    var column;
    columns.filter(function (obj) {
        if (obj.field == options.field) {
            column = obj;
        }
    });
    var edit = column.edit;

    var input = $("<input />");
    input.attr("name", options.field);
    input.appendTo(container);
    input.kendoDatePicker({
        format: tf.date
        , start: "month"
        , depth: "month"
        , min: edit.min
        , max: edit.max
    });
}

/**************|Kendo Grid Export Excel|**************/
function KendoGridCreateTbExportExcel(allData) {
    var t = KendoGridTextAll;
    var ctrID = allData.ctrID;
    var ctrID2 = "#" + ctrID;
    var kg = $(ctrID2).data(kd.kg);
    var exportExcel = allData.exportExcel;
    var isExport = true;
    if (exportExcel != null && exportExcel.isExport != null) {
        isExport = exportExcel.isExport;
    }
    if (isExport) {
        var tbEE = {
            tbExportExcelID: ctrID + "_tbExportExcel"
            , btnExportExcelID: ctrID + "_btnExportExcel"
            , lblExportExcelStatusID: ctrID + "_lblExportExcelStatus"
        };
        if (exportExcel.btnExportExcel != null) {
            tbEE.btnExportExcelID = exportExcel.btnExportExcel.ctrID;
            ExportExcelToggleButton({ ctrID: tbEE.btnExportExcelID, isLoad: false });
        } else {
            var tb = $("#" + tbEE.tbExportExcelID);
            var tb1 = $("#" + ctrID + "_tbDrawChart");
            if (tb.length > 0) { tb.remove() }
            if (tb1.length > 0) { tb1.remove(); };
            var htmlText = t.tbExportExcel;
            htmlText = htmlText.replace("id=\"tbExportExcel\"", "id=\"" + tbEE.tbExportExcelID + "\"");
            htmlText = htmlText.replace("id=\"btnExportExcel\"", "id=\"" + tbEE.btnExportExcelID + "\"");
            htmlText = htmlText.replace("id=\"lblExportExcelStatus\"", "id=\"" + tbEE.lblExportExcelStatusID + "\"");
            $(ctrID2).before(htmlText);
            $("#" + tbEE.btnExportExcelID).click(function (e) {
                KendoGridExportExcel({ ctrID: ctrID, e: e });
            });
        }
        kg.UC["TbExportExcel"] = tbEE;
    }
    if (kg.UC["ExportExcel"] != null) {
        exportExcel.groupHeader = kg.UC["ExportExcel"].groupHeader;
    }
    kg.UC["ExportExcel"] = exportExcel;
}

function KendoGridExportExcel(allData) {
    var ctrID = allData.ctrID;
    var ctrID2 = "#" + ctrID;

    var kg = $(ctrID2).data(kd.kg);
    var dataSource = kg.dataSource;
    var gridType = kg.UC["GridType"];
    var exportExcel = kg.UC["ExportExcel"];
    var fileName = exportExcel.fileName;
    var tbEE = kg.UC["TbExportExcel"];
    var btnExportExcel = { ctrID: tbEE.btnExportExcelID };
    var lblExportExcelStatus = { ctrID: tbEE.lblExportExcelStatusID };
    if (exportExcel.btnExportExcel != null) {
        btnExportExcel = exportExcel.btnExportExcel;
    }

    /*****************|Config Data|*****************/
    var data = [];
    if (exportExcel.dataView == true) {
        data = deepCopy({ data: dataSource.view() });
    } else {
        data = deepCopy({ data: dataSource.data() });
    }
    data = ExportExcelDataRemoveProperties({ data: data });

    /*****************|Config Columns|*****************/
    var columns1 = exportExcel.columns;
    var columns2 = kg.UC["Columns"];
    var columns = columns1 || columns2;
    columns = deepCopy({ data: columns });
    if (columns1 != null) {
        columns.splice(0, 0, columns2[0]);
    }
    columns = ExportExcelColumnsRemoveProperties({ columns: columns });
    var footer = kg.footer;
    if (footer != null) {
        footer = footer.find("td");
        var group = dataSource.group();
        var x = group.length;
        var n = footer.length - x;

        for (var i = 0; i < n; i++) {
            var td = footer[i + x];
            var tdText = td.textContent;
            if (columns[i] != null) {
                columns[i]["footer"] = tdText;
            }
        }
    }

    /*****************|Config GroupHeader|*****************/
    var groupHeader = deepCopy({ data: exportExcel.groupHeader });
    switch (gridType) {
        case "GridLevel":
            columns = columns.splice(1);
            break;
        default:
            columns = columns.filter(function (col) {
                if (!col.hidden) {
                    return col;
                }
            });
            break;
    }
    /***********************************************/
    ExportExcel({
        data: data
        , columns: columns
        , groupHeader: groupHeader
        , gridType: gridType
        , fileName: fileName
        , btnExportExcel: btnExportExcel
        , lblExportExcelStatus: lblExportExcelStatus
    });
}

function KendoGridExportExcelGroupHeaderRefig(allData) {
    var groupHeader = allData.groupHeader;
    groupHeader = deepCopy({ data: groupHeader });
    groupHeader = ExportExcelColumnsRemoveProperties({ columns: groupHeader });
    var n = groupHeader.length;
    for (var i = 0; i < n; i++) {
        var listColumns = groupHeader[i];
        var m = listColumns.length;
        for (var j = 0; j < m; j++) {
            var col = listColumns[j];
            if (col.field != null && col.line != n) {
                col.mergeRow = n - col.line + 1;
            }
            if (col.mergeCol <= 1) {
                delete col.mergeCol;
            }
        }
    }

    return groupHeader;
}

/*****************|Kendo List View|*****************/
function createKendoListView(allData) {
    var d = allData;
    var ctrID = d.ctrID;
    var ctrID2 = "#" + ctrID;
    var templateID = d.templateID;
    var templateID2 = "#" + templateID;
    var tabstrip = d.tabstrip;
    var panelbar = d.panelbar;
    if (tabstrip != null) { selectTab(tabstrip); }
    if (panelbar != null) { selectPanelbar(panelbar); }

    $(ctrID2).kendoListView({
        dataSource: []
        , template: kendo.template($(templateID2).html())
        , dataBound: d.onDataBound
        , dataBinding: d.onDataBinding
    });
    if (d.data == null) {
        getAjaxCallObject({
            filter: d.filter
            , url: d.url
            , onSuccess: function (data) {
                if (data == null || jQuery.type(data) == "string") { alert({ title: sms.error, message: data }); return; }
                KendoListViewRefresh({ ctrID: ctrID, data: data, onSuccess: d.onSuccess });
            }
        })
    } else {
        KendoListViewRefresh({ ctrID: ctrID, data: d.data, onSuccess: d.onSuccess });
    }
}

function KendoListViewRefresh(allData) {
    var ctrID = allData.ctrID;
    var ctrID2 = "#" + ctrID;
    var data = allData.data;
    var onSuccess = allData.onSuccess;

    var klv = $(ctrID2).data(kd.klv);
    var ds = createKendoDataSource({ kind: 1, data: data });
    klv.setDataSource(ds);
    if (allData.onSuccess != null) { allData.onSuccess(data); }
}

/*|Kendo DataSource kind=1: pageSize=50, kind=2: pageSize=data.length|*/
function createKendoDataSource(allData) {
    var t = KendoGridTextAll;
    var numberTypes = t.numberTypes;

    var data = allData.data;
    var kind = allData.kind;
    var aggregate = allData.aggregate;
    var columns = allData.columns;
    var group = allData.group;
    var sort = allData.sort;
    var pageSize = 50;
    if (kind == 2) { pageSize = data.length; }
    var objCreate = {
        data: data
        , pageSize: pageSize
        , group: group
        , sort: sort
    };
    if (columns != null) {
        var fields = new Object();
        columns.filter(function (obj) {
            var cEdit = obj.edit;
            var cType = obj.type;
            var cField = obj.field;
            var editable = false;
            if (cField == null) { return; }
            if (cEdit != null) { editable = true }
            var col = { editable: editable };
            /********|Check column Type|********/
            var k = numberTypes.indexOf(cType);
            if (k != -1) {
                col.type = "number"
                col.validation = obj.validation;
            } else {
                col.type = cType;
            }
            fields[cField] = col;
        });
        var model = { fields: fields };
        var schema = { model: model };
        objCreate.schema = schema;
    }

    var dataSource = new kendo.data.DataSource(objCreate);
    dataSource.aggregate(aggregate);

    return dataSource;
}

/**************|Kendo Button|**************/
function createKendoButton(allData) {
    var ctrID = allData.ctrID;
    var ctrID2 = "#" + ctrID;
    $(ctrID2).css("width", allData.width);
    var onClick = allData.onClick;
    var enable = allData.enable;
    var btn = $(ctrID2).kendoButton({
        click: onClick
        , enable: enable
    }).data(kd.kbtn);
    btn.UC = { ctrID: ctrID };
    if (UCNotsave.indexOf(ctrID) == -1) { UC[ctrID] = btn; }
}

/**************|Kendo DatePicker|**************/
function createKendoDatePicker(allData) {
    var ctrID = allData.ctrID;
    var ctrID2 = "#" + ctrID;
    var value = allData.value;
    var format = allData.format;
    var start = allData.start;
    var depth = allData.depth;
    var max = allData.max;
    var min = allData.min;
    var onChange = allData.onChange;

    var t = KendoDatePickerTextAll;
    var td = t.date;
    format = format || td.format;
    start = start || td.start;
    depth = depth || td.depth;

    $(ctrID2).addClass("KendoControl");
    var kdp = $(ctrID2).kendoDatePicker({
        format: format
        , start: start
        , depth: depth
        , value: value
        , max: max
        , min: min
        , change: onChange
    }).data(kd.kdp);

    kdp.UC = {
        ctrID: ctrID
        , value: function (d) {
            var kind = null;
            var format = null;
            if (d != null) {
                kind = d.kind;
                format = d.format;
            }
            return getKendoDatePickerValue({
                ctrID: ctrID
                , kind: kind
                , format: format
            });
        }
    }
    UC[ctrID] = kdp;
}

function getKendoDatePickerValue(allData) {
    var t = KendoDatePickerTextAll;
    var td = t.date;

    var ctrID = allData.ctrID;
    var ctrID2 = "#" + ctrID;
    var kind = allData.kind;
    var format = allData.format;
    format = format || td.sqlFormat;
    var kdp = $(ctrID2).data(kd.kdp);
    var values = kdp.value();

    if (values == null) {
        kdp.value(new Date());
        values = kdp.value();
    }
    if (kind != 2) {
        values = kendo.format("{0:" + format + "}", values);
        values += "";
    }
    return values;
}

function createKendoDateTimePicker(allData) {
    var t = KendoDateTimePickerTextAll;
    var tdt = t.datetime;
    var ctrID = allData.ctrID;
    var ctrID2 = "#" + ctrID;
    var value = allData.value;
    var format = allData.format || tdt.format;

    $(ctrID2).addClass("KendoControl");
    var kdtp = $(ctrID2).kendoDateTimePicker({
        format: format
        //, start: start
        //, depth: depth
        , value: value
        //, max: max
        //, min: min
        //, change: onChange
    }).data(kd.kdtp);

    kdtp.UC = {
        ctrID: ctrID
        , value: function (d) {
            d = d || { kind: null, format: null };
            return getKendoDateTimePickerValue({
                ctrID: ctrID
                , kind: d.kind
                , format: d.format
            });
        }
    };
    UC[ctrID] = kdtp;
}

function getKendoDateTimePickerValue(allData) {
    var t = KendoDateTimePickerTextAll;
    var tdt = t.datetime;

    var ctrID = allData.ctrID;
    var ctrID2 = "#" + ctrID;
    var kind = allData.kind;
    var format = allData.format || tdt.sqlFormat;
    var kdtp = $(ctrID2).data(kd.kdtp);
    var values = kdtp.value();

    if (values == null) {
        kdtp.value(new Date());
        values = kdtp.value();
    }
    if (kind != 2) {
        values = kendo.format("{0:" + format + "}", values);
        values += "";
    }
    return values;
}

/**************|Kendo Validator|**************/
function createKendoValidator(allData) {
    var ctrID = allData.ctrID;
    var ctrID2 = "#" + ctrID;
    var kv = $(ctrID2).kendoValidator().data(kd.kv);
    UC[ctrID] = kv;
}

/**************|Kendo PanelBar|**************/
function createKendoPanelBar(allData) {
    var d = allData;
    var ctrID = d.ctrID;
    var ctrID2 = "#" + ctrID;
    $(ctrID2).addClass("KendoPanelBar");
    var kpb = $(ctrID2).kendoPanelBar({
        /*animation: false,*/
    }).data(kd.kpb);
    UC[ctrID] = kpb;
}

/**************|Kendo Window|**************/
function createKendoWindow(allData) {
    var t = KendoWindowTextAll;
    var ctrID = allData.ctrID;
    var ctrID2 = "#" + ctrID;
    var actions = allData.actions || t.actions;

    var kw = $(ctrID2).kendoWindow({
        resizable: false
        , visible: allData.visible
        , modal: allData.modal
        , width: allData.width
        , maxWidth: allData.maxWidth
        , minWidth: allData.minWidth
        , title: allData.title
        , actions: actions
        , scrollable: allData.scrollable
        , close: allData.onClose
    }).data(kd.kw);
    kw.UC = {
        open: function (allData) {
            kw.refresh();
            kw.center();
            kw.open();
        }
        , close: function (allData) {
            kw.close();
        }
    }
    $(ctrID2).parent().addClass("KendoWindow");
    UC[ctrID] = kw;
}

/**************|Kendo Upload|**************/
function createKendoUpload(allData) {
    var d = allData;
    var ctrID = d.ctrID;
    var ctrID2 = "#" + d.ctrID;
    var t = KendoUploadTextAll;
    var f = {
        async: { autoUpload: false }
        , select: function (e) {
            var files = e.files;
            ku.UC.Files = ku.UC.Files || [];
            if (d.max != null && (files.length + ku.UC.Files.length) > d.max) {
                e.preventDefault();
                alert("Bạn chỉ được upload " + d.max + " file");
                return;
            }
            $.each(files, function (index, f1) {
                var ex = f1.extension.toLowerCase().replace(/\./g, "");
                var i = d.fileExtensions.indexOf(ex);
                /***********|File đúng định dạng|***********/
                if (i == -1) {
                    e.preventDefault();
                    alert("Vui lòng chọn file <span class=\"lblExportExcelStatus\">" + d.fileExtensions + "</span>");
                    return;
                }
                /***********|File đúng kích thước|***********/
                if (f1.size >= t.maxSize) {
                    e.preventDefault();
                    alert("File phải nhỏ hơn 2Mb");
                    return;
                }
                /***********|Số lượng file|***********/
                if (d.max != null && ku.UC.Files.length >= d.max) {
                    e.preventDefault();
                    alert("Bạn chỉ upload được " + d.max + " file");
                    return;
                }
                /***********|Chống trùng lắp|***********/
                for (var j = 0; j < ku.UC.Files.length; j++) {
                    var f2 = ku.UC.Files[j];
                    if (f1.name == f2.name) {
                        e.preventDefault();
                        alert("Trùng file");
                        return;
                    }
                }
            });

            if (!e.isDefaultPrevented()) {
                ku.UC.Files = ku.UC.Files.concat(files);
            }
        }
        , remove: function (e) {
            var files = e.files;
            for (var i = 0; i < files.length; i++) {
                var f1 = files[i];
                ku.UC.Files = ku.UC.Files.filter(function (f2) {
                    if (f1.name != f2.name) {
                        return f2;
                    }
                });
            }
        }
        , multiple: false
    }
    if (d.multiple != null) { f.multiple = d.multiple; }

    var ku = $(ctrID2).kendoUpload(f).data(kd.ku);
    ku.UC = {
        ctrID: d.ctrID
        , Upload: function (fun) {
            var files = ku.UC.Files || [];
            if (files.length == 0) {
                if (fun != null) { fun(""); }
                return;
            }
            uploadFile({
                files: files
                , saveFolder: d.saveFolder
                , multiple: f.multiple
                , onFinish: function (data) {
                    var Finish = JSON.parse(data);
                    if (jQuery.type(Finish) == "array" && f.multiple == false) { Finish = Finish[0]; }
                    ku.UC.Finish = Finish;
                    ku.UC.ClearFile();
                    if (fun != null) { fun(Finish); }
                }
            });
        }
        , ClearFile: function () {
            if (ku.UC.Files.length <= 0) { return; }
            var uid = "li[data-uid=" + ku.UC.Files[0].uid + "]";
            var ul = $(uid).parent();
            ul.remove();
            ku.UC.Files = [];
        }
        , Files: []
        , Finish: ""
        , Multiple: f.multiple
        , MAX: d.max
    }
    UC[ctrID] = ku;
}

function uploadFile(allData) {
    var d = allData;
    var files = d.files;
    var saveFolder = d.saveFolder;
    var onFinish = d.onFinish;
    if (files.length == 0) { return; }

    var formdata = new FormData();
    for (i = 0; i < files.length; i++) {
        var file = files[i].rawFile;
        formdata.append(file.name, file);
    }
    var xhr = new XMLHttpRequest();
    xhr.open("post", "/PartialView/v2PartialView/SaveFile?SaveFolder=" + d.saveFolder);
    xhr.send(formdata);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var data = deepCopy({ data: xhr.responseText });
            xhr.abort();
            if (onFinish != null) { onFinish(data); }
        }
    }
}

/**************|Kendo MaskedTextBox|**************/
function createKendoMaskedTextBox(allData) {
    var d = allData;
    var ctrID = d.ctrID;
    var ctrID2 = "#" + ctrID;
    $(ctrID2).addClass("KendoControl");

    var mask = d.mask;
    var rules = d.rules;
    var promptChar = d.promptChar;
    var onChange = d.onChange;
    var kmtb = $(ctrID2).kendoMaskedTextBox({
        mask: mask
        , promptChar: promptChar
        , rules: rules
        , change: onChange
    }).data(kd.kmtb);
    UC[ctrID] = kmtb;
}

function createKendoMaskedTextBoxIP(allData) {
    var d = allData;
    var ctrID = d.ctrID;
    var input = $("#" + ctrID);
    input.addClass("KendoControl");
    input.addClass("k-textbox");

    input.keypress(function (e) {
        var isValid = false;
        var key = e.key;
        if (key == ".") {
            var value = input.val() + "";
            var k = value.lastIndexOf(".");
            if (value.length > 0) {
                var test = value.substring(k + 1, value.length);
                isValid = validateIP({ Entry: test });
                if (!isValid) {
                    alert("IP khhông hơp lệ");
                }
            }
        } else {
            var r = new RegExp(/[0-9]/);
            isValid = r.test(key);
        }

        if (!isValid) {
            e.preventDefault();
            return;
        }
    });
}

/*****************|Kendo Data|*****************/
function refigUserData(allData) {
    var d = allData.d;
    var config = allData.config;
    for (var key in config) {
        switch (key) {
            case "k":
                d.ctrID += config.k;
                d.k = config.k;
                break;
            case "filter":
                for (var f in config.filter) {
                    d.filter[f] = config.filter[f];
                }
                break;
            case "optionLabel":
                if (config.optionLabel == null) {
                    delete d.optionLabel;
                } else {
                    d.optionLabel = config.optionLabel;
                }
                break;
            case "ctrID":
            case "ctrWidth":
            case "width":
            case "value":
            case "values":
            case "index":
            case "enable":
            case "filterField":
            case "onChange":
            case "onSuccess":
            case "arrConcat":
            case "cascadings":
            case "data":
            case "url":
            case "search":
                d[key] = config[key];
                break;
            default:
                //d[key] = config[key];
                break;
        }
    }

    return d;
}

function cbbDefaultChange(e) {
    var sender = e.sender;
    var k = sender.UC.k || "";
    var cascadings = sender.UC.cascadings || [];
    for (var i = 0; i < cascadings.length; i++) {
        var child = cascadings[i];
        var cbbChild = UC[child.ctrID + k];
        var txtChild = $("#" + child.ctrID + k);

        var valueField = child.valueField || sender.UC.dataValueField;
        var filterField = child.filterField || sender.UC.filterField || sender.UC.dataValueField;
        var format = child.format;
        var newValue = sender.UC.value({ valueField: valueField, format: format });
        if (cbbChild != null) {
            cbbChild.UC.data = null;
            cbbChild.UC.filter[filterField] = newValue;
            cbbChild.UC.refresh();
        } else {
            if (txtChild.length <= 0) { continue; }
            txtChild.val(newValue);
            txtChild.text(newValue);
        }
    }
};

function getDataCbbCompany() {
    var d = {
        ctrID: "cbbCompany"
        , dataTextField: "CompanyName"
        , dataValueField: "CompanyID"
        , placeholder: "Chọn công ty..."
        , optionLabel: { CompanyName: "Chọn công ty", CompanyID: null }
        , cascadings: [
            { ctrID: "cbbSubCompany" }
            , { ctrID: "cbbLocation", valueField: "Code", format: "string", filterField: "CompanyCode" }]
        , onChange: cbbDefaultChange
        , url: { url: KendoGridTextAll.dfUrlLoadData, spName: "PowerData.dbo.spGetCompany" }
        , filter: null
        , maxSelectedItems: null
        , k: null
    };

    return d;
}

function getDataCbbSubCompany(config) {
    var d = {
        ctrID: "cbbSubCompany"
        , dataTextField: "SubCompanyName"
        , dataValueField: "SubCompanyID"
        , placeholder: "Chọn vùng kinh doanh..."
        , optionLabel: { SubCompanyName: "Chọn vùng kinh doanh", SubCompanyID: null }
        , cascadings: [{ ctrID: "cbbBranch" }]
        , onChange: cbbDefaultChange
        , url: { url: KendoGridTextAll.dfUrlLoadData, spName: "PowerData.dbo.spGetSubCompany" }
        , filter: { CompanyID: "" }
        , maxSelectedItems: null
        , k: null
    };
    if (config != null) { d = refigUserData({ d: d, config: config }); }

    return d;
}

function getDataCbbLocation(config) {
    var d = {
        ctrID: "cbbLocation"
        , dataTextField: "LocationName"
        , dataValueField: "ID"
        , filterField: "LocationID"
        , value: User.LocationID
        , placeholder: "Chọn vùng miền..."
        , optionLabel: { LocationName: "Chọn vùng miền", ID: null }
        , url: { url: KendoGridTextAll.dfUrlLoadData, spName: "PowerData.dbo.spGetLocation" }
        , filter: { UserName: "", INSID: -1, CompanyCode: "", SubParentDesc: "" }
        , cascadings: [{ ctrID: "cbbBranchCode" }, { ctrID: "cbbDistrict" }]
        , onChange: cbbDefaultChange
        , maxSelectedItems: null
        , k: null
        , kendoData: kd.km
        , onSuccess: function (data) {
            var ctrType = getKendoControlType({ ctrID: d.ctrID });
            if (ctrType == kd.kdrl) { return; }
            var ctrID2 = "#" + d.ctrID;
            var cbbLocation = $(ctrID2).data(ctrType);
            cbbLocation.UC.value(User.LocationID);
        }
    };
    if (isLocalHost()) { delete d.onSuccess; delete d.value }
    if (config != null) { d = refigUserData({ d: d, config: config }); }

    return d;
}

function getDataCbbBranchCode(config) {
    var d = {
        ctrID: "cbbBranchCode"
        , dataTextField: "BranchCodeName"
        , dataValueField: "ID"
        , value: -1
        , placeholder: "Chọn chi nhánh..."
        , optionLabel: { BranchCodeName: "Chọn chi nhánh", ID: null }
        , url: { url: KendoGridTextAll.dfUrlLoadData, spName: "PowerData.dbo.spGetBranchCode" }
        , filter: { LocationID: User.LocationID }
    };
    if (config != null) { d = refigUserData({ d: d, config: config }); }

    return d;
}

function getDataCbbBranch(config) {
    var d = {
        ctrID: "cbbBranch"
        , dataTextField: "BranchFullName"
        , dataValueField: "BranchName"
        , placeholder: "Chọn chi nhánh..."
        , optionLabel: { BranchFullName: "Chọn chi nhánh", BranchName: null }
        , url: { url: KendoGridTextAll.dfUrlLoadData, spName: "PowerData.dbo.spGetBranch" }
        , filter: {
            UserName: ""
            , INSID: -1
            , Type: 0
            , SubCompanyID: ""
        }
        , cascadings: [{ ctrID: "cbbDistrict", valueField: "LocationID", filterField: "LocationID" }]
        , onChange: cbbDefaultChange
        , onSuccess: function (data) {
            var ctrType = getKendoControlType({ ctrID: d.ctrID });
            if (ctrType == kd.kdrl) { return; }
            var ctrID2 = "#" + d.ctrID;
            var cbbBranch = $(ctrID2).data(ctrType);
            var BranchID = [];
            data.filter(function (br) {
                if (br.LocationID == User.LocationID) {
                    BranchID.push(br.BranchName);
                }
            });
            cbbBranch.UC.value(BranchID);
            var cbb = $("#" + cbbBranch.UC.ctrID).parent();
            var td = cbb.parent();
            var prevTd = td.prev();
            prevTd.click(function() {
                cbbBranch.UC.value([]);
            })
        }
    };
    if (isLocalHost()) { delete d.onSuccess; }
    if (config != null) { d = refigUserData({ d: d, config: config }); }

    return d;
}

function getDataCbbStaff(config) {
    var d = {
        ctrID: "cbbStaff"
        , dataValueField: "StaffID"
        , dataTextField: "StaffName"
        , placeholder: "Chọn nhân viên..."
        , optionLabel: { StaffName: "Chọn nhân viên", StaffID: null }
        , url: { url: KendoGridTextAll.dfUrlLoadData, spName: "PowerData.dbo.spGetStaff" }
        , filter: { LocationID: "-1", FindField: "", FindOperator: "", FindValue: "" }
        , maxSelectedItems: null
        , k: null
    };
    if (config != null) { d = refigUserData({ d: d, config: config }); }

    return d;
}

function getDataCbbCusType(config) {
    var d = {
        ctrID: "cbbCusType"
        , dataTextField: "CusTypeName"
        , dataValueField: "ID"
        , placeholder: "Chọn loại hình khách hàng..."
        , optionLabel: { ID: null, CusTypeName: "Chọn loại hình khách hàng" }
        , url: "/PartialView/PartialView/LoadCusType"
        , filter: null
    }
    if (config != null) { d = refigUserData({ d: d, config: config }); }

    return d;
}

function getDataCbbStatus(config) {
    var d = {
        ctrID: "cbbStatus"
        , dataTextField: "StatusName"
        , dataValueField: "ID"
        , placeholder: "Chọn tình trạng hợp đồng..."
        , url: "/PartialView/PartialView/LoadStatus"
        , filter: null
    };
    if (config != null) { d = refigUserData({ d: d, config: config }); }

    return d;
}

function getDataCbbStatusSuspend() {
    var d = getDataCbbStatus();
    d.ctrID = "cbbStatusSuspend";
    d.url += "Suspend";
    d.placeholder = "Chọn tình trạng ngưng sử dụng";

    return d;
}

function getDataCbbEOC(config) {
    var d = {
        ctrID: "cbbEOC"
        , dataTextField: "EOCName"
        , dataValueField: "ID"
        , placeholder: "Chọn loại EOC..."
        , url: "/PartialView/PartialView/LoadEOC"
        , filter: null
    };
    if (config != null) { d = refigUserData({ d: d, config: config }); }

    return d;
}

function getDataCbbServicesType() {
    var d = {
        ctrID: "cbbServicesType"
        , dataTextField: "Text"
        , dataValueField: "Value"
        , value: "[Object]"
        , data: [
            { Text: "Tất cả", Value: "[Object]" }
            , { Text: "Internet", Value: "ObjectInternet" }
            , { Text: "TV", Value: "ObjectPayTV" }
            , { Text: "Office 365", Value: "Office365" }
        ]
    };

    return d;
}

function getDataCbbDistrict(config) {
    var d = {
        ctrID: "cbbDistrict"
        , dataTextField: "DistrictName"
        , dataValueField: "ID"
        , filterField: "DistrictID"
        , placeholder: "Chọn quận..."
        , optionLabel: { DistrictName: "Chọn quận", ID: null }
        , cascadings: [{ ctrID: "cbbWard" }, { ctrID: "cbbStreet" }]
        , onChange: cbbDefaultChange
        //, url: "/PartialView/PartialView/LoadDistrict"
        , url: { url: KendoGridTextAll.dfUrlLoadData, spName: "PowerData.dbo.spGetDistrict" }
        , filter: { LocationID: "" }
    };
    if (config != null) { d = refigUserData({ d: d, config: config }); }

    return d;
}

function getDataCbbWard(config) {
    var d = {
        ctrID: "cbbWard"
        , dataTextField: "WardName"
        , dataValueField: "ID"
        , filterField: "WardID"
        , placeholder: "Chọn phường..."
        , optionLabel: { WardName: "Chọn phường", ID: null }
        , cascadings: [{ ctrID: "cbbStreet" }]
        //, url: "/PartialView/PartialView/LoadWard"
        , url: { url: KendoGridTextAll.dfUrlLoadData, spName: "PowerData.dbo.spGetWard" }
        , filter: { DistrictID: "" }
    };
    if (config != null) { d = refigUserData({ d: d, config: config }); }

    return d;
}

function getDataCbbStreet(config) {
    var d = {
        ctrID: "cbbStreet"
         , dataTextField: "Name"
         , dataValueField: "ID"
         , placeholder: "Chọn đường phố..."
         , optionLabel: { Name: "Chọn đường phố", ID: null }
         , url: { url: KendoGridTextAll.dfUrlLoadData, spName: "PowerData.dbo.spGetListStreet" }
         , filter: { DistrictID: "", WardID: "" }
         , maxSelectedItems: null
         , k: null
    };
    if (config != null) { d = refigUserData({ d: d, config: config }); }

    return d;
}

function getDataCbbFN() {
    var d = {
        ctrID: "cbbFN"
        , dataTextField: "Text"
        , dataValueField: "Value"
        , filterField: "FNID"
        , placeholder: "Chọn loại FN..."
        , optionLabel: { Text: "Chọn loại FN", Value: null }
        , cascadings: [{ ctrID: "cbbLocalType" }]
        , onChange: cbbDefaultChange
        , data: [
            { Text: "ADSL", Value: "0" }
            , { Text: "FTTH", Value: "1" }
            , { Text: "VDSL", Value: "2" }
            , { Text: "ADSL2+", Value: "3" }
            , { Text: "Khác", Value: "-123" }
        ]
    };

    return d;
}

function getDataCbbLocalType(config) {
    var FNID = "";
    if (UC.cbbFN != null) {
        FNID = UC.cbbFN.UC.value();
        FNID = (FNID.length <= 0) ? "-1" : FNID;
    }
    var d = {
        ctrID: "cbbLocalType"
        , dataTextField: "LocalTypeName"
        , dataValueField: "ID"
        , placeholder: "Chọn loại dịch vụ..."
        , optionLabel: { LocalTypeName: "Chọn gói dịch vụ", ID: null }
        , url: "/PartialView/PartialView/LoadLocalType"
        , filter: { FNID: FNID }
    };
    if (config != null) { d = refigUserData({ d: d, config: config }); }

    return d;
}

function getDataCbbSSStatus() {
    var d = {
        ctrID: "cbbSSStatus"
        , dataTextField: "StatusName"
        , dataValueField: "ID"
        , placeholder: "Chọn tình trạng khảo sát..."
        , url: "/PartialView/PartialView/LoadSSStatus"
        , filter: null
    };

    return d;
}

function getDataCbbCAType() {
    var d = {
        ctrID: "cbbCAType"
        , dataTextField: "Text"
        , dataValueField: "Value"
        , placeholder: "Chọn loại CA..."
        , data: [
            { Text: "Bạc", Value: 17 }
            , { Text: "Vàng", Value: 16 }
            , { Text: "Kim cương", Value: 15 }
        ]
    };

    return d;
}

function getDataCbbGroupType() {
    var d = {
        ctrID: "cbbGroupType"
        , dataTextField: "Text"
        , dataValueField: "Value"
        , value: "LocalType"
        , data: [
           { Text: "Gói dịch vụ", Value: "LocalType" }
            , { Text: "Quận", Value: "District" }
            , { Text: "Nhân viên bán", Value: "SalesID" }
        ]
    };

    return d;
}

function getDataCbbFindOperator(config) {
    var d = {
        ctrID: "cbbFindOperator"
        , dataTextField: "Text"
        , dataValueField: "Value"
        , value: "contains"
        , data: [
            { Text: "Chính xác", Value: "eq" }
            , { Text: "Bắt đầu bằng", Value: "startswith" }
            , { Text: "Có trong", Value: "contains" }
        ]
    };
    if (config != null) { d = refigUserData({ d: d, config: config }); }

    return d;
}

function getDataCbbDivision(config) {
    var d = {
        ctrID: "cbbDivision"
        , dataTextField: "Name"
        , dataValueField: "ID"
        , url: { url: KendoGridTextAll.dfUrlLoadData, spName: "PowerData.dbo.spGetDivision" }
        , filter: { LocationID: User.LocationID }
    };
    if (config != null) { d = refigUserData({ d: d, config: config }); }

    return d;
}

function getDataCbbCusDiv(config) {
    var d = {
        ctrID: "cbbCusDiv"
       , dataTextField: "Text"
       , dataValueField: "Value"
       , value: ""
       , data: [
           { Text: "CUS 0", Value: "0" }
           , { Text: "CUS 1", Value: "1" }
           , { Text: "CUS 2", Value: "2" }
           , { Text: "CUS 3", Value: "3" }
           , { Text: "CUS 4", Value: "4" }
           , { Text: "CUS 5", Value: "5" }
           , { Text: "CUS 6", Value: "6" }
           , { Text: "CUS 7", Value: "7" }
           , { Text: "CUS 8", Value: "8" }
           , { Text: "CUS 9", Value: "9" }
           , { Text: "CUS 10", Value: "10" }
           , { Text: "CUS 11", Value: "11" }
           , { Text: "CUS 30", Value: "30" }
           , { Text: "CUS 50", Value: "50" }
           , { Text: "CUS 90", Value: "90" }

       ]
    };
    if (config != null) { d = refigUserData({ d: d, config: config }); }

    return d;
}

function getDataCbbYesNo(config) {
    var d = {
        ctrID: "cbbAcceptance"
        , dataTextField: "Text"
        , dataValueField: "Value"
        , value: true
        , data: [{ Text: "Yes", Value: true }
                , { Text: "No", Value: false }]
        , optionLabel: { Text: "Chọn...", Value: null }
    }
    if (config != null) { d = refigUserData({ d: d, config: config }); }

    return d;
}

function getDataCbbINSJob(config) {
    var d = {
        ctrID: "cbbINSJob"
        , dataValueField: "ID"
        , dataTextField: "JobName"
        , placeholder: "Không chọn"
        , url: { url: dfUrlLoadData, spName: "PowerData.dbo.spGetSPVKind" }
        , filter: { TypeID: "-1", ParentID: "-1" }
    };
    if (config != null) { d = refigUserData({ d: d, config: config }); }

    return d;
}

function getDataCbbJobFunction(config) {
    var d = getDataCbbINSJob();
    d.ctrID = "cbbJobFunction";
    d.filter.TypeID = "2";
    d.cascadings = [{ ctrID: "cbbSubFunction", filterField: "ParentID" }];
    d.onChange = cbbDefaultChange;
    if (config != null) { d = refigUserData({ d: d, config: config }); }

    return d;
}

function getDataCbbSubFunction(config) {
    var d = getDataCbbINSJob();
    d.ctrID = "cbbSubFunction";
    d.filter.TypeID = "3";
    d.width = "350px";
    d.cascadings = [{ ctrID: "cbbInsideAuthoCode", filterField: "ParentID" }];
    d.onChange = cbbDefaultChange;
    if (config != null) { d = refigUserData({ d: d, config: config }); }

    return d;
}

function getDataCbbInsideAuthoCode(config) {
    var d = getDataCbbINSJob();
    d.ctrID = "cbbInsideAuthoCode";
    d.filter.TypeID = "4";
    if (config != null) { d = refigUserData({ d: d, config: config }); }

    return d;
}

function getDataCbbJobTitle(config) {
    var d = getDataCbbINSJob();
    d.ctrID = "cbbJobTitle";
    d.filter.TypeID = "5";
    d.dataValueField = "JobCode";
    if (config != null) { d = refigUserData({ d: d, config: config }); }

    return d;
}

function getDataCbbPaidType(config) {
    var d = {
        ctrID: "cbbPaidType"
        , dataTextField: "Name"
        , dataValueField: "PaidType"
        , placeholder: "Chọn hình thức thanh toán..."
        , optionLabel: { Name: "Chọn hình thức thanh toán", PaidType: -1 }
        , url: { url: KendoGridTextAll.dfUrlLoadData, spName: "PowerData.dbo.spGetPaidTypeList" }
        , filter: null
        , maxSelectedItems: null
        , k: null
    };
    if (config != null) { d = refigUserData({ d: d, config: config }); }

    return d;
}

/*****************|All Functions|*****************/
function getAjaxCallObject(allData) {
    if (arguments.callee.caller == null) { return sms.disable; }
    var t = AjaxConfig;
    var onSuccess = allData.onSuccess;
    var onError = allData.onError;
    var url2 = allData.url;
    var filter = allData.filter;
    var urlType = jQuery.type(url2);
    if (urlType == "object") {
        var jsonFilter = ConvertDataToJsonString({ data: filter });
        filter = deepCopy({ data: url2 });
        delete filter.url;
        filter.jsonFilter = jsonFilter;
        url2 = url2.url;
    }

    var a = $.ajax({
        type: allData.type || "post"
        , headers: allData.headers
        , url: url2
        , data: filter
        , ContentType: "application/json;charset=utf-8"
        , datatype: allData.datatype || "json"
        , traditional: true
        , timeout: t.timeout
        , success: function (data) {
            a.abort();
            if (onSuccess != null) { onSuccess(data); }
        }
        , error: function (x, e) {
            alert(getError({ x: x, e: e }));
            a.abort();
            if (onError != null) { onError(x, e); }
        }
    });
}

function alert(allData) {
    var smsAlert = createSMSAlert(allData);
    allData = allData || { title: "Thông báo", message: allData + "" };
    var title = allData.title || "Thông báo";
    var message = allData.message;
    if (message == null) { message = allData + ""; };

    //message = escapeJsonString(message);
    message = message.replace(/[\r]/g, "")
        .replace(/[\n]/g, "<br/>")
        .replace(/\\'/g, "\\'");

    $("#lblAlert").html(message);
    smsAlert.title(title);
    smsAlert.UC.open();
}

function confirm2(allData) {
    var smsConfirm = $("#smsConfirm").data(kd.kw) || createSMSConfirm();
    var dfd = new jQuery.Deferred();
    var title = allData.title;
    var message = allData.message;
    title = title || "Xác nhận";
    message = message || allData + "";
    message = message.replace(/[\r]/g, "")
       .replace(/[\n]/g, "<br/>")
       .replace(/\\'/g, "\\'");

    $("#lblConfirm").html(message);
    smsConfirm.title(title);
    smsConfirm.setOptions({
        close: function (e) {
            dfd.resolve(smsConfirm.UC.Status);
        }
    });
    smsConfirm.UC.open();

    return dfd.promise();
}

function getError(allData) {
    var x = allData.x;
    var e = allData.e;

    var responseText = JSON.parse(x.responseText);
    var d = {
        title: sms.error
        , message: "<b>Status</b>: " + x.status + "</br><b>Message</b>: " + responseText.message
    };

    return d;
}

function selectTab(allData) {
    var ctrID = allData.ctrID;
    var ctrID2 = "#" + ctrID;
    var index = allData.index;

    var tabstrip = $(ctrID2).data(kd.kts);
    if (tabstrip != null) {
        tabstrip.select(index);
        tabstrip.enable(tabstrip.select(), true);
    }
}

function selectPanelbar(allData) {
    var d = allData;
    var ctrID2 = "#" + d.ctrID;
    var kpb = $(ctrID2).data(kd.kpb);

    if (d.enable != null) {
        var enable = "#" + d.enable;
        enable = enable.replace(/,/g, ",#");
        kpb.enable($(enable), true);
    }
    if (d.collapse != null) {
        var collapse = "#" + d.collapse;
        collapse = collapse.replace(/,/g, ",#");
        kpb.collapse($(collapse));
    }
    if (d.expand != null) {
        var expand = "#" + d.expand;
        expand = expand.replace(/,/g, ",#");
        kpb.expand($(expand));
    }
    if (d.disable != null) {
        var disable = "#" + d.disable;
        disable = disable.replace(/,/g, ",#");
        kpb.enable($(disable), false);
    }
}

function setLabelText(allData) {
    var ctrID = allData.ctrID;
    var ctrID2 = "#" + ctrID;
    var text = allData.text;

    var lbl = $(ctrID2)[0];
    if (lbl != null) {
        lbl.textContent = text;
    }
}

function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function escapeJsonString(string) {
    return string
        .replace(/[\r]/g, "")
        .replace(/[\n]/g, "<br/>")
        .replace(/\\'/g, "\\'")
        .replace(/[\\]/g, '\\\\')
        .replace(/[\/]/g, '\\/');

    //return string
    //     .replace(/[\b]/g, '\\b')
    //     .replace(/[\f]/g, '\\f')
    //     .replace(/[\n]/g, '\\n')
    //     .replace(/[\r]/g, '\\r')
    //     .replace(/[\t]/g, '\\t')
    //     .replace(/[\"]/g, '\\"')
}

function removeJsonString(string) {
    return string
        .replace(/[\r]/g, "")
        .replace(/[\n]/g, "")
        .replace(/[\"]/g, '')
        .replace(/[\']/g, '')
        .replace(/[\\]/g, '')
        .replace(/[\/]/g, '');
}

function deepCopy(allData) {
    var data = allData.data;
    if (data == null) { return []; }
    var jsonString = JSON.stringify(data);
    var newData = JSON.parse(jsonString);

    return newData;
}

function htmlEncode(allData) {
    var htmlText = allData.htmlText;
    var htmlReturn = $('<div/>').text(htmlText).html();
    return htmlReturn;
}

function htmlDecode(allData) {
    var htmlText = allData.htmlText;
    var htmlReturn = $('<div/>').html(htmlText).text();
    return htmlReturn;
}

function downloadFile(allData) {
    var fileName = allData.fileName;
    var isDelete = allData.isDelete;
    var parameters = "strFileName=" + fileName + "&isDelete=" + isDelete;
    window.open("/PartialView/PartialView/DownloadFile?" + parameters, "_self");
}

function isLocalHost() {
    var value = false;
    var myUrl = window.location.href;
    var k = myUrl.indexOf("localhost");
    if (k != -1 || User.UserName == "namlh7") {
        value = true;
    }

    return value;
}

function validateDate(allData) {
    var isValid = false;
    var ctrID1 = allData.ctrID1;
    var ctrID2 = allData.ctrID2;
    var date1 = getKendoDatePickerValue({ ctrID: ctrID1, kind: 2 });
    var date2 = getKendoDatePickerValue({ ctrID: ctrID2, kind: 2 });
    if (date1 > date2) {
        alert("Từ ngày phải nhỏ hơn đến ngày!");
    } else {
        isValid = true;
    }

    return isValid;
}

function validateEmail(allData) {
    var emails = allData.emails;
    var myEmails = emails.split(";");

    var isValid = false;
    var re = /^[\w-]+(\.[\w-]+)*@([a-z0-9-]+(\.[a-z0-9-]+)*?\.[a-z]{2,6}|(\d{1,3}\.){3}\d{1,3})(:\d{4})?$/;
    var n = myEmails.length;
    for (var i = 0; i < n; i++) {
        var myEmail = myEmails[i];
        if (!(i == n - 1 && myEmail.length == 0)) {
            isValid = re.test(myEmail);
            if (!isValid) {
                break;
            }
        }
    }

    return isValid;
}

function validateText(allData) {
    var ctrID = allData.ctrID;
    var IsValid = false;
    var txt = $("#" + ctrID);
    var text = txt.val();
    if (text.length > 0) {
        IsValid = true;
    }
    txt.error(!IsValid);

    return IsValid;
}

function validateIP(allData) {
    var d = allData;
    var Entry = d.Entry;
    var IPv4 = d.IPv4;
    var IPv6 = d.IPv6;
    var isValid = false;
    var r;
    if (Entry != null && Entry.length > 0) {
        r = new RegExp(/^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))$/);
        isValid = r.test(Entry);
    }
    if (IPv4 != null && IPv4.length > 0) {
        var arrEntry = IPv4.split(".");
        if (arrEntry.length != 4) { return false; }
        r = new RegExp(/^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/gm);
        isValid = r.test(IPv4);
    };
    if (IPv6 != null && IPv6.length > 0) {
        var arrEntry = IPv6.split(".");
        if (arrEntry.length != 4) { return false; }
        r = new RegExp(/^((?:[0-9A-Fa-f]{1,4}))((?::[0-9A-Fa-f]{1,4}))*::((?:[0-9A-Fa-f]{1,4}))((?::[0-9A-Fa-f]{1,4}))*|((?:[0-9A-Fa-f]{1,4}))((?::[0-9A-Fa-f]{1,4})){7}$/);
        isValid = r.test(IPv6);
    };

    return isValid;
}

function reheightDivScroll() {
    var x = screen.height - 250;
    var divScroll = $(".divScroll");
    divScroll.height(x);
}

function setCookie(allData) {
    var cname = allData.cname;
    var cvalue = allData.cvalue;
    var exdays = allData.exdays;

    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires + "; path=/";
}

function getCookie(allData) {
    var cname = allData.cname;
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}

function getKendoControlType(allData) {
    var ctrID2 = "#" + allData.ctrID;
    var ctrType = null;

    var element = $(ctrID2);
    var widget = kendo.widgetInstance(element);
    if (widget != null && widget.ns != null) {
        ctrType = widget.ns.replace(".", "");
    }

    return ctrType;
}

function removeKendoDisabled() {
    var div = $(".k-state-disabled");
    div.removeClass("k-state-disabled");
}

function parseBoolean(value) {
    var b = false;
    var vType = jQuery.type(value);
    switch (vType) {
        case "string":
            b = (value == "true") ? true : false;
            break;
        case "number":
            b = (value == 1) ? true : false;
            break;
        default:
            break;
    }

    return b;
}

function DATEDIFF(interval, starting_date, ending_date) {
    var d1 = starting_date;
    var d2 = ending_date;
    var t1 = d1.getTime();
    var t2 = d2.getTime();
    var timeSpan = t2 - t1;
    var d1Y = d1.getFullYear();
    var d2Y = d2.getFullYear();
    var d1M = d1.getMonth();
    var d2M = d2.getMonth();
    var hour = 3600 * 1000;
    var days = hour * 24;
    var weeks = days * 7;

    var diff = {
        hour: Math.round(timeSpan / hour)
        , day: Math.round(timeSpan / days)
        , week: Math.round(timeSpan / weeks)
        , month: (d2M + 12 * d2Y) - (d1M + 12 * d1Y)
        , year: d2Y - d1Y
        , timeSpan: timeSpan
    };
    if (interval == "all") { return diff; }
    return diff[interval];
}

function getUrlParameters(allData) {
    var paras = allData.paras + "";
    var arr = paras.split("&");
    var values = {};
    for (var i = 0; i < arr.length; i++) {
        var para = arr[i];
        var v = para.split("=");
        values[v[0]] = v[1];
    }

    return values;
}

/*****************|Menu|*****************/
function createMenu() {
    var UserName = User.UserName;
    var UserAllow = ["oanh254", "Oanh254", "oanhvk", "namlh7", "ducht", "phuongtt1", "hiennt7", "dungha1", "thailn", "lamkbd", "leltm", "thetm", "congtt", "phuoctd", "Thuynt88"];
    var n = UserAllow.indexOf(UserName);
    if (n == -1) { return; }
    $("#dMenu").css("display", "block");
    $("#imgMenu").css("display", "block");
    var d1 = getDataMenu();
    var ctrID = d1.ctrID;
    var ctrID2 = "#" + ctrID;
    var gridType = d1.gridType;
    KendoGridReset({ ctrID: ctrID });
    var f = new Object();
    var d = KendoGridLevelGetData(d1);
    d.Columns[0].width = "22px";
    var columns = d.Columns;
    f.dataSource = d.DataSource;
    f.columns = columns;
    f.selectable = d.Selectable;
    f.filterable = d.FilterAble;
    f.sortable = d.SortAble;
    f.pageable = d.PageAble;
    d.GridType = gridType;
    var kg = $(ctrID2).kendoGrid(f).data(kd.kg);
    kg.UC = d;
    KendoLoadAjax({ ctrID: ctrID, isLoad: true });
    getAjaxCallObject({
        url: d1.url
        , filter: d1.filter
        , onSuccess: function (data) {
            if (data == null || jQuery.type(data) == "string") { alert({ title: sms.error, message: data }); return; }
            kg.UC["Data"] = data;
            KendoGridLevelRefig({ ctrID: ctrID });
            var tbExpCol = $(ctrID2 + "_tbExpCol");
            tbExpCol.css("display", "none");
        }
    });
}

function getDataMenu() {
    var d = {
        ctrID: "gridMenu"
        , url: { url: KendoGridTextAll.dfUrlLoadData, spName: "PowerData.dbo.spGetMenuMVC" }
        , columns: [
            { field: "Name", title: "Menu", template: "#=(Path=='')?Name:\"<a href='\"+Path+\"'>\"+Name+\"</a>\"#" }
        ]
        , gridType: "GridLevel"
        , exportExcel: {
            isExport: false
        }
    };

    return d;
}

function showMenu(img) {
    var imgSrc = img.src + "";
    var gridMenu = $("#gridMenu");
    var dContent = $("#dContent");
    var marginA = "0px";
    var marginB = gridMenu.css("width");
    marginB = "220px";
    var a = "MenuShow.png";
    var b = "MenuClose.png";

    if (imgSrc.indexOf(a) != -1) {
        /***************|Mở|***************/
        img.src = img.src.replace(a, b);
        dContent.css("margin-left", marginB);
        img.style.marginLeft = marginB;
        gridMenu.css("margin-left", marginA);
    } else {
        /***************|Đóng|***************/
        img.src = img.src.replace(b, a);
        gridMenu.css("margin-left", "-" + marginB);
        img.style.marginLeft = marginA;
        dContent.css("margin-left", marginA);
    }
}

function createSMS() {
    createSMSAlert();
    createSMSConfirm();
}

function createSMSAlert(config) {
    config = config || {};
    $("#smsAlert").keydown(function (event) {
        switch (event.keyCode) {
            case kendo.keys.ENTER:
            case kendo.keys.ESC:
                closeAlert();
                break;
            default:
                break;
        }
    });
    createKendoButton({ ctrID: "btnAlertOk", onClick: closeAlert });
    createKendoWindow({
        ctrID: "smsAlert"
        , actions: []
        , modal: true
        , visible: false
        , minWidth: "300px"
        , scrollable: false
        , onClose: config.onClose
    });
    var smsAlert = $("#smsAlert").data(kd.kw);

    return smsAlert;
}

function createSMSConfirm() {
    $("#smsConfirm").keydown(function (event) {
        switch (event.keyCode) {
            case 27:
                closeConfirm({ status: false });
                break;
            default:
                break;
        }
    });
    createKendoButton({ ctrID: "btnConfirmOk", onClick: function (e) { closeConfirm({ e: e, status: true }); } });
    createKendoButton({ ctrID: "btnConfirmCancel", onClick: function (e) { closeConfirm({ e: e, status: false }); } });
    createKendoWindow({
        ctrID: "smsConfirm"
        , actions: []
        , modal: true
        , visible: false
        , minWidth: "300px"
        , scrollable: false
    });
    var smsConfirm = $("#smsConfirm").data(kd.kw);

    return smsConfirm;
}

function closeAlert() {
    var smsAlert = $("#smsAlert").data(kd.kw);
    smsAlert.UC.close();
}

function closeConfirm(allData) {
    var status = allData.status;
    var smsConfirm = $("#smsConfirm").data(kd.kw);
    smsConfirm.UC.Status = status;
    smsConfirm.UC.close();
}

/*****************|Export Excel|*****************/
function ExportExcel(allData) {
    var t = KendoGridTextAll;

    /*************|Dữ liệu bắt buộc|*************/
    var data = allData.data;
    var columns = allData.columns;
    var groupHeader = allData.groupHeader;
    var gridType = allData.gridType;
    var fileName = allData.fileName;
    var btnExportExcel = allData.btnExportExcel;
    var lblExportExcelStatus = allData.lblExportExcelStatus;

    /*************|Set Label Text|*************/
    var lblID = "";
    if (lblExportExcelStatus != null) { lblID = lblExportExcelStatus.ctrID; }
    setLabelText({ ctrID: lblID, text: "Đang xuất..." });

    if (data == null || data.length == 0) {
        var url2 = allData.url;
        if (url2 == null) { alert("Dữ liệu rỗng"); return; }
        if (url2.url == t.dfUrlExportExcel) {
            /*************|Export từ Server|*************/
            ExportExcelFromServer(allData);
            return;
        }
    }

    /****************|Export từ Client|****************/
    ExportExcelToggleButton({ ctrID: btnExportExcel.ctrID, isLoad: true });
    var jsonData = ConvertDataToJsonString({ data: data });
    var jsonColumns = ConvertDataToJsonString({ data: columns });
    var jsonGroupHeader = ConvertDataToJsonString({ data: groupHeader });

    ExportExcelSetJsonString({
        jsonData: jsonData
        , jsonColumns: jsonColumns
        , jsonGroupHeader: jsonGroupHeader
        , gridType: gridType
        , fileName: fileName
        , btnExportExcel: btnExportExcel
        , lblExportExcelStatus: lblExportExcelStatus
    });
}

function ExportExcelFromServer(allData) {
    var columns = allData.columns;
    var groupHeader = allData.groupHeader;
    var url2 = allData.url;
    var gridType = allData.gridType;
    var exportExcel = allData.exportExcel;
    var filter = allData.filter;

    var fileName = exportExcel.fileName;
    var lblID = "";
    var btnExportExcel = exportExcel.btnExportExcel;
    var lblExportExcelStatus = exportExcel.lblExportExcelStatus;
    if (lblExportExcelStatus != null) { lblID = lblExportExcelStatus.ctrID; }
    setLabelText({ ctrID: lblID, text: "Đang xuất..." });
    ExportExcelToggleButton({ ctrID: btnExportExcel.ctrID, isLoad: true });

    columns = ExportExcelColumnsReCal({ columns: columns });
    columns = ExportExcelColumnsRemoveProperties({ columns: columns });
    var jsonColumns = ConvertDataToJsonString({ data: columns });
    var spName = url2.spName;

    var jsonFilter = ConvertDataToJsonString({ data: filter });

    if (groupHeader != null) {
        exportExcel.groupHeader = [];
        KendoGridGroupHeader({ groupHeader: groupHeader, columns: columns, exportExcel: exportExcel });
        exportExcel.groupHeader = KendoGridExportExcelGroupHeaderRefig({ groupHeader: exportExcel.groupHeader });
    }
    var jsonGroupHeader = ConvertDataToJsonString({ data: exportExcel.groupHeader });

    filter = {
        spName: spName
        , jsonFilter: jsonFilter
        , jsonColumns: jsonColumns
        , gridType: gridType
        , fileName: fileName
        , jsonGroupHeader: jsonGroupHeader
    }
    getAjaxCallObject({
        url: url2.url
        , filter: filter
        , onSuccess: function (data) {
            data = data + "";
            if (data.substring(0, 5) == "Error") {
                alert({ title: sms.error, message: data });
                setLabelText({ ctrID: lblID, text: data });
            } else {
                downloadFile({ fileName: data, isDelete: ExportExcelTextAll.isDeleteFileAfterDownloaded })
                ExportExcelToggleButton({ ctrID: btnExportExcel.ctrID, isLoad: false });
                setLabelText({ ctrID: lblID, text: "" });
                var onSuccess = allData.onSuccess;
                if (onSuccess != null) {
                    onSuccess(data);
                }
            }
        }
        , onError: function (x, e) {
            var err = "Xuất Excel lỗi: mã lỗi " + x.status + ", " + x.responseText;
            setLabelText({ ctrID: lblID, text: err });
        }
    });
}

function ExportExcelColumnsRemoveProperties(allData) {
    var columns = allData.columns;
    columns = columns.filter(function (col) {
        //delete col.footerTemplate;
        delete col.width;
        delete col.template;
        delete col.attributes;
        delete col.edit;
        delete col.editor;
        delete col.dirty;
        delete col.dirtyFields;

        if (col.columns != null) {
            col.columns = ExportExcelColumnsRemoveProperties({ columns: col.columns });
        }
        if (jQuery.type(col) == "array") {
            col = ExportExcelColumnsRemoveProperties({ columns: col });
        }

        return col;
    });

    return columns;
}

function ExportExcelDataRemoveProperties(allData) {
    var data = allData.data;
    data = data.filter(function (obj) {
        delete obj.index;
        delete obj.ParentLevel;
        delete obj.dirty;
        delete obj.dirtyFields;

        return obj;
    });

    return data;
}

function ExportExcelColumnsReCal(allData) {
    var t = KendoGridTextAll;
    var ta = t.aggregate + "";
    ta = ta.replace(/,/g, "|");
    var columns = allData.columns;
    for (var i = 0; i < columns.length; i++) {
        var col = columns[i];
        var fttp = col.footerTemplate;
        if (fttp == null) { continue; }
        /***************|Match Html Tag|***************/
        var r1 = new RegExp("<.*?>", "g");
        fttp = fttp.replace(r1, "");

        /***************|Match Kendo Format|***************/
        var fdData1 = fttp.match(/#:kendo[.]format[(]\"{(.*?)[)]#/g, "");
        if (fdData1 == null) { continue; }
        for (var n1 = 0; n1 < fdData1.length; n1++) {
            var fd1 = fdData1[n1] + "";
            /***********|Kendo Format Operator|***********/
            var fdFormat = fd1.match(/[(]\"{(.*?),/g, "");
            var fdF = fdFormat[0] + "";
            var f1 = fdF.indexOf("\"");
            var f2 = fdF.indexOf(",");
            fdF = fdF.substring(f1 + 1, f2 - 1);

            /***********|Kendo Format Value|***********/
            var fdData2 = fd1.match(/,(.*?)[)]#/g, "");
            var fd2 = fdData2[0] + "";
            var fd2 = fd2.substring(1, fd2.length - 2);
            fd2 = "#:(" + fd2 + ").format(" + fdF + ")#";

            /***********|Convert to C# Compute|***********/
            var r3 = new RegExp("data[.](.*?)[.](" + ta + ")", "g");
            var fdData3 = fd2.match(r3, "");
            if (fdData3 == null) {
                fttp = fttp.replace(fd1, fd2);
                continue;
            }
            for (var n2 = 0; n2 < fdData3.length; n2++) {
                var fd3 = fdData3[n2] + "";
                var x = fd3.indexOf(".");
                var y = fd3.lastIndexOf(".");
                var colName = fd3.substring(x + 1, y);
                var colOperator = fd3.substring(y + 1, fd3.length);
                fd2 = fd2.replace(fd3, colOperator + "(" + colName + ")");
            }
            fttp = fttp.replace(fd1, fd2);
        }
        col.footer = fttp;
    }

    return columns;
}

function ExportExcelToggleButton(allData) {
    var ctrID = allData.ctrID;
    var ctrID2 = "#" + ctrID;
    var isLoad = allData.isLoad;

    var btn = $(ctrID2).data(kd.kbtn);
    if (btn != null) {
        btn.enable(!isLoad);
    } else {
        $(ctrID2).prop("disabled", isLoad);
    }
}

function ConvertDataToJsonString(allData) {
    var data = allData.data;
    if (data == null || data.length == 0) { return ""; }
    var jsonString = JSON.stringify(data);
    jsonString = htmlEncode({ htmlText: jsonString });

    return jsonString;
}

function ConvertDataToXmlString(allData) {
    var data = allData.data;
    var IsEncode = true;
    if (allData.IsEncode != null) { IsEncode = allData.IsEncode; }

    if (data == null || data.length == 0) { return ""; }
    var xmlString = "";
    for (var i = 0; i < data.length; i++) {
        var item = data[i];
        xmlString += "<row";
        for (var key in item) {
            //var ot = "<" + key + ">";
            //var ct = "</" + key + ">";
            //xmlString += ot + item[key] + ct;
            xmlString += " " + key + "=\"" + item[key] + "\"";
        }
        xmlString += "/>";
    }
    if (IsEncode) {
        xmlString = htmlEncode({ htmlText: xmlString });
    }

    return xmlString;
}

function ExportExcelSetJsonString(allData) {
    var t = ExportExcelTextAll;
    var max = t.jsonStringMaxLength;

    var jsonData = allData.jsonData;
    var jsonColumns = allData.jsonColumns;
    var jsonGroupHeader = allData.jsonGroupHeader;
    var gridType = allData.gridType;
    var fileName = allData.fileName;
    var btnExportExcel = allData.btnExportExcel;
    var lblExportExcelStatus = allData.lblExportExcelStatus;
    var jsonTemp = jsonData.substring(0, max);

    getAjaxCallObject({
        url: "/PartialView/v2PartialView/ExportExcelSetJsonString"
        , filter: {
            jsonString: jsonTemp
        }
        , onSuccess: function (data) {
            var x = jsonData.length;
            var y = jsonTemp.length;
            if (x > y) {
                jsonData = jsonData.substring(max, x);
                ExportExcelSetJsonString({
                    jsonData: jsonData
                    , jsonColumns: jsonColumns
                    , jsonGroupHeader: jsonGroupHeader
                    , gridType: gridType
                    , fileName: fileName
                    , btnExportExcel: btnExportExcel
                    , lblExportExcelStatus: lblExportExcelStatus
                });
            } else {
                ExportExcelNow({
                    jsonColumns: jsonColumns
                    , jsonGroupHeader: jsonGroupHeader
                    , gridType: gridType
                    , fileName: fileName
                    , btnExportExcel: btnExportExcel
                    , lblExportExcelStatus: lblExportExcelStatus
                });
            }
        }
    });
}

function ExportExcelNow(allData) {
    var t = ExportExcelTextAll;

    var jsonColumns = allData.jsonColumns;
    var jsonGroupHeader = allData.jsonGroupHeader;
    var gridType = allData.gridType;
    var fileName = allData.fileName;
    var btnExportExcel = allData.btnExportExcel;
    var lblExportExcelStatus = allData.lblExportExcelStatus;
    var lblID = "";
    if (lblExportExcelStatus != null) { lblID = lblExportExcelStatus.ctrID; }

    getAjaxCallObject({
        url: "/PartialView/v2PartialView/ExportExcelNow"
        , filter: {
            JsonColumns: jsonColumns
            , JsonGroupHeader: jsonGroupHeader
            , GridType: gridType
            , FileName: fileName
        }
        , onSuccess: function (data) {
            data = data + "";
            if (data.substring(0, 5) == "Error") {
                alert({ title: sms.error, message: data });
                setLabelText({ ctrID: lblID, text: data });
            } else {
                downloadFile({ fileName: data, isDelete: t.isDeleteFileAfterDownloaded })
                ExportExcelToggleButton({ ctrID: btnExportExcel.ctrID, isLoad: false });
                setLabelText({ ctrID: lblID, text: "" });
            }
        }
        , onError: function (x, e) {
            var err = "Xuất Excel lỗi: mã lỗi " + x.status + ", " + x.responseText;
            setLabelText({ ctrID: lblID, text: err });
        }
    });
}

//$("#fTest").change(function () {
//    if (this.files && this.files[0]) {
//        var FR = new FileReader();
//        FR.addEventListener("load", function (e) {
//            console.log(e.target.result);
//        });
//        FR.readAsDataURL(this.files[0]);
//    }
//});
