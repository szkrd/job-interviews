<template>
  <div class="card-component">
    <figure class="cover">
      <img v-if="!coverHeight" src="~/assets/room.jpg" alt="Photo of the room" />
      <figcaption v-if="coverHeight">Photo of the room</figcaption>
    </figure>
    <header>
      <div class="thumbnail"></div>
      <div class="titles">
        <h2>{{ title }}</h2>
        <h3>{{ subtitle }}</h3>
      </div>
    </header>
    <main>
      <slot name="body"></slot>
    </main>
    <footer>
      <slot name="footer"></slot>
    </footer>
  </div>
</template>
<style>
.card-component {
  font-family: 'Roboto', sans-serif;
}

h2 {
  font-family: 'Lora', serif;
}
</style>
<script>
module.exports = {
  props: {
    // image url
    cover: String,
    // leave unset for ratio TODO
    coverHeight: Number,
    // by default it's above, the first element inside the card TODO
    coverUnderHeader: Boolean,
    // image url
    thumbnail: String,
    title: String,
    subtitle: String,
    isLoading: Boolean,
    onClick: Function
  }
};
</script>
