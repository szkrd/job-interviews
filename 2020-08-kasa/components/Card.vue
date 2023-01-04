<template>
  <div
      class="card-component"
      :class="{grow, clickable: !isLoading && isClickable, skeleton: isLoading}"
      :tabindex="!isLoading && isClickable ? 0 : -1"
      @click="handleAction"
      @keydown.space="handleAction"
      @keydown.enter="handleAction"
  >
    <!-- cover image above titles -->
    <figure class="cover pull-up" v-if="coverUrl && !coverUnderHeader" :style="coverStyle">
      <SkeletonHelper v-if="isLoading" :stretch="true"/>
      <img v-if="!coverHeight" :src="coverUrl" alt="Photo of the room"/>
      <figcaption v-if="!isLoading && coverHeight && coverDescription">{{ coverDescription }}</figcaption>
    </figure>
    <!-- titles -->
    <header v-if="!isLoading && hasTitles">
      <div v-if="thumbnailUrl" class="thumbnail" :style="{ backgroundImage: `url(${thumbnailUrl})` }"></div>
      <div class="titles" v-if="title || subtitle">
        <h2 v-if="title">{{ title }}</h2>
        <h3 v-if="subtitle">{{ subtitle }}</h3>
      </div>
    </header>
    <!-- titles skeleton -->
    <header v-if="isLoading && hasTitles">
      <div v-if="thumbnailUrl" class="thumbnail">
        <SkeletonHelper :stretch="true"/>
      </div>
      <div class="titles" v-if="title || subtitle">
        <h2 v-if="title">
          <SkeletonHelper :height-px="28" :width-percent="80"/>
        </h2>
        <h3 v-if="subtitle">
          <SkeletonHelper :height-px="20" :width-percent="50"/>
        </h3>
      </div>
    </header>
    <!-- cover image below titles -->
    <figure class="cover" :class="{'pull-up': !hasTitles}" v-if="coverUnderHeader" :style="coverStyle">
      <SkeletonHelper v-if="isLoading" :stretch="true"/>
      <img v-if="!coverHeight" :src="coverUrl" alt="Photo of the room"/>
      <figcaption v-if="!isLoading && coverHeight">{{ coverDescription }}</figcaption>
    </figure>
    <!-- body -->
    <main v-if="hasBody" class="grow">
      <div v-if="isLoading">
        <SkeletonHelper :width-percent="60"/>
        <SkeletonHelper :width-percent="80"/>
        <SkeletonHelper :width-percent="70"/>
      </div>
      <div v-if="!isLoading">
        <slot name="body"></slot>
      </div>
    </main>
    <main v-if="grow && borderlessFooter" class="grow dummy"></main>
    <!-- footer -->
    <footer v-if="hasFooter" :class="{ 'pull-up': !hasBody, borderless: !grow && borderlessFooter }">
      <SkeletonHelper v-if="isLoading" :width-percent="30"/>
      <div v-if="!isLoading">
        <slot name="footer"></slot>
      </div>
    </footer>
    <!-- skeleton coverlayer -->
    <div v-if="isLoading" class="fade-out"></div>
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
  overflow: hidden; // yuck, but hover would bite off the corners

  &.clickable {
    cursor: pointer;

    &:hover {
      background: rgba(45, 45, 45, .04);
    }

    &:focus {
      outline: 0;
      border-color: #2F2A8D;
      box-shadow: 0 0 1px 3px rgba(47, 42, 141, .2);
    }
  }
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

// skeleton overrides

.card-component.skeleton {
  position: relative;
  // rendered #fefefe according to the picker, but on my display both looks white
  background: #fcfcfc;
  // it really depends on the design... if we want to fade the (possibly) bottom positioned footer,
  // like it is on the design, then the cover layer is better, if we want the card bg to fade to
  // transparent, then this one should be preferred...
  // background: linear-gradient(180deg, #fff .1%, #f0f0f0 1%, #fff 100%);
  border-color: transparent;

  .cover {
    position: relative;
    background: rgba(45, 45, 45, 0.05);

    img, figcaption {
      visibility: hidden;
    }
  }

  header {
    .thumbnail {
      position: relative;
      overflow: hidden;
    }

    .titles {
      width: 60%;
      height: 100%;
    }
  }

  footer {
    border-color: transparent;
  }
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

.fade-out {
  pointer-events: none;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: linear-gradient(0deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 100%);
}
</style>
<script>
module.exports = {
  props: {
    coverUrl: String, // if we had the time/energy, we could add image load/error handling...
    // leave unset for ratio
    coverHeight: Number,
    // by default it's above, the first element inside the card
    coverUnderHeader: Boolean,
    coverDescription: String,
    thumbnailUrl: String,
    title: String,
    subtitle: String,
    isLoading: Boolean,
    // adds flex grow to the root node
    grow: Boolean
  },
  methods: {
    handleAction (event) {
      if (this.isLoading) {
        return;
      }
      if (event instanceof KeyboardEvent) {
        event.preventDefault();
      } else {
        // I really hate removing the focus, but some designers hate to
        // see it after clicking or tapping on the item, so I'd probably ask his or her preference...
        document.activeElement.blur();
      }
      this.$emit('click', event);
    }
  },
  computed: {
    hasBody () {
      return !!this.$slots.body;
    },
    hasFooter () {
      return !!this.$slots.footer;
    },
    hasTitles () {
      // (if I thought that more thant five hooks in react leads to spaghetti,
      // then I guess vue observability invites in the spaghettapocalypse)
      return !!(this.title || this.subtitle || this.thumbnailUrl);
    },
    isClickable () {
      return !!(this.$listeners && this.$listeners.click);
    },
    coverStyle () {
      return {
        height: this.coverHeight ? `${this.coverHeight}px` : 'auto',
        backgroundImage: this.isLoading ? 'none' : `url(${this.coverUrl})`
      };
    },
    // image size ratio may leave a couple of stray pixels under the picture
    // (but this is only annoying for non-grid mode, where the footer is
    // immediately below the image)
    borderlessFooter () {
      return this.coverUnderHeader && !this.hasBody;
    }
  }
};
</script>
