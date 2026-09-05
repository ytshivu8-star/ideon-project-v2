import { useState, useRef, useEffect } from "react";
import { Loader2, Send } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { ProjectConcept } from "../types";
import { askMentor } from "../api";

interface Message {
  role: 'user' | 'model';
  text: string;
}

export default function AiMentor({ project }: { project: ProjectConcept }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'model',
      text: `Hello! I'm your technical mentor for **${project.title}**. What part of the project would you like to discuss today?`
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedQuestions = [
    "How should I implement the backend?",
    "Which ML model should I use?",
    "How should I structure my database?",
    "What should I build this week?",
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (text: string) => {
    if (!text.trim()) return;
    
    const userMsg = { role: 'user' as const, text };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await askMentor(project, newMessages);
      setMessages([...newMessages, { role: 'model', text: res.text }]);
    } catch (e) {
      console.error(e);
      setMessages([...newMessages, { role: 'model', text: "Sorry, I'm having trouble connecting right now." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-4rem)] flex flex-col p-6">
      <div className="mb-6 shrink-0">
        <h2 className="text-3xl font-bold tracking-tight mb-2">Project IDEON Mentor</h2>
        <p className="text-neutral-500">Your AI technical mentor for {project.title}.</p>
      </div>

      <div className="flex-1 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl flex flex-col overflow-hidden shadow-sm">
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div 
                className={`max-w-[80%] rounded-2xl p-4 ${
                  msg.role === 'user' 
                    ? 'bg-black text-white dark:bg-white dark:text-black' 
                    : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100'
                }`}
              >
                <div className={`prose prose-sm max-w-none ${msg.role === 'user' ? 'prose-invert dark:prose-neutral' : 'dark:prose-invert'}`}>
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                </div>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-neutral-100 dark:bg-neutral-800 rounded-2xl p-4 flex items-center space-x-2">
                <span className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                <span className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 bg-neutral-50 dark:bg-neutral-950 border-t border-neutral-200 dark:border-neutral-800">
          <div className="flex flex-wrap gap-2 mb-4">
            {suggestedQuestions.map((q) => (
              <button
                key={q}
                onClick={() => handleSend(q)}
                className="text-xs px-3 py-1.5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              >
                {q}
              </button>
            ))}
          </div>
          
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSend(input); }}
            className="flex items-end gap-2"
          >
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a technical question..."
              className="flex-1 max-h-32 min-h-[44px] px-4 py-3 bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-xl outline-none resize-none"
              rows={1}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend(input);
                }
              }}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="p-3 bg-black text-white dark:bg-white dark:text-black rounded-xl disabled:opacity-50 hover:opacity-90 transition-opacity"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
