const PRIMARY_COLOR_0 = (opacity = 1) => `rgba(45, 45, 45, ${opacity})`;
const PRIMARY_COLOR_1 = (opacity = 1) => `rgba(71, 69, 84, ${opacity})`;
const PRIMARY_COLOR_2 = (opacity = 1) => `rgba(172,169,187, ${opacity})`;

const ALT_COLOR_0 = (opacity = 1) => `rgba(255, 255, 255, ${opacity})`;

export const BACKGROUND_COLOR = `${PRIMARY_COLOR_1()}`;
export const ALT_BACKGROUND_COLOR = `${ALT_COLOR_0()}`;

export const TOPBAR_COLOR = `${PRIMARY_COLOR_0()}`;
export const TEXT_COLOR = `${PRIMARY_COLOR_2()}`;
export const SEPARATOR_COLOR = `${PRIMARY_COLOR_2(0.05)}`;
