#!/bin/bash
set -e

AWS_ENDPOINT="${LOCALSTACK_ENDPOINT:-http://localstack:4566}"
TOPIC_NAME="${SNS_TOPIC_NAME:-test-sns-topic}"

echo "[1/3] Creating SNS topic on LocalStack (${TOPIC_NAME})..."
aws --endpoint-url="${AWS_ENDPOINT}" sns create-topic --name "${TOPIC_NAME}" || true
aws --endpoint-url="${AWS_ENDPOINT}" sns list-topics || true

echo "[2/3] Using existing node_modules (installed at build time)"

echo "[3/3] Starting Serverless Offline..."
serverless offline start --host 0.0.0.0 --httpPort 4000