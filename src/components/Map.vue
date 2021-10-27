<template>
  <div :class="$style.container">
    <iframe
      :class="$style.map"
      src="https://www.google.com/maps/d/u/0/embed?mid=1cgvsTS9ouchK0lBJuqOnm_1kFTelxYZE"
      width="1280"
      height="720"
    ></iframe>
  </div>
</template>

<style module>
.container {
  padding-top: 56.25%;
}

@media screen and (max-width: 960px) {
  .container {
    padding-top: 100%;
  }
}

.map {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
