export type Project = {
  title: string;
  description: string;
  tags: string[];
  href: string;
};

export const projects: Project[] = [
  {
    title: "Scarecrow Web",
    description:
      "Next.jsとTailwind CSSで作る、記録と制作物のための個人サイト。",
    tags: ["Next.js", "TailwindCSS", "note"],
    href: "/",
  },
  {
    title: "AI Chat ツール",
    description:
      "LocalLLM を使用して、AIとの音声会話やチャットをする CLI & デスクトップアプリ。",
    tags: ["ollama", "Electron", "Node", "irodori-TTS", "voicevox", "個人開発"],
    href: "/projects",
  },
];
