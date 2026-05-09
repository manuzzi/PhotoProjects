import axios from 'axios'

const apiKey = import.meta.env.VITE_OPENAI_API_KEY as string
const BASE_URL = 'https://api.openai.com/v1/chat/completions'

interface AIPromptOptions {
  systemPrompt: string
  userPrompt: string
  temperature?: number
}

export async function askAI({ systemPrompt, userPrompt, temperature = 0.7 }: AIPromptOptions): Promise<string> {
  const response = await axios.post(
    BASE_URL,
    {
      model: 'gpt-4o',
      temperature,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
    },
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    },
  )
  return response.data.choices[0].message.content as string
}

// ─── Prompt presets ────────────────────────────────────────────────────────────

export const AI_PROMPTS = {
  expandConcept: (genre: string, idea: string) => ({
    systemPrompt: `You are a creative assistant for photographers. Your role is to help photographers develop compelling, 
    original photographic projects. Respond in the same language the user writes in. Be concise, evocative, and practical.`,
    userPrompt: `Help me develop a ${genre} photography project concept based on this initial idea: "${idea}". 
    Suggest a title, a short artistic statement (2-3 sentences), and 3 possible narrative directions.`,
  }),

  generateBrief: (projectTitle: string, concept: string, deliverables: string) => ({
    systemPrompt: `You are a professional photography studio manager. Write clear, professional client briefs. 
    Respond in the same language the user writes in.`,
    userPrompt: `Write a professional client brief for this photography project:
    Title: ${projectTitle}
    Concept: ${concept}
    Deliverables: ${deliverables}
    Include: project overview, creative approach, timeline placeholder, and terms placeholder.`,
  }),

  refindeStatement: (draft: string, genre: string) => ({
    systemPrompt: `You are an art critic and photography curator. Help photographers write powerful, authentic artistic statements.`,
    userPrompt: `Refine this ${genre} photography artist statement. Keep the author's voice, improve clarity and impact:\n\n"${draft}"`,
  }),
}
