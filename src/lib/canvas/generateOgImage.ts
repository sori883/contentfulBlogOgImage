import fs from 'fs';
import path from 'path';

import { createCanvas, loadImage, registerFont } from 'canvas';

import { getH } from './lineFn';
import {
  createTextLines,
  textSplit,
  wordBreak
} from './wordFn';


const size = { width: 1200, height: 630 };
const current = process.cwd();

export const generateOgImage = async (title: string): Promise<Buffer> => {
  // font を登録
  const font = path.resolve(current, 'src/canvas/NotoSansJP-Bold.otf');
  registerFont(font, { family: 'NotoSansJP', });

  // canvas を作成
  const { width, height } = size;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // 元になる画像を読み込む
  const src = path.resolve(current, 'src/canvas/og_image.png');
  const image = await loadImage(fs.readFileSync(src));

  // 元の画像を canvas にセットする
  ctx.drawImage(image, 0, 0, width, height);

  ctx.font = '42px "NotoSansJP"';
  ctx.textAlign = 'center';
  ctx.textBaseline  = 'middle';

  const maxWidth = 860;
  const w = width/2;

  // 文字列を分割
  const textSplitted = wordBreak(ctx, maxWidth, textSplit(title));
  //1行のテキストを作成
  const textLiens = createTextLines(ctx, maxWidth, textSplitted);
  //1行の高さを取得

  // 3行以上になるときはエラー
  const sum = textLiens.length;
  if (sum > 3) {
    throw new Error(`Invalid lines: ${sum}`);
  }

  const write = (text: string, h: number) => {
    ctx.fillText(text, w, h, maxWidth);
  };

  if (sum === 0 || sum > 3) {
    throw new Error(`Invalid lines: ${sum}`);
  }

  for (const [i, line] of Object.entries(textLiens)) {
    const currentLineNumber = Number(i) + 1;
    const h = getH(sum, currentLineNumber);
    write(line, h);
  }

  return canvas.toBuffer('image/png');
};