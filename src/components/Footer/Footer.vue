<template>
    <footer class="footer-container">
        <div class="footer-links">
        <ul>
            <li><a href="#">About</a></li>
            <li><a href="#">Contact</a></li>
            <li><a href="#">Terms of Service</a></li>
            <li><a href="#">Privacy Policy</a></li>
        </ul>
        </div>
        <div class="footer-details">
        <div class="footer-details-content">
            <p>주소: (02578) 경기도 수원시 팔달구 팔달문 222</p>
            <p>전화 문의: 031-055-5555 (AM.10:30 - PM.06:00)</p>
            <p>대표자: 조여울</p>
        </div>
        </div>
    </footer>
</template>

<style scoped>
.footer-container {
background-color: #f8f8f8;
padding: 20px;
display: flex;
flex-direction: column;
align-items: center;
}

.footer-links ul {
list-style-type: none;
padding: 0;
margin: 0;
display: flex;
justify-content: center;
}

.footer-links ul li {
margin-bottom: 5px;
margin-right: 10px;
}

.footer-links ul li a {
text-decoration: none;
color: #555555;
}

.footer-links ul li a:hover {
color: #ff7f50;
}

.footer-details {
display: flex;
flex-direction: row;
margin-top: 10px;
}

.footer-details-content {
display: flex;
flex-direction: row;
}

.footer-details-content p {
font-size: 12px;
color: #888888;
margin-right: 10px;
}
</style>

