export default function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.status(200).json({
    ok: true,
    service: "ideon-api",
    geminiConfigured: !!process.env.GEMINI_API_KEY
  });
}
