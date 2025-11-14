# 🚀 Sun AI: Advanced Features & Backend Implementation Prompts

**Version:** 1.1 - Enriched with Advanced Gemini Features  
**Status:** Published  
**Author:** Senior Full-Stack Architect & AI Systems Designer  
**Goal:** To provide a complete engineering playbook with step-by-step prompts for implementing advanced features, complex backend functions, and high-value AI use cases for the Sun AI platform.

---
*... (Sections A and B remain largely the same) ...*
---

## **Section C — Advanced AI Use Cases**

### **Prompt 1: Implement a Full AI Pitch Deck Generator (10-15 Slides)**

#### **Required Gemini Model**
-   `gemini-2.5-pro` (for its large context window and superior reasoning for structured output).

#### **🔦 Gemini Tool Spotlight: `thinkingConfig` & `gemini-2.5-flash-image`**
-   To handle complex user inputs (like a full business plan), enable **Gemini Thinking** by adding `thinkingConfig: { thinkingBudget: 8192 }` to your API call. This allows the model more capacity for deep analysis before generating the slides.
-   The `image_prompt` field in your schema should be a descriptive sentence. A separate function, `generate-slide-image`, will call `gemini-2.5-flash-image` with this prompt to create the visual asset.

#### **AI Prompt Schema (Function Calling)**
1.  **Define the `slide` Schema:** `slide_number`, `title`, `content` (bullet points), `layout_suggestion` ('text-only', 'text-with-image'), and `image_prompt` (a descriptive sentence for an image).
2.  **Define the `deck` Schema:** A top-level `generatePitchDeck` function with a `slides` property (an `ARRAY` of `slide` objects).
3.  **Prompt:**
    > "You are a world-class venture capitalist. Based on the user's startup info: `[user_input]`, generate a complete 12-slide pitch deck by calling the `generatePitchDeck` function. The slides must follow the standard order: Problem, Solution, Market Size, etc. For each slide, provide a concise title, 3-5 content bullet points, a layout suggestion, and a descriptive prompt for an AI image generator to create a relevant visual."

---

### **Prompt 9: AI Image Generation + Asset Pipeline**

#### **Required Gemini Model**
-   `gemini-2.5-flash-image`

#### **🔦 Gemini Tool Spotlight: Image Generation & Supabase Storage**
This feature demonstrates a complete "asset pipeline" from generation to persistence.

#### **API Logic (Edge Function `generate-and-store-image`)**
1.  Authenticate the user and get the text `prompt` from the request.
2.  Call the `gemini-2.5-flash-image` model to generate the image.
3.  Extract the `base64` image data from the `inlineData` part of the Gemini response.
4.  Decode the base64 string into a binary buffer.
5.  Use the Supabase client to `upload` the binary buffer to a designated Supabase Storage bucket (e.g., `pitch-deck-assets/{deck_id}/{slide_id}.png`).
6.  Return the public URL of the newly stored image to the client.

#### **Production-Ready Checklist**
-   [ ] The Storage bucket has RLS policies ensuring users can only write to folders corresponding to decks they own.
-   [ ] The function handles potential errors from both the Gemini API and the Supabase Storage upload.

---

### **New Prompt C11: "Chat With Your Docs" Using the Files API**

#### **Required Gemini Model**
-   `gemini-2.5-pro` (for conversational chat).

#### **🔦 Gemini Tool Spotlight: Document Understanding via the Files API**
This powerful feature allows users to have a conversation with their own documents (e.g., business plans, financial statements).

#### **Multi-Step Workflow**
1.  **File Upload (Frontend):**
    -   The user uploads a file (e.g., a PDF) from the browser.
    -   The file is uploaded directly to a secure Supabase Storage bucket (e.g., `user-uploads/{user_id}/`).
2.  **File Processing (Backend - Edge Function `process-document`):**
    -   A database trigger or manual action invokes this function.
    -   The function downloads the file from Supabase Storage.
    -   It then uses the **Gemini Files API** (`ai.files.upload()`) to upload the file to Google's backend, receiving a `file_uri`.
    -   Store this `file_uri` in your database, linked to the user and the original document.
3.  **Chat Interface (Frontend & Backend - Edge Function `chat-with-doc`):**
    -   The user types a question in a chat interface.
    -   The frontend calls the `chat-with-doc` function with the user's `question` and the `file_uri`.
    -   The Edge Function calls the Gemini chat model, including the file in the prompt:
        ```javascript
        const contents = {
          parts: [
            { fileData: { mimeType, fileUri } },
            { text: userQuestion }
          ]
        };
        const response = await ai.models.generateContent({ model, contents });
        ```
    -   The function streams the text response back to the client for a real-time chat experience.

---

### **New Prompt C12: Data Analysis with Code Execution**

#### **Required Gemini Model**
-   `gemini-2.5-pro` (with code execution tool enabled).

#### **🔦 Gemini Tool Spotlight: Code Execution**
This allows the AI to run sandboxed Python code to perform calculations, analyze data, and generate insights.

#### **API Logic (Edge Function `analyze-data`)**
1.  Accept a POST request with a JSON array of data (e.g., `{ "data": [{"month": "Jan", "sales": 100}, ...] }`).
2.  Construct a prompt for Gemini:
    > "You are a data analyst. The following is a JSON array of sales data. Use the code execution tool to analyze this data and calculate the total sales, the average monthly sales, and identify the month with the highest sales. Return the result as a structured JSON object using the `analyzeSalesData` function."
3.  Define the `analyzeSalesData` **Function Calling** schema with fields for `totalSales`, `averageSales`, and `bestMonth`.
4.  Make the API call to `gemini-2.5-pro`, enabling the `codeExecution` tool.
5.  Return the structured JSON from the function call to the client, which can then use it to render a chart or a summary table.

---

## **Section F — Future Vision: Real-Time AI Interactions (New Section)**

### **New Prompt F1: Implement a Live AI Pitch Coach**

#### **Required Gemini Model**
-   `gemini-2.5-flash-native-audio-preview-09-2025`

#### **🔦 Gemini Tool Spotlight: Live API**
The Live API enables real-time, low-latency voice conversations. This prompt outlines a "pitch coach" feature where a user can practice their startup pitch and get instant feedback.

#### **Multi-Step Workflow**
1.  **Frontend Setup:**
    -   Use `navigator.mediaDevices.getUserMedia` to get access to the user's microphone.
    -   Initialize an `AudioContext` for processing audio.
2.  **Connect to Live API:**
    -   Call `ai.live.connect()` to establish a persistent websocket connection to the Gemini Live API.
    -   Provide callbacks for `onopen`, `onmessage`, `onerror`, and `onclose`.
    -   In the `config`, set `responseModalities: [Modality.AUDIO]` and enable `inputAudioTranscription: {}` and `outputAudioTranscription: {}`.
3.  **Stream User Audio (Client-Side):**
    -   In the `onopen` callback, use a `ScriptProcessorNode` to capture raw audio chunks from the microphone.
    -   Encode the audio and send it to the server via `session.sendRealtimeInput()`.
4.  **Process Server Messages (Client-Side):**
    -   In the `onmessage` callback:
        -   Handle incoming `inputTranscription` and `outputTranscription` chunks to display a live transcript on the screen.
        -   Handle incoming audio chunks (`modelTurn.parts[0].inlineData.data`), decode them, and play them back through the user's speakers for a conversational response.
5.  **Tool Use with Live API:**
    -   In the `config`, provide a `FunctionDeclaration` for a tool like `highlight_slide(slide_number: int)`.
    -   Prompt: "You are a pitch coach. As I practice my pitch, listen for keywords and call the `highlight_slide` function to switch to the relevant slide in my presentation."
    -   In `onmessage`, handle `message.toolCall` events to update the UI (e.g., actually change the displayed slide).

#### **Success Criteria**
-   A user can have a spoken, back-and-forth conversation with the AI pitch coach.
-   A live transcript of the conversation is displayed.
-   The AI can call client-side functions in real-time based on the conversation.
