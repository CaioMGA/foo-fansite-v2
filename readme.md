# First of October Fansite v2

## About the site
Fansite created as a hommage to **First of October**. Designed, coded and maintained by Caio Amaral.

This site does not use any JavaScript framework. The audios and videos shown in the site are streamed from Youtube due to its convenience (it's free, available worldwide, and fast). The site is self-hosted.

I updated the site in 2025 to have all the lyrics for the songs. To achieve this I chose to use HUGO, a static site generator. Lyrics were collected on [Genius](https://genius.com/artists/First-of-october).

I decided to create this site because this is the only band I look forward to their next album every year. 

## Stack/Tech/Sources

- HTML
- CSS
- JavaScript
- Youtube (videos and audios)
- HUGO
- Genius (lyrics)
- Locaweb (VPS Hosting)
- GoDaddy (Registrar)
- Google Fonts (ttf fonts)

## Links

- Andrew Huang on [Youtube](https://www.youtube.com/@andrewhuang)
- Rob Scallon on [Youtube](https://www.youtube.com/@robscallon/)
- Source code is available at [Github](https://github.com/CaioMGA/foo-fansite-v2)
- [Projects](https://brchad.com) by Caio Amaral

## How to Use

- Install the latest version of HUGO
- Download the project files
- Navigate to the project root folder
- run `hugo serve` on the terminal

## Adding a new album

Replace `YYYY` with the album year. Most files live under `themes/lugo/`.

### 1. Before the release (TBA)

1. Create `static/imgs/YYYY/` with `album-cover.jpeg` (640x640), `making-of.png` and `special.png` (both 1920x1080).
2. Create `static/styles/YYYY.css` (copy the previous year's and replace the year) and add the `.cover-YYYY`, `.cover-YYYY-small`, `.mo-YYYY` and `.sp-YYYY` rules to `static/styles/style.css` (copy the previous `#region`).
3. In `layouts/_default/index.html`, add the `<link>` to `YYYY.css` and the year button (newest first).
4. In `static/scripts/app.js`, update `MOST_RECENT_YEAR`, `albumId` and `albumIdList`, and add the `videos` entry (YouTube ids for _making of_ and _special_).
5. In `static/scripts/mplayer.js`, add the `"YYYY"` album. The first item is `{name, year, cover}`, followed by one `{id, title}` per song. Also bump the `year` of the `funny` and `editors-picks` playlists.
6. Add `brchad-YYYY.png` to `static/` and update the three references (`layouts/_default/index.html`, `layouts/_default/baseof.html` and `static/music-player.html`).

Until the release, use `TBA` as the album name and copy the previous year's songs and videos as placeholders.

### 2. On release day

1. Replace the placeholder images in `static/imgs/YYYY/`.
2. Update the YouTube ids in `app.js` and the name and songs in `mplayer.js`.
3. Add one file per song to `content/lyrics/` (`YYYY-Song_Title.md`). Copy an existing one: the front matter has `tags = ['YYYY', 'lyrics']` and `albums = 'Album Name (YYYY)'`, and the body starts with the `{{< youtube ID >}}` shortcode followed by the lyrics.
4. Add the songs to `songs-db.csv`.
5. Add a changelog post to `content/blog/`.

### Navigation

- The header of the Hugo pages comes from `[[menus.main]]` in `hugo.toml`.
- The Home buttons are in `layouts/_default/index.html`. Each one sets its row with `grid-row-5` to `grid-row-8`. Buttons on the left use `extra-button-small-left` and the ones on the right use `tertiary-btn`.
- The fullscreen menu on Home and `static/music-player.html` are plain HTML and have their own links.
