<template lang="">
    <div>
        <nav class="navbar navbar-expand-lg">
            <div class="container-fluid">
                <a class="navbar-brand" href="/mapMarkerTestPage">SwimminGo</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <button type="button" class="btn btn-custom2" @click="$router.push('/loginPage')">게시판A</button>
                <button type="button" class="btn btn-custom2" @click="$router.push('/loginPage')">게시판B</button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <!-- <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="#">Home</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">_</a>
                        </li> -->
                        <!-- <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Dropdown
                            </a>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item" href="#">Action</a></li>
                                <li><a class="dropdown-item" href="#">Another action</a></li>
                                <li><hr class="dropdown-divider"></li>
                                <li><a class="dropdown-item" href="#">Something else here</a></li>
                            </ul>
                        </li> -->
                        <!-- <li class="nav-item">
                            <a class="nav-link disabled">Disabled</a>
                        </li> -->
                    </ul>
                    <!-- <form class="d-flex" role="search">
                        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                        <button class="btn btn-outline-success" type="submit">Search</button>
                    </form> -->
            
                    <button type="button" class="btn btn-custom2" @click="$router.push('/loginPage')">Login</button>
                </div>
            </div>
        </nav>
    </div>
</template>
<script>
export default {
}
</script>
<style>
.navbar {
    width: 100%;
    position: fixed;
    z-index: 2;
    background-color: #83c1e7;
}

.btn-custom2 {
    --bs-btn-font-weight: 600;
    --bs-btn-color: white;
    --bs-btn-bg: #83c1e7;

    /* --bs-btn-border-color: white; */
    --bs-btn-border-radius: .5rem;

    /* 마우스 올렸을 때 폰트색 */
    --bs-btn-hover-color: white;
    --bs-btn-hover-bg: #2A93D5;
    /* --bs-btn-hover-border-color: #{shade-color($bd-violet, 10%)}; */

    /* --bs-btn-focus-shadow-rgb: var(--bd-violet-rgb); */
    /* 클릭했을때 색 */
    --bs-btn-active-color: white;
    --bs-btn-active-bg: #2A93D5;
    /* --bs-btn-active-border-color: #{shade-color($bd-violet, 20%)}; */
}
</style>