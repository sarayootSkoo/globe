#!/bin/bash
# Subagent start event
AGENT_TYPE="${1:-unknown}"
TASK="${2:-}"
curl -s -X POST http://localhost:4010/events \
  -H "Content-Type: application/json" \
  -d "{\"type\":\"lifecycle:started\",\"source\":\"hook\",\"timestamp\":$(date +%s000),\"data\":{\"agent\":\"$AGENT_TYPE\",\"task\":\"$TASK\"}}" \
  > /dev/null 2>&1 || true
