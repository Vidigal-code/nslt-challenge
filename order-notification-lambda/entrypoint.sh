#!/bin/bash
set -e

echo "[2/6] Configuring AWS CLI to use LocalStack..."
aws configure set aws_access_key_id test
aws configure set aws_secret_access_key test
aws configure set region us-east-1

echo "[3/6] Creating SNS topic on LocalStack..."
aws --endpoint-url=http://localstack:4566 sns create-topic --name test-sns-topic
aws --endpoint-url=http://localstack:4566 sns list-topics

echo "[4/6] Installing serverless-dotenv-plugin and other dependencies..."
npm install serverless-dotenv-plugin --save-dev --force
npm install --force

echo "[5/6] Starting Serverless Offline..."
serverless offline start --host 0.0.0.0

# echo "[6/6] Keeping container alive (debug)"
# tail -f /dev/null
