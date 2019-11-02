"use strict";
/**
 * @module furi
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
const is_windows_1 = __importDefault(require("is-windows"));
const url_1 = __importDefault(require("url"));
/**
 * Normalizes the input to a frozen `URL` instance.
 *
 * @param input URL string or instance to normalize.
 */
function asFuri(input) {
    if (typeof input === "string") {
        const writable = new url_1.default.URL(input);
        freezeUrl(writable);
        return writable;
    }
    else if (!Object.isFrozen(input)) {
        const writable = new url_1.default.URL(input.toString());
        freezeUrl(writable);
        return writable;
    }
    else {
        return input;
    }
}
exports.asFuri = asFuri;
/**
 * Normalizes the input to a writable `URL` instance.
 *
 * @param input URL string or instance to normalize.
 */
function asWritableUrl(input) {
    return new url_1.default.URL(typeof input === "string" ? input : input.toString());
}
exports.asWritableUrl = asWritableUrl;
/**
 * Appends the provided components to the pathname of `base`.
 *
 * It does not mutate the inputs.
 * If component list is non-empty, the `hash` and `search` are set to the
 * empty string.
 *
 * @param base Base URL.
 * @param components Path components to append.
 * @returns Joined URL.
 */
function join(base, components) {
    if (components.length === 0) {
        return asFuri(base);
    }
    const writable = asWritableUrl(base);
    const oldPathname = writable.pathname;
    const tail = components
        .map(encodeURIComponent)
        .join("/");
    writable.hash = "";
    writable.search = "";
    const separator = oldPathname.endsWith("/") ? "" : "/";
    writable.pathname = `${oldPathname}${separator}${tail}`;
    freezeUrl(writable);
    return writable;
}
exports.join = join;
/**
 * Returns the parent URL.
 *
 * If `input` is the root, it returns itself (saturation).
 * If `input` has a trailing separator, it is first removed.
 *
 * @param input Input URL.
 * @returns Parent URL.
 */
function parent(input) {
    const writable = asWritableUrl(input);
    const oldPathname = writable.pathname;
    const components = oldPathname.split("/");
    if (components[components.length - 1] === "") {
        // Remove trailing separator
        components.pop();
    }
    components.pop();
    writable.pathname = components.join("/");
    freezeUrl(writable);
    return writable;
}
exports.parent = parent;
/**
 * Converts a File URI to a system-dependent path.
 *
 * Use `toPosixPath`, `toWindowsShortPath` or `toWindowsLongPath` if you
 * want system-independent results.
 *
 * Example:
 * ```js
 * // On a Windows system:
 * toSysPath("file:///C:/dir/foo");
 * // -> "C:\\dir\\foo";
 * toSysPath("file:///C:/dir/foo", true);
 * // -> "\\\\?\\C:\\dir\\foo";
 *
 * // On a Posix system:
 * toSysPath("file:///dir/foo");
 * // -> "/dir/foo";
 * ```
 *
 * @param furi File URI to convert.
 * @param windowsLongPath Use long paths on Windows. (default: `false`)
 * @return System-dependent path.
 */
function toSysPath(furi, windowsLongPath = false) {
    if (is_windows_1.default()) {
        return windowsLongPath ? toWindowsLongPath(furi) : toWindowsShortPath(furi);
    }
    else {
        return toPosixPath(furi);
    }
}
exports.toSysPath = toSysPath;
/**
 * Converts a File URI to a Windows short path.
 *
 * The result is either a short device path or a short UNC server path.
 *
 * Example:
 * ```js
 * toSysPath("file:///C:/dir/foo");
 * // -> "C:\\dir\\foo";
 * toSysPath("file://server/Users/foo");
 * // -> "\\\\server\\Users\\foo";
 * ```
 *
 * @param furi File URI to convert.
 * @return Windows short path.
 */
function toWindowsShortPath(furi) {
    const urlObj = new url_1.default.URL(furi);
    if (urlObj.host === "") {
        // Local drive path
        const pathname = urlObj.pathname.substring(1);
        const forward = pathname.split("/").map(decodeURIComponent).join("/");
        return toBackwardSlashes(forward);
    }
    else {
        // Server path
        const pathname = new url_1.default.URL(furi).pathname;
        const forward = pathname.split("/").map(decodeURIComponent).join("/");
        const backward = toBackwardSlashes(forward);
        return `\\\\${urlObj.host}${backward}`;
    }
}
exports.toWindowsShortPath = toWindowsShortPath;
/**
 * Converts a File URI to a Windows long path.
 *
 * The result is either a long device path or a long UNC server path.
 *
 * Example:
 * ```js
 * toWindowsPath("file:///C:/dir/foo");
 * // -> "\\\\?\\C:\\dir\\foo";
 * toWindowsPath("file://server/Users/foo");
 * // -> "\\\\?\\unc\\server\\Users\\foo";
 * ```
 *
 * @param furi File URI to convert.
 * @return Windows long path.
 */
function toWindowsLongPath(furi) {
    const urlObj = new url_1.default.URL(furi);
    if (urlObj.host === "") {
        // Local drive path
        const pathname = urlObj.pathname.substring(1);
        const forward = pathname.split("/").map(decodeURIComponent).join("/");
        const backward = toBackwardSlashes(forward);
        return `\\\\?\\${backward}`;
    }
    else {
        // Server path
        const pathname = new url_1.default.URL(furi).pathname;
        const forward = pathname.split("/").map(decodeURIComponent).join("/");
        const backward = toBackwardSlashes(forward);
        return `\\\\?\\unc\\${urlObj.host}${backward}`;
    }
}
exports.toWindowsLongPath = toWindowsLongPath;
/**
 * Converts a File URI to a Posix path.
 *
 * Requires the host to be either an empty string or `"localhost"`.
 *
 * Example:
 * ```js
 * toPosixPath("file:///dir/foo");
 * // -> "/dir/foo";
 * ```
 *
 * @param furi File URI to convert.
 * @return Posix path.
 */
function toPosixPath(furi) {
    const urlObj = new url_1.default.URL(furi);
    if (urlObj.host !== "" && urlObj.host !== "localhost") {
        assert_1.default.fail(`Expected \`host\` to be "" or "localhost": ${furi}`);
    }
    const pathname = urlObj.pathname;
    return pathname.split("/").map(decodeURIComponent).join("/");
}
exports.toPosixPath = toPosixPath;
/**
 * Converts an absolute system-dependent path to a frozen URL object.
 *
 * Use `fromPosixPath` or `fromWindowsPath` if you want system-independent
 * results.
 *
 * Example:
 * ```js
 * // On a Windows system:
 * fromSysPath("C:\\dir\\foo");
 * // -> new URL("file:///C:/dir/foo");
 *
 * // On a Posix system:
 * fromSysPath("/dir/foo");
 * // -> new URL("file:///dir/foo");
 * ```
 *
 * @param absPath Absolute system-dependent path to convert
 * @return Frozen `file://` URL object.
 */
function fromSysPath(absPath) {
    return is_windows_1.default() ? fromWindowsPath(absPath) : fromPosixPath(absPath);
}
exports.fromSysPath = fromSysPath;
const WINDOWS_PREFIX_REGEX = /^[\\/]{2,}([^\\/]+)(?:$|[\\/]+)/;
const WINDOWS_UNC_REGEX = /^unc(?:$|[\\/]+)([^\\/]+)(?:$|[\\/]+)/i;
/**
 * Converts an absolute Windows path to a frozen URL object.
 *
 * Example:
 * ```js
 * fromWindowsPath("C:\\dir\\foo");
 * // -> new URL(file:///C:/dir/foo");
 * fromWindowsPath("\\\\?\\unc\\server\\Users\\foo");
 * // -> new URL("file://server/Users/foo");
 * ```
 *
 * @param absPath Absolute Windows path to convert
 * @return Frozen `file://` URL object.
 */
function fromWindowsPath(absPath) {
    const prefixMatch = WINDOWS_PREFIX_REGEX.exec(absPath);
    if (prefixMatch === null) {
        // Short device path
        return formatFileUrl(`/${toForwardSlashes(absPath)}`);
    }
    const prefix = prefixMatch[1];
    const tail = absPath.substring(prefixMatch[0].length);
    if (prefix !== "?") {
        // Short server path
        const result = new url_1.default.URL("file:///");
        result.host = prefix;
        result.pathname = encodeURI(`/${toForwardSlashes(tail)}`);
        freezeUrl(result);
        return result;
    }
    // Long path
    const uncMatch = WINDOWS_UNC_REGEX.exec(tail);
    if (uncMatch === null) {
        // Long device path
        return formatFileUrl(`/${toForwardSlashes(tail)}`);
    }
    else {
        // Long server path
        const host = uncMatch[1];
        const serverPath = tail.substring(uncMatch[0].length);
        const result = new url_1.default.URL("file:///");
        result.host = host;
        result.pathname = encodeURI(`/${toForwardSlashes(serverPath)}`);
        freezeUrl(result);
        return result;
    }
}
exports.fromWindowsPath = fromWindowsPath;
/**
 * Converts an absolute Posix path to a frozen URL object.
 *
 * Example:
 * ```js
 * fromPosixPath("/dir/foo");
 * // -> new URL(file:///dir/foo");
 * ```
 *
 * @param absPath Absolute Posix path to convert
 * @return Frozen `file://` URL object.
 */
function fromPosixPath(absPath) {
    return formatFileUrl(absPath);
}
exports.fromPosixPath = fromPosixPath;
/**
 * Replaces all the backward slashes by forward slashes.
 *
 * @param str Input string.
 * @internal
 */
function toForwardSlashes(str) {
    return str.replace(/\\/g, "/");
}
/**
 * Replaces all the forward slashes by backward slashes.
 *
 * @param str Input string.
 * @internal
 */
function toBackwardSlashes(str) {
    return str.replace(/\//g, "\\");
}
/**
 * Creates a frozen `file://` URL using the supplied `pathname`.
 *
 * @param pathname Pathname for the URL object.
 * @return Frozen `file://` URL object.
 * @internal
 */
function formatFileUrl(pathname) {
    const result = new url_1.default.URL("file:///");
    result.pathname = encodeURI(pathname);
    freezeUrl(result);
    return result;
}
/**
 * Freezes a URL object.
 *
 * @param writableUrl URL object to freeze.
 * @internal
 */
function freezeUrl(writableUrl) {
    Object.freeze(writableUrl.searchParams);
    Object.freeze(writableUrl);
}
//# sourceMappingURL=index.js.map