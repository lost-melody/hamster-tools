// 一些模型定義
// https://github.com/imfuxiao/Hamster/wiki/%E8%87%AA%E5%AE%9A%E4%B9%89%E9%94%AE%E7%9B%98%E5%B8%83%E5%B1%80

export enum Direction {
    up = "up",
    down = "down",
};

export const Directions: Direction[] = [
    Direction.up,
    Direction.down,
];

export enum ActionType {
    backspace = "backspace",
    enter = "enter",
    shift = "shift",
    tab = "tab",
    space = "space",
    character = "character",
    characterMargin = "characterMargin",
    keyboardType = "keyboardType",
    symbol = "symbol",
    shortCommand = "shortCommand",
    none = "none",
    nextKeyboard = "nextKeyboard",
};

export const ActionTypes = [
    ActionType.backspace,
    ActionType.enter,
    ActionType.shift,
    ActionType.tab,
    ActionType.space,
    ActionType.character,
    ActionType.characterMargin,
    ActionType.keyboardType,
    ActionType.symbol,
    ActionType.shortCommand,
    ActionType.none,
    ActionType.nextKeyboard,
];

export enum WidthType {
    input = "input",
    inputPercentage = "inputPercentage",
    percentage = "percentage",
    points = "points",
    available = "available",
};

export const WidthTypes = [
    WidthType.input,
    WidthType.inputPercentage,
    WidthType.percentage,
    WidthType.points,
    WidthType.available,
];

export enum KeyboardType {
    alphabetic = "alphabetic",
    classifySymbolic = "classifySymbolic",
    chinese = "chinese",
    chineseNineGrid = "chineseNineGrid",
    numericNineGrid = "numericNineGrid",
    custom = "custom",
    emojis = "emojis",
};

export const KeyboardTypes = [
    KeyboardType.alphabetic,
    KeyboardType.classifySymbolic,
    KeyboardType.chinese,
    KeyboardType.chineseNineGrid,
    KeyboardType.numericNineGrid,
    KeyboardType.custom,
    KeyboardType.emojis,
];

export enum ShortCmd {
    clear = "重输",
    trad = "繁简切换",
    eng = "中英切换",
    begin = "行首",
    second = "次选上屏",
    third = "三选上屏",
    schema = "上个输入方案",
    return = "换行",
    switcher = "RimeSwitcher",
};

export const ShortCmds: string[] = [
    ShortCmd.clear,
    ShortCmd.trad,
    ShortCmd.eng,
    ShortCmd.begin,
    ShortCmd.second,
    ShortCmd.third,
    ShortCmd.schema,
    ShortCmd.return,
    ShortCmd.switcher,
];

export class Action {
    type: string;
    text: string;
    kbd: string;
    cmd: string;

    constructor() {
        this.type = ActionType.character;
        this.text = "c";
        this.kbd = KeyboardType.alphabetic;
        this.cmd = ShortCmd.clear;
    }

    display(): string {
        switch (this.type) {
            case ActionType.character:
            case ActionType.characterMargin:
            case ActionType.symbol:
                return this.text;
            case ActionType.backspace:
                return "⌫";
            case ActionType.enter:
                return "↩";
            case ActionType.shift:
                return "⇧";
            case ActionType.tab:
                return "⇥";
            case ActionType.space:
                return "␣";
            case ActionType.keyboardType:
                if (this.kbd == KeyboardType.custom) {
                    return this.text;
                } else {
                    return this.kbd;
                }
            case ActionType.shortCommand:
                return this.cmd;
            case ActionType.none:
                return "";
            case ActionType.nextKeyboard:
                return "⌘";
            default:
                return "";
        }
    }

    render(): string {
        if (this.type === ActionType.character || this.type === ActionType.characterMargin || this.type === ActionType.symbol) {
            return this.type + "(" + this.text + ")";
        } else if (this.type === ActionType.keyboardType) {
            if (this.kbd === KeyboardType.custom) {
                return this.type + "(" + this.kbd + "(" + this.text + "))";
            } else {
                return this.type + "(" + this.kbd + ")";
            }
        } else if (this.type === ActionType.shortCommand) {
            return this.type + "(#" + this.cmd + ")";
        } else {
            return this.type;
        }
    }
};

export class SwipeModel {
    id: number;
    direction: string;
    action: Action;
    label: string;
    display: boolean;
    processByRIME: boolean;

    constructor() {
        this.id = Date.now();
        this.direction = Direction.up;
        this.action = new Action();
        this.label = "";
        this.display = false;
        this.processByRIME = true;
    }
};

export class KeyModel {
    id: number;
    action: Action;
    widthType: string;
    width: number;
    label: string;
    swipe: SwipeModel[];

    constructor() {
        this.id = Date.now();
        this.action = new Action();
        this.widthType = WidthType.input;
        this.width = 1;
        this.label = "";
        this.swipe = [];
    }

    render(): string[] {
        let label = this.label;
        if (label === "") label = "\"\"";
        return [
            "action: " + this.action.render(),
            "width: " + "input",
            "label: " + label,
            "swipe: " + "[]",
        ];
    }
};

export class RowModel {
    id: number;
    keys: KeyModel[];
    rowHeight: number;

    constructor() {
        this.id = Date.now();
        this.keys = [];
        this.rowHeight = 0;
    }

    render(): string[] {
        let keys: string[] = [];
        for (var key of this.keys) {
            let i = 0;
            for (var line of key.render()) {
                if (i == 0) {
                    line = "- " + line;
                } else {
                    line = "  " + line;
                }
                keys.push(line);
                i++;
            }
        }
        let rowHeight: string[] = [];
        if (this.rowHeight !== 0) {
            rowHeight.push("rowHeight: " + this.rowHeight);
        }
        return [
            ...rowHeight,
            "keys:",
            ...keys,
        ];
    }
};

export class KeyboardModel {
    id: number;
    name: string;
    rows: RowModel[];
    rowHeight: number;
    buttonInsets: string;

    constructor(name: string) {
        this.id = Date.now();
        this.name = name;
        this.rows = []
        this.rowHeight = 0;
        this.buttonInsets = "";
    }

    render(): string[] {
        let name = this.name;
        if (name === "") {
            name = "\"\"";
        }
        let rows: string[] = [];
        for (var row of this.rows) {
            let i = 0;
            for (var line of row.render()) {
                if (i == 0) {
                    line = "- " + line;
                } else {
                    line = "  " + line;
                }
                rows.push(line);
                i++;
            }
        }
        let rowHeight: string[] = [];
        if (this.rowHeight !== 0) {
            rowHeight.push("rowHeight: " + this.rowHeight);
        }
        let insets: string[] = [];
        if (this.buttonInsets !== "") {
            insets.push("buttonInsets: " + this.buttonInsets);
        }
        return [
            "name: " + name,
            ...rowHeight,
            ...insets,
            "rows:",
            ...rows,
        ];
    }
};
