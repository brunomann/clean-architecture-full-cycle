export type NotificationErrorProps = {
    message: string;
    context: string;
}

export default class Notification
{
    private _errors: NotificationErrorProps[] = [];

    addError(notification: NotificationErrorProps){
        this._errors.push(notification);
    }

    messages(context?: string){
        let messages = "";
        this._errors.forEach( notification => {
            if(notification.context === context || context === undefined){
                messages +=  `${notification.context}: ${notification.message},`
            }
        });

        return messages;
    }

    hasErrors(): boolean {
        return this._errors.length > 0;
    }

    errors(): NotificationErrorProps[]{
        return this._errors;
    }
}