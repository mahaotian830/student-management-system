// 权限控制模块
console.log('权限模块加载');

// 页面访问权限控制
function checkPagePermission() {
    const user = JSON.parse(sessionStorage.getItem('currentUser') || 'null');
    const currentPage = window.location.pathname.split('/').pop();
    
    // 需要登录的页面
    const protectedPages = ['dashboard.html', 'students.html', 'teachers.html', 'courses.html', 'scores.html'];
    
    // 需要管理员权限的页面
    const adminPages = ['admin.html'];
    
    // 检查是否访问了受保护页面
    if (protectedPages.includes(currentPage) || adminPages.includes(currentPage)) {
        if (!user) {
            alert('请先登录！');
            window.location.href = 'login.html';
            return false;
        }
    }
    
    // 检查管理员权限
    if (adminPages.includes(currentPage)) {
        if (user.role !== 'admin') {
            alert('需要管理员权限！');
            window.location.href = 'dashboard.html';
            return false;
        }
    }
    
    return true;
}

// 按钮权限控制
function setupButtonPermissions() {
    const user = JSON.parse(sessionStorage.getItem('currentUser') || '{}');
    
    // 根据用户角色显示/隐藏按钮
    if (user.role !== 'admin') {
        const adminButtons = document.querySelectorAll('.admin-only');
        adminButtons.forEach(btn => btn.style.display = 'none');
    }
    
    if (!user) {
        const userButtons = document.querySelectorAll('.user-only');
        userButtons.forEach(btn => btn.style.display = 'none');
    }
}

// 检查用户是否登录
function isLoggedIn() {
    return !!sessionStorage.getItem('currentUser');
}

// 检查是否为管理员
function isAdmin() {
    const user = JSON.parse(sessionStorage.getItem('currentUser') || '{}');
    return user.role === 'admin';
}

// 获取当前用户信息
function getCurrentUser() {
    return JSON.parse(sessionStorage.getItem('currentUser') || '{}');
}

// 页面加载时检查权限
document.addEventListener('DOMContentLoaded', function() {
    checkPagePermission();
    setupButtonPermissions();
    
    // 在页脚显示当前用户
    const user = getCurrentUser();
    if (user.username) {
        const footer = document.querySelector('footer');
        if (footer) {
            footer.innerHTML += `<p>当前用户: ${user.username} (${user.role})</p>`;
        }
    }
});

// API: 检查数据操作权限
function canEditData(dataType) {
    const user = getCurrentUser();
    
    if (dataType === 'user' && !isAdmin()) {
        alert('只有管理员可以管理用户！');
        return false;
    }
    
    return true;
}
