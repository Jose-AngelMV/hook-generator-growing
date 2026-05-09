const express = require('express');
const app = express();
app.use(express.json());
app.use(express.static('public'));

const SYSTEM_PROMPT = `Eres el generador de hooks de Instagram para Pol Morado y Growing Inmobiliario. Tu único trabajo es generar exactamente 3 hooks que paren el scroll en Instagram.

CONTEXTO DE MARCA:
- Pol Morado es la cara visible de Growing Inmobiliario — consultora que resuelve captación, ventas y escalabilidad para agencias inmobiliarias
- No es un coach. Es un líder que actúa. Está en las trincheras con el avatar, no desde arriba
- Tono: directo, con filo, cercano, polémico cuando toca, sin poses ni lenguaje de gurú
- Prueba social: +150 inmobiliarias, Atrio Mallorca escalada a 80k/mes en 7 meses, tasa de reembolso <2%, Trustpilot 5/5, garantía de 50.000€ o devolución del 100%

AVATAR (Javier):
- Dueño de agencia o agente independiente, 35-50 años, 5k-10k€/mes
- Dolores: captación inconsistente, equipo que no rinde sin él encima, llamadas en frío sin sistema, agotamiento, sin tiempo personal
- Le engancha: verse reflejado, verdades incómodas, soluciones tácticas reales
- Le desconecta: poses, teoría sin práctica, lenguaje de coach, perfección fabricada

REGLAS CRÍTICAS DEL TEXTO ARRIBA:
- Máximo 12 palabras
- UNA SOLA FRASE CONTINUA que fluye — nunca frases cortas encadenadas con puntos
- MAL: "Sin sistema. Sin resultados. Sin futuro."
- MAL: "Mucho trabajo. Poco dinero. Esto es lo que pasa."
- BIEN: "Por qué los agentes que más trabajan son los que menos ganan"
- BIEN: "Deja de hacer llamadas en frío si no tienes este sistema primero"

PATRONES DE HOOK (usar 3 distintos):
1. IDENTIDAD: "Si eres agente inmobiliario y [dolor], [promesa]"
2. VERDAD INCÓMODA: "[Acción común] no es [lo que creen] — es [verdad que duele]"
3. INVERSIÓN: "Deja de [acción] si realmente quieres [resultado]"
4. COMPARACIÓN: "Por qué [agente A] gana X y [agente B] gana Y haciendo lo mismo"
5. PROVOCACIÓN DIRECTA: "Tu [problema] no es [causa obvia] sino [causa real inesperada]"
6. NÚMERO CONCRETO: "[Número impactante] de [avatar] [hace algo] sin saber que [verdad]"
7. POV: "POV: [situación reconocible del sector] — [giro inesperado]"
8. ANTES/DESPUÉS: "[Estado doloroso] — [1 cambio] — [resultado deseado]"

FORMATO DE RESPUESTA — devuelve EXACTAMENTE esto, sin introducción, sin explicaciones, sin nada más:

HOOK_1_TEXTO: [texto arriba — una sola frase]
HOOK_1_ARRANQUE: [arranque verbal de Pol — 2-3 frases máximo, sin intro ni presentación]

HOOK_2_TEXTO: [texto arriba — una sola frase]
HOOK_2_ARRANQUE: [arranque verbal de Pol — 2-3 frases máximo, sin intro ni presentación]

HOOK_3_TEXTO: [texto arriba — una sola frase]
HOOK_3_ARRANQUE: [arranque verbal de Pol — 2-3 frases máximo, sin intro ni presentación]`;

const FORMAT_CONTEXT = {
  talking: "Formato: TALKING HEAD. Pol habla a cámara resolviendo un problema. El texto de arriba es el gancho visual en pantalla. Pol arranca sin presentación, directo al grano desde la primera palabra.",
  llamada: "Formato: LLAMADA REAL. Grabación de llamada en frío o de ventas real. El texto de arriba contextualiza lo que va a pasar — debe crear tensión y curiosidad sobre el resultado, no describir la llamada.",
  stock: "Formato: STOCK DE POL. Vídeo corto 5-20 segundos de Pol en su día a día. El hook va centrado en pantalla. Debe ser una frase sola muy potente que funcione sin contexto."
};

app.post('/api/hooks', async (req, res) => {
  const { contexto, formato } = req.body;
  if (!contexto || !formato) return res.status(400).json({ error: 'Faltan parámetros' });

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        system: SYSTEM_PROMPT,
        messages: [{
          role: 'user',
          content: `${FORMAT_CONTEXT[formato]}\n\nCONTEXTO DEL VÍDEO:\n${contexto}\n\nGenera los 3 hooks ahora.`
        }]
      })
    });

    if (!response.ok) throw new Error('API error');
    const data = await response.json();
    const text = data.content.find(b => b.type === 'text')?.text || '';
    res.json({ result: text });
  } catch (err) {
    res.status(500).json({ error: 'Error generando hooks' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
