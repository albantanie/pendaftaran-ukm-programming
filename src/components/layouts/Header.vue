<template>
    <div>
        <nav class="navbar navbar-expand-sm navbar-light bg-primary">
            <div class="container">
                <router-link to="/" class="navbar-brand text-white">Programming Club</router-link>
                <button class="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse"
                    data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId" aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="collapsibleNavId">
                    <ul class="navbar-nav me-auto mt-2 mt-lg-0">
                        <li class="nav-item">
                            <router-link to="/" class="nav-link active text-white" aria-current="page">Home <span
                                    class="visually-hidden">(current)</span></router-link>
                        </li>
                        <li class="nav-item">
                            <router-link to="/about" class="nav-link text-white">About</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link to="/result" class="nav-link text-white">Hasil</router-link>
                        </li>

                    </ul>

                </div>
            </div>
        </nav>

    </div>
</template>
  
<script setup>
</script>
  
<style scoped>
.navbar {
    background-color: #2f80ed;
}

.navbar-brand {
    font-size: 24px;
    font-weight: bold;
}

.nav-link {
    font-size: 18px;
}
</style>
  