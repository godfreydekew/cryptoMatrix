import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import axios from 'axios';
import './style.scss';
import { BASE_URL } from '../../api/api';

const ChatbotAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{ text: "Hello! How can I assist you today?", sender: 'bot' }]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    setMessages(prev => [...prev, { text: input, sender: 'user' }]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await axios.post(`${BASE_URL}/chat/gpt`, { message: input });
      setMessages(prev => [...prev, { text: response.data.message, sender: 'bot' }]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => [...prev, { text: "Sorry, I'm having trouble responding right now.", sender: 'bot' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen && (
        <button
          onClick={toggleChat}
          className="bg-yellow-500 hover:bg-yellow-600 text-white rounded-full p-3 shadow-lg transition-transform transform hover:scale-105"
        >
          <MessageCircle size={24} />
        </button>
      )}
      {isOpen && (
        <div className="bg-white rounded-lg shadow-2xl w-80 h-96 flex flex-col transition-all duration-300 ease-in-out transform scale-100">
          <div className="bg-yellow-500 text-white p-4 rounded-t-lg flex justify-between items-center">
            <h3 className="font-bold">cryptoMatrix AI Assistant</h3>
            <button onClick={toggleChat} className="text-white hover:text-gray-200">
              <X size={20} />
            </button>
          </div>
          <div className="flex-grow overflow-y-auto p-4">
            {messages.map((message, index) => (
              <div key={index} className={`mb-2 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}>
                <span className={`inline-block p-2 rounded-lg ${message.sender === 'user' ? 'bg-yellow-100' : 'bg-gray-200'}`}>
                  {message.text}
                </span>
              </div>
            ))}
            {isLoading && (
              <div className="text-center text-gray-500">
                <p>Thinking...</p>
              </div>
            )}
          </div>
          <form onSubmit={handleSubmit} className="p-4 border-t">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="w-full p-2 border rounded-lg focus:outline-none focus:border-yellow-500"
              disabled={isLoading}
            />
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatbotAssistant;
