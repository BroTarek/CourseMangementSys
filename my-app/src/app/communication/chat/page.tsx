'use client';

import { useState, useEffect, useRef } from 'react';
import { socket } from '@/lib/socket';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Send, MoreVertical, Phone, Video, Hash } from 'lucide-react';
import { cn } from '@/lib/utils';
import axios from 'axios';

type Message = {
    _id?: string;
    content: string;
    sender: string;
    group: string;
    createdAt: string;
};

const GROUPS = ['General', 'Project Alpha', 'Homework Help', 'Random'];

export default function ChatPage() {
    const [currentGroup, setCurrentGroup] = useState('General');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [user, setUser] = useState('Student'); // Mock user for now
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Join the default group
        socket.emit('join_room', currentGroup);

        // Load initial messages
        fetchMessages(currentGroup);

        // Listen for incoming messages
        socket.on('receive_message', (newItem: Message) => {
            setMessages((prev) => [...prev, newItem]);
        });

        return () => {
            socket.off('receive_message');
        };
    }, [currentGroup]);

    // Auto-scroll to bottom
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    const fetchMessages = async (group: string) => {
        try {
            // Need to make sure backend URL is correct or proxied
            const res = await axios.get(`http://localhost:5000/api/communication/messages/${group}`);
            if (res.data.success) {
                setMessages(res.data.data);
            }
        } catch (error) {
            console.error("Failed to load history", error);
        }
    };

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!message.trim()) return;

        const messageData: Message = {
            group: currentGroup,
            sender: user,
            content: message,
            createdAt: new Date().toISOString(),
        };

        // Optimistic UI update
        setMessages((list) => [...list, messageData]);

        // Send to server
        socket.emit('send_message', messageData);

        // Clear input
        setMessage('');
    };

    return (
        <div className="flex h-[calc(100vh-4rem)] bg-background">
            {/* Sidebar - Groups */}
            <div className="w-80 border-r flex flex-col bg-muted/30">
                <div className="p-4 border-b">
                    <h2 className="font-semibold text-lg flex items-center gap-2">
                        <Hash className="w-5 h-5" /> Messaging
                    </h2>
                </div>
                <ScrollArea className="flex-1">
                    <div className="p-2 space-y-1">
                        {GROUPS.map((group) => (
                            <button
                                key={group}
                                onClick={() => {
                                    setCurrentGroup(group);
                                    setMessages([]); // Clear before load
                                }}
                                className={cn(
                                    "w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors flex items-center gap-3",
                                    currentGroup === group
                                        ? "bg-primary text-primary-foreground"
                                        : "hover:bg-accent hover:text-accent-foreground"
                                )}
                            >
                                <div className={cn(
                                    "w-2 h-2 rounded-full",
                                    currentGroup === group ? "bg-white" : "bg-gray-400"
                                )} />
                                {group}
                            </button>
                        ))}
                    </div>
                </ScrollArea>
                <div className="p-4 border-t bg-background/50 backdrop-blur">
                    <div className="flex items-center gap-3">
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>ME</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 overflow-hidden">
                            <p className="text-sm font-medium truncate">Logged in as {user}</p>
                            <p className="text-xs text-muted-foreground flex items-center gap-1">
                                <span className="w-2 h-2 bg-green-500 rounded-full" /> Online
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col">
                {/* Chat Header */}
                <div className="h-16 border-b flex items-center justify-between px-6 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                            <Hash className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="font-semibold">{currentGroup}</h3>
                            <p className="text-xs text-muted-foreground">{GROUPS.includes(currentGroup) ? 'Group Channel' : 'Direct Message'}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <Button variant="ghost" size="icon"><Phone className="w-5 h-5" /></Button>
                        <Button variant="ghost" size="icon"><Video className="w-5 h-5" /></Button>
                        <Button variant="ghost" size="icon"><MoreVertical className="w-5 h-5" /></Button>
                    </div>
                </div>

                {/* Messages */}
                <ScrollArea className="flex-1 p-6">
                    <div className="space-y-4 max-w-4xl mx-auto">
                        {messages.map((msg, index) => {
                            const isMe = msg.sender === user;
                            return (
                                <div
                                    key={index}
                                    className={cn(
                                        "flex gap-3",
                                        isMe ? "flex-row-reverse" : "flex-row"
                                    )}
                                >
                                    <Avatar className="w-8 h-8">
                                        <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${msg.sender}`} />
                                        <AvatarFallback>{msg.sender[0]}</AvatarFallback>
                                    </Avatar>
                                    <div className={cn(
                                        "flex flex-col gap-1 max-w-[70%]",
                                        isMe ? "items-end" : "items-start"
                                    )}>
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs font-medium text-muted-foreground">{msg.sender}</span>
                                            <span className="text-[10px] text-muted-foreground opacity-70">
                                                {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                        </div>
                                        <div
                                            className={cn(
                                                "rounded-2xl px-4 py-2 text-sm shadow-sm",
                                                isMe
                                                    ? "bg-primary text-primary-foreground rounded-tr-none"
                                                    : "bg-muted rounded-tl-none"
                                            )}
                                        >
                                            {msg.content}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                        <div ref={scrollRef} />
                    </div>
                </ScrollArea>

                {/* Input Area */}
                <div className="p-4 border-t bg-background">
                    <form onSubmit={handleSendMessage} className="max-w-4xl mx-auto flex items-end gap-3">
                        <div className="flex-1">
                            <Input
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder={`Message #${currentGroup}...`}
                                className="min-h-[50px] py-4 bg-muted/50 border-0 focus-visible:ring-1 focus-visible:ring-primary focus-visible:bg-background transition-all"
                            />
                        </div>
                        <Button type="submit" size="icon" className="h-[50px] w-[50px] rounded-xl shrink-0">
                            <Send className="w-5 h-5" />
                        </Button>
                    </form>
                    <p className="text-xs text-center text-muted-foreground mt-2 opacity-50">
                        Press Enter to send. Shift + Enter for new line.
                    </p>
                </div>
            </div>
        </div>
    );
}
