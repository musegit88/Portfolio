import { authOptions } from "@/auth"
import { GoogleGenAI, Schema, Type } from "@google/genai"
import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"


const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
})


export async function POST(req: NextRequest) {

    // Verify admin authorization
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    try {
        const { title, technologies, githubUrl, demoUrl } = await req.json()

        // Define structured response format
        const responseSchema: Schema = {
            type: Type.OBJECT,
            properties: {
                shortDescription: {
                    type: Type.STRING,
                    description: "1-2 sentences overview of the project."
                },
                fullDescription: {
                    type: Type.STRING,
                    description: "Comprehensive 2-3 paragraph overview detailing key functionality and tech stack highlights."
                },
                features: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            title: { type: Type.STRING },
                            description: { type: Type.STRING }
                        }
                    }
                }
            },
            required: ["shortDescription", "fullDescription"]
        }

        const response = await ai.models.generateContent({
            model: "gemini-3.6-flash",
            contents: `Generate professional portfolio descriptions for a project with the following details:
            Title: ${title}
            Technologies Used : ${technologies?.join(", ") || "N/A"}
            GitHub URL : fetch the codebase and generate the description ${githubUrl || "N/A"}
            DemoUrl : use this url to fetch the live project if available ${demoUrl || "N/A"}
            while generating features use one short title for each feature no more than 5 words . and 2-3 sentences description for each feature. keep the features relevant to the project. Don't add unnecessary features. Don't add features that are not in the codebase. Don't forgate descriptions for the features. Don't repeat same feature description. Follow the correct schema for feature array. strictly follow the instructions.
            `,
            config: {
                responseMimeType: "application/json",
                responseSchema,
                temperature: 0.7
            },
        })

        const result = JSON.parse(response.text || "{}")
        return NextResponse.json(result);

    } catch (error) {
        console.error("AI Generation error", error);
        return NextResponse.json({ error: "Faild to generate content" }, { status: 500 })
    }
}