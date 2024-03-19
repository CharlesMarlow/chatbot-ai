import React from 'react';
import { Avatar, Box, Button, Typography } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { red } from '@mui/material/colors';

const chatMessages = [
  { role: 'user', content: 'Hi there!' },
  { role: 'assistant', content: 'Hello! How can I assist you today?' },
  { role: 'user', content: 'I need help with my order.' },
  {
    role: 'assistant',
    content: 'Sure, could you please provide me with your order number?',
  },
  { role: 'user', content: 'My order number is 123456.' },
  {
    role: 'assistant',
    content: 'Thank you. What seems to be the issue with your order?',
  },
  { role: 'user', content: 'The item I received is damaged.' },
  {
    role: 'assistant',
    content:
      "I'm sorry to hear that. Let me check your order details and see what we can do to help.",
  },
];

const Chat = () => {
  const auth = useAuth();
  return (
    <Box
      sx={{
        display: 'flex',
        flex: 1,
        width: '100%',
        height: '100%',
        mt: 3,
        gap: 3,
      }}
    >
      <Box
        sx={{
          display: {
            md: 'flex',
            sm: 'none',
            xs: 'none',
          },
          flex: 0.2,
          flexDirection: 'column',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            height: '60vh',
            bgcolor: 'rgb(17, 29, 39)',
            borderRadius: 5,
            mx: 3,
          }}
        >
          <Avatar
            sx={{
              mx: 'auto',
              my: 2,
              bgcolor: 'white',
              color: 'black',
              fontWeight: 700,
            }}
          >
            {auth?.user?.name[0]}
            {auth?.user?.name.split(' ')[1][0]}
          </Avatar>
          <Typography
            sx={{
              mx: 'auto',
              fontFamily: 'work sans',
            }}
          >
            You are talking to a ChatBot
          </Typography>
          <Typography
            sx={{
              mx: 'auto',
              my: 4,
              p: 3,
              fontFamily: 'work sans',
            }}
          >
            Ask any question you'd like!
          </Typography>
          <Button
            sx={{
              width: 200,
              my: 'auto',
              color: 'white',
              fontWeight: 700,
              borderRadius: 3,
              mx: 'auto',
              bgcolor: red[300],
              ':hover': {
                bgcolor: red.A400,
              },
            }}
          >
            Clear Conversation
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flex: {
            md: 0.8,
            xs: 1,
            sm: 1,
          },
          flexDirection: 'column',
          padding: 3,
        }}
      >
        <Typography
          sx={{
            textAlign: 'center',
            fontSize: 40,
            color: 'white',
            mb: 2,
            mx: 'auto',
          }}
        >
          Model- GPT 3.5 Turbo
        </Typography>
        <Box
          sx={{
            width: '100%',
            height: '60vh',
            borderRadius: 3,
            mx: 'auto',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'scroll',
            overflowX: 'hidden',
            overflowY: 'auto',
            scrollBehavior: 'smooth',
          }}
        >
          {chatMessages.map((chat) => <div>
            {chat.content}
          </div>)}
        </Box>
      </Box>
    </Box>
  );
};

export default Chat;
