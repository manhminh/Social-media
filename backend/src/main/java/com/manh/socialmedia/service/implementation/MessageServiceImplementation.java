package com.manh.socialmedia.service.implementation;

import com.manh.socialmedia.models.Chat;
import com.manh.socialmedia.models.Message;
import com.manh.socialmedia.models.User;
import com.manh.socialmedia.repository.ChatRepository;
import com.manh.socialmedia.repository.MessageRepository;
import com.manh.socialmedia.service.ChatService;
import com.manh.socialmedia.service.MessageService;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class MessageServiceImplementation implements MessageService {
    private final MessageRepository messageRepository;
    private final ChatService chatService;
    private final ChatRepository  chatRepository;

    public MessageServiceImplementation(MessageRepository messageRepository, ChatService chatService, ChatRepository chatRepository) {
        this.messageRepository = messageRepository;
        this.chatService = chatService;
        this.chatRepository = chatRepository;
    }

    @Override
    public Message createMessage(User user, Integer chatId, Message message) throws Exception {
        Chat chat = chatService.findChatById(chatId);

        Message newMessage = new Message();
        newMessage.setContent(message.getContent());
        newMessage.setImage(message.getImage());
        newMessage.setChat(chat);
        newMessage.setUser(user);
        newMessage.setTimestamp(LocalDateTime.now());

        chat.getMessages().add(newMessage);
        chatRepository.save(chat);

        return messageRepository.save(newMessage);
    }

    @Override
    public List<Message> findChatsMessages(Integer chatId) throws Exception {
        Chat chat = chatService.findChatById(chatId);

        return messageRepository.findByChatId(chat.getId());
    }
}
