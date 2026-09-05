import handler from './api/generate.ts';
import { loadEnv } from 'vite';

const env = loadEnv('', process.cwd(), '');
process.env.GEMINI_API_KEY = env.GEMINI_API_KEY;

const req = {
  method: 'POST',
  body: {
    branch: 'CSE',
    skills: 'React'
  }
};
const res = {
  setHeader: () => {},
  status: (code) => {
    console.log("Status:", code);
    return res;
  },
  json: (data) => {
    console.log("JSON:", JSON.stringify(data).slice(0, 100));
  },
  end: () => {}
};

handler(req, res).catch(console.error);
