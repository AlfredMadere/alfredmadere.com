#!/usr/bin/env bash
set -euo pipefail

# --- config ---
APP=alfredmadere
ENV_FILE=/home/alfred/.ssh/tunnel_priv_key.env
HEALTH_URL=http://127.0.0.1:3000/
HEALTH_RETRIES=20
HEALTH_DELAY=2

log() { printf '\n==> %s\n' "$*"; }

start_container() {  # $1 = image ref
  docker run -d --name "$APP" \
    --restart unless-stopped \
    --env-file "$ENV_FILE" \
    -p 127.0.0.1:3000:3000 \
    "$1"
}

healthy() {
  for _ in $(seq "$HEALTH_RETRIES"); do
    curl -fsS "$HEALTH_URL" >/dev/null 2>&1 && return 0
    sleep "$HEALTH_DELAY"
  done
  return 1
}

main() {
  cd "$(dirname "$(readlink -f "$0")")"

  log "Pulling latest code"
  git pull --ff-only

  local sha; sha=$(git rev-parse --short HEAD)
  log "Building $APP:$sha (old container keeps serving meanwhile)"
  docker build -t "$APP:$sha" -t "$APP:latest" .

  # Remember what's currently running so we can roll back to it
  local prev; prev=$(docker inspect -f '{{.Image}}' "$APP" 2>/dev/null || true)

  log "Swapping containers"
  docker rm -f "$APP" 2>/dev/null || true
  start_container "$APP:$sha"

  if healthy; then
    log "✅ deployed $sha"
    exit 0
  fi

  log "❌ health check failed — recent logs:"
  docker logs --tail 50 "$APP" || true
  docker rm -f "$APP" 2>/dev/null || true

  if [[ -n "$prev" ]]; then
    log "Rolling back to previous image ($prev)"
    start_container "$prev"
    if healthy; then log "↩️  rollback healthy"; else log "🚨 rollback ALSO unhealthy — investigate manually"; fi
  fi
  exit 1
}

main "$@"
