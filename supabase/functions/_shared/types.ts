// supabase/functions/_shared/types.ts

// These are placeholder types for Edge Function request/response bodies.
// They will be expanded as each function is implemented.

export interface GenerateDeckRequest {
  mode: 'text' | 'url';
  content: string | string[];
}

export interface GenerateDeckResponse {
  deckId: string;
  slides: any[]; // Define a proper Slide type later
}

export interface ModifySlideContentRequest {
  slideId: string;
  newPrompt: string;
}

export interface AnalyzeSlideResponse {
  clarity: {
    rating: 'Good' | 'Fair' | 'Poor';
    suggestion: string;
  };
  impact: {
    rating: 'High' | 'Medium' | 'Low';
    suggestion: string;
  };
  tone: {
    current: string;
    suggestion: string;
  };
}

export interface SuggestionResponse {
  titles: string[];
  content: string[];
  visuals: string[];
}
