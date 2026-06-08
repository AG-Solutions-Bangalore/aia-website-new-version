function renderInlineText(content, keyPrefix) {
  if (!Array.isArray(content)) {
    return content;
  }

  return content.map((segment, index) => {
    const segmentText =
      typeof segment === "string" ? segment : segment?.text || "";

    if (!segmentText) {
      return null;
    }

    let inlineContent = segmentText;

    if (typeof segment !== "string" && segment.italic) {
      inlineContent = <em className="italic">{inlineContent}</em>;
    }

    if (typeof segment !== "string" && segment.bold) {
      inlineContent = (
        <strong className="font-extrabold text-black">{inlineContent}</strong>
      );
    }

    return <span key={`${keyPrefix}-${index}`}>{inlineContent}</span>;
  });
}

export function ArticleInlineContent({ content, keyPrefix }) {
  return renderInlineText(content, keyPrefix);
}

export default function ArticleContentBlock({ article, block, index }) {
  const isInlineContent = Array.isArray(block);
  const type =
    typeof block === "string" || isInlineContent ? "paragraph" : block?.type;
  const text =
    typeof block === "string" || isInlineContent ? block : block?.text;

  if (!text) return null;

  if (type === "heading") {
    return (
      <h3 className="pt-3 text-lg sm:text-xl font-extrabold leading-tight text-black">
        {renderInlineText(text, `${article.title}-${index}-heading`)}
      </h3>
    );
  }

  if (type === "question") {
    return (
      <h3 className="pt-2 text-base sm:text-lg font-extrabold leading-snug text-black">
        {renderInlineText(text, `${article.title}-${index}-question`)}
      </h3>
    );
  }

  if (type === "insight") {
    return (
      <div className="rounded-md border-l-4 border-[#f36f21] bg-[#fff3ec] px-4 py-3 text-[15px] sm:text-base font-semibold leading-6 sm:leading-7 text-black">
        {renderInlineText(text, `${article.title}-${index}-insight`)}
      </div>
    );
  }

  if (type === "disclaimer") {
    return (
      <p className="text-[13px] sm:text-sm italic leading-6 sm:leading-7 text-slate-600">
        {renderInlineText(text, `${article.title}-${index}-disclaimer`)}
      </p>
    );
  }

  return (
    <p className="text-justify">
      {article.bodyLabel && index === 0 ? (
        <strong className="font-extrabold italic text-black">
          {article.bodyLabel}{" "}
        </strong>
      ) : null}
      {renderInlineText(text, `${article.title}-${index}-paragraph`)}
    </p>
  );
}
