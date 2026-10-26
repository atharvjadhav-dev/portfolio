export const handler = async (event) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type,Authorization",
    "Access-Control-Allow-Methods": "OPTIONS,POST",
    "Content-Type": "application/json",
  };

  // Handle CORS preflight request
  if (event.requestContext?.http?.method === "OPTIONS" || event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: "OK" }),
    };
  }

  try {
    let body = {};
    if (event.body) {
      const raw = event.isBase64Encoded
        ? Buffer.from(event.body, "base64").toString("utf-8")
        : event.body;
      body = typeof raw === "string" ? JSON.parse(raw) : raw;
    }

    const { name, email, subject, message, _hp } = body;

    // Honeypot trap check
    if (_hp && String(_hp).trim().length > 0) {
      console.warn("Spam honeypot triggered; discarding silently.");
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ success: true, message: "Message received." }),
      };
    }

    // Input validation
    const errors = {};
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      errors.name = "Name must be at least 2 characters.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== "string" || !emailRegex.test(email.trim())) {
      errors.email = "Please enter a valid email address.";
    }

    if (!subject || typeof subject !== "string" || subject.trim().length < 3) {
      errors.subject = "Subject must be at least 3 characters.";
    }

    if (!message || typeof message !== "string" || message.trim().length < 10) {
      errors.message = "Message must be at least 10 characters.";
    }

    if (Object.keys(errors).length > 0) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          success: false,
          errors,
          message: "Validation failed. Please verify your fields.",
        }),
      };
    }

    const submission = {
      id: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      receivedAt: new Date().toISOString(),
      name: name.trim(),
      email: email.trim(),
      subject: subject.trim(),
      messageLength: message.trim().length,
      messagePreview: message.trim().substring(0, 200),
      ip: event.requestContext?.http?.sourceIp || "unknown",
    };

    console.log("SERVERLESS_CONTACT_SUBMISSION:", JSON.stringify(submission, null, 2));

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: "Thank you! Your message was received by Atharv's AWS Lambda backend.",
        submissionId: submission.id,
      }),
    };
  } catch (err) {
    console.error("Lambda handler exception:", err);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        message: "An internal server error occurred in the Lambda backend.",
      }),
    };
  }
};
