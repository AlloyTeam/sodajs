// 标识符
export const IDENTOR_REG = /[a-zA-Z_\$]+[\w\$]*/g;
export const STRING_REG = /"([^"]*)"|'([^']*)'/g
export const NUMBER_REG = /\d+|\d*\.\d+/g;

export const OBJECT_REG = /[a-zA-Z_\$]+[\w\$]*(?:\s*\.\s*(?:[a-zA-Z_\$]+[\w\$]*|\d+))*/g;

// 非global 做test用
export const OBJECT_REG_NG = /[a-zA-Z_\$]+[\w\$]*(?:\s*\.\s*(?:[a-zA-Z_\$]+[\w\$]*|\d+))*/;

export const ATTR_REG = /\[([^\[\]]*)\]/g;
export const ATTR_REG_NG = /\[([^\[\]]*)\]/;
export const ATTR_REG_DOT = /\.([a-zA-Z_\$]+[\w\$]*)/g;

export const NOT_ATTR_REG = /[^\.|]([a-zA-Z_\$]+[\w\$]*)/g;

export const OR_REG = /\|\|/g;

export const OR_REPLACE = "OR_OPERATOR\x1E";

export const CONST_PRIFIX = "_$C$_";
export const CONST_REG = /^_\$C\$_/;
export const CONST_REGG = /_\$C\$_[^\.]+/g;
export const VALUE_OUT_REG = /\{\{([^\}]*)\}\}/g;
export const ONLY_VALUE_OUT_REG = /^\{\{([^\}]*)\}\}$/;
