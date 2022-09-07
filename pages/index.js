import { IconButton, Input } from '@material-tailwind/react';
import { useEffect, useRef, useState } from 'react';

import { AiOutlineSend } from 'react-icons/ai';
import _supabaseClient from '../components/supabaseClient';

const HomePage = (e) => {
  const [chats, setChats] = useState([]);
  const [message, setMessage] = useState('');

  const chatbox = useRef(null);

  const scrollChatboxToBottom = (e) => {
    chatbox.current.scrollTo(0, chatbox.current.scrollHeight);
  };
  const fetchChats = async (e) => {
    const { data, error } = await _supabaseClient
      .from('chats_db')
      .select('*')
      .order('created_at', { ascending: true })
      .limit(100);

    if (error) {
      console.log(error);
    } else {
      setChats(data);
    }
  };

  const ChatListener = async (e) => {
    try {
      await _supabaseClient
        .from('chats_db')
        .on('*', (payload) => {
          console.log(payload);
          fetchChats();
          scrollChatboxToBottom();
        })
        .subscribe();
    } catch (error) {
      console.log(error);
    }
  };

  // load chats from supabase on page load
  useEffect((e) => {
    fetchChats();

    const chatsub = _supabaseClient
      .from('chats_db')
      .on('*', (payload) => {
        console.log(payload);
        fetchChats();
        scrollChatboxToBottom();
      })
      .subscribe();

    return () => {
      _supabaseClient.removeSubscription(chatsub);
    };
  }, []);

  useEffect(
    (e) => {
      scrollChatboxToBottom();
    },
    [chats]
  );

  const sendMessage = async (e) => {
    const { data, error } = await _supabaseClient.from('chats_db').insert({
      content: message,
      created_at: new Date(),
      sender: window.sessionStorage.getItem('user'),
    });

    if (error) {
      console.log(error);
    } else {
      setMessage('');
      scrollChatboxToBottom();
    }
  };

  return (
    <>
      <main className="py-16">
        <p className="text-4xl mb-10">Live Chat</p>
        <main
          ref={chatbox}
          className="h-screen max-h-[50vh] bg-gray-300 p-5 overflow-y-scroll flex flex-col"
        >
          {chats.map((chat) => {
            if (chat.sender === window.sessionStorage.getItem('user')) {
              return (
                <div key={chat.messageID} className="pb-5 self-end text-right">
                  <p className="text-xs mr-4">{chat.sender}</p>
                  <p className="px-4 py-2 w-fit bg-blue-500 text-white rounded-full">
                    {chat.content}
                  </p>
                </div>
              );
            } else {
              return (
                <div key={chat.messageID} className="pb-5">
                  <p className="text-xs ml-4">{chat.sender}</p>
                  <p className="px-4 py-2 w-fit bg-blue-500 text-white rounded-full">
                    {chat.content}
                  </p>
                </div>
              );
            }
          })}
        </main>
        <main className="mt-16 flex gap-4">
          <Input
            onChange={(e) => {
              setMessage(e.currentTarget.value);
            }}
            onKeyUp={(e) => {
              if (e.key === 'Enter') {
                sendMessage();
              }
            }}
            value={message}
            type={'text'}
            color="cyan"
            label="Chat here"
          />
          <IconButton
            onClick={(e) => {
              sendMessage();
            }}
          >
            <AiOutlineSend />
          </IconButton>
        </main>
      </main>
    </>
  );
};

export default HomePage;
