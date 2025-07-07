import { Avatar, Badge, Button, Card, CardBody, CardHeader, Input } from "@nextui-org/react";
import Cookies from "js-cookie";
import { MessageCircle, MoreVertical, Phone, Search, Send, Users, Video } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

const SOCKET_URL = "http://localhost:2000";

export default function Messages() {
	const [clients, setClients] = useState<any[]>([]);
	const [selectedClient, setSelectedClient] = useState<any>(null);
	const [chatHistory, setChatHistory] = useState<any[]>([]);
	const [message, setMessage] = useState("");
	const [searchTerm, setSearchTerm] = useState("");
	const [isTyping, setIsTyping] = useState(false);
	const socketRef = useRef<Socket | null>(null);
	const messagesEndRef = useRef<HTMLDivElement>(null);

	// Get hustlerId and accessToken from userData and accessToken cookies
	let hustlerId = "";
	let accessToken = "";
	const userDataCookie = Cookies.get('userData');
	const accessTokenCookie = Cookies.get('accessToken');
	if (userDataCookie) {
		try {
			const userData = JSON.parse(userDataCookie);
			hustlerId = userData._id || "";
		} catch (error) {
			console.error("Failed to parse userData cookie:", error);
		}
	}
	if (accessTokenCookie) {
		accessToken = accessTokenCookie.replace(/^"|"$/g, "");
	}

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	};

	useEffect(() => {
		scrollToBottom();
	}, [chatHistory]);

	// Fetch clients dynamically (with access token if needed)
	useEffect(() => {
		const fetchClients = async () => {
			try {
				const res = await fetch("http://localhost:2000/api/v1/client/all", {
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${accessToken}`,
					},
				});
				const data = await res.json();
				setClients(Array.isArray(data.data) ? data.data : []);
			} catch (err) {
				console.error("Failed to fetch clients", err);
			}
		};
		fetchClients();
	}, [accessToken]);

	// Fetch chat history via REST endpoint when a client is selected
	useEffect(() => {
		const fetchChatHistory = async () => {
			if (selectedClient && hustlerId) {
				const clientId = selectedClient._id || selectedClient.id?.toString();
				try {
					const res = await fetch(
						`http://localhost:2000/api/v1/chat/history?hustlerId=${hustlerId}&clientId=${clientId}`,
						{
							headers: {
								'Content-Type': 'application/json',
								'Authorization': `Bearer ${accessToken}`,
							},
						}
					);
					const data = await res.json();
					setChatHistory(Array.isArray(data.history) ? data.history : []);
				} catch (err) {
					console.error("Failed to fetch chat history", err);
					setChatHistory([]);
				}
			} else {
				setChatHistory([]);
			}
		};
		fetchChatHistory();
	}, [selectedClient, hustlerId, accessToken]);

	useEffect(() => {
		// Only connect socket if the backend server is running and socket.io is enabled
		const socket = io(SOCKET_URL, {
			transports: ["websocket", "polling"], // fallback to polling if websocket fails
			reconnectionAttempts: 3, // try to reconnect a few times
			reconnectionDelay: 1000,
		});
		socketRef.current = socket;

		socket.on("connect", () => {
			console.log("Socket connected:", socket.id);
		});

		socket.on("connect_error", (err) => {
			console.error("Socket connection error:", err.message);
		});

		socket.on("roomJoined", ({ roomId }) => {
			console.log("Joined room:", roomId);
		});

		socket.on("receiveMessage", (msg) => {
			setChatHistory((prev) => [...prev, msg]);
		});

		return () => {
			if (socket.connected) {
				socket.disconnect();
			}
		};
	}, []);

	useEffect(() => {
		if (selectedClient && socketRef.current && hustlerId) {
			const clientId = selectedClient._id || selectedClient.id?.toString();
			socketRef.current.emit("joinChat", { hustlerId, clientId });
		}
	}, [selectedClient, hustlerId]);

	const handleSend = () => {
		if (!message.trim() || !selectedClient || !socketRef.current || !hustlerId) return;
		const clientId = selectedClient._id || selectedClient.id?.toString();
		socketRef.current.emit("sendMessage", {
			hustlerId,
			clientId,
			senderId: hustlerId,
			senderType: "Hustler",
			message,
		});
		setMessage("");
	};

	const filteredClients = clients.filter(client =>
		(client.name || client.username || "").toLowerCase().includes(searchTerm.toLowerCase())
	);

	const formatTime = (timestamp: string) => {
		const date = new Date(timestamp);
		const now = new Date();
		const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
		
		if (diffInHours < 24) {
			return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
		} else if (diffInHours < 168) { // 7 days
			return date.toLocaleDateString([], { weekday: 'short' });
		} else {
			return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
		}
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-green-50 to-white p-6">
			<div className="max-w-7xl mx-auto">
				{/* Header */}
				<div className="mb-6">
					<h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent mb-2">
						Messages
					</h1>
					<p className="text-gray-600 text-lg">
						Connect and communicate with your clients
					</p>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
					{/* Clients Sidebar */}
					<Card className="lg:col-span-1 shadow-lg border border-green-200 overflow-hidden">
						<CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white p-4">
							<div className="flex items-center gap-2 w-full">
								<Users className="h-5 w-5" />
								<span className="font-bold">Clients</span>
								<Badge content={clients.length} color="success" variant="flat" className="ml-auto">
									<div></div>
								</Badge>
							</div>
						</CardHeader>
						<CardBody className="p-0 flex flex-col h-full">
							{/* Search */}
							<div className="p-4 border-b border-green-100">
								<Input
									placeholder="Search clients..."
									startContent={<Search className="h-4 w-4 text-gray-400" />}
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
									classNames={{
										inputWrapper: "border-green-200 hover:border-green-300 focus-within:border-green-500",
									}}
								/>
							</div>
							
							{/* Clients List */}
							<div className="flex-1 overflow-y-auto">
								{filteredClients.length === 0 ? (
									<div className="p-4 text-center text-gray-500">
										{searchTerm ? "No clients found" : "No clients available"}
									</div>
								) : (
									filteredClients.map((client) => (
										<div
											key={client._id || client.id}
											className={`flex items-center gap-3 p-4 cursor-pointer hover:bg-green-50 transition-colors border-b border-gray-100 ${
												selectedClient?._id === client._id ? "bg-green-100 border-l-4 border-l-green-600" : ""
											}`}
											onClick={() => setSelectedClient(client)}
										>
											<div className="relative">
												<Avatar
													src={client.profilePic || `https://ui-avatars.com/api/?name=${encodeURIComponent(client.name || client.username || "Client")}&background=16a34a&color=ffffff`}
													alt={client.name || client.username || "Client"}
													className="w-12 h-12"
												/>
												<div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
											</div>
											<div className="flex-1 min-w-0">
												<h3 className="font-semibold text-gray-900 truncate">
													{client.name || client.username || "Client"}
												</h3>
												<p className="text-sm text-gray-500 truncate">
													{client.email || "No email"}
												</p>
											</div>
										</div>
									))
								)}
							</div>
						</CardBody>
					</Card>

					{/* Chat Area */}
					<Card className="lg:col-span-2 shadow-lg border border-green-200 overflow-hidden">
						{selectedClient ? (
							<>
								{/* Chat Header */}
								<CardHeader className="bg-white border-b border-green-100 p-4">
									<div className="flex items-center justify-between w-full">
										<div className="flex items-center gap-3">
											<Avatar
												src={selectedClient.profilePic || `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedClient.name || selectedClient.username || "Client")}&background=16a34a&color=ffffff`}
												alt={selectedClient.name || selectedClient.username || "Client"}
												className="w-12 h-12"
											/>
											<div>
												<h3 className="font-bold text-lg text-gray-900">
													{selectedClient.name || selectedClient.username || "Client"}
												</h3>
												<p className="text-sm text-green-600">Online</p>
											</div>
										</div>
										<div className="flex items-center gap-2">
											<Button
												isIconOnly
												variant="light"
												className="text-green-600 hover:bg-green-50"
											>
												<Phone className="h-5 w-5" />
											</Button>
											<Button
												isIconOnly
												variant="light"
												className="text-green-600 hover:bg-green-50"
											>
												<Video className="h-5 w-5" />
											</Button>
											<Button
												isIconOnly
												variant="light"
												className="text-green-600 hover:bg-green-50"
											>
												<MoreVertical className="h-5 w-5" />
											</Button>
										</div>
									</div>
								</CardHeader>

								{/* Messages */}
								<CardBody className="p-0 flex flex-col h-full">
									<div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-4">
										{chatHistory.length === 0 ? (
											<div className="flex flex-col items-center justify-center h-full text-gray-400">
												<MessageCircle className="h-16 w-16 mb-4" />
												<p className="text-lg font-medium">No messages yet</p>
												<p className="text-sm">Start a conversation with {selectedClient.name || selectedClient.username}</p>
											</div>
										) : (
											chatHistory.map((chat, idx) => (
												<div
													key={chat._id || idx}
													className={`flex ${
														chat.senderType === "Hustler" ? "justify-end" : "justify-start"
													}`}
												>
													<div
														className={`max-w-xs lg:max-w-md xl:max-w-lg px-4 py-3 rounded-2xl shadow-sm ${
															chat.senderType === "Hustler"
																? "bg-gradient-to-r from-green-600 to-green-700 text-white rounded-br-md"
																: "bg-white text-gray-800 border border-gray-200 rounded-bl-md"
														}`}
													>
														<p className="break-words">{chat.message}</p>
														<div className={`text-xs mt-2 ${
															chat.senderType === "Hustler" ? "text-green-100" : "text-gray-400"
														}`}>
															{chat.timestamp && formatTime(chat.timestamp)}
														</div>
													</div>
												</div>
											))
										)}
										<div ref={messagesEndRef} />
									</div>

									{/* Message Input */}
									<div className="p-4 bg-white border-t border-green-100">
										<div className="flex gap-3 items-end">
											<Input
												placeholder="Type your message..."
												value={message}
												onChange={(e) => setMessage(e.target.value)}
												onKeyDown={(e) => {
													if (e.key === "Enter" && !e.shiftKey) {
														e.preventDefault();
														handleSend();
													}
												}}
												classNames={{
													inputWrapper: "border-green-200 hover:border-green-300 focus-within:border-green-500 bg-gray-50",
												}}
												className="flex-1"
											/>
											<Button
												isIconOnly
												className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white"
												onClick={handleSend}
												disabled={!message.trim()}
											>
												<Send className="h-5 w-5" />
											</Button>
										</div>
									</div>
								</CardBody>
							</>
						) : (
							<CardBody className="flex items-center justify-center h-full text-center">
								<MessageCircle className="h-20 w-20 text-gray-300 mb-4" />
								<h3 className="text-xl font-semibold text-gray-700 mb-2">
									Select a Client
								</h3>
								<p className="text-gray-500">
									Choose a client from the sidebar to start messaging
								</p>
							</CardBody>
						)}
					</Card>
				</div>
			</div>
		</div>
	);
}

