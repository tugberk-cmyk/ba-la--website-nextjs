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
      className="font-sans text-3xl md:text-4xl font-bold tracking-tight text-foreground mt-14 mb-6 first:mt-0"
      {...props}
    >
      {children}
    </h1>
  ),
  h2: ({ children, ...props }) => (
    <h2
      className="font-sans text-2xl md:text-[1.75rem] font-bold tracking-tight text-foreground mt-12 mb-4 first:mt-0"
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({ children, ...props }) => (
    <h3
      className="font-sans text-xl md:text-[1.375rem] font-semibold text-foreground mt-10 mb-3 first:mt-0"
      {...props}
    >
      {children}
    </h3>
  ),
  h4: ({ children, ...props }) => (
    <h4
      className="font-sans text-lg font-semibold text-foreground mt-8 mb-2"
      {...props}
    >
      {children}
    </h4>
  ),
  p: ({ children, ...props }) => (
    <p
      className="text-[1.0625rem] leading-[1.8] text-foreground/85 mb-6"
      {...props}
    >
      {children}
    </p>
  ),
  a: ({ children, href, ...props }) => (
    <a
      href={href}
      className="text-foreground font-medium underline underline-offset-4 decoration-foreground/30 hover:decoration-foreground/70 transition-colors"
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
      {...props}
    >
      {children}
    </a>
  ),
  img: ({ src, alt, ...props }) => (
    <figure className="my-8">
      <img
        src={src}
        alt={alt || ""}
        className="w-full rounded-xl"
        loading="lazy"
        {...props}
      />
      {alt && (
        <figcaption className="text-center text-sm text-muted-foreground mt-3 font-sans">
          {alt}
        </figcaption>
      )}
    </figure>
  ),
  code: ({ children, className, ...props }) => {
    const isInline = !className;
    if (isInline) {
      return (
        <code
          className="px-1.5 py-0.5 rounded-md bg-muted text-[0.9em] font-mono text-foreground"
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
      className="rounded-xl bg-[#0d1117] text-sm overflow-x-auto p-5 my-8 font-mono"
      {...props}
    >
      {children}
    </pre>
  ),
  blockquote: ({ children, ...props }) => (
    <blockquote
      className="border-l-[3px] border-foreground/20 pl-6 my-8 text-foreground/60 italic text-[1.0625rem] leading-[1.8]"
      {...props}
    >
      {children}
    </blockquote>
  ),
  ul: ({ children, ...props }) => (
    <ul
      className="list-disc pl-8 mb-6 space-y-1 text-foreground/85 text-[1.0625rem] leading-[1.8] marker:text-foreground/30"
      {...props}
    >
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol
      className="list-decimal pl-8 mb-6 space-y-1 text-foreground/85 text-[1.0625rem] leading-[1.8] marker:text-foreground/40"
      {...props}
    >
      {children}
    </ol>
  ),
  li: ({ children, ...props }) => (
    <li className="leading-[1.8] pl-1 [&>p]:mb-1 [&>p:last-child]:mb-0" {...props}>
      {children}
    </li>
  ),
  table: ({ children, ...props }) => (
    <div className="overflow-x-auto my-8 rounded-lg border border-border">
      <table className="w-full border-collapse text-sm" {...props}>
        {children}
      </table>
    </div>
  ),
  th: ({ children, ...props }) => (
    <th
      className="border-b border-border bg-muted/50 px-4 py-3 text-left font-semibold text-foreground text-sm font-sans"
      {...props}
    >
      {children}
    </th>
  ),
  td: ({ children, ...props }) => (
    <td
      className="border-b border-border px-4 py-3 text-foreground/85 text-sm"
      {...props}
    >
      {children}
    </td>
  ),
  hr: ({ ...props }) => <hr className="border-border my-10" {...props} />,
};

export default function BlogContent({ content }: BlogContentProps) {
  return (
    <div className="font-serif">
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
