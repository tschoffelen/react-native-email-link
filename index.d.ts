export interface InboxOptions {
  app?: string | null;
  title?: string;
  message?: string;
  cancelLabel?: string;
  removeText?: boolean;
  defaultEmailLabel?: string;
}

export interface ComposeOptions extends InboxOptions {
  to?: string;
  cc?: string;
  bcc?: string;
  subject?: string;
  body?: string;
}

export function getEmailClients(): Promise<
  {
    packageName: string;
    title: string;
    prefix: string;
    app: string;
  }[]
>;

export function openInbox({
  app,
  title,
  message,
  cancelLabel,
  removeText,
  defaultEmailLabel,
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
  defaultEmailLabel,
}?: ComposeOptions): Promise<{ app: string; title: string } | null>;

export class EmailException {
  message: string;
  name: string;
}
