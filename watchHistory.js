var watchHistory = {
    csv: "Date,Title,Season,Episode",

    createScript: function(url, callback) {
        var j = document.createElement('script');
        j.src = url;
        j.addEventListener('load', callback);
        document.getElementsByTagName('head')[0].appendChild(j);
    },

    parse: function() {
        //Fetch rows
        var watchedRows = $('#viewingactivity .retableRow');

        //Parse each row as a show or film
        $.each(watchedRows, function(index) {
            watchHistory.parseRow($(this));
        });

        //download as CSV
        var downloadLink = document.createElement('a');
        downloadLink.href = 'data:attachment/csv,' + encodeURIComponent(watchHistory.csv);
        downloadLink.target = '_blank';
        downloadLink.download = 'NetflixWatchHistory.csv';

        document.body.appendChild(downloadLink);
        downloadLink.click();
    },

    parseRow: function(el) {

        var title = '';
        var season = '';
        var episode = '';
        var date = '';

        var seriesTitle = $(el).find('.seriestitle');
        var is_show = (seriesTitle.length > 0);

        if (is_show) {
            seriesTitle = seriesTitle[0];
            var showInfo = $(seriesTitle).parent().contents()[1].nodeValue.substr(1);

            title = $(seriesTitle).html().trim();

            var seasonCol = showInfo.indexOf(":");
            season = showInfo.substr(0, seasonCol).trim()
            var hasSeason = season.substring(0, 1) != '"';

            if (hasSeason) {
                showInfo = showInfo.substr(seasonCol + 1);
                episode = showInfo.trim().split("\"").join("");
            } else { //if just the show title and episode title
                episode = showInfo.trim().split("\"").join("");
                season = '';
            }
        } else {
            title = $(el).find('.title>a').text()
        }

        var dateStr = $(el).children('.date').html();
        var day = dateStr.substr(0, 2);
        var month = dateStr.substr(3, 2);
        var year = '20' + dateStr.substr(6, 2);

        //Build date object
        date = new Date(parseInt(year), month - 1, day);

        watchHistory.csv += '\n' + date.toLocaleDateString() + ',"' + title + '","' + season + '","' + episode + '"';
    },

    init: function(callback) {
        watchHistory.createScript('https://code.jquery.com/jquery-2.1.3.min.js', watchHistory.parse);
    }
}

//Parse page on load
watchHistory.init();