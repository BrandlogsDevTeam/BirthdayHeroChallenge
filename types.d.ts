declare namespace JSX {
  interface IntrinsicElements {
    "lite-youtube": React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement> & {
        videoid: string;
        videotitle: string;
      },
      HTMLElement
    >;
  }
}
