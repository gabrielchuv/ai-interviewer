'use client';

import { Box } from '@mui/material';
import { useState, useCallback } from 'react';
import { ChatWindow } from '../components/ChatWindow';
import { CodeEditor } from '../components/CodeEditor';
import { Timer } from '../components/Timer';
import { CompleteInterviewButton } from '../components/CompleteInterviewButton';
import { sendMessage, deduceCustomerIntent } from '../services/chat';
import { useRouter } from 'next/navigation';
import { questionBank } from '../data/questionBank';

interface Message {
  role: 'user' | 'ai';
  text: string;
}

const initialMessage: Message = {
  role: 'ai',
  text: `Welcome! I'll be your AI interviewer today. While you consider the question in the code editor to the right, you are expected to interact with me
  before starting to code. Once you are ready to start coding let me know by clicking on the "Start coding" button below and submitting the message.
  Once you have completed coding your solution, let me know by clicking on the "Finish coding" button below and submitting the message. Good luck!`
};

export type MessageCategory = 
  | 'Clarification question'
  | 'Outlining approach'
  | 'Intent to start coding'
  | 'Intent to finish coding'
  | 'Other';

const customerIntentPromptMap: Record<MessageCategory, string> = {
  'Clarification question': 'The candidate is seeking clarification about the problem requirements. Provide clear and concise answers without revealing the solution.',
  'Outlining approach': 'The candidate is outlining their approach to solve the problem. Listen carefully and provide feedback on their strategy without giving away implementation details. If the approach is correct, respond by telling them they are free to start coding.',
  'Intent to start coding': `The candidate wants to begin implementing their solution. respond by telling them they are free to start coding only if 2 conditions are met:
  1. The candidate has clarified the question enough in previous interactions.
  2. The candidate has outlined their approach to solve the problem.
  Otherwise, respond by telling them to continue considering the question.`,
  'Intent to finish coding': 'The candidate believes they have completed their solution. Review their code carefully. If the solution is correct, respond by saying "Feel free to conclude the interview." If the solution is incorrect, provide a hint on how to fix it.',
  'Other': 'The candidate is engaging in general discussion about the problem.'
};

export default function Interview() {
  const router = useRouter();
  const [conversation, setConversation] = useState<Message[]>([initialMessage]);
  const [input, setInput] = useState<string>('');
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [currentCode, setCurrentCode] = useState('');
  const [isInterviewComplete, setIsInterviewComplete] = useState(false);
  
  const [question] = useState(() => {
    return questionBank[0];
  });

  const handleSubmit = async () => {
    if (!input) return;

    setConversation(prev => [...prev, { role: 'user', text: input }]);
    setInput('');

    try {
      let userPrompt = input;
      
      const customerIntent = await deduceCustomerIntent(userPrompt);
      
      const customerIntentPrompt = customerIntentPromptMap[customerIntent]
      if (customerIntent === 'Intent to start coding') {
        const userMessages = conversation
          .filter(msg => msg.role === 'user')
          .map(msg => msg.text)
          .join('\n\n');

        const response = await sendMessage(userPrompt, {
          question: question.description,
          customerIntent: customerIntentPrompt,
          previousInteractions: userMessages
        });
        setConversation(prev => [...prev, { role: 'ai', text: response }]);
        return
      }
      else if (customerIntent === "Intent to finish coding") {
        userPrompt = `Here is the candidate's solution:\n\n${currentCode}`;

        const response = await sendMessage(userPrompt, {
          question: question.description,
          customerIntent: customerIntentPrompt
        });

        if (response === "Feel free to conclude the interview.") {
          setIsInterviewComplete(true);
        }

        setConversation(prev => [...prev, { role: 'ai', text: response }]);

        return
      }
      const response = await sendMessage(userPrompt, {
        question: question.description,
        customerIntent: customerIntentPrompt
      });
      setConversation(prev => [...prev, { role: 'ai', text: response }]);
    } catch (error) {
      setConversation(prev => [...prev, { 
        role: 'ai', 
        text: 'Sorry, there was an error processing your request. Please try again later.' 
      }]);
    }
  };

  const handleTimeUp = useCallback(() => {
    setIsTimeUp(true);
  }, []);

  const handleInterviewComplete = () => {
    router.push('/feedback');
  };

  return (
    <Box position="relative" sx={{ height: '100vh' }}>
      <Timer onTimeUp={handleTimeUp} />
      <Box display="flex" sx={{ height: '100%' }}>
        <ChatWindow
          conversation={conversation}
          input={input}
          setInput={setInput}
          handleSubmit={handleSubmit}
        />
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          flex: 1
        }}>
          <CodeEditor 
            question={question} 
            onCodeChange={setCurrentCode}
          />
          <CompleteInterviewButton 
            isEnabled={isTimeUp || isInterviewComplete} 
            onSubmit={handleInterviewComplete} 
          />
        </Box>
      </Box>
    </Box>
  );
} 