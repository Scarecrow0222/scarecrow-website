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
  {
    title: "リソース管理アプリ",
    description:
      "必要なリソースを一元管理して、効率的にアクセスできるようにするアプリ。",
    tags: ["TDD", "React", "Node"],
    href: "/projects",
  },
  {
    title: "成長記録アプリ",
    description: "日頃の学びや気づきを記録して、振り返るためのアプリ。",
    tags: ["TDD", "React", "kotlin", "spring boot"],
    href: "/projects",
  },
];
