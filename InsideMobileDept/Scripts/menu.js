$(document).ready(function () {
    create();
});

function create() {
    createKendoPanelBar2({ ctrID: "panelbarmenu" });
}

function createKendoPanelBar2(allData) {
    var d = allData;
    var ctrID = d.ctrID;
    var ctrID2 = "#" + ctrID;
    $(ctrID2).addClass("KendoPanelBar");
    var kpb = $(ctrID2).kendoPanelBar({
        /*animation: false,*/
    }).data(kd.kpb);
    UC[ctrID] = kpb;
}