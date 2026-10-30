#!/bin/sh
# Copy the crossword into the Neuron Breath extension. Run from anywhere; then reload the extension.
set -e
here="$(cd "$(dirname "$0")" && pwd)"
dest="${1:-$HOME/Documents/technical/github/extensions/neuron-breath/crossword}"
mkdir -p "$dest"
cp "$here/index.html" "$here/crossword.js" "$dest/"
echo "Copied index.html and crossword.js to $dest"
echo "Now reload Neuron Breath in chrome://extensions."
