#!/bin/bash
# Subagent end event
AGENT_TYPE="${1:-unknown}"
STATUS="${2:-completed}"
curl -s -X POST http://localhost:4010/events \
  -H "Content-Type: application/json" \
  -d "{\"type\":\"lifecycle:completed\",\"source\":\"hook\",\"timestamp\":$(date +%s000),\"data\":{\"agent\":\"$AGENT_TYPE\",\"status\":\"$STATUS\"}}" \
  > /dev/null 2>&1 || true
