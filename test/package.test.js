import objectToFormData from "../index";

describe('objectToFormData', () => {
    it('should convert a simple object to FormData', () => {
        const obj = { name: 'John Doe', age: 30 };
        const formData = objectToFormData(obj);

        expect(formData.get('name')).toBe('John Doe');
        expect(formData.get('age')).toBe('30');
    });

    it('should handle nested objects', () => {
        const obj = { user: { name: 'John Doe', age: 30 } };
        const formData = objectToFormData(obj);

        expect(formData.get('user[name]')).toBe('John Doe');
        expect(formData.get('user[age]')).toBe('30');
    });

    it('should handle arrays', () => {
        const obj = { hobbies: ['reading', 'coding'] };
        const formData = objectToFormData(obj);

        expect(formData.get('hobbies[0]')).toBe('reading');
        expect(formData.get('hobbies[1]')).toBe('coding');
    });

    it('should handle files', () => {
        const file = new File(['file content'], 'test.txt', { type: 'text/plain' });
        const obj = { profilePicture: file };
        const formData = objectToFormData(obj);

        expect(formData.get('profilePicture')).toBe(file);
    });

    it('should handle complex nested objects and arrays', () => {
        const obj = {
            name: 'John Doe',
            address: {
                street: '123 Main St',
                city: 'New York',
            },
            hobbies: ['reading', 'coding'],
            education: [
                { degree: 'BSc', field: 'Computer Science' },
                { degree: 'MSc', field: 'Software Engineering' }
            ]
        };
        const formData = objectToFormData(obj);

        expect(formData.get('name')).toBe('John Doe');
        expect(formData.get('address[street]')).toBe('123 Main St');
        expect(formData.get('address[city]')).toBe('New York');
        expect(formData.get('hobbies[0]')).toBe('reading');
        expect(formData.get('hobbies[1]')).toBe('coding');
        expect(formData.get('education[0][degree]')).toBe('BSc');
        expect(formData.get('education[1][field]')).toBe('Software Engineering');
    });

    it('should use form parameter instead new form data', () => {
        const form = new FormData();
        form.append('name' , 'Reza');

        const data = {age: 18 , job: 'developer'};

        const formData = objectToFormData(data , form)

        expect(formData.get('name')).toBe('Reza')
        expect(formData.get('age')).toBe('18')
    });

    it('should prefix keys with namespace', () => {
        const obj = { name: 'John Doe', age: 30 };
        const formData = objectToFormData(obj, undefined, 'user');

        expect(formData.get('user[name]')).toBe('John Doe');
        expect(formData.get('user[age]')).toBe('30');
    });

    it('should handle nested objects with namespace', () => {
        const obj = { user: { name: 'John Doe', age: 30 } };
        const formData = objectToFormData(obj, undefined, 'user');

        expect(formData.get('user[user][name]')).toBe('John Doe');
        expect(formData.get('user[user][age]')).toBe('30');
    });

    it('should handle arrays with namespace', () => {
        const obj = { hobbies: ['reading', 'coding'] };
        const formData = objectToFormData(obj, undefined, 'user');

        expect(formData.get('user[hobbies][0]')).toBe('reading');
        expect(formData.get('user[hobbies][1]')).toBe('coding');
    });
});
