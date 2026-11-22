import Image from "next/image";
import type { PostBlock } from "@/content/types";

export function PostBody({ blocks }: { blocks: PostBlock[] }) {
  return (
    <div className="max-w-2xl">
      {blocks.map((block, index) => {
        if (block.type === "h2") {
          return (
            <h2
              key={`${block.text}-${index}`}
              className="mt-10 font-display text-3xl font-bold tracking-tight"
            >
              {block.text}
            </h2>
          );
        }
        if (block.type === "ul") {
          return (
            <ul key={`list-${index}`} className="mt-4 grid list-disc gap-2 pl-5 leading-7 text-muted">
              {block.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          );
        }
        if (block.type === "image") {
          return (
            <figure key={`${block.src}-${index}`} className="mt-8">
              <Image
                src={block.src}
                alt={block.alt}
                width={1200}
                height={800}
                className="h-auto w-full rounded-3xl border border-line object-cover"
              />
              {block.alt ? <figcaption className="mt-3 text-sm text-muted">{block.alt}</figcaption> : null}
            </figure>
          );
        }
        return (
          <p key={`${block.text.slice(0, 24)}-${index}`} className="mt-4 text-lg leading-8 text-muted">
            {block.text}
          </p>
        );
      })}
    </div>
  );
}
