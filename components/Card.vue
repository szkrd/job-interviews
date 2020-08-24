<template>
  <div class="card-component" :class="{grow}">
    <figure class="cover pull-up" v-if="coverUrl && !coverUnderHeader" :style="coverStyle">
      <img v-if="!coverHeight" :src="coverUrl" alt="Photo of the room"/>
      <figcaption v-if="coverHeight && coverDescription">{{ coverDescription }}</figcaption>
    </figure>
    <header v-if="title || subtitle || thumbnailUrl">
      <div v-if="thumbnailUrl" class="thumbnail" :style="{ backgroundImage: `url(${thumbnailUrl})` }"></div>
      <div class="titles" v-if="title || subtitle">
        <h2 v-if="title">{{ title }}</h2>
        <h3 v-if="subtitle">{{ subtitle }}</h3>
      </div>
    </header>
    <figure class="cover" v-if="coverUnderHeader" :style="coverStyle">
      <!-- TODO maybe? move to component, pull up as prop -->
      <img v-if="!coverHeight" :src="coverUrl" alt="Photo of the room"/>
      <figcaption v-if="coverHeight">Photo of the room</figcaption>
    </figure>
    <main v-if="hasBody" class="grow">
      <slot name="body"></slot>
    </main>
    <footer v-if="hasFooter" :class="{ 'pull-up': !hasBody, borderless: borderlessFooter }">
      <slot name="footer"></slot>
    </footer>
  </div>
</template>
<style lang="scss" scoped>
.card-component {
  font-family: 'Roboto', sans-serif;
  border-radius: 4px;
  border: 1px solid rgba(45, 45, 45, 0.2);
  padding: 24px 0 0 0;
  background-color: #fff;
  color: #2D2D2D;
  display: flex;
  flex-direction: column;
}

.cover {
  margin: 0 0 24px 0;
  padding: 0;
  background-position: center;
  background-size: cover;

  img {
    width: 100%;
  }

  figcaption {
    display: none;
  }
}

header {
  margin: 0 24px 24px 24px;
  display: flex;
  align-items: center;

  .thumbnail {
    background-position: center;
    background-size: cover;
    border-radius: 50%;
    width: 60px;
    height: 60px;
    margin: 0 24px 0 0;
  }

  h2 {
    font-family: 'Lora', serif;
    margin: 0;
    padding: 0;
    font-size: 20px;
    line-height: 28px;
  }

  h3 {
    color: #6E6E6E;
    font-size: 14px;
    line-height: 20px;
    margin: 0;
    padding: 0;
  }
}

main {
  font-size: 16px;
  line-height: 20px;
  margin: 0 24px 24px 24px;
}

footer {
  padding: 24px;
  color: #6E6E6E;
  font-size: 14px;
  line-height: 20px;
  border-top: 1px solid rgba(45, 45, 45, 0.2);
}

// utility classes

.pull-up {
  margin-top: -24px;
}

.borderless {
  border: 0;
}

.grow {
  flex-grow: 1;
}
</style>
<script>
module.exports = {
  props: {
    coverUrl: String,
    // leave unset for ratio TODO
    coverHeight: Number,
    // by default it's above, the first element inside the card TODO
    coverUnderHeader: Boolean,
    coverDescription: String,
    thumbnailUrl: String,
    title: String,
    subtitle: String,
    isLoading: Boolean,
    onClick: Function,
    // adds flex grow to the root node
    grow: Boolean
  },
  computed: {
    hasBody () {
      return !!this.$slots.body;
    },
    hasFooter () {
      return !!this.$slots.footer;
    },
    coverStyle () {
      return {
        height: this.coverHeight ? `${this.coverHeight}px` : 'auto',
        backgroundImage: `url(${this.coverUrl})`
      };
    },
    // image size ratio may leave a couple of stray pixels under the picture
    borderlessFooter () {
      return this.coverUnderHeader && !this.hasBody;
    }
  }
};
</script>
