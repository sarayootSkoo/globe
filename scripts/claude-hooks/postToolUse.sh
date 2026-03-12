#!/bin/bash
# Post tool use event to event server
# Args: $1 = tool name, $2 = optional result summary
TOOL_NAME="${1:-unknown}"
RESULT="${2:-}"
curl -s -X POST http://localhost:4010/events \
  -H "Content-Type: application/json" \
  -d "{\"type\":\"command:progress\",\"source\":\"hook\",\"timestamp\":$(date +%s000),\"data\":{\"tool\":\"$TOOL_NAME\",\"result\":\"$RESULT\"}}" \
  > /dev/null 2>&1 || true
