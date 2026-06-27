import type { ComponentProps, ReactElement } from "react";
import * as runtime from "react/jsx-runtime";
import { Link } from "@/i18n/navigation";
import { CodeBlock } from "@/components/code-block";

// Velite compiles each post to a function-body string that reads the JSX
// runtime from arguments[0] and returns { default: MDXContent }. This runs at
// build time (server component), so there is no client-side eval / CSP concern.
const components = {
  a: ({ href, children, ...props }: ComponentProps<"a">) => {
    if (!href) {
      return <a {...props}>{children}</a>;
    }

    const isExternal =
      /^(https?:)?\/\//.test(href) || /^(mailto|tel):/.test(href);
    if (isExternal) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
          {children}
        </a>
      );
    }

    if (href.startsWith("#")) {
      return (
        <a href={href} {...props}>
          {children}
        </a>
      );
    }

    return (
      <Link href={href} {...props}>
        {children}
      </Link>
    );
  },
  pre: (props: ComponentProps<"pre">) => <CodeBlock {...props} />,
};

type MDXComponent = (props: {
  components?: Record<string, unknown>;
}) => ReactElement;

function getMDXComponent(code: string): MDXComponent {
  const fn = new Function(code);
  return fn(runtime).default as MDXComponent;
}

export function MDXContent({ code }: { code: string }) {
  // Call the compiled component directly: it is static (no hooks/state), and
  // this avoids treating a per-render value as a JSX component type.
  return getMDXComponent(code)({ components });
}
