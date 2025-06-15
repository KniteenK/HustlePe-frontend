import Cookies from "js-cookie";
import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

const SOCKET_URL = "http://localhost:2000";

export default function Messages() {
	const [clients, setClients] = useState<any[]>([]);
	const [selectedClient, setSelectedClient] = useState<any>(null);
	const [chatHistory, setChatHistory] = useState<any[]>([]);
	const [message, setMessage] = useState("");
	const socketRef = useRef<Socket | null>(null);

	// Get hustlerId from userData cookie
	let hustlerId = "";
	const userDataCookie = Cookies.get('userData');
	if (userDataCookie) {
		try {
			const userData = JSON.parse(userDataCookie);
			hustlerId = userData._id || "";
		} catch (error) {
			console.error("Failed to parse userData cookie:", error);
		}
	}


	// Fetch chat history via REST endpoint when a client is selected
	useEffect(() => {
		const fetchChatHistory = async () => {
			if (selectedClient && hustlerId) {
				const clientId = selectedClient._id || selectedClient.id?.toString();
				try {
					const res = await fetch(
						`http://localhost:2000/api/v1/chat/history?hustlerId=${hustlerId}&clientId=${clientId}`
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
	}, [selectedClient, hustlerId]);

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

	return (
		<div className="flex h-[80vh] bg-gray-100 rounded-lg shadow-md overflow-hidden">
			{/* Left panel: Clients list */}
			<div className="w-1/3 bg-white border-r border-gray-200 flex flex-col">
				<h2 className="text-xl font-bold p-4 border-b">Clients</h2>
				<div className="flex-1 overflow-y-auto">
					{clients.map((client) => (
						<div
							key={client._id || client.id}
							className={`flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-gray-100 ${
								selectedClient?._id === client._id ? "bg-gray-200" : ""
							}`}
							onClick={() => setSelectedClient(client)}
						>
							<img
								src={client.profilePic || "https://ui-avatars.com/api/?name=" + encodeURIComponent(client.name || client.username || "Client")}
								alt={client.name || client.username || "Client"}
								className="w-10 h-10 rounded-full object-cover"
							/>
							<span className="font-medium">{client.name || client.username || "Client"}</span>
						</div>
					))}
				</div>
			</div>

			{/* Right panel: Chat */}
			<div className="w-2/3 flex flex-col">
				{selectedClient ? (
					<>
						<div className="flex items-center gap-3 p-4 border-b bg-white">
							<img
								src={selectedClient.profilePic || "https://ui-avatars.com/api/?name=" + encodeURIComponent(selectedClient.name || selectedClient.username || "Client")}
								alt={selectedClient.name || selectedClient.username || "Client"}
								className="w-10 h-10 rounded-full object-cover"
							/>
							<span className="font-bold text-lg">
								{selectedClient.name || selectedClient.username || "Client"}
							</span>
						</div>
						<div className="flex-1 overflow-y-auto p-4 bg-gray-50">
							{chatHistory.length === 0 && (
								<div className="text-gray-400 text-center">No messages yet.</div>
							)}
							{chatHistory.map((chat, idx) => (
								<div
									key={chat._id || idx}
									className={`flex mb-2 ${
										chat.senderType === "Hustler" ? "justify-end" : "justify-start"
									}`}
								>
									<div
										className={`max-w-xs px-4 py-2 rounded-lg ${
											chat.senderType === "Hustler"
												? "bg-blue-500 text-white"
												: "bg-gray-200 text-gray-800"
										}`}
									>
										<span>{chat.message}</span>
										<div className="text-xs text-gray-400 mt-1 text-right">
											{chat.timestamp
												? new Date(chat.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
												: ""}
										</div>
									</div>
								</div>
							))}
						</div>
						<div className="p-4 bg-white border-t flex gap-2">
							<input
								type="text"
								className="flex-1 border rounded px-3 py-2 outline-none"
								placeholder="Type a message..."
								value={message}
								onChange={(e) => setMessage(e.target.value)}
								onKeyDown={(e) => {
									if (e.key === "Enter") handleSend();
								}}
							/>
							<button
								className="bg-blue-500 text-white px-4 py-2 rounded"
								onClick={handleSend}
								disabled={!message.trim()}
							>
								Send
							</button>
						</div>
					</>
				) : (
					<div className="flex-1 flex items-center justify-center text-gray-400 text-lg">
						Select a client to view the chat
					</div>
				)}
			</div>
		</div>
	);
}

