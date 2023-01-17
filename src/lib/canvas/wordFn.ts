import type { CanvasRenderingContext2D } from 'canvas';

// 文字列の描画時の縦横のサイズを取得する
export const textSize = (ctx: CanvasRenderingContext2D, text: string): { width: number, height: number } => {
  const measure = ctx.measureText(text);
  const width: number = Math.floor(measure.width);
  const height: number = Math.floor(measure.actualBoundingBoxAscent + measure.actualBoundingBoxDescent);
  return { width, height };
};


// bufferの後に続く文字が英単語に属するかどうか
export const isEnglishWord = (char: string, buffer: string) => {
  return /^[A-Za-z]+$/.test(char) || (buffer.length > 0 && /^[_!?]+$/.test(char));
};

// 文字列を英語は単語単位、それ以外は文字単位に分割します
export const textSplit = (text: string): string[] => {
  const splitted: string[] = [];
  let word_buffer = "";

  for (let i = 0; i < text.length; ++i) {
    const char = text[i] as string;
    if (isEnglishWord(char, word_buffer)) {
      word_buffer += char;
      continue;
    }

    if (word_buffer !== "") splitted.push(word_buffer);
    word_buffer = "";
    splitted.push(char);
  }

  if (word_buffer !== "") {
    splitted.push(word_buffer);
  }

  return splitted;
};

// 最大範囲に収まらない長い単語を文字単位に分割
export const wordBreak = (ctx: CanvasRenderingContext2D, max_width: number, texts: string[]): string[] => {
  const text_processed: string[] = [];
  for (let i = 0; i < texts.length; ++i) {
    const width = textSize(ctx, texts[i] as string).width;

    if (width > max_width) {
      text_processed.concat(String(texts[i]).split(""));
      continue;
    }

    text_processed.push(texts[i] as string);
  }
  return text_processed;
};

// 1行に収まるように文字列を連結します。最大幅を超える時に新たな行を生成します。
export const createTextLines = (ctx: CanvasRenderingContext2D, max_width: number, texts: string[]): string[] => {
  const text_lines: string[] = [];
  let line_buffer = '';

  for (let i = 0; i < texts.length; ++i) {
    const next_text_width = textSize(ctx, line_buffer + texts[i]).width;
    //文字を追加してはみ出るなら、追加前を1行とする
    if (next_text_width > max_width) {
      text_lines.push(line_buffer);
      line_buffer = '';
    }
    line_buffer += texts[i];
  }

  if (line_buffer !== '') {
    text_lines.push(line_buffer);
  }
  return text_lines;
};