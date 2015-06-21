# WP Jazz Releases

Get [WordPress](https://codex.wordpress.org/WordPress_Versions) release history using [Node.js](https://nodejs.org/)

> "WordPress core developers share a love of jazz music, and since WordPress 1.0 all major releases are named in honor of jazz musicians they admire.""

### What?

- Scrape WP Release history for releases that are named in honor of jazz musicians.
- Saves data as ``data.json``
- Download images searching [Google Image Search](https://images.google.com/) for Public Domain images.

### Use

Run scraper

	node scraper.js

Miniy JPG images
	
	gulp

#### Changelog
- 0.1.4: Renamed repo to WP Jazz Releases
- 0.1.3: Fixed a typo in image file names in json file
- 0.1.2: Minor
- 0.1.1: Change image file names. Added license
- 0.1.0: Only download images if the don't exist in path