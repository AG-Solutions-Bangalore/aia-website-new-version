export default function ArticleContentBlock({ article, block, index }) {
  const type = typeof block === "string" ? "paragraph" : block?.type;
  const text = typeof block === "string" ? block : block?.text;

  if (!text) return null;

  if (type === "heading") {
    return (
      <h3 className="pt-3 text-xl font-extrabold leading-tight text-black">
        {text}
      </h3>
    );
  }

  if (type === "question") {
    return (
      <h3 className="pt-2 text-lg font-extrabold leading-snug text-black">
        {text}
      </h3>
    );
  }

  if (type === "insight") {
    return (
      <div className="rounded-md border-l-4 border-[#f36f21] bg-[#fff3ec] px-4 py-3 text-base font-semibold leading-7 text-black">
        {text}
      </div>
    );
  }

  if (type === "disclaimer") {
    return (
      <p className="text-sm italic leading-7 text-slate-600">
        {text}
      </p>
    );
  }

  return (
    <p>
      {article.bodyLabel && index === 0 ? (
        <strong className="font-extrabold italic text-black">
          {article.bodyLabel}{" "}
        </strong>
      ) : null}
      {text}
    </p>
  );
}
