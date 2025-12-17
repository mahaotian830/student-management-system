// LocalStorage 数据管理模块
console.log('LocalStorage模块已加载');

// 用户数据管理
const UserStorage = {
    // 初始化用户数据
    initUsers() {
        if (!localStorage.getItem('users')) {
            const defaultUsers = [
                {
                    id: 1,
                    username: 'admin',
                    password: 'admin123', // 实际项目应该加密
                    email: 'admin@system.com',
                    phone: '13800138000',
                    role: 'admin',
                    createdAt: new Date().toISOString()
                },
                {
                    id: 2,
                    username: 'student1',
                    password: '123456',
                    email: 'student1@qq.com',
                    phone: '13900139001',
                    role: 'user',
                    createdAt: new Date().toISOString()
                }
            ];
            localStorage.setItem('users', JSON.stringify(defaultUsers));
        }
    },

    // 获取所有用户
    getAllUsers() {
        return JSON.parse(localStorage.getItem('users') || '[]');
    },

    // 添加新用户
    addUser(user) {
        const users = this.getAllUsers();
        // 检查用户名是否已存在
        if (users.some(u => u.username === user.username)) {
            return { success: false, message: '用户名已存在' };
        }
        
        // 生成新ID
        const newId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
        user.id = newId;
        user.createdAt = new Date().toISOString();
        
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
        return { success: true, message: '注册成功' };
    },

    // 验证用户登录
    validateUser(username, password) {
        const users = this.getAllUsers();
        const user = users.find(u => u.username === username && u.password === password);
        return user || null;
    },

    // 删除用户（仅管理员）
    deleteUser(userId) {
        const users = this.getAllUsers().filter(u => u.id !== userId);
        localStorage.setItem('users', JSON.stringify(users));
    }
};

// 学生数据管理
const StudentStorage = {
    initStudents() {
        if (!localStorage.getItem('students')) {
            const defaultStudents = [
                {
                    id: 1,
                    name: '张三',
                    age: 18,
                    gender: '男',
                    className: '高三(1)班',
                    phone: '13800138002',
                    email: 'zhangsan@qq.com',
                    createdAt: new Date().toISOString()
                },
                {
                    id: 2,
                    name: '李四',
                    age: 17,
                    gender: '女',
                    className: '高二(2)班',
                    phone: '13800138003',
                    email: 'lisi@qq.com',
                    createdAt: new Date().toISOString()
                }
            ];
            localStorage.setItem('students', JSON.stringify(defaultStudents));
        }
    },

    getAllStudents() {
        return JSON.parse(localStorage.getItem('students') || '[]');
    },

    addStudent(student) {
        const students = this.getAllStudents();
        const newId = students.length > 0 ? Math.max(...students.map(s => s.id)) + 1 : 1;
        student.id = newId;
        student.createdAt = new Date().toISOString();
        
        students.push(student);
        localStorage.setItem('students', JSON.stringify(students));
        return newId;
    },

    updateStudent(updatedStudent) {
        const students = this.getAllStudents();
        const index = students.findIndex(s => s.id === updatedStudent.id);
        if (index !== -1) {
            students[index] = { ...students[index], ...updatedStudent };
            localStorage.setItem('students', JSON.stringify(students));
            return true;
        }
        return false;
    },

    deleteStudent(studentId) {
        const students = this.getAllStudents().filter(s => s.id !== studentId);
        localStorage.setItem('students', JSON.stringify(students));
    }
};

// 初始化所有数据
function initAllData() {
    UserStorage.initUsers();
    StudentStorage.initStudents();
    console.log('所有数据初始化完成');
}

// 页面加载时初始化
window.onload = function() {
    initAllData();
};
