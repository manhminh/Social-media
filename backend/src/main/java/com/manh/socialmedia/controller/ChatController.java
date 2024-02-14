package com.manh.socialmedia.controller;

import com.manh.socialmedia.models.Chat;
import com.manh.socialmedia.models.User;
import com.manh.socialmedia.request.ChatRequest;
import com.manh.socialmedia.service.ChatService;
import com.manh.socialmedia.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ChatController {
    private final ChatService chatService;
    private final UserService userService;

    public ChatController(ChatService chatService, UserService userService) {
        this.chatService = chatService;
        this.userService = userService;
    }

    @PostMapping("/api/chats")
    public Chat createChat(@RequestHeader("Authorization") String jwt, @RequestBody ChatRequest chatRequest) throws Exception {
        System.out.println(chatRequest);
        User reqUser = userService.findUserByJwt(jwt);
        User user = userService.findUserById(chatRequest.getUserId());

        System.out.println(user);

        Chat newChat = chatService.createChat(reqUser, user);
        System.out.println(newChat);

        return newChat;
    }

    @GetMapping("/api/chats")
    public List<Chat> getUsersChat(@RequestHeader("Authorization") String jwt){
        User reqUser = userService.findUserByJwt(jwt);

        return chatService.findUserChat(reqUser.getId());
    }
}
