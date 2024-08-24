export enum CommandStatus {
    AWAIT_CONFIRM = 'AWAIT_CONFIRM',
    DONE_CONFIRMED = 'DONE_CONFIRMED',
    DONE_NO_CONFIRM = 'DONE_NO_CONFIRM',
    ERROR = 'ERROR',
    NO_COMMAND = 'NO_COMMAND'
}

export enum SiteStatus {
    ON = 'On',
    OFF = 'Off',
    INT = 'Interrupting',
    AWT = 'Awaiting_response'
}

export enum SendCommandTypes {
    TURN_ON = 'TURN_ON',
    SHUT_OFF = 'TURN_OFF',
    START_INTERRUPTING = 'START_INTERRUPTING'
}

export enum ControlButtons {
    INTERRUPT = 'INTERRUPT',
    SHUT_OFF = 'SHUT_OFF',
    TURN_ON = 'TURN_ON',
    CONNECT = 'CONNECT',
    REFRESH = 'REFSRESH'
}

export enum TimeSelectionOptions {
    ONE_HOUR = 'ONE_HOUR',
    TWO_HOURS = 'TWO_HOURS',
    FOUR_HOURS = 'FOUR_HOURS',
    EIGHT_HOURS = 'EIGHT_HOURS',
    TWELVE_HOURS = 'TWELVE_HOURS',
    TWENTY_FOUR_HOURS = 'TWENTY_FOUR_HOURS',
    UNTIL_3_PM = 'UNTIL_3_PM',
    UNTIL_6_PM = 'UNTIL_6_PM',
    UNTIL_12_AM = 'UNTIL_12_AM'
}