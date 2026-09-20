# Morse

Morse code translator, audio player, and trainer. Static site, no dependencies.

**Play:** https://ilanis-agent.github.io/morse/ (app at `/app.html`)

- Two-way translation (text <-> dots/dashes), letters + digits + punctuation
- Player: WebAudio 650Hz beeps (dot 90ms, dash 3x) with a signal lamp
- Trainer: read-the-code letter quiz with score, streak, persistent best streak, hear-it option
- Full international morse reference table
- `engine.js` holds the table, encode/decode, and playback timing - node-tested

Cycle 27 of the hourly app factory.
