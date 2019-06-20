export function openInbox({
  app,
  title,
  message,
  cancelLabel,
  removeText,
}: {
  app?: string | null;
  title?: string;
  message?: string;
  cancelLabel?: string;
  removeText?: boolean;
}): void;
