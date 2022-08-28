/* SPDX-FileCopyrightText: 2020-present Kriasoft */
/* SPDX-License-Identifier: MIT */

type Page = {
  title?: string;
  description?: string;
  data?: Record<string, unknown>;
};

/**
 * Injects HTML page metadata (title, description, etc.) as well as
 * the serialized application store.
 */
export function transform(res: Response, page: Page): Response {
  return (
    new HTMLRewriter()
      // <title>...</title>
      .on("title:first-of-type", {
        element(el) {
          if (page.title) {
            el.setInnerContent(page.title);
          }
        },
      })

      // <meta name="description" content="..." />
      .on('meta[name="description"]:first-of-type', {
        element(el) {
          if (page.description) {
            el.setAttribute("content", page.description);
          }
        },
      })

      // <script id="data" type="application/json"></script>
      // https://developer.mozilla.org/docs/Web/HTML/Element/script#embedding_data_in_html
      .on("script#data", {
        element(el) {
          if (page.data) {
            const json = JSON.stringify(page.data).replace(
              /<\/script/g,
              "</\\u0073cript"
            );
            el.setInnerContent(json, { html: true });
          }
        },
      })
      .transform(res)
  );
}
