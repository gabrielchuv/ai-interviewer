import { Box } from "@mui/material";
import { MdMic } from "react-icons/md";

interface ChatWindowProps {
  isConnecting: boolean;
  isConnected: boolean;
  error: Error | null;
  transcriptions: Array<{ text: string; timestamp: number; source: 'user' | 'ai' }>;
  handleConnect: () => void;
  messagesEndRef: React.RefObject<HTMLDivElement>;
  autoConnectCountdown?: number | null;
}

export function ChatWindow({
  isConnecting,
  isConnected,
  error,
  transcriptions,
  handleConnect,
  messagesEndRef,
  autoConnectCountdown
}: ChatWindowProps) {
  return (
    <>
      {/* Connection status */}
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          mb: 2
        }}
      >
        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            color: isConnected ? 'rgb(34, 197, 94)' : 'rgb(239, 68, 68)',
            fontSize: '0.875rem'
          }}
        >
          <Box 
            sx={{ 
              width: 8, 
              height: 8, 
              borderRadius: '50%', 
              bgcolor: isConnected ? 'rgb(34, 197, 94)' : 'rgb(239, 68, 68)',
              mr: 1
            }} 
          />
          {isConnecting ? 'Connecting...' : isConnected ? 'Connected' : 'Waiting to connect...'}
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          {/* Only show connect button when not connected and not auto-connecting */}
          {!isConnected && !isConnecting && autoConnectCountdown === null && (
            <button
              onClick={handleConnect}
              className="px-2 py-1 rounded-full text-xs flex items-center bg-green-500 hover:bg-green-600 text-white"
            >
              <MdMic className="mr-1" size={12} /> Connect
            </button>
          )}
        </Box>
      </Box>
      
      {/* Error message */}
      {error && (
        <Box 
          sx={{ 
            bgcolor: 'rgba(239, 68, 68, 0.1)', 
            border: '1px solid rgba(239, 68, 68, 0.3)', 
            color: 'rgb(239, 68, 68)',
            p: 2,
            borderRadius: 1,
            mb: 2
          }}
        >
          <Box sx={{ fontWeight: 'bold', mb: 1 }}>Error</Box>
          <Box>{error.message}</Box>
        </Box>
      )}
      
      {/* Chat (formerly Transcriptions) */}
      <Box 
        sx={{ 
          flex: 1,
          bgcolor: 'rgba(31, 41, 55, 0.7)', 
          p: 2, 
          mb: 2, 
          borderRadius: 1,
          border: '1px solid rgba(75, 85, 99, 0.5)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          height: '100%',
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'rgba(31, 41, 55, 0.3)',
          },
          '&::-webkit-scrollbar-thumb': {
            background: 'rgba(75, 85, 99, 0.5)',
            borderRadius: '4px',
          },
        }}
      >
        <Box 
          sx={{ 
            fontWeight: 'bold', 
            mb: 1, 
            display: 'flex', 
            justifyContent: 'space-between',
            alignItems: 'center',
            color: 'rgb(243, 244, 246)',
            flexShrink: 0,
          }}
        >
          <span>Chat</span>
          <span style={{ fontSize: '0.75rem', color: 'rgb(156, 163, 175)' }}>
            {transcriptions.length} total
          </span>
        </Box>
        <Box 
          sx={{ 
            flex: 1,
            overflowY: 'auto',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            '&::-webkit-scrollbar': {
              width: '8px',
            },
            '&::-webkit-scrollbar-track': {
              background: 'rgba(31, 41, 55, 0.3)',
            },
            '&::-webkit-scrollbar-thumb': {
              background: 'rgba(75, 85, 99, 0.5)',
              borderRadius: '4px',
            },
          }}
        >
          {transcriptions.length > 0 ? (
            transcriptions.map((transcript, index) => (
              <Box 
                key={index} 
                sx={{ 
                  mb: 1.5, 
                  fontSize: '0.875rem',
                  textAlign: transcript.source === 'user' ? 'right' : 'left'
                }}
              >
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Box 
                    sx={{ 
                      fontSize: '0.75rem', 
                      fontWeight: 600, 
                      mb: 0.5,
                      color: transcript.source === 'user' ? 'rgb(96, 165, 250)' : 'rgb(34, 197, 94)'
                    }}
                  >
                    {transcript.source === 'user' ? 'You' : 'AI'} • {new Date(transcript.timestamp).toLocaleTimeString()}
                  </Box>
                  <Box 
                    sx={{ 
                      display: 'inline-block', 
                      px: 1.5, 
                      py: 1, 
                      borderRadius: 1,
                      bgcolor: transcript.source === 'user' 
                        ? 'rgba(37, 99, 235, 0.1)' 
                        : 'rgba(34, 197, 94, 0.1)',
                      border: transcript.source === 'user' 
                        ? '1px solid rgba(37, 99, 235, 0.3)' 
                        : '1px solid rgba(34, 197, 94, 0.3)',
                      color: transcript.source === 'user' 
                        ? 'rgb(96, 165, 250)' 
                        : 'rgb(74, 222, 128)',
                    }}
                  >
                    {transcript.text}
                  </Box>
                </Box>
              </Box>
            ))
          ) : (
            <Box 
              sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                height: '100%',
                flexDirection: 'column',
                opacity: 0.7
              }}
            >
              {autoConnectCountdown !== null && autoConnectCountdown !== undefined && autoConnectCountdown > 0 && !isConnected && !isConnecting ? (
                <Box 
                  sx={{ 
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    color: 'rgb(96, 165, 250)',
                  }}
                >
                  <Box sx={{ fontWeight: 'bold', fontSize: '1.25rem', mb: 2 }}>
                    You will be connected to an interviewer in
                  </Box>
                  <Box sx={{ 
                    fontWeight: 'bold', 
                    fontSize: '3rem', 
                    mb: 2,
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '3px solid rgba(37, 99, 235, 0.5)',
                  }}>
                    {autoConnectCountdown}
                  </Box>
                  <Box sx={{ fontSize: '0.875rem', color: 'rgba(156, 163, 175, 0.8)' }}>
                    Be ready to discuss the problem
                  </Box>
                </Box>
              ) : (
                <>
                  <MdMic size={32} className="text-blue-400 mb-2" />
                  <Box sx={{ textAlign: 'center', fontSize: '0.9rem', color: 'rgb(156, 163, 175)' }}>
                    {!isConnected ? 
                      "Your interview will begin shortly" :
                      "Your conversation will appear here"
                    }
                  </Box>
                </>
              )}
            </Box>
          )}
          <div ref={messagesEndRef} />
        </Box>
      </Box>
    </>
  );
}
