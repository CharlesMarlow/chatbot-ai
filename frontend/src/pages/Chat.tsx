import { useRef, useState } from 'react';
import { Avatar, Box, Button, IconButton, Typography } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { red } from '@mui/material/colors';
import ChatItem from '../components/chat/ChatItem';
import { IoMdSend } from 'react-icons/io';
import { sendChatRequest } from '../helpers/api';

// const chatMessages = [
//   { role: 'user', content: 'Hi there!' },
//   { role: 'assistant', content: 'Hello! How can I assist you today?' },
//   { role: 'user', content: 'I need help with my order.' },
//   {
//     role: 'assistant',
//     content: 'Sure, could you please provide me with your order number?',
//   },
//   { role: 'user', content: 'My order number is 123456.' },
//   {
//     role: 'assistant',
//     content: 'Thank you. What seems to be the issue with your order?',
//   },
//   { role: 'user', content: 'The item I received is damaged.' },
//   {
//     role: 'assistant',
//     content:
//       "I'm sorry to hear that. Let me check your order details and see what we can do to help.",
//   },
// ];

type Message = {
  role: "user" | "assistant";
  content: string;
}

const Chat = () => {
  const auth = useAuth();
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = async () => {
    const content = inputRef.current?.value as string;
    if (inputRef && inputRef.current) {
      inputRef.current?.value === '';
    }

    const newMessage: Message = {
      role: 'user',
      content,
    };
    setChatMessages((prev) => [...prev, newMessage]);
    const chatData = await sendChatRequest(content);
    setChatMessages([...chatData.chats])
  };

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
            marginBottom: 3,
          }}
        >
          {chatMessages.map((chat, index) => (
            <div>
              <ChatItem content={chat.content} role={chat.role} key={index} />
            </div>
          ))}
        </Box>
        <div
          style={{
            width: '100%',
            padding: 20,
            borderRadius: 8,
            backgroundColor: 'rgb(17,27,39)',
            display: 'flex',
            margin: 'auto',
          }}
        >
          {''}
          <input
            ref={inputRef}
            type='text'
            style={{
              width: '100%',
              backgroundColor: 'transparent',
              padding: 10,
              border: 'none',
              outline: 'none',
              color: 'white',
              fontSize: 20,
            }}
          />
          <IconButton
            onClick={handleSubmit}
            sx={{
              ml: 'auto',
              color: 'white',
            }}
          >
            {<IoMdSend />}
          </IconButton>
        </div>
      </Box>
    </Box>
  );
};

export default Chat;
