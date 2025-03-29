import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";
import React from "react";

function Code({ children, className, ...props }) {
  // className이 없는 경우는 인라인 코드를 의미
  const isInline = typeof children === "string";
  if (isInline) {
    return (
      <code className={isInline ? "inline-code" : className} {...props}>
        {children}
      </code>
    );
  }

  return children;
}

function Blockquote({ children }) {
  return (
    <blockquote className="border-l-4 border-gray-300 dark:border-gray-700 pl-4 my-4 italic text-gray-700 dark:text-gray-300">
      {children}
    </blockquote>
  );
}

const components = {
  code: Code,
  blockquote: Blockquote,
};

export function CustomMDX(props) {
  return (
    <MDXRemote
      {...props}
      components={{ ...components, ...(props.components || {}) }}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm, remarkBreaks],
          rehypePlugins: [
            [
              rehypePrettyCode,
              {
                theme: "github-dark-dimmed",
                // keepBackground: false,
                onVisitLine(node) {
                  if (node.children.length === 0) {
                    node.children = [{ type: "text", value: " " }];
                  }
                },
                onVisitHighlightedLine(node) {
                  node.properties.className.push("highlighted");
                },
              },
            ],
            rehypeSlug,
          ],
        },
      }}
    />
  );
}
