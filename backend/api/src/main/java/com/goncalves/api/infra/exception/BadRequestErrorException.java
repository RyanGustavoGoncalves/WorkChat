package com.goncalves.api.infra.exception;

public record BadRequestErrorException(String field, String message) {
}
