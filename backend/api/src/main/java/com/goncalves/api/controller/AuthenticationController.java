package com.goncalves.api.controller;

import com.goncalves.api.DTO.AutenticarDados;
import com.goncalves.api.entities.user.Users;
import com.goncalves.api.entities.user.UsersRepository;
import com.goncalves.api.infra.exception.BadRequestErrorException;
import com.goncalves.api.infra.exception.DadosTokenJWT;
import com.goncalves.api.infra.exception.RegistrationException;
import com.goncalves.api.infra.exception.ValidationError;
import com.goncalves.api.infra.security.services.TokenService;
import io.micrometer.common.util.StringUtils;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;
import java.time.LocalDateTime;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {
    @Autowired
    private UsersRepository repository;

    @Autowired
    private TokenService tokenService;

    @Autowired
    private AuthenticationManager manager;


    @PostMapping("/register")
    public ResponseEntity register(@RequestPart("profileImage") MultipartFile profileImage,
                                   @RequestPart("userData") @Valid AutenticarDados dados,
                                   UriComponentsBuilder uriComponentsBuilder) {
        try {
            validateRegistrationData(dados);

            // Criar um novo usuário com a senha criptografada
            String encryptedPassword = new BCryptPasswordEncoder().encode(dados.password());

            // Converta o MultipartFile para byte[]
            byte[] profileImageBytes = profileImage.getBytes();

            Users newUser = new Users(dados.name(), dados.username(), dados.email(),
                    encryptedPassword, profileImageBytes);
            repository.save(newUser);

            // Construir a URI para o novo usuário
            var uri = uriComponentsBuilder.path("/users/{id_User}").buildAndExpand(newUser.getId_user()).toUri();

            // Retornar uma resposta 201 Created com a URI e o corpo do novo usuário
            return ResponseEntity.created(uri).body(newUser);
        } catch (RegistrationException e) {
            return ResponseEntity.badRequest().body(new BadRequestErrorException(e.getField(), e.getMessage()));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    private void validateRegistrationData(AutenticarDados dados) throws RegistrationException {
        if (repository.findByUsername(dados.username()) != null) {
            throw new RegistrationException("username", "Já existe um usuário com este nome!");
        }
        validateField(dados.name(), "name", "Name field must have at least 3 characters!");
        validateField(dados.username(), "username", "User field must have at least 3 characters!");
        validateField(dados.email(), "email", "Empty email field!");
        validateField(dados.password(), "password", "Password field must have at least 8 characters!");
    }

    private void validateField(String value, String fieldName, String errorMessage) throws RegistrationException {
        if (StringUtils.isBlank(value) || value.length() < 3) {
            throw new RegistrationException(fieldName, errorMessage);
        }
    }

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody @Valid AutenticarDados dados) {
        try {
            var authenticationToken = new UsernamePasswordAuthenticationToken(dados.username(), dados.password());

            var authentication = manager.authenticate(authenticationToken);
            //Tratamento de erro caso as credenciais estejam erradas

            var tokenJWT = tokenService.generateToken((Users) authentication.getPrincipal());

            return ResponseEntity.ok(new DadosTokenJWT(tokenJWT));
        } catch (AuthenticationException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ValidationError("Invalid credentials"));
        }
    }
}