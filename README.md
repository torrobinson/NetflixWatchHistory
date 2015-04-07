NetflixWatchHistory
===================

Purpose
-------

Netflix recently blocked off its API and made extracting your own data next to impossible. There's currently no way to export your watch history.

Solution
--------
I built this as a bookmarklet that scrapes from the Watch History page. The bookmarklet injects javascript into the DOM which immediately executes and turns your watch history into a CSV file which can then be imported into something like Excel for visualization.

Usage
-----
1. Create a new bookmark in your browser (tested in Chrome) and set the URL to the contents of the "bookmarklet.js" file. 
2. Navigate to https://www.netflix.com/WiViewingActivity
3. Because Netflix hates pagination, keep scrolling to the bottom of the page until no new items load. This ensures every title is accessible in the DOM. 
4. Click the bookmarklet you created
5. A CSV file will automatically download

Now you can import into something like Excel or Google Sheets to visualize or store your history:
![Example](https://s3.amazonaws.com/f.cl.ly/items/0Y2F3H0M1H0y1u341p0t/Image%202015-04-07%20at%2012.36.55%20AM.png)


