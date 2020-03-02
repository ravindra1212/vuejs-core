/**
 * The Notifcation service for defind notification methods
 */
export default class NotificationService {

    /**
     * Initialise http service globally
     */
    constructor(thisGlobalInstance) {

        this.thisContainer = thisGlobalInstance;
        this.zIndex = 10002;
    }

    /**
     * Success notification showing here
     * @param {*} message 
     * @param {*} options 
     */
    success(message, options = {}) {

        this.thisContainer.$message(
            Object.assign({
                message: message,
                type   : 'success',
                showClose: true,
                zIndex : this.zIndex
            }, options)
        );
    }

    /**
     * Error notification showing here
     * @param {*} message 
     * @param {*} showClose 
     */
    error(message, options = {}) {

        this.thisContainer.$message( Object.assign({
            message: message,
            type   : 'error',
            showClose: true,
            zIndex : this.zIndex
        }, options));
    }

    /**
     * Warn notification showing here
     * @param {*} message 
     * @param {*} showClose 
     */
    warn(message, options = {}) {

        this.thisContainer.$message(Object.assign({
            message: message,
            type   : 'warning',
            showClose: true,
            zIndex : this.zIndex
        }, options));
    }

    /**
     * info notification showing here
     * @param {*} message 
     * @param {*} showClose 
     */
    info(message, options = {}) {

        this.thisContainer.$message(Object.assign({
            message: message,
            type   : 'info',
            showClose: true,
            zIndex : this.zIndex
        }, options));
    }

    /**
     * Processing notification showing here
     * @param {*} message 
     * @param {*} showClose 
     */
    processing(message, options = {}) {

        this.thisContainer.$message(Object.assign({
            message: message,
            type   : 'loading',
            showClose: true,
            zIndex : this.zIndex
        }, options));
    }

    /**
     * Closing Notification
     */
    closeAll() {
        this.thisContainer.$message.closeAll();
    }
    
    /**
     * Show confirmation box
     * 
     * @param object
     * @param sucessCallback
     * @param errorCallback
     * 
     * @return void
     */
    confirm(object, yesCallback = false, noCallback = false) 
    {
        let defaultConfig = {
            title   : 'Delete Confirmation..!!',
            content : 'Something went downhill, this may be serious',
            type    : 'red',
            typeAnimated: true,
            buttons: {
                
                tryAgain: {
                    text: 'Yes',
                    btnClass: 'btn-red',
                    action: (data) => {

                        if (_.isFunction(yesCallback)) {
                            yesCallback.call(this, data);
                        }
                    }
                },
                close: {

                    text: 'No',
                    action: (data) => {

                        if (_.isFunction(noCallback)) {
                            noCallback.call(this, data);
                        }
                    }
                }
            }
        };

        Object.assign(defaultConfig, object);

        $.confirm(defaultConfig);

    }

    /**
     * Show confirmation box
     * 
     * @param object
     * @param sucessCallback
     * @param errorCallback
     * 
     * @return void
     */
    simpleAlert(object, okCallback = false) 
    {
        let defaultConfig = {
            title   : 'Congratulations..!!',
            content : 'Something went downhill, this may be serious',
            type    : 'green',
            typeAnimated: true,
            buttons: {

                close: {

                    text: 'Ok',
                    action: (data) => {

                        if (_.isFunction(okCallback)) {
                            okCallback.call(this, data);
                        }
                    }
                }
            }
        };

        Object.assign(defaultConfig, object);

        $.confirm(defaultConfig);

    }

    /**
     * Show confirmation box For Set As Default
     * 
     * @param object
     * @param sucessCallback
     * @param errorCallback
     * 
     * @return void
     */
    setAsDefault(object, yesCallback = false, noCallback = false) 
    {
        let defaultConfig = {
            title   : 'Set As Default Confirmation..!!',
            content : 'Something went downhill, this may be serious',
            type    : 'green',
            typeAnimated: true,
            buttons: {
                
                tryAgain: {
                    text: 'Yes',
                    btnClass: 'btn-green',
                    action: (data) => {

                        if (_.isFunction(yesCallback)) {
                            yesCallback.call(this, data);
                        }
                    }
                },
                close: {

                    text: 'No',
                    action: (data) => {

                        if (_.isFunction(noCallback)) {
                            noCallback.call(this, data);
                        }
                    }
                }
            }
        };

        Object.assign(defaultConfig, object);

        $.confirm(defaultConfig);

    }
}