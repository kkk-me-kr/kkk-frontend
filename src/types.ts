interface Chat {
  turn: number;
  content: string;
}

interface Question extends Chat {}

interface Answer extends Chat {}
