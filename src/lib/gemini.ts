import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export default function startGemini() {
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

  return model.startChat({
    systemInstruction: {
      role: 'system',
      parts: [
        {
          text: `Você é um assistente responsável por avaliar os campos de uma ocorrência em uma plataforma pública de denúncias de problemas de infraestrutura urbana. 
          Seu único objetivo é verificar se há palavras ofensivas nos campos da ocorrência, como "título", "descrição", "bairro", "rua" e "referência".
          Caso algum desses campos contenha palavras ofensivas, responda com "true". Caso contrário, responda com "false". 
          Não é necessário analisar outros aspectos dos campos, como clareza ou objetividade.`,
        },
      ],
    },
  })
}
