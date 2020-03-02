


/**
 * The http service for manager here axios http request
 * Handle here global services
 */
export default class HttpService {

    /**
     * Initialise http service globally
     */
    constructor(thisGlobalInstance) {

        this.thisContainer = thisGlobalInstance;
    }
    
    /**
     * Handle Succes reponse Object
     * @param {*} successResponse 
     * @param {*} callback 
     */
    onSuccess(successResponse, callback, notify = true) {
        
        let requestData = successResponse.data;

        // Success 🎉
        if (_.isFunction(callback)) {
            callback.call(this, requestData);
        }

        // Showing message when got [notify] is true
        if (notify && requestData.message) {
            // Showing Message
            this.thisContainer.$notify.success(requestData.message);
        }

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
            
        }
    
    }

    /**
     * Handle error section 
     * @param {[object]} error [endpoint url ]
     * @param {[function]} errorCallback  error response call back
     * @return void
     */
    onFail(error, errorCallback = false) {
      
        // Error 😨
        if (error.response) {

            let errorData = error.response.data;

            /*
             * The request was made and the server responded with a
             * status code that falls out of the range of 2xx
             */
            // console.log(error.response.data);
            // console.log(error.response.status);
            // console.log(error.response.headers);

            if (errorData.message) {

                this.thisContainer.$notify.error(errorData.message);
            }

            if (error.response.status === 401) { // Unauthorized

                window.location = '/login';

                return false;
            }

            // Get error reponse callback data
            if (_.isFunction(errorCallback)) {
                errorCallback.call(this, error.response.data);
            }

        } else if (error.request) {
            /*
             * The request was made but no response was received, `error.request`
             * is an instance of XMLHttpRequest in the browser and an instance
             * of http.ClientRequest in Node.js
             */
            // console.log(error.request);

            

        } else {

            // Something happened in setting up the request and triggered an Error
            // console.log('Error', error.message);

            this.thisContainer.$notify.error(error.message);

        }

    }

    /**
     * This is get method of axios
     * @param  {[string]} endPoint    [endpoint url ]
     * @param  {[function]} successCallback  success response call back
     * @param  {[function]} errorCallback  error response call back
     * @return void
     */
    get(endPoint, successCallback, errorCallback = '') {
        
        axios.get(endPoint, {
            headers: {
                'Authorization': this.thisContainer.$globals.getToken()
            }
        }).then((response) => {

            // Handle here success response
            this.onSuccess(response, successCallback, false);

        }).catch((error) => {

            // Hamdle here error section
            this.onFail(error, errorCallback);
           
        });

    }


    /**
     * This is get method of axios
     * @param  {[string]} endPoint [endpoint url ]
     * @param  {[object]} data    [ Object data]
     * @param  {[function]} successCallback  success response call back
     * @param  {[function]} errorCallback  error response call back
     * @return void
     */
    post(endPoint, data, successCallback, errorCallback = '') {
        
        axios.post(endPoint, data, {
            headers: {
                'Authorization': this.thisContainer.$globals.getToken()
            }
        }).then((response) => {

            // Handle here success response
            this.onSuccess(response, successCallback);

        }).catch((error) => {

            // Hamdle here error section
            this.onFail(error, errorCallback);
           
        });

    }

    /**
     * This is post method of axios
     * @param  {[string]} endPoint [endpoint url ]
     * @param  {[object]} data    [ Object data]
     * @return void
     */

    axiosPost(endPoint, data) {
        
        return axios.post(endPoint, data, {
            headers: {
                'Authorization': this.thisContainer.$globals.getToken()
            }
        });

    }

    /**
     * This is post method of axios
     * @param  {[string]} endPoint [endpoint url ]
     * @param  {[object]} data    [ Object data]
     * @return void
     */

    axiosPut(endPoint, data) {
        
        return axios.put(endPoint, data, {
            headers: {
                'Authorization': this.thisContainer.$globals.getToken()
            }
        });

    }

    /**
     * Use for upload file 
     * @param  {[string]} endPoint [endpoint url ]
     * @param  {[object]} data    [ Object data]
     * @return void
     */
    processUpload(endPoint, data, successCallback, errorCallback = false) {

        let dataKeys = Object.keys(data);

        let formData = new FormData();
        
        for (let index = 0; index < dataKeys.length; index++) {
            const key = dataKeys[index];
            formData.append(key, data[key]);
        }

        // Showing message when uploading file
        // this.thisContainer.$notify.processing('Processing...', { position : 'center', showClose : true });

        return axios.post(endPoint, formData, {
            headers: {
                'Authorization': this.thisContainer.$globals.getToken(),
                'Content-Type' : 'multipart/form-data'
            }
        }).then((response) => {

            // Close Notifcation
            // this.thisContainer.$notify.closeAll();

            // Handle success response here
            this.onSuccess(response, successCallback);

        }).catch((error) => {

            // Close Notifcation
            // this.thisContainer.$notify.closeAll(); 
            
            // Hamdle here error section
            // this.onFail(error, errorCallback);

            this.onFail(error, (errorResponse) => {

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
     * This is delete method of axios
     * @param  {[string]} endPoint [endpoint url ]
     * @param  {[object]} data    [ Object data]
     * @param  {[function]} successCallback  success response call back
     * @param  {[function]} errorCallback  error response call back
     * @return void
     */
    delete(endPoint, successCallback, errorCallback = false) {
        
        axios.delete(endPoint, {
            headers: {
                'Authorization': this.thisContainer.$globals.getToken()
            }
        }).then((response) => {

            // Handle success response here
            this.onSuccess(response, successCallback);

        }).catch((error) => {

            // Hamdle here error section
            this.onFail(error, errorCallback);
           
        });

    }
    

}