<script lang="ts">
    import Navbar from "$lib/components/Navbar.svelte";
    import "@picocss/pico";
</script>

<Navbar />
<main class="container">
    <slot />
</main>

<style scoped>
    .container {
        max-width: 1000px;
        padding-bottom: 5vh;
    }
</style>
