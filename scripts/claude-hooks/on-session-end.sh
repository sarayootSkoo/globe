#!/bin/bash
# Session end — POST event to event server (HTTP primary, file fallback)
curl -s -X POST http://localhost:4010/events \
  -H "Content-Type: application/json" \
  -d "{\"type\":\"session:disconnected\",\"source\":\"hook\",\"timestamp\":\"$(date -u +%Y-%m-%dT%H:%M:%S.000Z)\",\"data\":{\"sessionId\":\"${CLAUDE_SESSION_ID:-unknown}\"}}" \
  2>/dev/null || true

# Fallback: write to local file
EVENT='{"type":"command:completed","source":"hook","timestamp":'$(date +%s000)',"data":{"session":"'$CLAUDE_SESSION_ID'"}}'
echo "$EVENT" >> .kanban/events.jsonl
# Update status
echo '{"status":"idle","session":"'$CLAUDE_SESSION_ID'","completedAt":'$(date +%s000)'}' > .kanban/status.json
