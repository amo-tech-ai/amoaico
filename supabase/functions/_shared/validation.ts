// supabase/functions/_shared/validation.ts

export class HttpError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

/**
 * Safely parses the JSON body of a request.
 * Throws an HttpError with status 400 if the body is not valid JSON.
 * @param request - The incoming Deno.serve request object.
 * @returns A promise that resolves to the parsed JSON body.
 */
export const parseJSON = async (request: Request) => {
    try {
        return await request.json();
    } catch (e) {
        throw new HttpError('Invalid JSON body', 400);
    }
};

/**
 * Checks if a request body contains all required fields.
 * Throws an HttpError with status 400 if any fields are missing.
 * @param {object} options - The options object.
 * @param {any} options.body - The parsed request body.
 * @param {string[]} options.fields - An array of required field names.
 */
export const requireFields = ({ body, fields }: { body: any, fields: string[] }) => {
    const missingFields = fields.filter(field => !(field in body));
    if (missingFields.length > 0) {
        throw new HttpError(`Missing required fields: ${missingFields.join(', ')}`, 400);
    }
};
