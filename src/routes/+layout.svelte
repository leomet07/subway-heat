<script lang="ts">
    import Navbar from "$lib/components/Navbar.svelte";
    import "@picocss/pico";
</script>

<Navbar />
<main class="container">
    <slot />
</main>
