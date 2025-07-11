import React, { useState, useRef, useEffect } from "react";
import { Send, Bot, User, MessageCircle, X, Minimize2 } from "lucide-react";
import OpenAI from "openai";
import ReactMarkdown from "react-markdown";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const SEVAKAI_KNOWLEDGE_BASE = `
# SevakAI - AI-Powered Domestic Helper Platform

## Services:
-  Maids: 8,000-25,000/month
-  Cooks: 10,000-30,000/month  
-  Drivers: 15,000-35,000/month
-  Nannies: 12,000-40,000/month
-  Elderly Care: 15,000-45,000/month

## Features:
- AI voice interviews in multiple languages
- Background verification & police checks
- Smart matching algorithm
- No commission fees

## Coverage:
- Currently: Hyderabad (all areas)
- Expanding: Bengaluru, Chennai, Dubai, Mumbai

## Contact:
- Phone: +91 98765 43210 (24/7)
- Email: hello@sevakai.com
- WhatsApp: Available
`;

const SYSTEM_PROMPT = `You are SevakAI Assistant for domestic helper hiring.

CRITICAL RULES:
1. Keep responses under 60 words maximum
2. Use bullet points for lists
3. Only answer SevakAI-related questions
4. Redirect unrelated topics: "I help with SevakAI services! What helper do you need? "
5. Always mention calling +91 98765 43210 for details
6. Use emojis appropriately

Knowledge: ${SEVAKAI_KNOWLEDGE_BASE}`;

export const SevakChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      role: "assistant", 
      content: "Hi!  Need **maids, cooks, drivers, or nannies**? Ask me anything about SevakAI services! ",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [openai, setOpenai] = useState<OpenAI | null>(null);

  useEffect(() => {
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    if (apiKey) {
      setOpenai(new OpenAI({ apiKey, dangerouslyAllowBrowser: true }));
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const generateAIResponse = async (userMessage: string): Promise<string> => {
    if (!openai) {
      return " Technical issues! Call **+91 98765 43210** for immediate help!";
    }

    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: userMessage }
        ],
        max_tokens: 80,
        temperature: 0.7
      });

      return completion.choices[0]?.message?.content || "Please rephrase your question! ";
    } catch (error) {
      return " AI down! Call **+91 98765 43210** or use WhatsApp!";
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: inputMessage.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      const aiResponse = await generateAIResponse(userMessage.content);
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: aiResponse,
        timestamp: new Date()
      }]);
    } catch (error) {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(), 
        role: "assistant",
        content: " Error! Call **+91 98765 43210** for help!",
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const openWhatsApp = () => {
    window.open("https://wa.me/919876543210?text=Hi! I need help with SevakAI services.", "_blank");
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-32 right-6 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-full p-4 shadow-lg transform transition-all duration-300 hover:scale-105"
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className={`bg-white rounded-2xl shadow-2xl border transition-all duration-300 ${
        isMinimized ? "w-80 h-16" : "w-96 h-[500px]"
      } max-w-[90vw] flex flex-col`}>
        
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-4 rounded-t-2xl flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Bot className="h-5 w-5" />
            <div>
              <h3 className="font-semibold">SevakAI Assistant</h3>
              <p className="text-xs opacity-90">Quick helper info </p>
            </div>
          </div>
          <div className="flex space-x-2">
            <button onClick={() => setIsMinimized(!isMinimized)} className="text-white hover:bg-white/20 rounded p-1">
              <Minimize2 className="h-4 w-4" />
            </button>
            <button onClick={() => setIsOpen(false)} className="text-white hover:bg-white/20 rounded p-1">
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {!isMinimized && (
          <>
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] rounded-2xl px-3 py-2 ${
                    message.role === "user" 
                      ? "bg-orange-500 text-white ml-4" 
                      : "bg-white text-gray-800 border mr-4"
                  } shadow-sm`}>
                    <div className="flex items-start space-x-2">
                      {message.role === "assistant" && <Bot className="h-4 w-4 mt-1 text-orange-500 flex-shrink-0" />}
                      {message.role === "user" && <User className="h-4 w-4 mt-1 text-white flex-shrink-0" />}
                      <div className="flex-1">
                        {message.role === "assistant" ? (
                          <ReactMarkdown className="text-sm prose prose-sm max-w-none">{message.content}</ReactMarkdown>
                        ) : (
                          <p className="text-sm">{message.content}</p>
                        )}
                        <p className={`text-xs mt-1 ${message.role === "user" ? "text-white/70" : "text-gray-500"}`}>
                          {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white rounded-2xl px-3 py-2 mr-4 border shadow-sm">
                    <div className="flex items-center space-x-2">
                      <Bot className="h-4 w-4 text-orange-500" />
                      <div className="flex space-x-1">
                        {[0, 1, 2].map(i => (
                          <div key={i} className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.1}s` }} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 border-t bg-white rounded-b-2xl">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder="Ask about services..."
                  className="flex-1 border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
                  disabled={isLoading}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isLoading}
                  className="bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 text-white rounded-xl px-3 py-2"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
              
              <div className="mt-2 flex gap-2">
                <button onClick={() => setInputMessage("What services?")} className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full hover:bg-orange-200">Services</button>
                <button onClick={() => setInputMessage("Pricing?")} className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full hover:bg-orange-200">Pricing</button>
                <button onClick={openWhatsApp} className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full hover:bg-green-200">WhatsApp</button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
