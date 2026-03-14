#!/bin/bash
# Post tool use — POST event to event server (HTTP primary, file fallback)
# Args: $1 = tool name, $2 = optional result summary
TOOL_NAME="${1:-unknown}"
RESULT="${2:-}"
curl -s -X POST http://localhost:4010/events \
  -H "Content-Type: application/json" \
  -d "{\"type\":\"command:progress\",\"source\":\"hook\",\"timestamp\":\"$(date -u +%Y-%m-%dT%H:%M:%S.000Z)\",\"data\":{\"sessionId\":\"${CLAUDE_SESSION_ID:-unknown}\",\"tool\":\"${TOOL_NAME}\",\"message\":\"Tool: ${TOOL_NAME}\",\"result\":\"${RESULT}\"}}" \
  2>/dev/null || true

# Fallback: write to local file
EVENT='{"type":"command:progress","source":"hook","timestamp":'$(date +%s000)',"data":{"tool":"'$TOOL_NAME'","result":"'$RESULT'","session":"'$CLAUDE_SESSION_ID'"}}'
echo "$EVENT" >> .kanban/events.jsonl
