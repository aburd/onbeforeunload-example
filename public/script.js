function getTimeOnPage(startTime, endTime) {
    var actual = (endTime - startTime) / 1000;
    var rounded = Math.round(actual * 100) / 100;
    var timeStr = String(rounded).length < 4 ? String(rounded) + '0' : String(rounded)
    return {
        actual: actual,
        rounded: rounded,
        timeStr: timeStr,
    };
}
function main() {
    var url = 'http://localhost:3000';
    var startTime = Date.now();

    window.onbeforeunload = function (e) {
        var data = { timeStats: getTimeOnPage(startTime, Date.now()) }
        var oReq = new XMLHttpRequest();
        oReq.open("POST", url);
        oReq.setRequestHeader("Content-type", "application/json");
        oReq.send(JSON.stringify(data));

        var alertChk = document.querySelector('#alert');
        if (alertChk.checked) {
            var dialogText = 'Dialog text here';
            e.returnValue = dialogText;
            return dialogText;
        }
    }

    var dataTag = document.querySelector('.data');
    function updateTime() {
        var timeStats = getTimeOnPage(startTime, Date.now());
        dataTag.innerHTML = timeStats.timeStr;
        requestAnimationFrame(updateTime);
    }
    requestAnimationFrame(updateTime)
}
window.onload = main;