interface YouTubeEmbedProps {
  id: string;
  title: string;
}

export function YouTubeEmbed({ id, title }: YouTubeEmbedProps) {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        maxWidth: "720px",
        aspectRatio: "16 / 9",
        margin: "0 auto",
        overflow: "hidden",
        backgroundColor: "#000",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <iframe
        title={title}
        src={`https://www.youtube.com/embed/${id}?autoplay=0&rel=0`}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          border: "none",
        }}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
}
