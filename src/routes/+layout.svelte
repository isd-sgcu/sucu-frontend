<script lang="ts">
    import Footer from '$lib/components/Footer/Footer.svelte';
    import Navbar from '$lib/components/Navbar.svelte';
    import Sidebar from '$lib/components/Sidebar/Sidebar.svelte';
    import { getMe } from '$lib/api/getme';
    import { getDecryptedToken } from '$lib/api/getToken';
    import '../styles/app.css';
    import { onMount } from 'svelte';

    let isAdminPage = false;
    let menuItems = [
        { title: 'ประกาศ', href: '/admin' },
        { title: 'เอกสาร', href: '/admin/documents' },
        { title: 'สถิติ และ งบประมาณ', href: '/admin/stats' },
        { title: 'จัดการผู้ใช้งาน', href: '/admin/users' }
    ];

    let user = {
        name: 'Not found',
        lastname: 'Not found',
        role: 'Not found',
        id: 'Not found'
    };

    onMount(async () => {
        isAdminPage = window.location.pathname.startsWith('/admin');
        if (isAdminPage) {
            const token = getDecryptedToken();
            if (token) {
                try {
                    const userData = await getMe(token);
                    user = {
                        name: userData.result.first_name,
                        lastname: userData.result.last_name,
                        role: userData.result.role,
                        id: userData.result.id
                    };
                } catch (error) {
                    console.error('Failed to fetch user data:', error);
                }
            } else {
                console.log('No token found');
                window.location.replace('/auth/login');
            }
        }
    });
</script>

{#if isAdminPage}
    <div class="min-h-screen bg-white z-50 w-full">
        <Sidebar {menuItems} {user} />
		<slot />
    </div>
{:else}
    <div>
        <Navbar />
        <slot />
        <Footer />
    </div>
{/if}