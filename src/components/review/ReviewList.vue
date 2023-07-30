<template>
  <div class="review-wrapper">
    <div class="review-item good">
      <div class="review-header">
        <h6 class="review-author">Aibat Tozhybaev</h6>
        <h6 class="review-date">25/14/2023</h6>
      </div>
      <hr />
      <div class="review-content">
        <h6 class="review-content-header">Lorem ipsum dolor sit</h6>
        <p class="review-text">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae,
          sit tenetur et enim at voluptas ducimus! Voluptatem, nesciunt dolores,
          aperiam esse dignissimos quibusdam, minima explicabo eius quasi
          obcaecati numquam. Quasi.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.review-wrapper {
  margin-bottom: 50px;
}
.review-item {
  padding: 15px;
}
.review-item + .review-item {
  margin-top: 15px;
}
.review-header {
  margin-bottom: 10px;
}
.review-content {
  margin-top: 10px;
}
.review-author {
  margin: 0;
  font-weight: bolder;
}
.review-date {
  margin: 0;
}
.review-content-header {
  font-weight: bolder;
  margin-bottom: 8px;
}
.bad {
  background-color: rgba(255, 207, 207, 1);
}
.good {
  background-color: rgba(158, 247, 158, 1);
}
</style>
