"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import type { Components } from "react-markdown";

interface BlogContentProps {
  content: string;
}

const components: Components = {
  h1: ({ children, ...props }) => (
    <h1
      className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mt-10 mb-4"
      {...props}
    >
      {children}
    </h1>
  ),
  h2: ({ children, ...props }) => (
    <h2
      className="text-2xl md:text-3xl font-bold tracking-tight text-foreground mt-8 mb-3"
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({ children, ...props }) => (
    <h3
      className="text-xl md:text-2xl font-semibold text-foreground mt-6 mb-2"
      {...props}
    >
      {children}
    </h3>
  ),
  p: ({ children, ...props }) => (
    <p
      className="text-base leading-7 text-foreground/85 mb-5"
      {...props}
    >
      {children}
    </p>
  ),
  a: ({ children, href, ...props }) => (
    <a
      href={href}
      className="text-foreground font-medium underline underline-offset-4 decoration-foreground/30 hover:decoration-foreground transition-colors"
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
      {...props}
    >
      {children}
    </a>
  ),
  img: ({ src, alt, ...props }) => (
    <img
      src={src}
      alt={alt || ""}
      className="w-full rounded-xl my-6"
      loading="lazy"
      {...props}
    />
  ),
  code: ({ children, className, ...props }) => {
    const isInline = !className;
    if (isInline) {
      return (
        <code
          className="px-1.5 py-0.5 rounded-md bg-muted text-sm font-mono text-foreground"
          {...props}
        >
          {children}
        </code>
      );
    }
    return (
      <code className={`${className || ""} text-sm`} {...props}>
        {children}
      </code>
    );
  },
  pre: ({ children, ...props }) => (
    <pre
      className="rounded-xl bg-[#0d1117] text-sm overflow-x-auto p-5 my-6"
      {...props}
    >
      {children}
    </pre>
  ),
  blockquote: ({ children, ...props }) => (
    <blockquote
      className="border-l-4 border-foreground/20 pl-5 my-6 text-muted-foreground italic"
      {...props}
    >
      {children}
    </blockquote>
  ),
  ul: ({ children, ...props }) => (
    <ul
      className="list-disc list-outside pl-6 mb-5 space-y-2 text-foreground/85"
      {...props}
    >
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol
      className="list-decimal list-outside pl-6 mb-5 space-y-2 text-foreground/85"
      {...props}
    >
      {children}
    </ol>
  ),
  li: ({ children, ...props }) => (
    <li className="leading-7" {...props}>
      {children}
    </li>
  ),
  table: ({ children, ...props }) => (
    <div className="overflow-x-auto my-6">
      <table
        className="w-full border-collapse border border-border text-sm"
        {...props}
      >
        {children}
      </table>
    </div>
  ),
  th: ({ children, ...props }) => (
    <th
      className="border border-border bg-muted px-4 py-2 text-left font-semibold text-foreground"
      {...props}
    >
      {children}
    </th>
  ),
  td: ({ children, ...props }) => (
    <td
      className="border border-border px-4 py-2 text-foreground/85"
      {...props}
    >
      {children}
    </td>
  ),
  hr: ({ ...props }) => (
    <hr className="border-border my-8" {...props} />
  ),
};

export default function BlogContent({ content }: BlogContentProps) {
  return (
    <div className="max-w-3xl mx-auto">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight, rehypeRaw]}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
