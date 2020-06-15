
export interface Play {
  acts: Act[];
  author?: string;
  dramatis_personae: string[];
  scene_direction?: string;
  title: string;
}

export interface Act {
  scenes: Scene[];
  title: string;
}

export interface Scene {
  content: Content[];
  direction?: string;
  title: string;
}

export interface Content {
  text: string[];
}

export interface ContentStageDirection extends Content {
  type: "stage_direct";
}

export interface ContentSpeech extends Content {
  speaker: string;
}
