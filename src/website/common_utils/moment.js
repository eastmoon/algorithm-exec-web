// 對Date的擴充套件，將 Date 轉化為指定格式的String
// 月(M)、日(d)、小時(h)、分(m)、秒(s)、季度(q) 可以用 1-2 個佔位符，
// 年(y)可以用 1-4 個佔位符，毫秒(S)只能用 1 個佔位符(是 1-3 位的數字)
// 例子：
// (new Date()).format("YYYY-MM-DD HH:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).format("YYYY-M-D H.m.s.S")   ==> 2006-7-2 8:9:4.18
function date_format(date, fmt) {
    var o = {
        "M+": date.getMonth() + 1, //月份
        "D+": date.getDate(), //日
        "H+": date.getHours(), //小時
        "m+": date.getMinutes(), //分
        "s+": date.getSeconds(), //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        "S": date.getMilliseconds() //毫秒
    };
    if (/(Y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o) {
        if (new RegExp("(" +  k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" +  o[k]).substr(("" + o[k]).length)));
    }
    return fmt;
};

module.exports = {
    format: (date, fmt) => { return date_format(date, fmt); },
    current: () => { return date_format(new Date(), "YYYY-MM-DD HH:mm:ss"); },
    timestamp: () => { return Math.round(new Date().getTime()/1000); }
}
