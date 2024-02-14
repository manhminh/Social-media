package com.manh.socialmedia.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

import java.time.LocalDateTime;

@ControllerAdvice
public class GlobalExceptions {

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorDetails> otherExceptionHandler(Exception exception, WebRequest request) {
        ErrorDetails error = new ErrorDetails(exception.getMessage(), request.getDescription(false), LocalDateTime.now());

        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(UserException.class)
    public ResponseEntity<ErrorDetails> userExceptionHandler(UserException exception, WebRequest request) {
        ErrorDetails error = new ErrorDetails(exception.getMessage(), request.getDescription(false), LocalDateTime.now());

        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(PostException.class)
    public ResponseEntity<ErrorDetails> postExceptionHandler(PostException exception, WebRequest request) {
        ErrorDetails error = new ErrorDetails(exception.getMessage(), request.getDescription(false), LocalDateTime.now());

        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }
}
