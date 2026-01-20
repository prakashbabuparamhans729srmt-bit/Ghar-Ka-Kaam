'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageSquare, Bot, Send, X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { chat, ChatInput } from '@/ai/flows/chatbot';
import { cn } from '@/lib/utils';
import Logo from './logo';

type Message = {
  role: 'user' | 'model';
  content: string;
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'model',
      content: 'नमस्ते! मैं काम-बॉट हूँ। मैं आपकी क्या मदद कर सकता हूँ?',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSend = async () => {
    if (input.trim() === '' || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
        const chatHistory = messages.map(m => ({role: m.role, content: m.content}));
        const response = await chat({ history: chatHistory, message: input });
        const botMessage: Message = { role: 'model', content: response };
        setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
        console.error('Chatbot error:', error);
        const errorMessage: Message = {
            role: 'model',
            content: 'माफ़ कीजिए, कुछ गड़बड़ हो गई। कृपया थोड़ी देर बाद कोशिश करें।',
        };
        setMessages((prev) => [...prev, errorMessage]);
    } finally {
        setIsLoading(false);
    }
  };

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);


  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          size="icon"
          className="rounded-full w-16 h-16 bg-primary hover:bg-primary/90 shadow-lg"
          onClick={toggleChat}
        >
          {isOpen ? <X className="h-8 w-8" /> : <MessageSquare className="h-8 w-8" />}
          <span className="sr-only">Toggle Chat</span>
        </Button>
      </div>

      {isOpen && (
        <Card className="fixed bottom-24 right-6 z-50 w-full max-w-sm shadow-2xl flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between border-b">
            <div className="flex items-center gap-3">
              <Bot className="h-6 w-6 text-primary" />
              <CardTitle className="text-lg font-headline">काम-बॉट</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-0 flex-1">
            <ScrollArea className="h-80 w-full p-4" ref={scrollAreaRef}>
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={cn(
                      'flex gap-2 text-sm',
                      message.role === 'user' ? 'justify-end' : 'justify-start'
                    )}
                  >
                    {message.role === 'model' && <Logo className="h-8 w-8 shrink-0"/>}
                    <div
                      className={cn(
                        'rounded-lg px-3 py-2 max-w-[80%]',
                        message.role === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted'
                      )}
                    >
                      {message.content}
                    </div>
                  </div>
                ))}
                {isLoading && (
                    <div className="flex justify-start gap-2 text-sm">
                        <Logo className="h-8 w-8 shrink-0"/>
                        <div className="bg-muted rounded-lg px-3 py-2 flex items-center">
                            <Loader2 className="h-4 w-4 animate-spin"/>
                        </div>
                    </div>
                )}
              </div>
            </ScrollArea>
          </CardContent>
          <CardFooter className="p-4 border-t">
            <div className="flex w-full items-center space-x-2">
              <Input
                id="message"
                placeholder="अपना सवाल पूछें..."
                className="flex-1"
                autoComplete="off"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              />
              <Button type="submit" size="icon" onClick={handleSend} disabled={isLoading}>
                <Send className="h-4 w-4" />
                <span className="sr-only">Send</span>
              </Button>
            </div>
          </CardFooter>
        </Card>
      )}
    </>
  );
}
