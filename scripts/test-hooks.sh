#!/bin/sh
set -eu
cd "$(dirname "$0")/.."
message=$(mktemp)
trap 'rm -f "$message"' EXIT HUP INT TERM
for subject in 'feat: add booking' 'fix(api): handle empty requests' 'feat(api)!: change contract' 'docs: update guide' 'revert: undo booking'; do
    printf '%s\n' "$subject" > "$message"
    sh .githooks/commit-msg "$message"
done
for subject in '' 'update stuff' 'unknown: message' 'feat: ' 'feat(): message' 'feat:  double space'; do
    printf '%s\n' "$subject" > "$message"
    if sh .githooks/commit-msg "$message" 2>/dev/null; then
        echo "Invalid subject accepted: $subject" >&2
        exit 1
    fi
done
echo 'Commit convention checks passed.'
