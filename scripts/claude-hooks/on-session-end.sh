#!/bin/bash
# Write session end event
EVENT='{"type":"command:completed","source":"hook","timestamp":'$(date +%s000)',"data":{"session":"'$CLAUDE_SESSION_ID'"}}'
echo "$EVENT" >> .kanban/events.jsonl
# Update status
echo '{"status":"idle","session":"'$CLAUDE_SESSION_ID'","completedAt":'$(date +%s000)'}' > .kanban/status.json
