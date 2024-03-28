package com.goncalves.api.infra.exception;

public class RegistrationException extends Exception {
    private final String field;

    public RegistrationException(String field, String message) {
        super(message);
        this.field = field;
    }

    public String getField() {
        return field;
    }
}