import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, ArrowDown, MessageCircle, X, Minimize2 } from 'lucide-react';
import OpenAI from 'openai';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

// Comprehensive SevakAI Knowledge Base
const SEVAKAI_KNOWLEDGE_BASE = `
# SevakAI - AI-Powered Domestic Helper Platform

## Company Overview
SevakAI is India's first AI-powered platform that connects homeowners with verified domestic helpers including maids, cooks, drivers, nannies, and elderly care assistants. We replace random referrals and WhatsApp groups with a systematic, AI-driven approach to domestic help hiring.

## Services Offered
### 🏠 Maids & Housekeepers
- Full-time live-in and live-out options
- Part-time (2-6 hours daily)
- One-time deep cleaning services
- Regular weekly/monthly cleaning
- Verified profiles with background checks

### 👨‍🍳 Cooks & Chefs
- Full-time family cooks
- Part-time meal preparation
- Vegetarian and non-vegetarian specialists
- Regional cuisine experts (South Indian, North Indian, Bengali, etc.)
- Special dietary requirements (diabetic, low-sodium, etc.)

### 👶 Nannies & Babysitters
- Experienced child care professionals
- Age-specific care (infants, toddlers, school-age)
- Educational support and activity planning
- Overnight care available
- Emergency babysitting services

### 🚗 Drivers
- Personal family drivers
- Part-time and full-time options
- Airport pickup/drop services
- Elderly transportation assistance
- Verified driving licenses and background checks

### ❤️ Elderly Care
- Companion care services
- Medical appointment assistance
- Medication reminders
- Light housekeeping for seniors
- Emotional support and conversation

## Core Technology Features

### 🤖 AI Voice Interview System
- Multilingual AI agent conducts phone/WhatsApp interviews
- Supports Hindi, English, Telugu, Tamil, Bengali, Kannada, Malayalam, Marathi, Gujarati
- Comprehensive skill assessment and background verification
- Behavioral analysis through conversation patterns
- Real-time language translation capabilities

### 📊 ML Scoring & Verification
- Advanced machine learning algorithms evaluate candidates
- Scoring based on:
  - Reliability and punctuality history
  - Communication skills
  - Technical competency
  - Trustworthiness indicators
  - Previous employer feedback
  - Background verification results

### 🎯 Smart Matching Algorithm
- AI learns family preferences and requirements
- Location-based matching within your area
- Personality compatibility assessment
- Schedule and availability optimization
- Price range matching
- Special requirement fulfillment (pets, elderly care, etc.)

### 🛡️ Verification Process
- Police background verification
- Identity document verification (Aadhaar, PAN)
- Previous employer reference checks
- Skills assessment tests
- Health and vaccination status
- Address verification


### No Hidden Charges
- Zero commission fees
- No broker charges
- No advance payments to platform
- Direct salary payment to helpers
- Transparent pricing with no surprises

## Geographic Coverage
### Currently Available
- **Hyderabad, Telangana** (Full Service)
  - All areas including Banjara Hills, Jubilee Hills, Gachibowli, Kondapur, Madhapur, Miyapur, Secunderabad

### Expanding Soon (2024-2025)
- **Bengaluru, Karnataka** - Tech hub expansion
- **Chennai, Tamil Nadu** - South India coverage
- **Dubai, UAE** - International market entry
- **Mumbai, Maharashtra** - West India launch
- **Delhi NCR** - North India expansion

## How SevakAI Works

### Step 1: Customer Registration
- Sign up with basic requirements
- Specify helper type, timings, budget
- Detail special requirements (pets, elderly, dietary needs)
- Set location and preferred working hours

### Step 2: AI-Powered Helper Sourcing
- AI voice agent interviews potential helpers
- Comprehensive background verification
- Skills assessment and scoring
- Language preference matching
- Availability confirmation

### Step 3: Smart Matching
- Algorithm matches based on your criteria
- Multiple candidate profiles provided
- Video introductions available
- Schedule preliminary interviews
- Reference check completion

### Step 4: Hiring & Onboarding
- Direct communication with selected helper
- Contract terms discussion
- Trial period arrangement (typically 7-15 days)
- Ongoing support and feedback system
- Performance monitoring

## Unique Value Propositions

### For Customers
- **Time Saving**: No endless searching through unreliable sources
- **Quality Assurance**: All helpers verified and rated
- **Safety First**: Background checks and police verification
- **Language Support**: Multilingual platform and helpers
- **Ongoing Support**: 24/7 customer service
- **Trial Periods**: Risk-free hiring with trial options
- **No Broker Hassles**: Direct platform, no middlemen

### For Helpers
- **Fair Employment**: Direct connection with families
- **Skill Development**: Training programs and certifications
- **Better Wages**: No broker cuts, full salary to helpers
- **Work-Life Balance**: Flexible timing options
- **Career Growth**: Performance-based opportunities
- **Women Empowerment**: Focus on providing opportunities for women

## Technology Stack
- AI-powered voice recognition and natural language processing
- Machine learning algorithms for matching and scoring
- Multilingual support with real-time translation
- Mobile-first platform design
- Secure payment processing
- Real-time background verification systems

## Contact Information
- **Phone**: +91 98765 43210 (Available 24/7)
- **Email**: hello@sevakai.com
- **WhatsApp**: Available for instant support
- **Office**: Hyderabad, India
- **Website**: Professional consultation and registration

## Special Programs
### Women Empowerment Initiative
- Priority employment for women from underprivileged backgrounds
- Skill training and certification programs
- Financial literacy workshops
- Career advancement opportunities
- Supportive community building

### Quality Assurance
- Regular performance reviews
- Customer feedback integration
- Continuous improvement programs
- Helper training and development
- Technology-driven monitoring

## Competitive Advantages
1. **AI-First Approach**: Only platform using AI for comprehensive helper evaluation
2. **Multilingual Support**: Truly inclusive platform supporting all major Indian languages
3. **Verification Depth**: Most comprehensive background checking in the industry
4. **No Commission Model**: Fair pricing without hidden broker fees
5. **Technology Integration**: Seamless app and web experience
6. **Customer Support**: 24/7 multilingual customer service
7. **Trial Flexibility**: Risk-free hiring with generous trial periods

This comprehensive knowledge base covers all aspects of SevakAI's services, technology, pricing, and value propositions for customers looking to hire domestic helpers in India.
`;

const CHATBOT_SYSTEM_PROMPT = `You are SevakAI Assistant, a helpful and knowledgeable chatbot for SevakAI - India's leading AI-powered domestic helper hiring platform.

PERSONALITY: You are friendly, professional, helpful, and enthusiastic about SevakAI's services. Use emojis appropriately and maintain a warm, conversational tone.

CORE INSTRUCTIONS:
1. ONLY answer questions related to SevakAI and domestic helper services
2. If asked about unrelated topics, politely redirect: "I'm here to help with SevakAI's domestic helper services! How can I assist you in finding the perfect helper for your home? 🏠"
3. Use the comprehensive knowledge base to provide accurate, detailed information
4. Always encourage users to contact SevakAI for personalized assistance
5. Be enthusiastic about the AI technology and verification processes
6. Highlight the safety, reliability, and convenience benefits

RESPONSE GUIDELINES:
- Keep responses conversational but informative
- Use bullet points for multiple options or features
- Include relevant emojis to make responses engaging
- Always end with a helpful question or call-to-action
- For pricing questions, provide ranges and mention location-specific details
- For availability questions, mention current coverage in Hyderabad and expansion plans

KNOWLEDGE BASE:
${SEVAKAI_KNOWLEDGE_BASE}

Remember: Stay focused only on SevakAI-related topics and always be helpful and encouraging!`;

export const SevakChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hello! 👋 I'm your SevakAI Assistant. I'm here to help you find trusted domestic helpers like maids, cooks, drivers, and nannies. What kind of help are you looking for? 🏠✨",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [openai, setOpenai] = useState<OpenAI | null>(null);

  // Initialize OpenAI client
  useEffect(() => {
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    if (apiKey) {
      const client = new OpenAI({
        apiKey: apiKey,
        dangerouslyAllowBrowser: true
      });
      setOpenai(client);
    }
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const generateAIResponse = async (userMessage: string): Promise<string> => {
    if (!openai) {
      return "I'm currently experiencing technical difficulties with my AI system. 🔧 Please contact our support team directly at +91 98765 43210 or via WhatsApp for immediate assistance with your domestic helper needs!";
    }

    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: CHATBOT_SYSTEM_PROMPT },
          { role: "user", content: userMessage }
        ],
        max_tokens: 200,
        temperature: 0.7,
        presence_penalty: 0.1,
        frequency_penalty: 0.1
      });

      const response = completion.choices[0]?.message?.content;
      return response || "I apologize, but I couldn't process your request properly. Could you please rephrase your question about SevakAI's services? 🤔";
    } catch (error) {
      console.error('OpenAI API Error:', error);
      return "I'm having trouble connecting to my AI system right now. 🛠️ For immediate assistance with hiring domestic helpers, please contact our team at +91 98765 43210 or via WhatsApp!";
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const aiResponse = await generateAIResponse(userMessage.content);
      
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: aiResponse,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I'm experiencing some technical difficulties. 🔧 Please reach out to our support team at +91 98765 43210 for immediate assistance with your domestic helper needs!",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const openWhatsApp = () => {
    const message = "Hi! I'm interested in SevakAI's domestic helper services. Can you help me?";
    const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-32 right-6 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-full p-4 shadow-lg transform transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange-300"
          aria-label="Open SevakAI Chat Assistant"
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className={`bg-white rounded-2xl shadow-2xl border border-gray-200 transition-all duration-300 ${
        isMinimized ? 'w-80 h-16' : 'w-96 h-[600px]'
      } max-w-[90vw] max-h-[90vh] flex flex-col`}>
        
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-4 rounded-t-2xl flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-white/20 rounded-full p-2">
              <Bot className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">SevakAI Assistant</h3>
              <p className="text-xs opacity-90">Your domestic helper expert 🏠</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="text-white hover:bg-white/20 rounded-full p-1 transition-colors"
              aria-label={isMinimized ? "Expand chat" : "Minimize chat"}
            >
              <Minimize2 className="h-4 w-4" />
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20 rounded-full p-1 transition-colors"
              aria-label="Close chat"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                      message.role === 'user'
                        ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white ml-4'
                        : 'bg-white text-gray-800 border border-gray-200 mr-4'
                    } shadow-sm`}
                  >
                    <div className="flex items-start space-x-2">
                      {message.role === 'assistant' && (
                        <Bot className="h-4 w-4 mt-1 text-orange-500 flex-shrink-0" />
                      )}
                      {message.role === 'user' && (
                        <User className="h-4 w-4 mt-1 text-white flex-shrink-0" />
                      )}
                      <div className="flex-1">
                        <p className="text-sm leading-relaxed whitespace-pre-wrap">
                          {message.content}
                        </p>
                        <p className={`text-xs mt-2 ${
                          message.role === 'user' ? 'text-white/70' : 'text-gray-500'
                        }`}>
                          {message.timestamp.toLocaleTimeString([], { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white rounded-2xl px-4 py-3 mr-4 border border-gray-200 shadow-sm">
                    <div className="flex items-center space-x-2">
                      <Bot className="h-4 w-4 text-orange-500" />
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input Container */}
            <div className="p-4 border-t border-gray-200 bg-white rounded-b-2xl">
              <div className="flex space-x-3">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about maids, cooks, drivers, or nannies..."
                  className="flex-1 border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                  disabled={isLoading}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isLoading}
                  className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:from-gray-300 disabled:to-gray-400 text-white rounded-xl px-4 py-3 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  aria-label="Send message"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
              
              {/* Quick Actions */}
              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  onClick={() => setInputMessage("What services do you offer?")}
                  className="text-xs bg-orange-100 text-orange-700 px-3 py-1 rounded-full hover:bg-orange-200 transition-colors"
                >
                  Services
                </button>
                <button
                  onClick={() => setInputMessage("How much does a maid cost?")}
                  className="text-xs bg-orange-100 text-orange-700 px-3 py-1 rounded-full hover:bg-orange-200 transition-colors"
                >
                  Pricing
                </button>
                <button
                  onClick={openWhatsApp}
                  className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full hover:bg-green-200 transition-colors"
                >
                  WhatsApp
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}; 