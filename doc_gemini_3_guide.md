- **Text/Chat:**Validation is not strictly enforced, but omitting signatures will degrade the model's reasoning and answer quality.

**Real-World Application:**
Thought signatures are critical for **autonomous travel agents**. If a user says "Find flights to NYC, then book a hotel near the airport," the model performs step 1 (Find Flights). The `thoughtSignature` contains the reasoning "User wants a hotel near JFK/LGA depending on the flight chosen." Passing this signature back ensures the model remembers *why* it is booking the hotel in step 2.

| **Success:** If you use the[official SDKs (Python, Node, Java)](https://ai.google.dev/gemini-api/docs/function-calling?example=meeting#thinking)and standard chat history, Thought Signatures are handled automatically. You do not need to manually manage these fields.