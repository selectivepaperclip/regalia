window.DateTimes = (function () {
    // https://stackoverflow.com/a/24314927
    var shortMonths = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
    ];

    var fullMonths = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];

    var shortDays = [
        'Sun',
        'Mon',
        'Tue',
        'Wed',
        'Thu',
        'Fri',
        'Sat'
    ];

    var fullDays = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
    ];

    var shortAmPm = [
        'A',
        'P'
    ];

    var fullAmPm = [
        'AM',
        'PM'
    ];

    function formatDateString(date, format) {
        var yyyy = date.getFullYear();
        var M = date.getMonth();
        var d = date.getDate();
        var day = date.getDay();
        var H = date.getHours();
        var h = H;
        var pm = h > 12;
        if (pm) h = H - 12;
        var m = date.getMinutes();
        var s = date.getSeconds();
        var f = date.getMilliseconds();

        format = format
            .replace(/GMT/g, '*00*')
            .replace(/yyyy/g, '*01*')
            .replace(/yyy/g, '*02*')
            .replace(/yy/g, '*03*')
            .replace(/y/g, '*04*')
            .replace(/MMMM/g, '*05*')
            .replace(/MMM/g, '*06*')
            .replace(/MM/g, '*07*')
            .replace(/M/g, '*08*')
            .replace(/dddd/g, '*09*')
            .replace(/ddd/g, '*10*')
            .replace(/dd/g, '*11*')
            .replace(/d/g, '*12*')
            .replace(/HH/g, '*13*')
            .replace(/H/g, '*14*')
            .replace(/hh/g, '*15*')
            .replace(/h/g, '*16*')
            .replace(/mm/g, '*17*')
            .replace(/m/g, '*18*')
            .replace(/ss/g, '*19*')
            .replace(/s/g, '*20*')
            .replace(/fff/g, '*21*')
            .replace(/ff/g, '*22*')
            .replace(/f/g, '*23*')
            .replace(/FFF/g, '*24*')
            .replace(/FF/g, '*25*')
            .replace(/F/g, '*26*')
            .replace(/tt/g, pm ? 'PM' : 'AM')
            .replace(/t/g, pm ? 'P' : 'A')
            .replace('*00*', 'GMT')
            .replace('*01*', yyyy)
            .replace('*02*', yyyy.toString().substr(-3, 3))
            .replace('*03*', yyyy.toString().substr(-2, 2))
            .replace('*04*', yyyy.toString().substr(-1, 1))
            .replace('*05*', getFullMonth(M.toString()))
            .replace('*06*', getShortMonth(M.toString()))
            .replace('*07*', padZeroes(M.toString(), 2))
            .replace('*08*', M.toString())
            .replace('*09*', getFullDay(day.toString()))
            .replace('*10*', getShortDay(day.toString()))
            .replace('*11*', padZeroes(d.toString(), 2))
            .replace('*12*', d.toString())
            .replace('*13*', padZeroes(H.toString(), 2))
            .replace('*14*', H.toString())
            .replace('*15*', padZeroes(h.toString(), 2))
            .replace('*16*', h.toString())
            .replace('*17*', padZeroes(m.toString(), 2))
            .replace('*18*', m.toString())
            .replace('*19*', padZeroes(s.toString(), 2))
            .replace('*20*', s)
            .replace('*21*', padZeroes(f.toString(), 3))
            .replace('*22*', padZeroes(Math.round(f / 10), 2).toString())
            .replace('*23*', Math.round(f / 100).toString())
            .replace('*24*', blankZero(padZeroes(f.toString(), 3)))
            .replace('*25*', blankZero(padZeroes(Math.round(f / 10), 2).toString()))
            .replace('*26*', blankZero(Math.round(f / 100).toString()))
        ;

        return format;
    }

    function getShortMonth(month) {
        return shortMonths[month];
    }

    function getFullMonth(month) {
        return fullMonths[month];
    }

    function getShortDay(day) {
        return shortDays[day];
    }

    function getFullDay(day) {
        return fullDays[day];
    }

    function padZeroes(toPad, numDigits) {
        toPad = toPad || '';
        var zeroes = Array(numDigits).join('0');
        return (zeroes + toPad).substr(-numDigits, numDigits);
    }

    function blankZero(number) {
        var n = parseFloat(number);
        if (isNaN(number)) return '';
        if (n == 0.0) return '';
        return n;
    }

    return {
        defaultDateFormat: 'M/D/YYYY h:mm:ss A',
        formatDateString: formatDateString,
        stringDateToMoment: function (str) {
            return moment(str, DateTimes.defaultDateFormat);
        },
        stringDateToDate: function (str) {
            return this.stringDateToMoment(str).toDate();
        }
    }
})();
