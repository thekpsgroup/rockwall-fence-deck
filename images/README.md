# Project photos

Web-optimized images used across the site (resized to ~1600 px long edge, JPEG q82, progressive).

## Real project photos (yours) — shown in the homepage "Recent Work" gallery

| Filename | Photo |
|---|---|
| `cedar-board-on-board-privacy-fence.jpg` | Dark-stained cedar board-on-board privacy fence with cap & trim |
| `horizontal-cedar-fence-gate.jpg` | Horizontal cedar privacy fence with matching gate along a driveway |
| `cedar-privacy-fence-steel-posts.jpg` | Cedar privacy fence built on galvanized steel posts |
| `horizontal-cedar-fence-sloped-yard.jpg` | Horizontal cedar fence with gate stepped down a sloped yard |
| `wrought-iron-ranch-fence.jpg` | Black ornamental iron fence on acreage |
| `welded-wire-ranch-fence-gate.jpg` | Black welded-wire ranch fence with swing gate |
| `pipe-top-field-fence.jpg` | Black pipe-top wire field/pasture fence |

Originals live in the (git-ignored) `../fences/` folder.

## Stock photos (illustrative) — used only as decorative hero backgrounds

These are free, commercially-licensed photos from **Unsplash** (no attribution required). They are
**not** presented as your completed jobs — they sit behind a dark overlay on the deck page heroes
purely for visual appeal. Replace them with your own deck photos when you have them, and you can then
promote those into the "Recent Work" gallery in `index.html`.

| Filename | Used on |
|---|---|
| `cedar-deck-railing-sunset.webp` | Deck Building hero background |
| `modern-composite-deck.webp` | Deck Staining & Restoration hero background |
| `multi-level-deck-steps.jpg` | (spare — multi-level deck with steps) |
| `deck-boards-texture.jpg` | (spare — composite deck-board texture) |

## Adding or replacing photos

- Keep JPGs ~1600 px on the long edge (≈300–500 KB each) so the page stays fast.
- To replace a photo, overwrite the file with the same name — pages update automatically.
- Gallery tiles crop to 4:3 (`object-fit: cover`); hero backgrounds use `--bg:url('images/…')`.
