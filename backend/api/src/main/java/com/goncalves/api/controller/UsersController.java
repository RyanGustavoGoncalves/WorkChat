package com.goncalves.api.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping
public class UsersController {

    @GetMapping("/HelloWorld")
    public ResponseEntity hello(String hello){
            hello = "<h1>Hello World</h1>";
        return ResponseEntity.ok(hello);
    }

}
