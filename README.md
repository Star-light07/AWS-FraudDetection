# 🚀 Web3 Fraud Detection & Prevention System on AWS

## 🔍 Overview

Fraudulent transactions in Web3 pose a serious risk, impacting users and platforms alike. This project leverages AWS cloud services and Safe Smart Accounts to detect and prevent fraudulent activities in real-time on the Celo blockchain.

## 🎯 Goal

The system aims to:
✅ Monitor blockchain transactions for fraud patterns.
✅ Store suspicious wallet addresses in a secure database.
✅ Alert users via SNS and Telegram notifications.
✅ Provide an API to integrate with Safe Smart Accounts.

## 🛠️ Tech Stack

- **AWS Lambda** - Serverless fraud detection execution.
- **API Gateway** - Secure API exposure.
- **DynamoDB** - Storing flagged transactions.
- **SNS (Simple Notification Service)** - Sending fraud alerts.
- **Safe Smart Accounts** - Secure blockchain transactions.
- **Celo Smart Contracts** - Web3 transaction verification.

## 🏗️ System Architecture

1️⃣ User submits a transaction → Safe Smart Account on Celo.\
2️⃣ AWS Lambda processes the transaction → Checks against fraud patterns.\
3️⃣ If flagged, store in DynamoDB → Prevent future fraud attempts.\
4️⃣ Notify users via SNS & Telegram bot → Immediate fraud alerts.

## 🚀 Deployment Steps

1. **Set up AWS Lambda Function**

   - Use Node.js 18 runtime.
   - Deploy fraud detection logic.

2. **Configure DynamoDB Table**

   ```bash
   aws dynamodb create-table --table-name FraudAlerts \
   --attribute-definitions AttributeName=walletAddress,AttributeType=S \
   --key-schema AttributeName=walletAddress,KeyType=HASH \
   --billing-mode PROVISIONED \
   --provisioned-throughput ReadCapacityUnits=1,WriteCapacityUnits=1
   ```

3. **Set Up SNS for Alerts**

   ```bash
   aws sns create-topic --name FraudAlertsTopic
   aws sns subscribe --topic-arn arn:aws:sns:us-east-1:123456789012:FraudAlertsTopic \
   --protocol email --notification-endpoint your-email@example.com
   ```

4. **Deploy API Gateway**

   - Connect API Gateway to Lambda function.
   - Enable security and logging.

## 📌 Next Steps

- **Enhance fraud detection logic** using ML models.
- **Expand notification methods** (SMS, push notifications).
- **Optimize database queries** for scalability.

## 💡 Why AWS?

AWS offers scalable, reliable, and high-performance cloud infrastructure, making it perfect for real-time fraud detection in Web3 applications.

---

💡 **Built for the AWS Hackathon – Leveraging cloud power for Web3 security!** 🔐





