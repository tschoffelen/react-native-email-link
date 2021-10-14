export interface InboxOptions {
  app?: string | null;
  title?: string;
  message?: string;
  cancelLabel?: string;
  removeText?: boolean;
}

export interface ComposeOptions extends InboxOptions {
  to?: string;
  cc?: string;
  bcc?: string;
  subject?: string;
  body?: string;
}

export function openInbox({
  app,
  title,
  message,
  cancelLabel,
  removeText,
}?: InboxOptions): Promise<{ app: string; title: string } | null>;

export function openComposer({
  app,
  title,
  message,
  cancelLabel,
  removeText,
  to,
  cc,
  bcc,
  subject,
  body,
}?: ComposeOptions): Promise<{ app: string; title: string } | null>;

export class EmailException {
  message: string;
  name: string;
}
