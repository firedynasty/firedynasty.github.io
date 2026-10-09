# Activity Island

A small local island that shows what Claude Code is doing while you wait. Each session
(or subagent) is a named character who lives in a house. When Claude works, the character
walks to a place on the island, and when it finishes, they go home and sleep.

| Claude Code event | What happens on the island |
|---|---|
| `UserPromptSubmit` | "heading to work", character leaves their house for the plaza |
| `Edit` / `Write` | walks to the **Workshop** |
| `Read` / `Grep` / `Glob` | walks to the **Library** |
| `Bash` | rides the **Ferris wheel** |
| `WebSearch` / `WebFetch` | walks to the **Market** |
| `Notification` | stays put with a **?** bubble ("waiting on you") |
| `Stop` / `SubagentStop` | "done!", walks home, shows **z** |
| no events for 25 s | goes home on their own |

A plain-text feed under the island lists every event ("Mochi editing index.html").

## Ask an islander (Ollama)

Click a character (or their house) to open a chat. They act as a patient teacher who explains
what Claude Code is doing, using a local Ollama model, so nothing leaves your machine.
Defaults: Ollama at `http://127.0.0.1:11434`, model `qwen3:8b`. Change with
`OLLAMA_MODEL=llama3.2 OLLAMA_URL=http://127.0.0.1:11434 node .../claude_hooks_server/server.js`.

The teacher only sees the activity log (tool names, file names, short commands, and the first
200 characters of your prompt). It can't see code or Claude's replies, and is told to say so
instead of guessing. `ACTIVITY_REDACT=1` removes the prompt snippet too. The `/ask` endpoint
rejects requests from other origins.

## Files

- `hook.js` (in `~/Documents/technical/github/claude_hooks_server/`): the hook script. Appends one JSON line per event to `~/.claude/activity.jsonl`.
- `server.js`: lives in `~/Documents/technical/github/claude_hooks_server/server.js`. Tiny Node server (no dependencies, `127.0.0.1` only). Tails the log and streams new lines to the page with server-sent events. It serves this folder's `index.html` (override with `ACTIVITY_PAGE=...`).
- `index.html`: the island page. Works with an empty log, replays the last 50 events on load, and has a **Demo** button.
- `fake-event.js` (also in `claude_hooks_server/`): fires a fake event through the real hook script, for testing.
- `settings-snippet.json`: the hooks to merge into your Claude Code settings.

## Start it

```
node ~/Documents/technical/github/claude_hooks_server/server.js   # then open http://127.0.0.1:8787
PORT=9000 node ~/Documents/technical/github/claude_hooks_server/server.js   # another port
```

## Add the hooks

Merge the entries from `settings-snippet.json` into the `"hooks"` section of
`~/.claude/settings.json` (or a project's `.claude/settings.json`). If you already have a
`Stop` hook, add this one to the same `hooks` array instead of replacing yours.
Hooks load when a session starts, so restart Claude Code (or open `/hooks` and reload) afterwards.

## Remove the hooks

Delete the entries you added from `settings.json` (every `command` that points at
`claude_hooks_server/hook.js`). Optionally delete `~/.claude/activity.jsonl`.

## Try it without Claude Code

```
node ~/Documents/technical/github/claude_hooks_server/fake-event.js UserPromptSubmit
node ~/Documents/technical/github/claude_hooks_server/fake-event.js PostToolUse Bash '{"command":"npm test"}'
SESSION=other node ~/Documents/technical/github/claude_hooks_server/fake-event.js PostToolUse Edit '{"file_path":"/x/app.js"}'
node ~/Documents/technical/github/claude_hooks_server/fake-event.js Stop
```

Use `ACTIVITY_LOG=/some/file.jsonl` (for both the server and the scripts) to keep test events
out of the real log.

## Privacy

The log holds file names, the first 60 characters of Bash commands, search queries and
hostnames. It stays on your machine, and the server only listens on localhost. Set
`ACTIVITY_REDACT=1` in the hook command (`ACTIVITY_REDACT=1 node .../hook.js`) to log event types only.
