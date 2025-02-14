# 🚀 Web3 Fraud Detection & Prevention System on AWS

## 🔍 Overview
Fraudulent transactions in Web3 pose a significant risk, affecting both users and platforms. This project leverages AWS cloud services, Safe Smart Accounts, and Celo blockchain technology to detect and prevent fraudulent activities in real time.

## 🎯 Goal
The system aims to:
- ✅ Monitor blockchain transactions for fraud patterns.
- ✅ Store suspicious wallet addresses in a secure database.
- ✅ Alert users via AWS SNS notifications.
- ✅ Provide a functional frontend for fraud analysis and response.

## 🤖 Tech Stack
- **Frontend:** React (for user interaction and fraud monitoring)
- **Backend:** AWS Lambda (for fraud detection and processing)
- **Database:** DynamoDB (for storing flagged transactions)
- **Notifications:** AWS SNS (for fraud alerts via email)
- **Blockchain:** Celo Smart Contracts (for secure Web3 integration)
- **Wallet Security:** Safe Smart Accounts (for controlled transactions)

## 🏰 System Architecture
1. User initiates a transaction using a Safe Smart Account on Celo.
2. AWS Lambda processes the transaction, analyzing fraud patterns.
3. If fraudulent activity is detected, the transaction is logged in DynamoDB.
4. The system sends an alert via AWS SNS to notify stakeholders.
5. Users can review flagged transactions on the React-based frontend.

## 🚀 Deployment Steps
### 1. Set Up AWS Lambda Function
- Use **Node.js 18** as the runtime.
- Deploy the fraud detection logic.

### 2. Configure DynamoDB Table
```sh
aws dynamodb create-table --table-name FraudAlerts \
  --attribute-definitions AttributeName=walletAddress,AttributeType=S \
  --key-schema AttributeName=walletAddress,KeyType=HASH \
  --billing-mode PROVISIONED \
  --provisioned-throughput ReadCapacityUnits=1,WriteCapacityUnits=1
```

### 3. Set Up SNS for Alerts
```sh
aws sns create-topic --name FraudAlertsTopic
aws sns subscribe --topic-arn arn:aws:sns:us-east-1:123456789012:FraudAlertsTopic \
  --protocol email --notification-endpoint your-email@example.com
```

### 4. Deploy API Gateway
- Connect API Gateway to AWS Lambda.
- Enable security and logging.

### 5. Launch the Frontend
```sh
cd frontend
npm install
npm start
```

## 📈 Features
- **Fraud Detection Engine:** Scans transactions for malicious patterns.
- **Real-Time Alerts:** Sends immediate notifications to affected users.
- **Secure Transaction Processing:** Utilizes Safe Smart Accounts for added security.
- **User-Friendly Dashboard:** Provides a clean UI for monitoring flagged transactions.
- **AWS Integration:** Ensures scalable and reliable cloud infrastructure.

## 📈 Next Steps
- Integrate ML-based fraud detection models.
- Expand notification methods (SMS, push notifications).
- Optimize smart contract security mechanisms.

## 💡 Why AWS?
AWS offers scalable, reliable, and high-performance cloud infrastructure, making it an ideal choice for real-time fraud detection in Web3 applications.

**Built for the AWS Hackathon – Combining Cloud & Blockchain for Secure Web3 Transactions! 🔐**

