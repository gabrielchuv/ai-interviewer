'use client';

import { Box } from '@mui/material';
import { useState, useCallback } from 'react';
import { ChatWindow } from '../components/ChatWindow';
import { CodeEditor } from '../components/CodeEditor';
import { Timer } from '../components/Timer';
import { CompleteInterviewButton } from '../components/CompleteInterviewButton';
import { sendMessage } from '../services/chat';
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

export default function Interview() {
  const router = useRouter();
  const [conversation, setConversation] = useState<Message[]>([initialMessage]);
  const [input, setInput] = useState<string>('');
  const [isTimeUp, setIsTimeUp] = useState(false);
  
  const [question] = useState(() => {
    return questionBank[Math.floor(Math.random() * 10)];
  });

  const startCodingPrompt = `The candidate now wants to start coding.Consider the candidate's previous answers shown below.
  As an interviewer, if you feel that the candidate has disambiguated the question enough, respond by telling them they are free to start coding.
  In contrast, if you feel that the candidate has not disambiguated the question enough, respond by telling them to continue considering the question.
  `

  const finishCodingPrompt = `The candidate has completed coding their solution.`

  const handleSubmit = async () => {
    if (!input) return;

    setConversation(prev => [...prev, { role: 'user', text: input }]);
    setInput('');

    try {
      let messageToSend = input;
      if (input === "I am ready to start coding") {
        console.log("Starting coding");
        const userMessages = conversation
          .filter(msg => msg.role === 'user')
          .map(msg => msg.text)
          .join('\n');
        
        messageToSend = `${startCodingPrompt}\n\n${userMessages ? `Candidate's previous answers:\n\n${userMessages}` : `Candidate's previous answers are empty`}`
      }
      else if (input === "I have completed my solution") {
        messageToSend = finishCodingPrompt;
      }
      else {
        messageToSend = `For context, this is the question the candidate is considering: ${question.description}\n\n${input}`;
      }

      console.log("Sending message to AI: ", messageToSend);

      const response = await sendMessage(messageToSend);
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
          <CodeEditor question={question} />
          <CompleteInterviewButton 
            isEnabled={isTimeUp} 
            onSubmit={handleInterviewComplete} 
          />
        </Box>
      </Box>
    </Box>
  );
} 