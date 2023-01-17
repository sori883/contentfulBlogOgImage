"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTextLines = exports.wordBreak = exports.textSplit = exports.isEnglishWord = exports.textSize = void 0;
// 文字列の描画時の縦横のサイズを取得する
const textSize = (ctx, text) => {
    const measure = ctx.measureText(text);
    const width = Math.floor(measure.width);
    const height = Math.floor(measure.actualBoundingBoxAscent + measure.actualBoundingBoxDescent);
    return { width, height };
};
exports.textSize = textSize;
// bufferの後に続く文字が英単語に属するかどうか
const isEnglishWord = (char, buffer) => {
    return /^[A-Za-z]+$/.test(char) || (buffer.length > 0 && /^[_!?]+$/.test(char));
};
exports.isEnglishWord = isEnglishWord;
// 文字列を英語は単語単位、それ以外は文字単位に分割します
const textSplit = (text) => {
    const splitted = [];
    let word_buffer = "";
    for (let i = 0; i < text.length; ++i) {
        const char = text[i];
        if ((0, exports.isEnglishWord)(char, word_buffer)) {
            word_buffer += char;
            continue;
        }
        if (word_buffer !== "")
            splitted.push(word_buffer);
        word_buffer = "";
        splitted.push(char);
    }
    if (word_buffer !== "") {
        splitted.push(word_buffer);
    }
    return splitted;
};
exports.textSplit = textSplit;
// 最大範囲に収まらない長い単語を文字単位に分割
const wordBreak = (ctx, max_width, texts) => {
    const text_processed = [];
    for (let i = 0; i < texts.length; ++i) {
        const width = (0, exports.textSize)(ctx, texts[i]).width;
        if (width > max_width) {
            text_processed.concat(String(texts[i]).split(""));
            continue;
        }
        text_processed.push(texts[i]);
    }
    return text_processed;
};
exports.wordBreak = wordBreak;
// 1行に収まるように文字列を連結します。最大幅を超える時に新たな行を生成します。
const createTextLines = (ctx, max_width, texts) => {
    const text_lines = [];
    let line_buffer = '';
    for (let i = 0; i < texts.length; ++i) {
        const next_text_width = (0, exports.textSize)(ctx, line_buffer + texts[i]).width;
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
exports.createTextLines = createTextLines;
