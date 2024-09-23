```markdown
# form-data-maker

`form-data-maker` is a simple package for converting JavaScript objects into `FormData`. This tool helps you easily create form data and prepare it for sending to a server.

## Installation

To install the package, use npm:

```bash
npm install form-data-maker
```

## Usage

To use `form-data-maker`, import it and then call the `objectToFormData` function with your desired data.

```javascript
import objectToFormData from 'form-data-maker';

// Sample data
const data = {
    name: 'John Doe',
    age: 30,
    files: [new File(['content'], 'file.txt')]
};

// Convert to FormData
const formData = objectToFormData(data);
```

### Parameters

- `obj`: The object you want to convert to `FormData`.
- `form`: (optional) An instance of `FormData` to which you want to append. If not provided, a new `FormData` instance will be created.
- `namespace`: (optional) A namespace for keys. This helps you organize the keys hierarchically.

### Example

```javascript
const userData = {
    username: 'user123',
    password: 'password123',
    profile: {
        firstName: 'John',
        lastName: 'Doe'
    }
};

const formData = objectToFormData(userData);
```

### Output

The `objectToFormData` function returns a `FormData` object that includes the input data as key-value pairs.

## Notes

- The function works recursively and can correctly process nested objects.
- If any input value is a `File` object, it will be properly added to the `FormData`.

## Contributing

If you have suggestions or want to help improve this package, we would love to hear from you!

## License

This project is licensed under the MIT License.
```

Feel free to let me know if you need any changes or additions!