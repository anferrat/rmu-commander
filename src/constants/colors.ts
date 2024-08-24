import { ControlButtons, SiteStatus } from "./constants";

export const SiteStatusStatuses = Object.freeze({
    [SiteStatus.ON]: 'success',
    [SiteStatus.OFF]: 'danger',
    [SiteStatus.INT]: 'warning',
    [SiteStatus.AWT]: 'info'
})

export const ControlButtonStatuses = Object.freeze({
    [ControlButtons.CONNECT]: 'primary',
    [ControlButtons.INTERRUPT]: 'warning',
    [ControlButtons.TURN_ON]: 'success',
    [ControlButtons.REFRESH]: 'primary',
    [ControlButtons.SHUT_OFF]: 'danger'
})