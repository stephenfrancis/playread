
// const Cp       = require("child_process");
const Fs      = require("fs");
const SOURCES = require("./source.json");


const PATTERNS = {
  cover: /^cover/,
  author: /^by (.*)/,
  contents: /^Contents/,
  dram_pers: /^Dramatis Personæ/,
  act_title: /^ACT (\w+)/,
  scene_title: /^Scene (\w+). (.*)/i,
  scene_dir: /^SCENE: (.*)/,
  named_person: /^(\w+): (.*)/,
  new_speaker: /^([A-Z]+)\.$/,
  stage_dir: /^ (.*)/,
  end_of_book: /^End of the Project Gutenberg EBook of/,
};

const PROCESSORS = {
   0: (line, context) => {    // state  0: precursor text
    if (!line) {
      return;
    }
    if (PATTERNS.cover.test(line)) {
      context.state = 2;
    }
  },
   2:  (line, context) => {    // state 2: title
    if (!line) {
      return;
    }
    context.out.title = line.trim();
    context.state = 4;
  },
   4:  (line, context) => {    // state 4: author
    if (!line) {
      return;
    }
    if (PATTERNS.author.test(line)) {
      context.out.author = PATTERNS.author.exec(line)[1];
      context.state = 10;
    }
  },
  10: (line, context) => {    // state 10: contents
    if (!line) {
      return;
    }
    if (PATTERNS.dram_pers.test(line)) {
      context.state = 20;
    }
    if (PATTERNS.act_title.test(line)) {
      const current_act = PATTERNS.act_title.exec(line)[1];
      context.current_act = {
        title: current_act,
        scenes: [],
      };
      context.out.acts = context.out.acts || [];
      context.out.acts.push(context.current_act);
    }
    if (PATTERNS.scene_title.test(line)) {
      const current_scene = PATTERNS.scene_title.exec(line);
      context.current_scene = {
        title: current_scene[1],
        direction: current_scene[2],
        content: [],
      };
      if (!context.current_act) {
        throw new Error(`unexpected state: no context.current_act`);
      }
      context.current_act.scenes.push(context.current_scene);
    }
  },
  20: (line, context) => {    // state 20: dramatis personae
    if (!line) {
      return;
    }
    if (PATTERNS.scene_dir.test(line)) {
      context.out.scene_direction = PATTERNS.scene_dir.exec(line)[1];
      context.state = 30;
    } else {
      context.out.dramatis_personae = context.out.dramatis_personae || [];
      context.out.dramatis_personae.push(line);
    }
  },
  30: (line, context) => {    // state 30: body of play
    if (!line) {
      return;
    }
    if (PATTERNS.act_title.test(line)) {
      const current_act = PATTERNS.act_title.exec(line)[1];
      if (typeof context.act_index !== "number") {
        context.act_index = 0;
      } else {
        context.act_index += 1;
      }
      if (!context.out.acts || context.out.acts.length <= context.act_index || context.out.acts[context.act_index].title !== current_act) {
        throw new Error(`unexpected state: act_index: ${context.act_index}, found act: ${current_act}, expected act: ${context.out.acts && context.out.acts[context.act_index] && context.out.acts[context.act_index].title}`);
      }
      context.scene_index = null;
      return;
    }
    if (!context.out.acts || typeof context.act_index !== "number" || !context.out.acts[context.act_index] || !context.out.acts[context.act_index].scenes) {
      throw new Error(`unexpected state: act_index: ${context.act_index}, found act: ${current_act}`);
    }
    const current_act_obj = context.out.acts[context.act_index];
    if (PATTERNS.scene_title.test(line)) {
      const current_scene = PATTERNS.scene_title.exec(line)[1];
      if (typeof context.scene_index !== "number") {
        context.scene_index = 0;
      } else {
        context.scene_index += 1;
      }
      if (current_act_obj.scenes.length <= context.scene_index || current_act_obj.scenes[context.scene_index].title !== current_scene) {
        throw new Error(`unexpected state: scene_index: ${context.scene_index}, found scene: ${current_scene}, expected scene: ${current_act_obj.scenes[context.scene_index].title}`);
      }
      return;
    }
    const current_scene_obj = current_act_obj.scenes[context.scene_index];
    if (PATTERNS.end_of_book.test(line)) {
      context.state = 40;
      return;
    }
    if (PATTERNS.new_speaker.test(line)) {
      context.curr_line = {
        speaker: PATTERNS.new_speaker.exec(line)[1],
        text: [],
      };
      current_scene_obj.content.push(context.curr_line);
      context.prev_line = null;
      return;
    }
    if (!context.curr_line) {
      throw new Error(`unexpected state: no current line at ${context.act_index}/${context.scene_index} ${line}`);
    }
    if (PATTERNS.stage_dir.test(line) && (context.curr_line.type !== "stage_direct")) {
      context.prev_line = context.curr_line;
      context.curr_line = {
        type: "stage_direct",
        text: [],
      };
      current_scene_obj.content.push(context.curr_line);
    }
    if (!PATTERNS.stage_dir.test(line) && (context.curr_line.type === "stage_direct")) {
      context.curr_line = context.prev_line;
      context.prev_line = null;
    }
    context.curr_line.text.push(line);
  },
  40: (line, context) => {    // state 40: rest
    if (!line) {
      return;
    }
  }
};

const main = () => {
  const context = {
    state: 0,
    out: {},
    curr_line: {
      text: [],
    }
  };
  Fs.readFileSync("src/convert/1540-0.txt", {
    encoding: "utf8",
  })
    .split("\r\n")
    .forEach((line, index) => {
      if (typeof PROCESSORS[context.state] !== "function") {
        throw new Error(`no processor defined for state: ${context.state}`);
      }
      PROCESSORS[context.state](line, context);
    });
  return context.out;
}

Fs.writeFileSync("dist/tempest.json", JSON.stringify(main(), null, "  "), {
  encoding: "utf8",
});
