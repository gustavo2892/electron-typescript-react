export const transformHtmlToText = (html: string) => {
  return html.replace(/&nbsp;/g, '')
  .replace(/<li>/g, '\n- ')
  .replace(/<\/([a-z0-9]+)><([a-z0-9]+)>/g, '\n')
  .replace(/<[^>]+>/g, '');
};