#!/bin/bash
# Write progress event
EVENT='{"type":"command:progress","source":"hook","timestamp":'$(date +%s000)',"data":{"tool":"'$1'","session":"'$CLAUDE_SESSION_ID'"}}'
echo "$EVENT" >> .kanban/events.jsonl
