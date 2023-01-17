"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateOgImage = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const canvas_1 = require("canvas");
const lineFn_1 = require("./lineFn");
const wordFn_1 = require("./wordFn");
const size = { width: 1200, height: 630 };
const current = process.cwd();
const generateOgImage = async (title) => {
    // font を登録
    const font = path_1.default.resolve(current, 'src/canvas/NotoSansJP-Bold.otf');
    (0, canvas_1.registerFont)(font, { family: 'NotoSansJP', });
    // canvas を作成
    const { width, height } = size;
    const canvas = (0, canvas_1.createCanvas)(width, height);
    const ctx = canvas.getContext('2d');
    // 元になる画像を読み込む
    const src = path_1.default.resolve(current, 'src/canvas/og_image.png');
    const image = await (0, canvas_1.loadImage)(fs_1.default.readFileSync(src));
    // 元の画像を canvas にセットする
    ctx.drawImage(image, 0, 0, width, height);
    ctx.font = '42px "NotoSansJP"';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const maxWidth = 860;
    const w = width / 2;
    // 文字列を分割
    const textSplitted = (0, wordFn_1.wordBreak)(ctx, maxWidth, (0, wordFn_1.textSplit)(title));
    //1行のテキストを作成
    const textLiens = (0, wordFn_1.createTextLines)(ctx, maxWidth, textSplitted);
    //1行の高さを取得
    // 3行以上になるときはエラー
    const sum = textLiens.length;
    if (sum > 3) {
        throw new Error(`Invalid lines: ${sum}`);
    }
    const write = (text, h) => {
        ctx.fillText(text, w, h, maxWidth);
    };
    if (sum === 0 || sum > 3) {
        throw new Error(`Invalid lines: ${sum}`);
    }
    for (const [i, line] of Object.entries(textLiens)) {
        const currentLineNumber = Number(i) + 1;
        const h = (0, lineFn_1.getH)(sum, currentLineNumber);
        write(line, h);
    }
    return canvas.toBuffer('image/png');
};
exports.generateOgImage = generateOgImage;
