"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usePostLazyQuery = exports.usePostQuery = exports.PostDocument = exports.TagsOrder = exports.PostsOrder = exports.ImageResizeStrategy = exports.ImageResizeFocus = exports.ImageFormat = exports.EntryOrder = exports.AssetOrder = void 0;
const client_1 = require("@apollo/client");
const Apollo = __importStar(require("@apollo/client"));
const defaultOptions = {};
var AssetOrder;
(function (AssetOrder) {
    AssetOrder["ContentTypeAsc"] = "contentType_ASC";
    AssetOrder["ContentTypeDesc"] = "contentType_DESC";
    AssetOrder["FileNameAsc"] = "fileName_ASC";
    AssetOrder["FileNameDesc"] = "fileName_DESC";
    AssetOrder["HeightAsc"] = "height_ASC";
    AssetOrder["HeightDesc"] = "height_DESC";
    AssetOrder["SizeAsc"] = "size_ASC";
    AssetOrder["SizeDesc"] = "size_DESC";
    AssetOrder["SysFirstPublishedAtAsc"] = "sys_firstPublishedAt_ASC";
    AssetOrder["SysFirstPublishedAtDesc"] = "sys_firstPublishedAt_DESC";
    AssetOrder["SysIdAsc"] = "sys_id_ASC";
    AssetOrder["SysIdDesc"] = "sys_id_DESC";
    AssetOrder["SysPublishedAtAsc"] = "sys_publishedAt_ASC";
    AssetOrder["SysPublishedAtDesc"] = "sys_publishedAt_DESC";
    AssetOrder["SysPublishedVersionAsc"] = "sys_publishedVersion_ASC";
    AssetOrder["SysPublishedVersionDesc"] = "sys_publishedVersion_DESC";
    AssetOrder["UrlAsc"] = "url_ASC";
    AssetOrder["UrlDesc"] = "url_DESC";
    AssetOrder["WidthAsc"] = "width_ASC";
    AssetOrder["WidthDesc"] = "width_DESC";
})(AssetOrder = exports.AssetOrder || (exports.AssetOrder = {}));
var EntryOrder;
(function (EntryOrder) {
    EntryOrder["SysFirstPublishedAtAsc"] = "sys_firstPublishedAt_ASC";
    EntryOrder["SysFirstPublishedAtDesc"] = "sys_firstPublishedAt_DESC";
    EntryOrder["SysIdAsc"] = "sys_id_ASC";
    EntryOrder["SysIdDesc"] = "sys_id_DESC";
    EntryOrder["SysPublishedAtAsc"] = "sys_publishedAt_ASC";
    EntryOrder["SysPublishedAtDesc"] = "sys_publishedAt_DESC";
    EntryOrder["SysPublishedVersionAsc"] = "sys_publishedVersion_ASC";
    EntryOrder["SysPublishedVersionDesc"] = "sys_publishedVersion_DESC";
})(EntryOrder = exports.EntryOrder || (exports.EntryOrder = {}));
var ImageFormat;
(function (ImageFormat) {
    ImageFormat["Avif"] = "AVIF";
    ImageFormat["Jpg"] = "JPG";
    ImageFormat["JpgProgressive"] = "JPG_PROGRESSIVE";
    ImageFormat["Png"] = "PNG";
    ImageFormat["Png8"] = "PNG8";
    ImageFormat["Webp"] = "WEBP";
})(ImageFormat = exports.ImageFormat || (exports.ImageFormat = {}));
var ImageResizeFocus;
(function (ImageResizeFocus) {
    ImageResizeFocus["Bottom"] = "BOTTOM";
    ImageResizeFocus["BottomLeft"] = "BOTTOM_LEFT";
    ImageResizeFocus["BottomRight"] = "BOTTOM_RIGHT";
    ImageResizeFocus["Center"] = "CENTER";
    ImageResizeFocus["Face"] = "FACE";
    ImageResizeFocus["Faces"] = "FACES";
    ImageResizeFocus["Left"] = "LEFT";
    ImageResizeFocus["Right"] = "RIGHT";
    ImageResizeFocus["Top"] = "TOP";
    ImageResizeFocus["TopLeft"] = "TOP_LEFT";
    ImageResizeFocus["TopRight"] = "TOP_RIGHT";
})(ImageResizeFocus = exports.ImageResizeFocus || (exports.ImageResizeFocus = {}));
var ImageResizeStrategy;
(function (ImageResizeStrategy) {
    ImageResizeStrategy["Crop"] = "CROP";
    ImageResizeStrategy["Fill"] = "FILL";
    ImageResizeStrategy["Fit"] = "FIT";
    ImageResizeStrategy["Pad"] = "PAD";
    ImageResizeStrategy["Scale"] = "SCALE";
    ImageResizeStrategy["Thumb"] = "THUMB";
})(ImageResizeStrategy = exports.ImageResizeStrategy || (exports.ImageResizeStrategy = {}));
var PostsOrder;
(function (PostsOrder) {
    PostsOrder["CreatedAtAsc"] = "createdAt_ASC";
    PostsOrder["CreatedAtDesc"] = "createdAt_DESC";
    PostsOrder["SlugAsc"] = "slug_ASC";
    PostsOrder["SlugDesc"] = "slug_DESC";
    PostsOrder["SysFirstPublishedAtAsc"] = "sys_firstPublishedAt_ASC";
    PostsOrder["SysFirstPublishedAtDesc"] = "sys_firstPublishedAt_DESC";
    PostsOrder["SysIdAsc"] = "sys_id_ASC";
    PostsOrder["SysIdDesc"] = "sys_id_DESC";
    PostsOrder["SysPublishedAtAsc"] = "sys_publishedAt_ASC";
    PostsOrder["SysPublishedAtDesc"] = "sys_publishedAt_DESC";
    PostsOrder["SysPublishedVersionAsc"] = "sys_publishedVersion_ASC";
    PostsOrder["SysPublishedVersionDesc"] = "sys_publishedVersion_DESC";
    PostsOrder["TitleAsc"] = "title_ASC";
    PostsOrder["TitleDesc"] = "title_DESC";
})(PostsOrder = exports.PostsOrder || (exports.PostsOrder = {}));
var TagsOrder;
(function (TagsOrder) {
    TagsOrder["NameAsc"] = "name_ASC";
    TagsOrder["NameDesc"] = "name_DESC";
    TagsOrder["SlugAsc"] = "slug_ASC";
    TagsOrder["SlugDesc"] = "slug_DESC";
    TagsOrder["SysFirstPublishedAtAsc"] = "sys_firstPublishedAt_ASC";
    TagsOrder["SysFirstPublishedAtDesc"] = "sys_firstPublishedAt_DESC";
    TagsOrder["SysIdAsc"] = "sys_id_ASC";
    TagsOrder["SysIdDesc"] = "sys_id_DESC";
    TagsOrder["SysPublishedAtAsc"] = "sys_publishedAt_ASC";
    TagsOrder["SysPublishedAtDesc"] = "sys_publishedAt_DESC";
    TagsOrder["SysPublishedVersionAsc"] = "sys_publishedVersion_ASC";
    TagsOrder["SysPublishedVersionDesc"] = "sys_publishedVersion_DESC";
})(TagsOrder = exports.TagsOrder || (exports.TagsOrder = {}));
exports.PostDocument = (0, client_1.gql) `
    query post($slug: String) {
  postsCollection(where: {slug: $slug}) {
    items {
      title
    }
  }
}
    `;
/**
 * __usePostQuery__
 *
 * To run a query within a React component, call `usePostQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostQuery({
 *   variables: {
 *      slug: // value for 'slug'
 *   },
 * });
 */
function usePostQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(exports.PostDocument, options);
}
exports.usePostQuery = usePostQuery;
function usePostLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(exports.PostDocument, options);
}
exports.usePostLazyQuery = usePostLazyQuery;
