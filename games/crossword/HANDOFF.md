# Pocket Crossword: handoff

A themed mini crossword that builds a new 5-6 word grid on demand. Pure static files, no build step.

Two copies exist and must be kept in sync by hand:

| Where | Path |
|---|---|
| Games site | `firedynasty.github.io/games/crossword/` (`index.html`, `crossword.js`), linked from `games/games.html` |
| Neuron Breath extension | `extensions/neuron-breath/crossword/` (same two files), shown as the "Crossword" tab in `inject.js` |

Edit the games copy, then run `./sync-to-extension.sh` (in this folder) to copy `index.html` and `crossword.js` into the extension folder, and reload the extension in `chrome://extensions`. The page's JavaScript must stay in `crossword.js` (not inline) because extension pages block inline scripts.

## Where things live in `crossword.js`

- `BUILTIN` (top of file): the built-in themes. Shape: `"Theme name": [["WORD", "clue"], ...]`. Words are A-Z only, 3-8 letters, unique within a theme. 15+ words per theme keeps puzzles varied.
- `generate(bank, want)`: places words on a 9x9 area; every new word must cross exactly one placed word and may not touch another side by side. Returns `[{a, clue, r, c, d}]`.
- `parseLines(text)`: parses `WORD, clue` lines (used by the Add a theme box).
- `build(p)`: turns placed words into numbered cells and clue order.
- Saved data: `localStorage` key `pocketCrossword.v1` = `{themes, puzzles, seen, theme, n}`.
  - `themes`: your custom themes (same shape as `BUILTIN`)
  - `puzzles`: last 10 puzzles with typed letters, solved state and time
  - `seen`: words already used per theme, so new puzzles prefer fresh words
  - `theme`: last theme chosen in the dropdown

On the games site this is saved per browser on `firedynasty.github.io`. In the extension it is saved on the extension's own origin, so the two do not share data.

## Adding more themes (three ways)

1. **Built in, for everyone who opens the page:** add an entry to `BUILTIN`, then copy the files to the extension. This is the permanent route.
2. **In the page, for this browser only:** open "Themes & word lists", type a name, paste `WORD, clue` lines, press Save theme. At least 6 valid words are needed.
3. **From a repo or file:** make a `themes.json` and import it (see below). Good for bulk lists or sharing between the games site and the extension.

### themes.json format

```json
{
  "Pasta": [
    ["PENNE", "Tube-shaped pasta"],
    ["BASIL", "Green herb on a margherita"],
    ["SAUCE", "Goes on top of the noodles"],
    ["RAVIOLI", "Stuffed square pasta"],
    ["GARLIC", "Pungent clove"],
    ["BOIL", "What the water does first"]
  ]
}
```

Rules: object of theme name to list of `[word, clue]`. Words 3-8 letters, A-Z. A theme with fewer than 6 valid words, or with the same name as a built-in theme, is skipped (the page tells you how many were skipped).

To import from GitHub: commit `themes.json` to a repo, open it, click Raw, and paste that `raw.githubusercontent.com` URL into the import box. Fetching works because GitHub raw files allow cross-origin requests. Or paste the JSON text into the box and press "Import pasted JSON".

To move custom themes between browsers or between the site and the extension: press "Export my themes", copy the JSON, and import it on the other side.

## Ideas not done

- Larger grids or a difficulty setting (`generate` uses a fixed 9x9 area and `want = 6` words).
- Seeding the import box with a default `themes.json` URL.
- Sharing saved data between the site copy and the extension copy.
