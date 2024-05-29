import { useState } from "react";

const addStudentUrl = 'http://localhost:3300/api/v1/student';

const AddStudent = ({dataChanged}) => {
    const [userData, setUserData] = useState(JSON.parse(localStorage.getItem('userData')) ?? {});
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [course, setCourse] = useState('');

    const createHandler = () => {
        const createData = async (url, data) => {
            try {
            const result = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: { 
                    "Content-Type": "application/json", 
                    "Authorization": userData.token
                }
            });
            result.json()
            .then(jsonData => dataChanged())
            .catch(error => console.log(error));
        }
        catch (error) {
            console.error(error)
        }
        }

        const payload = {
            name: name,
            email: email,
            course: course
        }
        createData(addStudentUrl, payload)
    }

    return(
        <>
        <h6>Add Student</h6>
            <table>
                <tbody>
                    <tr>
                        <td>Enter Name</td>
                        <td><input type="text" value={name} onChange={(e) => setName(e.target.value)}/></td>
                    </tr>
                    <tr>
                        <td>Enter Email</td>
                        <td><input type="text" value={email} onChange={(e) => setEmail(e.target.value)}/></td>
                    </tr>
                    <tr>
                        <td>Enter Course</td>
                        <td><input type="text" value={course} onChange={(e) => setCourse(e.target.value)}/></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td><button onClick={createHandler}>Create</button></td>
                    </tr>
                </tbody>
            </table>
            <hr/>
        </>
    );
}

export default AddStudent;