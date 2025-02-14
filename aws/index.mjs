import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { SNSClient, PublishCommand } from "@aws-sdk/client-sns";

const dynamoDbClient = new DynamoDBClient({ region: "us-east-1" });
const snsClient = new SNSClient({ region: "us-east-1" });

const TABLE_NAME = "FraudAlerts";
const SNS_TOPIC_ARN = process.env.SNS_TOPIC_ARN;

console.log("FraudDetectionLambda function started.");

export const handler = async (event) => {
  console.log("Received event:", JSON.stringify(event, null, 2));

  try {
    const transaction = event.transaction || {};
    const riskScore = transaction.risk_score || 0;
    const walletAddress = transaction.walletAddress || "unknown_wallet";
    const transactionId = transaction.id || `tx_${Date.now()}`;

    if (typeof riskScore !== "number") {
      throw new Error("Risk score must be a number.");
    }

    if (riskScore > 80) {
      const putCommand = new PutItemCommand({
        TableName: TABLE_NAME,
        Item: {
          walletAddress: { S: walletAddress },
          transactionId: { S: transactionId },
          riskScore: { N: riskScore.toString() },
          status: { S: "fraudulent" },
          timestamp: { S: new Date().toISOString() },
        },
      });
      await dynamoDbClient.send(putCommand);

      const publishCommand = new PublishCommand({
        TopicArn: SNS_TOPIC_ARN,
        Message: `⚠️ Fraudulent Transaction Detected! 🚨\nWallet Address: ${walletAddress}\nTransaction ID: ${transactionId}\nRisk Score: ${riskScore}`,
        Subject: "Fraud Alert",
      });
      await snsClient.send(publishCommand);

      return {
        statusCode: 200,
        body: JSON.stringify({
          message: "Transaction flagged as fraud",
          walletAddress,
          risk_score: riskScore,
        }),
      };
    } else {
      return {
        statusCode: 200,
        body: JSON.stringify({
          message: "Transaction approved",
          walletAddress,
          risk_score: riskScore,
        }),
      };
    }
  } catch (error) {
    console.error("Error processing transaction:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error", details: error.message }),
    };
  }
};
