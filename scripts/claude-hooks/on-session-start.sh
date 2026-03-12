#!/bin/bash
# Write session start event to .kanban/events.jsonl
EVENT='{"type":"command:started","source":"hook","timestamp":'$(date +%s000)',"data":{"session":"'$CLAUDE_SESSION_ID'"}}'
echo "$EVENT" >> .kanban/events.jsonl
# Update status
echo '{"status":"running","session":"'$CLAUDE_SESSION_ID'","startedAt":'$(date +%s000)'}' > .kanban/status.json
