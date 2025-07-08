<header class="header">
    <hgroup>
        <h1 class="title">Subway Heat Map</h1>
        <p>
            Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to
            read the documentation
        </p>
    </hgroup>
</header>

<section>
    <!-- Platform -->
    <article class="card">
        <img src="/img/platform_rh.jpg" alt="Platform Relative Humidity" />
        <p>Caption about platform rh</p>
    </article>
    <article class="card">
        <img src="/img/platform_ta.jpg" alt="Platform Air Temperatures" />
        <p>Caption about platform at</p>
    </article>
    <!-- Street -->
    <article class="card">
        <img src="/img/street_rh.jpg" alt="Street Relative Humidity" />
        <p>Caption about street rh</p>
    </article>
    <article class="card">
        <img src="/img/street_ta.jpg" alt="Street Air Temperatures" />
        <p>Caption about sreet at</p>
    </article>
    <!-- Diffs -->
    <article class="card">
        <img src="/img/ta_diff.jpg" alt="Difference in Air Temperatures" />
        <p>Caption about difference in air temperatures</p>
    </article>
    <article class="card">
        <img src="/img/rh_diff.jpg" alt="Difference in Relative Humidity" />
        <p>Caption about difference in relative humidity</p>
    </article>
</section>

<style scoped>
    .card img {
        width: 100%;
    }

    .card p {
        float: right;
    }
</style>
