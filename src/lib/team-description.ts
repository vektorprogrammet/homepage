export type SectionBlock = {
  type: "section";
  id: string;
  heading?: string;
  content: SectionContent[];
};

export type SectionContent =
  | MarkdownBlock
  | ImageBlock
  | ContentWithImagesBlock;

export type MarkdownBlock = {
  type: "markdown";
  id: string;
  markdown: string;
};

export type ImageBlock = {
  type: "image";
  id: string;
  src: string;
  alt: string;
};

export type ContentWithImagesBlock = {
  type: "contentWithImages";
  id: string;
  markdown?: string;
  images: ImageBlock[];
};
