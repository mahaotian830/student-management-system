// 用户认证模块
console.log('用户认证模块已加载');

// 登录功能
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // 简单验证
    if (!username || !password) {
        alert('请填写用户名和密码');
        return;
    }
    
    // 检查用户是否存在（后续会从LocalStorage读取）
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
        // 创建session
        sessionStorage.setItem('currentUser', JSON.stringify(user));
        alert(`欢迎回来，${username}！`);
        window.location.href = 'dashboard.html';
    } else {
        alert('用户名或密码错误！');
    }
}

// 检查登录状态
function checkLogin() {
    const user = sessionStorage.getItem('currentUser');
    if (!user && window.location.pathname.includes('dashboard.html')) {
        alert('请先登录！');
        window.location.href = 'login.html';
    }
}

// 登出功能
function logout() {
    sessionStorage.removeItem('currentUser');
    alert('已登出');
    window.location.href = 'index.html';
}

// 页面加载时检查登录状态
window.onload = function() {
    if (window.location.pathname.includes('dashboard.html') || 
        window.location.pathname.includes('admin.html')) {
        checkLogin();
    }
};
