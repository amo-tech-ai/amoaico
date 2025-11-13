// supabase/functions/_shared/logger.ts

/**
 * A simple logger for Edge Functions.
 * In a real production environment, this would integrate with a logging service like Logflare.
 * @param {object} event - The event details to log.
 * @param {string} event.userId - The ID of the user performing the action.
 * @param {string} event.functionName - The name of the Edge Function being executed.
 * @param {string} event.status - The outcome status (e.g., 'success', 'error').
 * @param {number} event.durationMs - The duration of the function execution in milliseconds.
 * @param {any} [event.metadata] - Optional additional metadata.
 */
export const logEvent = ({ userId, functionName, status, durationMs, metadata }: {
    userId: string;
    functionName: string;
    status: 'success' | 'error';
    durationMs: number;
    metadata?: any;
}) => {
    const log = {
        timestamp: new Date().toISOString(),
        userId,
        functionName,
        status,
        durationMs,
        ...(metadata && { metadata }),
    };

    // In Supabase, console.log/error will be captured and can be viewed in the logs.
    if (status === 'error') {
        console.error(JSON.stringify(log, null, 2));
    } else {
        console.log(JSON.stringify(log, null, 2));
    }
};
