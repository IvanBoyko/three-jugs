# Три кувшина / Three Jugs

A Russian-language, mobile-first water pouring puzzle. No dependencies or build step. Open `dist/index.html` in a browser or serve `dist/` over HTTP. Drag one jug onto another or select two jugs with taps. Water is conserved; a pour stops when the source is empty or the destination full. The goal is the indicated amount in the largest jug.

Each new puzzle has three distinct capacities and a full largest jug. Breadth-first search (BFS) exhaustively explores legal states and chooses a goal whose shortest path is 5–15 pours inclusive. The number is displayed beside the current move count. Undo restores the preceding state and move count. Reset repeats the same puzzle; New puzzle changes capacities.

## Development

`node test/engine.test.js` runs dependency-free logic tests. To serve locally: `python3 -m http.server 8000 --directory dist`.

## Deployment

Connect the GitHub repository to Netlify using branch `main`. `netlify.toml` configures `dist` as the publish directory; no build command is needed.
