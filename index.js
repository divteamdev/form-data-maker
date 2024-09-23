export default function objectToFormData(obj, form, namespace) {
    let formData = form || new FormData();
    let formKey;

    // if the obj is an array, assume that it's an array of objects
    for(let property in obj) {
        if(obj.hasOwnProperty(property)) {
            if(namespace) {
                formKey = namespace + '[' + property + ']';
            } else {
                formKey = property;
            }

            // if the property is an object, but not a File, use recursion.
            if(typeof obj[property] === 'object' && !(obj[property] instanceof File)) {
                objectToFormData(obj[property], formData, formKey);
            } else {
                // if it's a string or a File object
                formData.append(formKey, obj[property]);
            }
        }
    }

    return formData;
}