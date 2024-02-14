package com.manh.socialmedia.service.implementation;

import com.manh.socialmedia.models.Chat;
import com.manh.socialmedia.models.User;
import com.manh.socialmedia.repository.ChatRepository;
import com.manh.socialmedia.service.ChatService;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ChatServiceImplementation implements ChatService {
    private final ChatRepository chatRepository;

    public ChatServiceImplementation(ChatRepository chatRepository) {
        this.chatRepository = chatRepository;
    }

    @Override
    public Chat createChat(User reqUser, User user) {
        Chat existedChat = chatRepository.findChatByUsersId(user.getId(), reqUser.getId());
        if(existedChat != null) {
            return existedChat;
        }

        Chat newChat = new Chat();
        newChat.getUsers().add(reqUser);
        newChat.getUsers().add(user);
        newChat.setTimestamp(LocalDateTime.now());

        return chatRepository.save(newChat);
    }

    @Override
    public Chat findChatById(Integer chatId) throws Exception {
        Optional<Chat> chat = chatRepository.findById(chatId);
        if(chat.isEmpty()) {
            throw new Exception("Chat not exist with id: " + chatId);
        }
        return chat.get();
    }

    @Override
    public List<Chat> findUserChat(Integer userId) {
        return chatRepository.findByUsersId(userId);
    }
}
