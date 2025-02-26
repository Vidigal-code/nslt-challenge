
# This is just an example Test Offline

# 2. Asynchronous Task (Serverless Framework)

This section demonstrates how to use the **Serverless Framework** to create an **AWS Lambda function** that performs an asynchronous task in the background.

## 2.1. Lambda Function

We will create a Lambda function to process **sales reports** based on **orders**. This example will show how to handle background tasks that do not require immediate user interaction.

### Steps to Create a Lambda Function

1. **Install the Serverless Framework**:
   If you don’t have the Serverless Framework installed globally, install it with the following command:

   If you are using localstack and are offline!

   ```bash
   
   aws configure set region us-east-1
   aws configure set aws_access_key_id fake-access-key
   aws configure set aws_secret_access_key fake-secret-key
   aws --endpoint-url=http://localhost:4566 sns create-topic --name test-sns-topic
   aws --endpoint-url=http://localhost:4566 sns list-topics

   npm install -g serverless
   

   

   
   

   


