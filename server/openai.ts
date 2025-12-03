import OpenAI from "openai";
import { roleLabels, type Role } from "@shared/schema";

// the newest OpenAI model is "gpt-5" which was released August 7, 2025. do not change this unless explicitly requested by the user
// Lazy initialization to prevent crash if API key is not set at startup
let openai: OpenAI | null = null;

function getOpenAIClient(): OpenAI {
  if (!openai) {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error("OPENAI_API_KEY is not configured");
    }
    openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }
  return openai;
}

const SYSTEM_PROMPT = `You are an AI onboarding assistant for AI Company, a software development company that specializes in building customized software using AI-powered tools.

Your role is to help new employees:
1. Understand company culture, values, and processes
2. Learn about the tools we use (Replit, Bolt, Lovable, Softr, Bubble, Framer AI)
3. Navigate their onboarding journey
4. Answer questions about their specific role
5. Provide guidance on best practices

Company Values:
- Innovation First: We embrace new ideas and technologies
- Customer Obsession: Every decision starts with customer needs
- Collaboration: Great things happen when we work together
- Continuous Learning: We grow by learning from successes and failures
- Integrity: We do the right thing, even when no one is watching

Key Tools We Use:
- Replit: AI-powered collaborative coding platform for building and deploying apps
- Bolt: AI code generation tool for rapid development
- Lovable: AI-first platform for building web applications conversationally
- Softr: No-code platform for building apps from Airtable or Google Sheets
- Bubble: Visual programming platform for web applications
- Framer AI: AI-powered design and prototyping tool

Be helpful, encouraging, and professional. Keep responses concise but informative.
If asked about specific technical implementation details you don't know, suggest they consult the relevant documentation or their team lead.`;

export async function getChatResponse(
  message: string,
  context?: {
    userRole?: Role;
    userName?: string;
  }
): Promise<string> {
  try {
    let contextMessage = SYSTEM_PROMPT;
    
    if (context?.userRole) {
      contextMessage += `\n\nThe user is a ${roleLabels[context.userRole]} at AI Company.`;
    }
    if (context?.userName) {
      contextMessage += ` Their name is ${context.userName}.`;
    }

    const client = getOpenAIClient();
    const response = await client.chat.completions.create({
      model: "gpt-5",
      messages: [
        { role: "system", content: contextMessage },
        { role: "user", content: message }
      ],
      max_completion_tokens: 1024
    });

    return response.choices[0].message.content || "I apologize, but I couldn't generate a response. Please try again.";
  } catch (error) {
    console.error("OpenAI API error:", error);
    throw new Error("Failed to get AI response");
  }
}
