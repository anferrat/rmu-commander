import { ControlButtons, SiteStatus, TimeSelectionOptions } from "./constants";

export const SiteStatusLabels = Object.freeze({
    [SiteStatus.ON]: 'On',
    [SiteStatus.OFF]: 'Off',
    [SiteStatus.INT]: 'Interrupting',
    [SiteStatus.AWT]: 'Awaiting'
})

export const ControlButtonLabels = Object.freeze({
    [ControlButtons.CONNECT]: 'Connect',
    [ControlButtons.INTERRUPT]: 'Start interrupting',
    [ControlButtons.TURN_ON]: 'Turn on',
    [ControlButtons.REFRESH]: 'Refresh',
    [ControlButtons.SHUT_OFF]: 'Shut off'
})

export const TimeSelectionOptionLabels = Object.freeze({
    [TimeSelectionOptions.ONE_HOUR]: 'One hour',
    [TimeSelectionOptions.TWO_HOURS]: 'Two hours',
    [TimeSelectionOptions.FOUR_HOURS]: 'Four hours',
    [TimeSelectionOptions.EIGHT_HOURS]: 'Eight hours',
    [TimeSelectionOptions.TWELVE_HOURS]: 'Twelve hours',
    [TimeSelectionOptions.TWENTY_FOUR_HOURS]: '24 hours',
    [TimeSelectionOptions.UNTIL_3_PM]: 'Until 3 PM',
    [TimeSelectionOptions.UNTIL_6_PM]: 'Until 6 PM',
    [TimeSelectionOptions.UNTIL_12_AM]: 'Until midnight'
})