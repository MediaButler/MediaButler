module.exports = (x, y) => {
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var fullMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    var fullDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    var suffix = ['st', 'nd', 'rd', 'th'];
    var z = {
        a: (x.getHours() >= 12) ? 'pm' : 'am',
        A: (x.getHours() >= 12) ? 'PM' : 'AM',
        B: Math.floor((((x.getUTCHours() + 1) % 24) + x.getUTCMinutes() / 60 + x.getUTCSeconds() / 3600) * 1000 / 24),
        c: x.toISOString(),
        m: (x.getHours().toString().length == 2) ? x.getMonth() + 1 : '0' + x.getMonth() + 1,
        M: months[x.getMonth()],
        n: x.getMonth() + 1,
        L: parseInt(((x.getFullYear() % 4 == 0) && (x.getFullYear() % 100 != 0)) || (x.getFullYear() % 400 == 0)),
        F: fullMonths[x.getMonth()],
        d: (x.getDate().toString().length == 2) ? x.getDate() : '0' + x.getDate(),
        j: x.getDate(),
        D: days[x.getDay()],
        l: fullDays[x.getDay()],
        N: x.getDay() + 1,
        w: x.getDay(),
        h: (x.getHours().toString().length == 2) ? ((x.getHours() + 11) % 12 + 1) : '0' + ((x.getHours() + 11) % 12 + 1),
        H: (x.getHours().toString().length == 2) ? x.getHours() : '0' + x.getHours(),
        G: x.getHours(),
        g: ((x.getHours() + 11) % 12 + 1),
        O: x.toString().match(/([-\+][0-9]+)\s/)[1],
        i: (x.getMinutes().toString().length == 2) ? x.getMinutes() : '0' + x.getMinutes(),
        s: (x.getSeconds().toString().length == 2) ? x.getSeconds() : '0' + x.getSeconds(),
        T: x.toString().replace(/.*[(](.*)[)].*/, '$1'),
        e: x.toString().replace(/.*[(](.*)[)].*/, '$1'),
        Y: x.getFullYear(),
        y: x.getYear(),
        u: 000000,
        v: 000000,
        z: Math.round((new Date().setHours(23) - new Date(x.getYear() + 1900, 0, 1, 0, 0, 0)) / 1000 / 60 / 60 / 24) - 1,
        U: Math.round(x.getTime() / 1000),
    };
    y = y.replace(/(a+|A+|B+|c+|m+|M+|n+|L+|F+|d+|D+|j+|l+|n+|N+|w+|g+|G+|O+|e+|u+|v+|z+|U+|h+|H+|i+|s+|T+|Y+|y+)/g, function (v) {
        var t = eval('z.' + v.slice(-1));
        return t;
    });

    return y.replace(/(y+)/g, function (v) {
        return x.getFullYear().toString().slice(-v.length)
    });
}