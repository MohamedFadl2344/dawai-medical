document.addEventListener('DOMContentLoaded', function() {
    // Sidebar Toggle
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.querySelector('.sidebar');
    const sidebarClose = document.querySelector('.sidebar-close');
    const overlay = document.createElement('div');
    overlay.className = 'sidebar-overlay';
    document.body.appendChild(overlay);

    function toggleSidebar() {
        sidebar.classList.toggle('active');
        document.body.classList.toggle('sidebar-open');
        overlay.classList.toggle('active');
    }

    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleSidebar();
        });
    }

    // Handle sidebar close button
    const sidebarCloseBtn = document.querySelector('.sidebar-close');
    if (sidebarCloseBtn) {
        sidebarCloseBtn.addEventListener('click', function() {
            sidebar.classList.remove('active');
            document.body.classList.remove('sidebar-open');
            overlay.classList.remove('active');
        });
    }

    overlay.addEventListener('click', function() {
        if (sidebar.classList.contains('active')) {
            toggleSidebar();
        }
    });

    // Close sidebar when window is resized to larger screen
    window.addEventListener('resize', function() {
        if (window.innerWidth > 991.98) {
            sidebar.classList.remove('active');
            document.body.classList.remove('sidebar-open');
            overlay.classList.remove('active');
        }
    });

    // Handle notifications dropdown
    const notificationDropdowns = document.querySelectorAll('.notification-dropdown .dropdown-toggle');
    notificationDropdowns.forEach(dropdown => {
        dropdown.addEventListener('click', function(e) {
            e.stopPropagation();
            const dropdownMenu = this.nextElementSibling;
            dropdownMenu.classList.toggle('show');
        });
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        const dropdowns = document.querySelectorAll('.dropdown-menu.show');
        dropdowns.forEach(dropdown => {
            if (!dropdown.contains(e.target)) {
                dropdown.classList.remove('show');
            }
        });
    });
});
