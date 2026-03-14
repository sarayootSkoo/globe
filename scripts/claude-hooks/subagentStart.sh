#!/bin/bash
# Subagent start — POST event to event server (HTTP primary, file fallback)
curl -s -X POST http://localhost:4010/events \
  -H "Content-Type: application/json" \
  -d "{\"type\":\"lifecycle:started\",\"source\":\"hook\",\"timestamp\":\"$(date -u +%Y-%m-%dT%H:%M:%S.000Z)\",\"data\":{\"sessionId\":\"${CLAUDE_SESSION_ID:-unknown}\",\"parentSessionId\":\"${CLAUDE_PARENT_SESSION_ID:-}\",\"type\":\"subagent\"}}" \
  2>/dev/null || true
