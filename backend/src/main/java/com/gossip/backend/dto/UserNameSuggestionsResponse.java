package com.gossip.backend.dto;

import java.util.List;

public record UserNameSuggestionsResponse(
        boolean exists,
        List<String> suggestions
) {
}