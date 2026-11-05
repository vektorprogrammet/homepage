import Markdown from "react-markdown";
import { markdownComponents } from "~/lib/markdown";
import type {
  ImageBlock,
  SectionBlock,
  SectionContent,
} from "~/lib/team-description";

export function TeamTemplateDescription({
  descriptionBlocks,
}: {
  descriptionBlocks: Array<SectionBlock>;
}) {
  return (
    <div className="mx-5 my-10 font-sans text-black text-lg">
      {descriptionBlocks.map((section) => (
        <section key={section.id}>
          {section.heading && (
            <h2 className="mt-14 mb-5 text-center font-sans text-3xl text-vektor-darblue">
              {section.heading}
            </h2>
          )}
          {section.content.map(renderContent)}
        </section>
      ))}
    </div>
  );
}

function renderContent(content: SectionContent) {
  switch (content.type) {
    case "markdown": {
      return (
        <div key={content.id} className="my-5 space-y-5">
          <Markdown components={markdownComponents}>
            {content.markdown}
          </Markdown>
        </div>
      );
    }
    case "image": {
      return renderImage(
        content,
        "mx-auto my-8 h-auto max-w-full md:max-w-2xl",
      );
    }
    case "contentWithImages": {
      const hasMarkdown = Boolean(content.markdown?.trim());

      return (
        <div
          key={content.id}
          className={
            hasMarkdown ? "my-8 grid items-center gap-6 md:grid-cols-2" : "my-8"
          }
        >
          {hasMarkdown && (
            <div className="space-y-5">
              <Markdown components={markdownComponents}>
                {content.markdown}
              </Markdown>
            </div>
          )}
          <div
            className={
              hasMarkdown ? "grid gap-6" : "flex flex-wrap justify-center gap-6"
            }
          >
            {content.images.map((image) =>
              renderImage(
                image,
                "mx-auto h-auto max-h-96 max-w-full object-contain",
              ),
            )}
          </div>
        </div>
      );
    }
    default: {
      return null;
    }
  }
}

function renderImage(image: ImageBlock, className: string) {
  return (
    <img key={image.id} className={className} src={image.src} alt={image.alt} />
  );
}
