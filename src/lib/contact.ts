export type ContactPayload = {
  name: string;
  email: string;
  message: string;
};

export type ContactSuccess = { ok: true };
export type ContactError = { ok: false; error: string };
export type ContactResponse = ContactSuccess | ContactError;
