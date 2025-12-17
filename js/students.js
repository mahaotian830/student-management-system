// 学生管理模块
function loadStudents() {
    const students = JSON.parse(localStorage.getItem('students') || '[]');
    const body = document.getElementById('studentBody');
    body.innerHTML = '';
    
    students.forEach(student => {
        const row = `<tr>
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${student.age}</td>
            <td>${student.class}</td>
            <td>
                <button onclick="editStudent(${student.id})">编辑</button>
                <button onclick="deleteStudent(${student.id})">删除</button>
            </td>
        </tr>`;
        body.innerHTML += row;
    });
}

function showAddForm() {
    const name = prompt("学生姓名:");
    const age = prompt("学生年龄:");
    const className = prompt("班级:");
    
    if (name && age && className) {
        const students = JSON.parse(localStorage.getItem('students') || '[]');
        const newId = students.length + 1;
        
        students.push({
            id: newId,
            name: name,
            age: parseInt(age),
            class: className
        });
        
        localStorage.setItem('students', JSON.stringify(students));
        loadStudents();
        alert("添加成功");
    }
}

function deleteStudent(id) {
    if (confirm("确认删除?")) {
        let students = JSON.parse(localStorage.getItem('students') || '[]');
        students = students.filter(s => s.id !== id);
        localStorage.setItem('students', JSON.stringify(students));
        loadStudents();
    }
}

function editStudent(id) {
    const students = JSON.parse(localStorage.getItem('students') || '[]');
    const student = students.find(s => s.id === id);
    
    if (student) {
        const newName = prompt("新姓名:", student.name);
        const newAge = prompt("新年龄:", student.age);
        
        if (newName && newAge) {
            student.name = newName;
            student.age = parseInt(newAge);
            localStorage.setItem('students', JSON.stringify(students));
            loadStudents();
        }
    }
}

function search() {
    const keyword = document.getElementById('search').value.toLowerCase();
    const rows = document.querySelectorAll('#studentBody tr');
    
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(keyword) ? '' : 'none';
    });
}

// 初始化
window.onload = loadStudents;
