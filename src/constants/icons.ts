import { ControlButtons, TimeSelectionOptions } from "./constants";

export const ControlButtonIconNames = {
    [ControlButtons.CONNECT]: 'activity',
    [ControlButtons.INTERRUPT]: 'play-circle',
    [ControlButtons.TURN_ON]: 'radio-button-on',
    [ControlButtons.REFRESH]: 'refresh',
    [ControlButtons.SHUT_OFF]: 'stop-circle'
} as const


export const TimeSelectionOptionIconNames = Object.freeze({
    [TimeSelectionOptions.ONE_HOUR]: 'corner-down-right-outline',
    [TimeSelectionOptions.TWO_HOURS]: 'corner-down-right-outline',
    [TimeSelectionOptions.FOUR_HOURS]: 'corner-down-right-outline',
    [TimeSelectionOptions.EIGHT_HOURS]: 'corner-down-right-outline',
    [TimeSelectionOptions.TWELVE_HOURS]: 'corner-down-right-outline',
    [TimeSelectionOptions.TWENTY_FOUR_HOURS]: 'corner-down-right-outline',
    [TimeSelectionOptions.UNTIL_3_PM]: 'clock-outline',
    [TimeSelectionOptions.UNTIL_6_PM]: 'clock-outline',
    [TimeSelectionOptions.UNTIL_12_AM]: 'clock-outline'
})