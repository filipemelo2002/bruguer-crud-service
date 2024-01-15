import { APIGatewayProxyResult } from "aws-lambda";

export class LambdaResponse {
  static makeError(status: number, message: string) {
    return {
      statusCode: status,
      body: JSON.stringify({
        message
      })
    }
  }

  static makeResponse(status = 200, body?: object): APIGatewayProxyResult {

    const responseBody = !!body ? JSON.stringify(body) : '';
    return {
      statusCode: status,
      body: responseBody
    }
  }
}
