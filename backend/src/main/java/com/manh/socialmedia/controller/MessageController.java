package com.manh.socialmedia.controller;

import com.manh.socialmedia.models.Message;
import com.manh.socialmedia.models.User;
import com.manh.socialmedia.service.MessageService;
import com.manh.socialmedia.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class MessageController {
    private final MessageService messageService;
    private final UserService userService;

    public MessageController(MessageService messageService, UserService userService) {
        this.messageService = messageService;
        this.userService = userService;
    }

    @PostMapping("/api/messages/chat/{chatId}")
    public Message createMessage(@RequestBody Message message, @RequestHeader("Authorization") String jwt, @PathVariable("chatId") Integer chatId) throws Exception {
        User reqUser = userService.findUserByJwt(jwt);
        return messageService.createMessage(reqUser, chatId, message);
    }

    @GetMapping("/api/messages/chat/{chatId}")
    public List<Message> createMessage(@PathVariable("chatId") Integer chatId) throws Exception {
        return messageService.findChatsMessages(chatId);
    }
}
