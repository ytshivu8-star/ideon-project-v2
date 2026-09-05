import { useState, useRef, useEffect } from "react";
import { Loader2, PlayCircle, Send, CheckCircle2, AlertCircle, ArrowRight } from "lucide-react";
import { ProjectConcept } from "../types";
import { getVivaQuestion, evaluateVivaAnswer } from "../api";

type Phase = 'idle' | 'asking' | 'answering' | 'evaluating' | 'feedback';

interface Interaction {
  question: string;
  answer?: string;
  evaluation?: {
    technicalAccuracy: number;
    clarity: number;
    depth: number;
    goodPoints: string;
    missingPoints: string;
    betterAnswer: string;
  };
}

export default function VivaSimulator({ project }: { project: ProjectConcept }) {
  const [phase, setPhase] = useState<Phase>('idle');
  const [history, setHistory] = useState<Interaction[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [answerInput, setAnswerInput] = useState("");
  const [loading, setLoading] = useState(false);

  const startViva = async () => {
    setPhase('asking');
    setLoading(true);
    try {
      const res = await getVivaQuestion(project, []);
      setCurrentQuestion(res.question);
      setPhase('answering');
    } catch (e) {
      console.error(e);
      setPhase('idle');
    } finally {
      setLoading(false);
    }
  };

  const submitAnswer = async () => {
    if (!answerInput.trim()) return;
    
    const ans = answerInput;
    setAnswerInput("");
    setPhase('evaluating');
    setLoading(true);

    try {
      const evaluation = await evaluateVivaAnswer(project, currentQuestion, ans);
      const newInteraction = { question: currentQuestion, answer: ans, evaluation };
      const newHistory = [...history, newInteraction];
      setHistory(newHistory);
      
      // Setup next question
      if (evaluation.followUpQuestion) {
        setCurrentQuestion(evaluation.followUpQuestion);
      } else {
        const nextQ = await getVivaQuestion(project, newHistory);
        setCurrentQuestion(nextQ.question);
      }
      setPhase('feedback');
    } catch (e) {
      console.error(e);
      setPhase('answering');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 space-y-8">
      <div className="text-center space-y-4 mb-12">
        <h2 className="text-4xl font-bold tracking-tight">🎓 Defend Your Project</h2>
        <p className="text-lg text-neutral-500">Practice your final-year evaluation with a strict AI examiner.</p>
        
        {phase === 'idle' && (
          <div className="pt-8">
            <button
              onClick={startViva}
              className="inline-flex items-center px-8 py-4 bg-black text-white dark:bg-white dark:text-black font-bold rounded-full shadow-lg hover:shadow-xl transition-all active:scale-95"
            >
              <PlayCircle className="w-6 h-6 mr-2" />
              Start Viva
            </button>
          </div>
        )}
      </div>

      {phase !== 'idle' && (
        <div className="space-y-8">
          {history.map((interaction, i) => (
            <div key={i} className="space-y-4 opacity-75">
              <div className="p-4 bg-neutral-100 dark:bg-neutral-900 rounded-2xl rounded-tl-sm border-l-4 border-black dark:border-white">
                <div className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-2">Examiner</div>
                <p className="font-medium text-lg">{interaction.question}</p>
              </div>
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-2xl rounded-tr-sm ml-12 border border-blue-100 dark:border-blue-800">
                <div className="text-xs font-bold uppercase tracking-widest text-blue-500 mb-2">Your Answer</div>
                <p className="text-neutral-800 dark:text-neutral-200">{interaction.answer}</p>
              </div>
              {interaction.evaluation && (
                <div className="ml-12 p-6 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-sm">
                  <div className="flex gap-4 mb-6">
                    <ScoreCard label="Accuracy" score={interaction.evaluation.technicalAccuracy} />
                    <ScoreCard label="Clarity" score={interaction.evaluation.clarity} />
                    <ScoreCard label="Depth" score={interaction.evaluation.depth} />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 bg-green-50 dark:bg-green-900/10 rounded-xl text-sm">
                      <div className="flex items-center font-bold text-green-700 dark:text-green-400 mb-2">
                        <CheckCircle2 className="w-4 h-4 mr-2" /> What was good
                      </div>
                      <p className="text-green-900 dark:text-green-100">{interaction.evaluation.goodPoints}</p>
                    </div>
                    <div className="p-4 bg-red-50 dark:bg-red-900/10 rounded-xl text-sm">
                      <div className="flex items-center font-bold text-red-700 dark:text-red-400 mb-2">
                        <AlertCircle className="w-4 h-4 mr-2" /> What was missing
                      </div>
                      <p className="text-red-900 dark:text-red-100">{interaction.evaluation.missingPoints}</p>
                    </div>
                  </div>
                  <div className="mt-4 p-4 bg-neutral-50 dark:bg-neutral-900 rounded-xl text-sm">
                    <div className="font-bold text-neutral-700 dark:text-neutral-300 mb-2">Ideal Answer Framework</div>
                    <p className="text-neutral-600 dark:text-neutral-400 italic">{interaction.evaluation.betterAnswer}</p>
                  </div>
                </div>
              )}
            </div>
          ))}

          {(phase === 'asking' || phase === 'answering' || phase === 'evaluating') && (
            <div className="p-6 bg-neutral-100 dark:bg-neutral-900 rounded-2xl rounded-tl-sm shadow-md border-l-4 border-black dark:border-white animate-in fade-in slide-in-from-bottom-4">
              <div className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-2">Examiner</div>
              {phase === 'asking' ? (
                <div className="flex items-center text-neutral-500">
                  <Loader2 className="w-5 h-5 animate-spin mr-3" />
                  Formulating question...
                </div>
              ) : (
                <p className="font-medium text-xl leading-relaxed">{currentQuestion}</p>
              )}
            </div>
          )}

          {phase === 'answering' && (
            <div className="ml-12 mt-4 flex gap-2 animate-in fade-in">
              <textarea
                value={answerInput}
                onChange={e => setAnswerInput(e.target.value)}
                placeholder="Type your answer here..."
                className="flex-1 p-4 min-h-[120px] bg-white dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-2xl outline-none resize-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={submitAnswer}
                disabled={!answerInput.trim() || loading}
                className="px-6 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold disabled:opacity-50 transition-colors flex items-center justify-center"
              >
                {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Send className="w-6 h-6" />}
              </button>
            </div>
          )}

          {phase === 'evaluating' && (
            <div className="ml-12 p-6 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl flex items-center justify-center text-neutral-500">
              <Loader2 className="w-6 h-6 animate-spin mr-3" />
              Evaluating answer...
            </div>
          )}

          {phase === 'feedback' && (
            <div className="text-center pt-8">
              <button
                onClick={() => setPhase('answering')}
                className="inline-flex items-center px-6 py-3 bg-black text-white dark:bg-white dark:text-black font-bold rounded-xl transition-all hover:opacity-90"
              >
                Next Question
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function ScoreCard({ label, score }: { label: string; score: number }) {
  const isGood = score >= 7;
  const isAvg = score >= 5 && score < 7;
  return (
    <div className="flex-1 flex flex-col justify-center items-center p-3 bg-neutral-50 dark:bg-neutral-900 rounded-xl">
      <div className="text-xs uppercase tracking-wider font-bold text-neutral-400 mb-1">{label}</div>
      <div className={`text-2xl font-black ${isGood ? 'text-green-500' : isAvg ? 'text-yellow-500' : 'text-red-500'}`}>
        {score}/10
      </div>
    </div>
  );
}
