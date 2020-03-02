
export default class FormService {
 
    // ...
    constructor(thisInstance, formObjectName) {

        this.thisContainer = thisInstance;
        this.formObjectName = formObjectName;
        this.formObject = thisInstance[formObjectName];
    }

    /**
     * build server error object
     * @return void
     */
    setServerErrors(requestData) {

        // If found server validation errors
        if (_.has(requestData, 'errors') && requestData.errors) {
            
            (requestData.errors).forEach(item => {

                // let formFields = (this.thisContainer.$v[this.formObjectName]);
                // let serverFieldName = item['field'];
               
                this.thisContainer.$notify.error(item['message']);
                // Form fields
                // if (_.has(formFields, serverFieldName)) { // Form Fields

                //     let fieldVObj = formFields[serverFieldName];

                //     // Object.assign(fieldVObj, {
                //     //     'server_error' : item['message']
                //     // });
                //   //  this.thisContainer.$set(this.thisContainer.$v[this.formObjectName][serverFieldName], 'server_error', item['message']);

                //     this.thisContainer.$notify.error(item['message']);
                    
                // }

            });

            this.thisContainer.$v.$reset();
            this.thisContainer.$v.$touch();
        }
    
    }

    /**
     * Process the form to server with handlling all data
     * @param {*} url 
     * @param {*} data 
     * @param {*} callback 
     * @return void
     */
    process(url, data, successCallback, errorCallback = false) {
        
        // check the form is valid or not
        if (_.has(this.thisContainer, '$v') && this.thisContainer.$v.$invalid) {

            this.thisContainer.$notify.error('Validation error found.');

            return false;
        }

        // This is axios response
        this.thisContainer
            .$httpService
            .axiosPost(url, data).then((response) => {

            this.thisContainer.$httpService.onSuccess(response, successCallback, true);

        }).catch((error) => {

            this.thisContainer.$httpService.onFail(error, (errorResponse) => {

                let requestData = errorResponse.data;

                // Set server errors
                this.setServerErrors(requestData);

                // Return error callback 
                if (_.isFunction(errorCallback)) {
                    errorCallback.call(this, requestData);
                }

            });
           
        });

    }

    /**
     * Process the form to server with handlling all data
     * @param {*} url 
     * @param {*} data 
     * @param {*} callback 
     * @return void
     */
    put(url, data, successCallback, errorCallback = false) {

        // check the form is valid or not
        if (_.has(this.thisContainer, '$v') && this.thisContainer.$v.$invalid) {

            this.thisContainer.$notify.error('Validation error found.');

            return false;
        }

        // This is axios response
        this.thisContainer
            .$httpService
            .axiosPut(url, data).then((response) => {

            this.thisContainer.$httpService.onSuccess(response, successCallback, true);

        }).catch((error) => {

            this.thisContainer.$httpService.onFail(error, (errorResponse) => {

                let requestData = errorResponse.data;

                // Set server errors
                this.setServerErrors(requestData);

                // Return error callback 
                if (_.isFunction(errorCallback)) {
                    errorCallback.call(this, requestData);
                }

            });
           
        });

    }


   
}