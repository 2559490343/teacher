import course from './course';
import sign from './sign';
import question from './question';
import publish from './publish';
import student from './student';
import correct from './correct';
import login from './login';
const api = {
    ...course,
    ...sign,
    ...question,
    ...publish,
    ...student,
    ...correct,
    ...login
}
export default api;