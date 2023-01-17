"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const client_1 = require("./graphql/client");
const generated_1 = require("./graphql/generated");
const canvas_1 = require("./lib/canvas");
const cwd = process.cwd();
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function default_1(instance, _opts, done) {
    instance.get('/', async (_req, reply) => {
        reply.status(200).send('ok');
    });
    instance.get('/check', async (_req, reply) => {
        try {
            // 疎通をチェックする
            const slug = 'first_post';
            const { data } = await client_1.client.query({
                query: generated_1.PostDocument,
                variables: { slug: slug }
            });
            const title = data.postsCollection?.items[0]?.title;
            reply.send({ title: title });
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        }
        catch (e) {
            console.error(e.message);
            reply.send({ error: e.message });
        }
    });
    instance.get('/posts/:slug/ogImage', async (req, reply) => {
        const slug = req.params.slug;
        reply.header('Content-Type', 'image/png');
        try {
            const { data } = await client_1.client.query({
                query: generated_1.PostDocument,
                variables: { slug: slug }
            });
            const title = data.postsCollection?.items[0]?.title;
            const img = await (0, canvas_1.generateOgImage)(title);
            reply.send(img);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        }
        catch (e) {
            console.error(e.message);
            const file = path_1.default.resolve(cwd, 'src/canvas/og_image_default.png');
            const siteImg = fs_1.default.readFileSync(file);
            reply.send(siteImg);
        }
    });
    done();
}
exports.default = default_1;
